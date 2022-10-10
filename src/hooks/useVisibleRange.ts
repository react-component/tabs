import { useMemo } from 'react';
import type { Tab, TabOffsetMap } from '../interface';
import type { TabNavListProps } from '../TabNavList';

const DEFAULT_SIZE = { width: 0, height: 0, left: 0, top: 0, right: 0 };

export type ContainerSizeInfo = [width: number, height: number, left: number, top: number];

export default function useVisibleRange(
  tabOffsets: TabOffsetMap,
  containerExcludeExtraSizeValue: number,
  transform: number,
  tabContentSizeValue: number,
  addNodeSizeValue: number,
  operationNodeSizeValue: number,
  { tabs, tabPosition, rtl }: { tabs: Tab[] } & TabNavListProps,
): [visibleStart: number, visibleEnd: number, visibleTabContentSize: number] {
  let charUnit: 'width' | 'height';
  let position: 'left' | 'top' | 'right';
  let transformSize: number;

  if (['top', 'bottom'].includes(tabPosition)) {
    charUnit = 'width';
    position = rtl ? 'right' : 'left';
    transformSize = Math.abs(transform);
  } else {
    charUnit = 'height';
    position = 'top';
    transformSize = -transform;
  }

  return useMemo(() => {
    if (!tabs.length) {
      return [0, 0, containerExcludeExtraSizeValue];
    }

    // Check if we can put all without scrollable
    const needScroll = containerExcludeExtraSizeValue < tabContentSizeValue + addNodeSizeValue;

    const visibleTabContentSize = needScroll
      ? containerExcludeExtraSizeValue - operationNodeSizeValue
      : containerExcludeExtraSizeValue - addNodeSizeValue;

    const len = tabs.length;
    let endIndex = len;
    for (let i = 0; i < len; i += 1) {
      const offset = tabOffsets.get(tabs[i].key) || DEFAULT_SIZE;
      if (offset[position] + offset[charUnit] > transformSize + visibleTabContentSize) {
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

    return [startIndex, endIndex, visibleTabContentSize];
  }, [
    tabOffsets,
    containerExcludeExtraSizeValue,
    tabContentSizeValue,
    addNodeSizeValue,
    operationNodeSizeValue,
    transformSize,
    tabPosition,
    tabs.map(tab => tab.key).join('_'),
    rtl,
  ]);
}
