import { useMemo } from 'react';
import { TabSizeMap, TabOffsetMap, Direction, Tab } from '../interface';

export default function useOffsets(tabs: Tab[], tabSizes: TabSizeMap) {
  return useMemo(() => {
    const map: TabOffsetMap = new Map();

    function loop(direction: Direction) {
      let start: number;
      let end: number;
      let min: number;
      let max: number;
      let step: number;
      const len = tabs.length - 1;

      if (direction === 'left' || direction === 'top') {
        start = 0;
        end = len;
        min = start;
        max = end;
        step = 1;
      } else {
        start = len;
        end = 0;
        step = -1;
        min = end;
        max = start;
      }

      let total = 0;
      for (let i = start; min <= i && i <= max; i += step) {
        const { key } = tabs[i];
        const data = tabSizes.get(key) || { width: 0, height: 0 };

        const entity = map.get(key) || { ...data };
        map.set(key, entity as any);
        entity[direction] = total;

        total += data[direction === 'left' || direction === 'right' ? 'width' : 'height'];
      }
    }

    loop('left');
    loop('right');
    loop('top');
    loop('bottom');

    return map;
  }, [tabs.map(tab => tab.key).join('_'), tabSizes]);
}
