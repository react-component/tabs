// zombieJ: To compatible with `renderTabBar` usage.

import * as React from 'react';
import type { TabNavListProps } from '.';
import TabNavList from '.';
import TabContext from '../TabContext';
import TabPane from '../TabPanelList/TabPane';

export type TabNavListWrapperProps = Required<Omit<TabNavListProps, 'children' | 'className'>> &
  TabNavListProps;

// We have to create a TabNavList components.
export default function TabNavListWrapper({ renderTabBar, ...restProps }: TabNavListWrapperProps) {
  const { tabs } = React.useContext(TabContext);

  if (renderTabBar) {
    const tabNavBarProps = {
      ...restProps,

      // Legacy support. We do not use this actually
      panes: tabs.map(({ label, key, ...restTabProps }) => (
        <TabPane tab={label} key={key} tabKey={key} {...restTabProps} />
      )),
    };

    return renderTabBar(tabNavBarProps, TabNavList);
  }

  return <TabNavList {...restProps} />;
}
