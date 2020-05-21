import * as React from 'react';
import classNames from 'classnames';
import TabPane from './TabPane';
import TabContext from '../TabContext';

export interface TabPanelListProps {
  activeKey: React.Key;
  id: string;
  animated?: boolean;
}

export default function TabPanelList({
  id,
  activeKey,
  animated,
}: TabPanelListProps) {
  const { prefixCls, tabs } = React.useContext(TabContext);

  const activeIndex = tabs.findIndex(tab => tab.key === activeKey);

  return (
    <div
      className={classNames(`${prefixCls}-content`, animated && `${prefixCls}-content-animated`)}
      style={{ marginLeft: `-${activeIndex}00%` }}
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
