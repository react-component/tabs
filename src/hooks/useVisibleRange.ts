import * as React from 'react';
import { Direction, TabSizeMap } from '../interface';
import { TabNavListProps } from '../TabNavList';

const DEFAULT_SIZE = { width: 0, height: 0 };

export default function useVisibleRange(
  tabsSizes: TabSizeMap,
  containerWidth: number,
  { tabs, activeKey }: TabNavListProps,
): [number, number] {
  // TODO: direction
  const activeIndex = tabs.findIndex(tab => tab.key === activeKey);

  // Get start index
  let restWidth = containerWidth;
  let startIndex = 0;
  for (let i = activeIndex; i >= 0; i -= 1) {
    const { key } = tabs[i];
    const { width } = tabsSizes.get(key) || DEFAULT_SIZE;
    if (restWidth < width) {
      break;
    }

    restWidth -= width;
    startIndex = i;
  }

  // Get end index
  restWidth = containerWidth;
  let endIndex = startIndex;
  for (let i = startIndex; i < tabs.length; i += 1) {
    const { key } = tabs[i];
    const { width } = tabsSizes.get(key) || DEFAULT_SIZE;
    if (restWidth < width) {
      break;
    }

    restWidth -= width;
    endIndex = i;
  }

  return [startIndex, endIndex];
}
