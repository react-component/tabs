import * as React from 'react';
import classNames from 'classnames';
import { Tab } from '../interface';
import TabPane from './TabPane';

export interface TabPanelListProps {
  prefixCls: string;
  tabs: Tab[];
  activeKey: React.Key;
  id: string;
  animated?: boolean;
}

export default function TabPanelList({
  id,
  prefixCls,
  activeKey,
  tabs,
  animated,
}: TabPanelListProps) {
  return (
    <div
      className={classNames(`${prefixCls}-content`, animated && `${prefixCls}-content-animated`)}
    >
      {tabs.map(tab => {
        return (
          <TabPane
            prefixCls={prefixCls}
            id={id}
            active={tab.key === activeKey}
            key={tab.key}
            tab={tab}
          />
        );
      })}
    </div>
  );
}
