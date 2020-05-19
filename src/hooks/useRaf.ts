import { useRef } from 'react';
import raf from 'raf';

export default function useRaf(callback: () => void) {
  const rafRef = useRef<number>(null);

  function trigger() {
    raf.cancel(rafRef.current);
    rafRef.current = raf(callback);
  }

  return trigger;
}
