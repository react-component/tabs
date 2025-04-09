import { useLayoutUpdateEffect } from '@rc-component/util/lib/hooks/useLayoutEffect';
import { useRef, useState } from 'react';

/**
 * Help to merge callback with `useLayoutEffect`.
 * One time will only trigger once.
 */
export default function useUpdate(callback: VoidFunction): () => void {
  const [count, setCount] = useState(0);
  const effectRef = useRef(0);
  const callbackRef = useRef<VoidFunction>();
  callbackRef.current = callback;

  // Trigger on `useLayoutEffect`
  useLayoutUpdateEffect(() => {
    callbackRef.current?.();
  }, [count]);

  // Trigger to update count
  return () => {
    if (effectRef.current !== count) {
      return;
    }

    effectRef.current += 1;
    setCount(effectRef.current);
  };
}

type Callback<T> = (ori: T) => T;

export function useUpdateState<T>(
  defaultState: T | (() => T),
): [T, (updater: Callback<T>) => void] {
  const batchRef = useRef<Callback<T>[]>([]);
  const [, forceUpdate] = useState({});
  const state = useRef<T>(
    typeof defaultState === 'function' ? (defaultState as any)() : defaultState,
  );

  const flushUpdate = useUpdate(() => {
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
