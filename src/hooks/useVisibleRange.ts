import { useMemo } from 'react';
import type { Tab, TabOffsetMap } from '../interface';
import type { TabNavListProps } from '../TabNavList';

const DEFAULT_SIZE = { width: 0, height: 0, left: 0, top: 0, right: 0 };

export type ContainerSizeInfo = [width: number, height: number, left: number, top: number];
export type SizeInfo = [width: number, height: number];

/**
 * Calculate what range of tabs is fully visible
 * @param tabOffsets Each Tab bounding rect info
 * @param containerSizeInfo Full outer container size (includes tabs, extra, operation, etc.)
 * @param tabContentNodeSizeInfo Size of full tabs
 * @param addNodeSizeInfo Size of addNode only
 * @param operationNodeSizeInfo Size of operation node (includes addNode & dropdown)
 * @param tabInfo
 * @returns
 */
export default function useVisibleRange(
  tabOffsets: TabOffsetMap,
  containerSizeInfo: ContainerSizeInfo,
  tabContentNodeSizeInfo: SizeInfo,
  addNodeSizeInfo: SizeInfo,
  operationNodeSizeInfo: SizeInfo,
  { tabs, tabPosition, rtl }: { tabs: Tab[] } & TabNavListProps,
): [visibleStart: number, visibleEnd: number, visibleTabContentSize: number] {
  let unit: 0 | 1;
  let charUnit: 'width' | 'height';
  let position: 'left' | 'top' | 'right';
  let transformSize: number;

  if (['top', 'bottom'].includes(tabPosition)) {
    unit = 0;
    charUnit = 'width';
    position = rtl ? 'right' : 'left';
    transformSize = Math.abs(containerSizeInfo[2]);
  } else {
    unit = 1;
    charUnit = 'height';
    position = 'top';
    transformSize = -containerSizeInfo[3];
  }

  const containerSize = containerSizeInfo[unit];
  const tabContentSize = tabContentNodeSizeInfo[unit];
  const addNodeSize = addNodeSizeInfo[unit];
  const operationNodeSize = operationNodeSizeInfo[unit];

  return useMemo(() => {
    if (!tabs.length) {
      return [0, 0, containerSize];
    }

    // Check if we can put all without scrollable
    const needScroll = containerSize < tabContentSize + addNodeSize;

    const visibleTabContentSize = needScroll
      ? containerSize - operationNodeSize
      : containerSize - addNodeSize;

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
    containerSize,
    tabContentSize,
    addNodeSize,
    operationNodeSize,
    tabPosition,
    tabs.map(tab => tab.key).join('_'),
    rtl,
  ]);
}
