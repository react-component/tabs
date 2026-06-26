import React, { useState } from 'react';
import '../../assets/index.less';
import Tabs from '../../src';

// Controlled mode example
const ControlledDemo = ({ items }: { items: any[] }) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Tabs
      activeKey="1"
      onChange={() => {}}
      items={items}
      more={{
        showSearch: {
          placeholder: 'Controlled search...',
          searchValue,
          onSearch: setSearchValue,
        },
      }}
    />
  );
};

export default () => {
  const [activeKey, setActiveKey] = useState('1');

  // Generate many tabs to trigger the "more" button
  const items = Array.from({ length: 30 }, (_, i) => ({
    key: String(i + 1),
    label: `Tab ${i + 1}`,
    children: `Content of Tab ${i + 1}`,
  }));

  return (
    <div>
      <h3>Basic Usage</h3>
      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        items={items}
        more={{
          showSearch: {
            placeholder: 'Search...',
          },
        }}
      />

      <h3>Controlled Mode</h3>
      <ControlledDemo items={items} />

      <h3>Keep Search Value on Close</h3>
      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        items={items}
        more={{
          showSearch: {
            placeholder: 'Keep search value',
            autoClearSearchValue: false,
          },
        }}
      />
    </div>
  );
};
