import { useMemo } from 'react';
import { Tab, TabOffsetMap } from '../interface';
import { TabNavListProps } from '../TabNavList';

const DEFAULT_SIZE = { width: 0, height: 0, left: 0, top: 0 };

export default function useVisibleRange(
  tabOffsets: TabOffsetMap,
  containerSize: { width: number; height: number; optWidth: number; optHeight: number },
  { tabs, activeKey, tabPosition, rtl }: { tabs: Tab[] } & TabNavListProps,
): [number, number] {
  let unit: 'width' | 'height';
  let optUnit: 'optWidth' | 'optHeight';
  let position: 'left' | 'top' | 'right';

  if (['top', 'bottom'].includes(tabPosition)) {
    unit = 'width';
    optUnit = 'optWidth';
    position = rtl ? 'right' : 'left';
  } else {
    unit = 'height';
    optUnit = 'optHeight';
    position = 'top';
  }

  const holderSize = containerSize[unit];
  const optSize = containerSize[optUnit];
  const basicSize = holderSize - optSize;

  return useMemo(() => {
    let activeIndex = tabs.findIndex(tab => tab.key === activeKey);
    if (activeIndex === -1) {
      activeIndex = 0;
    }

    if (!tabs.length) {
      return [0, 0];
    }

    const activeTab = tabs[activeIndex];
    const activeOffset = tabOffsets.get(activeTab.key);

    // Get start index
    const minPosition = activeOffset[position] - (basicSize - activeOffset[unit]);
    let startIndex = 0;
    for (let i = activeIndex; i >= 0; i -= 1) {
      const { key } = tabs[i];
      const offset = tabOffsets.get(key) || DEFAULT_SIZE;

      if (offset[position] < minPosition) {
        break;
      }

      startIndex = i;
    }

    // Get end index
    let endIndex = 0;
    const startPosition = tabOffsets.get(tabs[startIndex].key)[position];
    for (let i = activeIndex; i < tabs.length; i += 1) {
      const { key } = tabs[i];
      const offset = tabOffsets.get(key) || DEFAULT_SIZE;

      if (offset[position] + offset[unit] > startPosition + basicSize) {
        break;
      }

      endIndex = i;
    }

    return [startIndex, endIndex];
  }, [activeKey, tabOffsets, basicSize, tabPosition, tabs.map(tab => tab.key).join('_'), rtl]);
}
