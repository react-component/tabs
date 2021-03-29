import { useMemo } from 'react';
import type { Tab, TabOffsetMap } from '../interface';
import type { TabNavListProps } from '../TabNavList';

const DEFAULT_SIZE = { width: 0, height: 0, left: 0, top: 0, right: 0 };

export default function useVisibleRange(
  tabOffsets: TabOffsetMap,
  containerSize: { width: number; height: number; left: number; top: number },
  tabContentNodeSize: { width: number; height: number },
  addNodeSize: { width: number; height: number },
  { tabs, tabPosition, rtl }: { tabs: Tab[] } & TabNavListProps,
): [number, number] {
  let unit: 'width' | 'height';
  let position: 'left' | 'top' | 'right';
  let transformSize: number;

  if (['top', 'bottom'].includes(tabPosition)) {
    unit = 'width';
    position = rtl ? 'right' : 'left';
    transformSize = Math.abs(containerSize.left);
  } else {
    unit = 'height';
    position = 'top';
    transformSize = -containerSize.top;
  }

  const basicSize = containerSize[unit];
  const tabContentSize = tabContentNodeSize[unit];
  const addSize = addNodeSize[unit];

  let mergedBasicSize = basicSize;
  if (tabContentSize + addSize > basicSize) {
    mergedBasicSize = basicSize - addSize;
  }

  return useMemo(() => {
    if (!tabs.length) {
      return [0, 0];
    }

    const len = tabs.length;
    let endIndex = len;
    for (let i = 0; i < len; i += 1) {
      const offset = tabOffsets.get(tabs[i].key) || DEFAULT_SIZE;
      if (offset[position] + offset[unit] > transformSize + mergedBasicSize) {
        endIndex = i - 1;
        break;
      }
    }

    let startIndex = 0;
    for (let i = len - 1; i >= 0; i -= 1) {
      const offset = tabOffsets.get(tabs[i].key) || DEFAULT_SIZE;
      if (offset[position] < transformSize) {
        startIndex = i + 1;
        break;
      }
    }

    return [startIndex, endIndex];
  }, [
    tabOffsets,
    transformSize,
    mergedBasicSize,
    tabPosition,
    tabs.map(tab => tab.key).join('_'),
    rtl,
  ]);
}
