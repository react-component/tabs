import * as React from 'react';
import { useState, useRef } from 'react';

type TouchEventHandler = (e: TouchEvent) => void;
type WheelEventHandler = (e: WheelEvent) => void;

const MIN_SWIPE_DISTANCE = 0.1;
const STOP_SWIPE_DISTANCE = 0.01;
const REFRESH_INTERVAL = 20;
const SPEED_OFF_MULTIPLE = 0.995 ** REFRESH_INTERVAL;

// ========================= Check if is a mobile =========================
export function isMobile() {
  const agent = navigator.userAgent || navigator.vendor || (window as any).opera;
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
      agent,
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
      agent.substr(0, 4),
    )
  ) {
    return true;
  }
  return false;
}

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

    e.preventDefault();
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
  const lastMixedWheelRef = useRef(0);
  const lastWheelTimestampRef = useRef(0);
  const lastWheelPreventRef = useRef(false);
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

    // Optimize mac touch scroll
    const now = Date.now();
    const absMixed = Math.abs(mixed);

    if (now - lastWheelTimestampRef.current > 100 || absMixed - lastMixedWheelRef.current > 10) {
      lastWheelPreventRef.current = false;
    }

    if (onOffset(-mixed, -mixed) || lastWheelPreventRef.current) {
      e.preventDefault();
      lastWheelPreventRef.current = true;
    }

    lastWheelTimestampRef.current = now;
    lastMixedWheelRef.current = absMixed;
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
