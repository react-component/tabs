import raf from '@rc-component/util/lib/raf';
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
  const { activeTabOffset, horizontal, rtl, indicator = {} } = options;

  const { size, align = 'center' } = indicator;

  const [inkStyle, setInkStyle] = useState<React.CSSProperties>();
  const inkBarRafRef = useRef<number>();

  const getLength = React.useCallback(
    (origin: number) => {
      if (typeof size === 'function') {
        return size(origin);
      }
      if (typeof size === 'number') {
        return size;
      }
      return origin;
    },
    [size],
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
        if (align === 'start') {
          newInkStyle[key] = activeTabOffset[key];
        }
        if (align === 'center') {
          newInkStyle[key] = activeTabOffset[key] + activeTabOffset.width / 2;
          newInkStyle.transform = rtl ? 'translateX(50%)' : 'translateX(-50%)';
        }
        if (align === 'end') {
          newInkStyle[key] = activeTabOffset[key] + activeTabOffset.width;
          newInkStyle.transform = 'translateX(-100%)';
        }
      } else {
        newInkStyle.height = getLength(activeTabOffset.height);
        if (align === 'start') {
          newInkStyle.top = activeTabOffset.top;
        }
        if (align === 'center') {
          newInkStyle.top = activeTabOffset.top + activeTabOffset.height / 2;
          newInkStyle.transform = 'translateY(-50%)';
        }
        if (align === 'end') {
          newInkStyle.top = activeTabOffset.top + activeTabOffset.height;
          newInkStyle.transform = 'translateY(-100%)';
        }
      }
    }

    cleanInkBarRaf();
    inkBarRafRef.current = raf(() => {
      // Avoid jitter caused by tiny numerical differences
      // fix https://github.com/ant-design/ant-design/issues/53378
      const isEqual =
        inkStyle &&
        newInkStyle &&
        Object.keys(newInkStyle).every(key => {
          const newValue = newInkStyle[key];
          const oldValue = inkStyle[key];
          return typeof newValue === 'number' && typeof oldValue === 'number'
            ? Math.round(newValue) === Math.round(oldValue)
            : newValue === oldValue;
        });
      if (!isEqual) {
        setInkStyle(newInkStyle);
      }
    });

    return cleanInkBarRaf;
  }, [JSON.stringify(activeTabOffset), horizontal, rtl, align, getLength]);

  return { style: inkStyle };
};

export default useIndicator;
