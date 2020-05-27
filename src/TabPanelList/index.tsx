import * as React from 'react';
import classNames from 'classnames';
import TabPane from './TabPane';
import TabContext from '../TabContext';
import { TabPosition, AnimatedConfig } from '../interface';

export interface TabPanelListProps {
  activeKey: React.Key;
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
          tabPaneAnimated ? { [rtl ? 'marginRight' : 'marginLeft']: `-${activeIndex}00%` } : null
        }
      >
        {tabs.map(tab => {
          return (
            <TabPane
              prefixCls={prefixCls}
              id={id}
              animated={tabPaneAnimated}
              destroyInactiveTabPane={destroyInactiveTabPane}
              active={tab.key === activeKey}
              key={tab.key}
              tab={tab}
            />
          );
        })}
      </div>
    </div>
  );
}
