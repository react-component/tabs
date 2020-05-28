import * as React from 'react';

type Updater<T> = (prev: T) => T;

export default function useSyncState<T>(defaultState: T): [T, (updater: T | Updater<T>) => void] {
  const stateRef = React.useRef<T>(defaultState);
  const [, forceUpdate] = React.useState({});

  function setState(updater: any) {
    stateRef.current = typeof updater === 'function' ? updater(stateRef.current) : updater;
    forceUpdate({});
  }

  return [stateRef.current, setState];
}
