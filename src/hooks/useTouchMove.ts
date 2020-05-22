import * as React from 'react';

type TouchEventHandler = (e: TouchEvent) => void;

export default function useTouchMove(
  onOffset: (offsetX: number, offsetY: number) => void,
): [boolean, React.TouchEventHandler] {
  const [touchPosition, setTouchPosition] = React.useState<{ x: number; y: number }>();

  function onTouchStart(e: React.TouchEvent) {
    const { screenX, screenY } = e.touches[0];
    setTouchPosition({ x: screenX, y: screenY });
  }

  function onTouchMove(e: TouchEvent) {
    if (!touchPosition) return;

    e.preventDefault();
    const { screenX, screenY } = e.touches[0];
    setTouchPosition({ x: screenX, y: screenY });
    onOffset(screenX - touchPosition.x, screenY - touchPosition.y);
  }

  function onTouchEnd(e: TouchEvent) {
    if (!touchPosition) return;

    // e.preventDefault();

    setTouchPosition(null);
  }

  // ========================= Effect =========================
  const touchEventsRef = React.useRef<{
    onTouchMove: TouchEventHandler;
    onTouchEnd: TouchEventHandler;
  }>(null);
  touchEventsRef.current = { onTouchMove, onTouchEnd };

  React.useEffect(() => {
    function onProxyTouchMove(e: TouchEvent) {
      touchEventsRef.current.onTouchMove(e);
    }
    function onProxyTouchEnd(e: TouchEvent) {
      touchEventsRef.current.onTouchEnd(e);
    }

    window.addEventListener('touchmove', onProxyTouchMove, { passive: false });
    window.addEventListener('touchend', onProxyTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('touchmove', onProxyTouchMove);
      window.removeEventListener('touchend', onProxyTouchEnd);
    };
  }, []);

  return [!!touchPosition, onTouchStart];
}
