import { useMemo } from 'react';
import type { Tab, TabOffsetMap } from '../interface';
import type { TabNavListProps } from '../TabNavList';

const DEFAULT_SIZE = { width: 0, height: 0, left: 0, top: 0, right: 0 };

export type ContainerSizeInfo = [width: number, height: number, left: number, top: number];
export type SizeInfo = [width: number, height: number];

/**
 * Calculate what range of tabs is fully visible
 * @param tabOffsets Each Tab bounding rect info
 * @param containerSize Full outer container size (includes tabs, extra, operation, etc.)
 * @param tabContentNodeSize Size of full tabs
 * @param addNodeSize Size of addNode only
 * @param operationNodeSize Size of operation node (includes addNode & dropdown)
 * @param tabInfo
 * @returns
 */
export default function useVisibleRange(
  tabOffsets: TabOffsetMap,
  containerSize: ContainerSizeInfo,
  tabContentNodeSize: SizeInfo,
  addNodeSize: SizeInfo,
  operationNodeSize: SizeInfo,
  { tabs, tabPosition, rtl }: { tabs: Tab[] } & TabNavListProps,
): [number, number] {
  let unit: 0 | 1;
  let position: 'left' | 'top' | 'right';
  let transformSize: number;

  if (['top', 'bottom'].includes(tabPosition)) {
    unit = 0;
    position = rtl ? 'right' : 'left';
    transformSize = Math.abs(containerSize[2]);
  } else {
    unit = 1;
    position = 'top';
    transformSize = -containerSize[3];
  }

  const basicSize = containerSize[unit];
  const tabContentSize = tabContentNodeSize[unit];
  const addSize = addNodeSize[unit];

  let mergedBasicSize = basicSize;
  if (tabContentSize + addSize > basicSize && tabContentSize < basicSize) {
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
