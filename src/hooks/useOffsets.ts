import { useMemo } from 'react';
import { TabSizeMap, TabOffsetMap, Tab, TabOffset } from '../interface';

export default function useOffsets(tabs: Tab[], tabSizes: TabSizeMap, holderScrollWidth: number) {
  return useMemo(() => {
    const map: TabOffsetMap = new Map();

    for (let i = 0; i < tabs.length; i += 1) {
      const { key } = tabs[i];
      const data = tabSizes.get(key) || { width: 0, height: 0, left: 0, top: 0 };
      const entity = (map.get(key) || { ...data }) as TabOffset;

      // Right
      entity.right = holderScrollWidth - (entity.left + entity.width);

      // Update entity
      map.set(key, entity);
    }

    return map;
  }, [tabs.map(tab => tab.key).join('_'), tabSizes, holderScrollWidth]);
}
