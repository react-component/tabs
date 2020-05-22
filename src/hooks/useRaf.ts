import { useRef, useState, useEffect } from 'react';
import raf from 'raf';

export default function useRaf<Callback extends Function>(callback: Callback) {
  const rafRef = useRef<number>();

  function trigger(...args: any[]) {
    raf.cancel(rafRef.current);
    rafRef.current = raf(() => {
      callback(...args);
    });
  }

  useEffect(() => {
    return () => {
      raf.cancel(rafRef.current);
    };
  }, []);

  return trigger;
}

type Callback<T> = (ori: T) => T;

export function useRafState<T>(defaultState: T | (() => T)): [T, (updater: Callback<T>) => void] {
  const batchRef = useRef<Callback<T>[]>([]);
  const [, forceUpdate] = useState({});
  const state = useRef<T>(
    typeof defaultState === 'function' ? (defaultState as any)() : defaultState,
  );

  const flushUpdate = useRaf(() => {
    let current = state.current;
    batchRef.current.forEach(callback => {
      current = callback(current);
    });
    batchRef.current = [];

    state.current = current;
    forceUpdate({});
  });

  function updater(callback: Callback<T>) {
    batchRef.current.push(callback);
    flushUpdate();
  }

  return [state.current, updater];
}
