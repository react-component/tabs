import * as React from 'react';
import { useState, useRef } from 'react';

type TouchEventHandler = (e: TouchEvent) => void;
type WheelEventHandler = (e: WheelEvent) => void;

const MIN_SWIPE_DISTANCE = 0.1;
const STOP_SWIPE_DISTANCE = 0.01;
const REFRESH_INTERVAL = 20;
const SPEED_OFF_MULTIPLE = 0.995 ** REFRESH_INTERVAL;

// ================================= Hook =================================
export default function useTouchMove(
  ref: React.RefObject<HTMLDivElement>,
  onOffset: (offsetX: number, offsetY: number) => boolean,
) {
  const [touchPosition, setTouchPosition] = useState<{ x: number; y: number }>();
  const [lastTimestamp, setLastTimestamp] = useState<number>(0);
  const [lastTimeDiff, setLastTimeDiff] = useState<number>(0);
  const [lastOffset, setLastOffset] = useState<{ x: number; y: number }>();
  const motionRef = useRef<number>();

  // ========================= Events =========================
  // >>> Touch events
  function onTouchStart(e: TouchEvent) {
    const { screenX, screenY } = e.touches[0];
    setTouchPosition({ x: screenX, y: screenY });
    window.clearInterval(motionRef.current);
  }

  function onTouchMove(e: TouchEvent) {
    if (!touchPosition) return;

    const { screenX, screenY } = e.touches[0];
    setTouchPosition({ x: screenX, y: screenY });
    const offsetX = screenX - touchPosition.x;
    const offsetY = screenY - touchPosition.y;
    onOffset(offsetX, offsetY);
    const now = Date.now();
    setLastTimestamp(now);
    setLastTimeDiff(now - lastTimestamp);
    setLastOffset({ x: offsetX, y: offsetY });
  }

  function onTouchEnd() {
    if (!touchPosition) return;

    setTouchPosition(null);
    setLastOffset(null);

    // Swipe if needed
    if (lastOffset) {
      const distanceX = lastOffset.x / lastTimeDiff;
      const distanceY = lastOffset.y / lastTimeDiff;
      const absX = Math.abs(distanceX);
      const absY = Math.abs(distanceY);

      // Skip swipe if low distance
      if (Math.max(absX, absY) < MIN_SWIPE_DISTANCE) return;

      let currentX = distanceX;
      let currentY = distanceY;

      motionRef.current = window.setInterval(() => {
        if (Math.abs(currentX) < STOP_SWIPE_DISTANCE && Math.abs(currentY) < STOP_SWIPE_DISTANCE) {
          window.clearInterval(motionRef.current);
          return;
        }

        currentX *= SPEED_OFF_MULTIPLE;
        currentY *= SPEED_OFF_MULTIPLE;
        onOffset(currentX * REFRESH_INTERVAL, currentY * REFRESH_INTERVAL);
      }, REFRESH_INTERVAL);
    }
  }

  // >>> Wheel event
  const lastWheelDirectionRef = useRef<'x' | 'y'>();

  function onWheel(e: WheelEvent) {
    const { deltaX, deltaY } = e;

    // Convert both to x & y since wheel only happened on PC
    let mixed: number = 0;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    if (absX === absY) {
      mixed = lastWheelDirectionRef.current === 'x' ? deltaX : deltaY;
    } else if (absX > absY) {
      mixed = deltaX;
      lastWheelDirectionRef.current = 'x';
    } else {
      mixed = deltaY;
      lastWheelDirectionRef.current = 'y';
    }

    if (onOffset(-mixed, -mixed)) {
      e.preventDefault();
    }
  }

  // ========================= Effect =========================
  const touchEventsRef = useRef<{
    onTouchStart: TouchEventHandler;
    onTouchMove: TouchEventHandler;
    onTouchEnd: TouchEventHandler;
    onWheel: WheelEventHandler;
  }>(null);
  touchEventsRef.current = { onTouchStart, onTouchMove, onTouchEnd, onWheel };

  React.useEffect(() => {
    function onProxyTouchStart(e: TouchEvent) {
      touchEventsRef.current.onTouchStart(e);
    }
    function onProxyTouchMove(e: TouchEvent) {
      touchEventsRef.current.onTouchMove(e);
    }
    function onProxyTouchEnd(e: TouchEvent) {
      touchEventsRef.current.onTouchEnd(e);
    }
    function onProxyWheel(e: WheelEvent) {
      touchEventsRef.current.onWheel(e);
    }

    document.addEventListener('touchmove', onProxyTouchMove, { passive: false });
    document.addEventListener('touchend', onProxyTouchEnd, { passive: false });

    // No need to clean up since element removed
    ref.current.addEventListener('touchstart', onProxyTouchStart, { passive: false });
    ref.current.addEventListener('wheel', onProxyWheel);

    return () => {
      document.removeEventListener('touchmove', onProxyTouchMove);
      document.removeEventListener('touchend', onProxyTouchEnd);
    };
  }, []);
}
