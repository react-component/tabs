import type { ScrollPosition } from '@/interface';
import React from 'react';
import '../../assets/index.less';
import type { TabsProps } from '../../src';
import Tabs from '../../src';

const items: TabsProps['items'] = [];
for (let i = 0; i < 50; i += 1) {
  items.push({
    key: String(i),
    label: `Tab ${i}`,
    children: `Content of ${i}`,
  });
}
export default () => {
  const [scrollPosition, setScrollPosition] = React.useState<ScrollPosition>('end');

  return (
    <>
      <div style={{ marginBottom: 10, display: 'flex', gap: 10 }}>
        <label>
          Start
          <input
            type="radio"
            name="scrollPosition"
            value="start"
            checked={scrollPosition === 'start'}
            onChange={e => setScrollPosition(e.target.value as ScrollPosition)}
          />
        </label>
        <label>
          Center
          <input
            type="radio"
            name="scrollPosition"
            value="center"
            checked={scrollPosition === 'center'}
            onChange={e => setScrollPosition(e.target.value as ScrollPosition)}
          />
        </label>
        <label>
          End
          <input
            type="radio"
            name="scrollPosition"
            value="end"
            checked={scrollPosition === 'end'}
            onChange={e => setScrollPosition(e.target.value as ScrollPosition)}
          />
        </label>
        <label>
          Auto
          <input
            type="radio"
            name="scrollPosition"
            value="auto"
            checked={scrollPosition === 'auto'}
            onChange={e => setScrollPosition(e.target.value as ScrollPosition)}
          />
        </label>
      </div>
      <div style={{ maxWidth: 550 }}>
        <Tabs items={items} scrollPosition={scrollPosition} />
      </div>

      <div style={{ maxHeight: 550 }}>
        <Tabs
          style={{ height: 550 }}
          items={items}
          scrollPosition={scrollPosition}
          tabPosition="left"
        />
      </div>
    </>
  );
};
