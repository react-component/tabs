import * as React from 'react';
import classNames from 'classnames';
import TabContext from '../TabContext';
import type { TabPosition, AnimatedConfig } from '../interface';
import TabPane from './TabPane';

export interface TabPanelListProps {
  activeKey: string;
  id: string;
  rtl: boolean;
  animated?: AnimatedConfig;
  tabPosition?: TabPosition;
  destroyInactiveTabPane?: boolean;
}

export default function TabPanelList({
  id,
  activeKey,
  animated,
  tabPosition,
  rtl,
  destroyInactiveTabPane,
}: TabPanelListProps) {
  const { prefixCls, tabs } = React.useContext(TabContext);
  const tabPaneAnimated = animated.tabPane;

  const activeIndex = tabs.findIndex(tab => tab.key === activeKey);

  return (
    <div className={classNames(`${prefixCls}-content-holder`)}>
      <div
        className={classNames(`${prefixCls}-content`, `${prefixCls}-content-${tabPosition}`, {
          [`${prefixCls}-content-animated`]: tabPaneAnimated,
        })}
        style={
          activeIndex && tabPaneAnimated
            ? { [rtl ? 'marginRight' : 'marginLeft']: `-${activeIndex}00%` }
            : null
        }
      >
        {tabs.map(tab => (
          <TabPane
            {...tab}
            prefixCls={prefixCls}
            id={id}
            tabKey={tab.key}
            animated={tabPaneAnimated}
            active={tab.key === activeKey}
            destroyInactiveTabPane={destroyInactiveTabPane}
            key={tab.key}
          />
        ))}
      </div>
    </div>
  );
}
