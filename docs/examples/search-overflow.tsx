import React, { useState, useMemo } from 'react';
import Tabs from '../../src';
import type { TabsProps, PopupRender } from '../../src';
import Menu, { MenuItem as MenuItemNode } from '@rc-component/menu';

const items: TabsProps['items'] = [];

for (let i = 0; i < 15; i += 1) {
  items.push({ key: String(i), label: `Tab ${i + 1}`, children: `Content of ${i}` });
}

export default () => {
  const [activeKey, setActiveKey] = useState('0');
  const [searchValue, setSearchValue] = useState('');

  // popupRender 回调：使用 info.tabs 重新渲染菜单
  const popupRender: PopupRender = (menu, { tabs, activeKey: selectedKey, onClose }) => {
    // 过滤 tabs
    const filteredTabs = useMemo(() => {
      if (!searchValue) return tabs;
      return tabs.filter(tab =>
        String(tab.label).toLowerCase().includes(searchValue.toLowerCase()),
      );
    }, [tabs, searchValue]);

    // 检查当前 activeKey 是否在过滤后的列表中
    const isActiveKeyInFiltered = filteredTabs.some(t => t.key === selectedKey);
    const selectedKeys = isActiveKeyInFiltered ? [selectedKey] : [];

    return (
      <div style={{ padding: '8px' }}>
        <input
          placeholder="搜索 Tab..."
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          style={{
            width: '100%',
            padding: '4px 8px',
            marginBottom: '8px',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            outline: 'none',
            boxSizing: 'border-box',
          }}
          onClick={e => e.stopPropagation()}
        />
        <Menu
          selectedKeys={selectedKeys}
          onClick={({ key }) => {
            setActiveKey(key);
            onClose();
          }}
        >
          {filteredTabs.map(tab => (
            <MenuItemNode key={tab.key} disabled={tab.disabled}>
              {tab.label}
            </MenuItemNode>
          ))}
        </Menu>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: 550 }}>
      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        items={items}
        more={{
          popupRender,
        }}
      />
    </div>
  );
};
