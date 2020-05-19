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
    <div role="tablist">
      {tabs.map(({ key, tab }) => (
        <button
          key={key}
          type="button"
          role="tab"
          aria-selected={key === activeKey}
          id={id && `${id}-tab-${key}`}
          aria-controls={id && `${id}-panel-${key}`}
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
