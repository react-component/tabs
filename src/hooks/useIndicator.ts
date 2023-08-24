import React, { useEffect, useRef, useState } from 'react';
import raf from 'rc-util/lib/raf';
import { TabOffset } from '../interface';

export type GetIndicatorLength = number | ((origin: number) => number);

export type UseIndicator = (options: {
  activeTabOffset: TabOffset,
  horizontal: boolean;
  rtl: boolean;
  indicatorLength: GetIndicatorLength;
}) => {
  style: React.CSSProperties;
}

const useIndicator: UseIndicator = ({
  activeTabOffset,
  horizontal,
  rtl,
                                      indicatorLength,
                                    }) => {
  const [inkStyle, setInkStyle] = useState<React.CSSProperties>();
  const inkBarRafRef = useRef<number>();

  const getLength = (origin: number) => {
    if (typeof indicatorLength === 'function') {
      return indicatorLength(origin);
    }
    if (typeof indicatorLength === 'number') {
      return indicatorLength;
    }
    return origin;
  }

  // Delay set ink style to avoid remove tab blink
  function cleanInkBarRaf() {
    raf.cancel(inkBarRafRef.current);
  }

  useEffect(() => {
    const newInkStyle: React.CSSProperties = {};

    if (activeTabOffset) {
      if (horizontal) {
        if (rtl) {
          newInkStyle.right = activeTabOffset.right + activeTabOffset.width / 2;
          newInkStyle.transform = 'translateX(50%)';
        } else {
          newInkStyle.left = activeTabOffset.left + activeTabOffset.width / 2;
          newInkStyle.transform = 'translateX(-50%)';
        }
        newInkStyle.width = getLength(activeTabOffset.width);
      } else {
        newInkStyle.top = activeTabOffset.top + activeTabOffset.height / 2;
        newInkStyle.transform = 'translateY(-50%)';
        newInkStyle.height = getLength(activeTabOffset.height);
      }
    }

    cleanInkBarRaf();
    inkBarRafRef.current = raf(() => {
      setInkStyle(newInkStyle);
    });

    return cleanInkBarRaf;
  }, [activeTabOffset, horizontal, rtl, indicatorLength]);

  return {
    style: inkStyle,
  }
}

export default useIndicator;