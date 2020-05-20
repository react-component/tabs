import { useRef, useState } from 'react';
import raf from 'raf';

export default function useRaf<Callback extends Function>(callback: Callback) {
  const rafRef = useRef<number>();

  function trigger(...args: any[]) {
    raf.cancel(rafRef.current);
    rafRef.current = raf(() => {
      callback(...args);
    });
  }

  return trigger;
}

type Callback<T> = (ori: T) => T;

export function useRafState<T>(defaultState: T | (() => T)): [T, (updater: Callback<T>) => void] {
  const batchRef = useRef<Callback<T>[]>([]);
  const [state, setState] = useState<T>(defaultState);

  const flushUpdate = useRaf(() => {
    let current = state;
    batchRef.current.forEach(callback => {
      current = callback(current);
    });
    batchRef.current = [];
    setState(current);
  });

  function updater(callback: Callback<T>) {
    batchRef.current.push(callback);
    flushUpdate();
  }

  return [state, updater];
}
