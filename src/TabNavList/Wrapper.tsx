// zombieJ: To compatible with `renderTabBar` usage.

import TabNavList from '.';
import type { TabNavListProps } from '.';
import { useContext } from 'react';
import TabContext from '../TabContext';
import { TabPane } from '..';

export type TabNavListWrapperProps = Required<Omit<TabNavListProps, 'children' | 'className'>> &
  TabNavListProps;

// We have to create a TabNavList components.
export default function TabNavListWrapper({ renderTabBar, ...restProps }: TabNavListWrapperProps) {
  const { tabs } = useContext(TabContext);

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
