import raf from 'rc-util/lib/raf';
import React, { useEffect, useRef, useState } from 'react';
import type { TabOffset } from '../interface';

export type GetIndicatorSize = number | ((origin: number) => number);

interface UseIndicatorOptions {
  activeTabOffset: TabOffset;
  horizontal: boolean;
  rtl: boolean;
  indicator?: {
    size?: GetIndicatorSize;
    align?: 'start' | 'center' | 'end';
  };
}

const useIndicator = (options: UseIndicatorOptions) => {
  const { activeTabOffset, horizontal, rtl, indicator } = options;
  const [inkStyle, setInkStyle] = useState<React.CSSProperties>();
  const inkBarRafRef = useRef<number>();

  const getLength = React.useCallback(
    (origin: number) => {
      if (typeof indicator?.size === 'function') {
        return indicator?.size(origin);
      }
      if (typeof indicator?.size === 'number') {
        return indicator?.size;
      }
      return origin;
    },
    [indicator],
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
        if (indicator?.align === 'start') {
          newInkStyle[key] = activeTabOffset[key];
        }
        if (indicator?.align === 'center') {
          newInkStyle[key] = activeTabOffset[key] + activeTabOffset.width / 2;
          newInkStyle.transform = rtl ? 'translateX(50%)' : 'translateX(-50%)';
        }
        if (indicator?.align === 'end') {
          newInkStyle[key] = activeTabOffset[key] + activeTabOffset.width;
          newInkStyle.transform = 'translateX(-100%)';
        }
      } else {
        newInkStyle.height = getLength(activeTabOffset.height);
        if (indicator?.align === 'start') {
          newInkStyle.top = activeTabOffset.top;
        }
        if (indicator?.align === 'center') {
          newInkStyle.top = activeTabOffset.top + activeTabOffset.height / 2;
          newInkStyle.transform = 'translateY(-50%)';
        }
        if (indicator?.align === 'end') {
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
  }, [activeTabOffset, horizontal, rtl, indicator?.align, getLength]);

  return { style: inkStyle };
};

export default useIndicator;
