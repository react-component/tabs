import React from 'react';
import Tabs from '@rc-component/tabs';
import type { TabsProps } from '@rc-component/tabs';
import '../../assets/index.less';

const items: TabsProps['items'] = [];

for (let i = 0; i < 12; i += 1) {
  items.push({ key: String(i), label: `Tab ${i}`, children: `Content of ${i}` });
}

const positions: { label: string; value: TabsProps['scrollPosition'] }[] = [
  { label: 'auto', value: 'auto' },
  { label: 'start', value: 'start' },
  { label: 'center', value: 'center' },
  { label: 'end', value: 'end' },
  { label: '0.25', value: 0.25 },
];

export default () => {
  const [scrollPosition, setScrollPosition] = React.useState<TabsProps['scrollPosition']>('center');
  const [direction, setDirection] = React.useState<TabsProps['direction']>('ltr');
  const [tabPosition, setTabPosition] = React.useState<TabsProps['tabPosition']>('top');

  return (
    <div style={{ display: 'flex', gap: 24, minHeight: 320 }}>
      <div style={{ minWidth: 260 }}>
        <h3>scrollPosition</h3>
        {positions.map(({ label, value }) => (
          <label key={String(label)} style={{ display: 'block' }}>
            <input
              type="radio"
              checked={scrollPosition === value}
              onChange={() => setScrollPosition(value)}
            />
            {label}
          </label>
        ))}

        <h3>direction</h3>
        {(['ltr', 'rtl'] as const).map(d => (
          <label key={d} style={{ display: 'block' }}>
            <input type="radio" checked={direction === d} onChange={() => setDirection(d)} />
            {d}
          </label>
        ))}

        <h3>tabPosition</h3>
        {(['top', 'bottom', 'left', 'right'] as const).map(p => (
          <label key={p} style={{ display: 'block' }}>
            <input type="radio" checked={tabPosition === p} onChange={() => setTabPosition(p)} />
            {p}
          </label>
        ))}
      </div>

      <div style={{ flex: 1, maxWidth: 360 }} dir={direction}>
        <Tabs
          defaultActiveKey="6"
          items={items}
          scrollPosition={scrollPosition}
          direction={direction}
          tabPosition={tabPosition}
          style={{ maxHeight: 160 }}
        />
      </div>
    </div>
  );
};
