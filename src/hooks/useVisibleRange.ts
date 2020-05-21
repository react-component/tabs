import { useMemo } from 'react';
import { TabSizeMap } from '../interface';
import { TabNavListProps } from '../TabNavList';

const DEFAULT_SIZE = { width: 0, height: 0 };

export default function useVisibleRange(
  tabsSizes: TabSizeMap,
  containerSize: { width: number; height: number },
  { tabs, activeKey, tabPosition }: TabNavListProps,
): [number, number] {
  const unit = ['top', 'bottom'].includes(tabPosition) ? 'width' : 'height';
  const basicSize = containerSize[unit];

  return useMemo(() => {
    // TODO: direction
    const activeIndex = tabs.findIndex(tab => tab.key === activeKey);

    // Get start index
    let restSize = basicSize;
    let startIndex = 0;
    for (let i = activeIndex; i >= 0; i -= 1) {
      const { key } = tabs[i];
      const size = (tabsSizes.get(key) || DEFAULT_SIZE)[unit];
      if (restSize < size) {
        break;
      }

      restSize -= size;
      startIndex = i;
    }

    // Get end index
    restSize = basicSize;
    let endIndex = startIndex;
    for (let i = startIndex; i < tabs.length; i += 1) {
      const { key } = tabs[i];
      const size = (tabsSizes.get(key) || DEFAULT_SIZE)[unit];
      if (restSize < size) {
        break;
      }

      restSize -= size;
      endIndex = i;
    }

    return [startIndex, endIndex];
  }, [activeKey, tabsSizes, basicSize, tabPosition, tabs.map(tab => tab.key).join('_')]);
}
