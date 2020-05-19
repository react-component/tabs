import * as React from 'react';
import { TabPaneProps } from './sugar/TabPane';

export interface TabListProps {
  id: string;
  tabs: TabPaneProps[];
  activeKey: React.Key;
  onTabClick: (activeKey: React.Key) => void;
}

export default function TabList({ id, activeKey, tabs, onTabClick }: TabListProps) {
  return (
    <div role="tablist" aria-label="Sample Tabs">
      {tabs.map(({ key, tab }) => (
        <button
          key={key}
          type="button"
          role="tab"
          aria-selected={key === activeKey}
          aria-controls={id && `${id}-${key}`}
          tabIndex={0}
          onClick={() => {
            onTabClick(key);
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
