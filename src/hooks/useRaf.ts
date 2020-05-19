import { useRef } from 'react';
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
