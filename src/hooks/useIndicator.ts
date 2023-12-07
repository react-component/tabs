import raf from 'rc-util/lib/raf';
import React, { useEffect, useRef, useState } from 'react';
import type { TabOffset } from '../interface';

export type GetIndicatorSize = number | ((origin: number) => number);

interface UseIndicatorOptions {
  activeTabOffset: TabOffset;
  horizontal: boolean;
  rtl: boolean;
  indicatorSize: GetIndicatorSize;
  indicatorAlign: 'start' | 'center' | 'end';
}

const useIndicator = (options: UseIndicatorOptions) => {
  const { activeTabOffset, horizontal, rtl, indicatorSize, indicatorPosition } = options;
  const [inkStyle, setInkStyle] = useState<React.CSSProperties>();
  const inkBarRafRef = useRef<number>();

  const getLength = React.useCallback(
    (origin: number) => {
      if (typeof indicatorSize === 'function') {
        return indicatorSize(origin);
      }
      if (typeof indicatorSize === 'number') {
        return indicatorSize;
      }
      return origin;
    },
    [indicatorSize],
  );

  // Delay set ink style to avoid remove tab blink
  function cleanInkBarRaf() {
    raf.cancel(inkBarRafRef.current);
  }

  useEffect(() => {
    const newInkStyle: React.CSSProperties = {};

    if (activeTabOffset) {
      if (horizontal) {
        newInkStyle.width = getLength(activeTabOffset.width);
        const key = rtl ? 'right' : 'left';
        if (indicatorPosition === 'start') {
          newInkStyle[key] = activeTabOffset[key];
        }
        if (indicatorPosition === 'center') {
          newInkStyle[key] = activeTabOffset[key] + activeTabOffset.width / 2;
          newInkStyle.transform = rtl ? 'translateX(50%)' : 'translateX(-50%)';
        }
        if (indicatorPosition === 'end') {
          newInkStyle[key] = activeTabOffset[key] + activeTabOffset.width;
          newInkStyle.transform = 'translateX(-100%)';
        }
      } else {
        newInkStyle.height = getLength(activeTabOffset.height);
        if (indicatorPosition === 'start') {
          newInkStyle.top = activeTabOffset.top;
        }
        if (indicatorPosition === 'center') {
          newInkStyle.top = activeTabOffset.top + activeTabOffset.height / 2;
          newInkStyle.transform = 'translateY(-50%)';
        }
        if (indicatorPosition === 'end') {
          newInkStyle.top = activeTabOffset.top + activeTabOffset.height;
          newInkStyle.transform = 'translateY(-100%)';
        }
      }
    }

    cleanInkBarRaf();
    inkBarRafRef.current = raf(() => {
      setInkStyle(newInkStyle);
    });

    return cleanInkBarRaf;
  }, [activeTabOffset, horizontal, rtl, indicatorSize, indicatorPosition, getLength]);

  return { style: inkStyle };
};

export default useIndicator;
