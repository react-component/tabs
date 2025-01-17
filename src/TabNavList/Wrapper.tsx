// zombieJ: To compatible with `renderTabBar` usage.

import * as React from 'react';
import type { TabNavListProps } from '.';
import TabNavList from '.';
  
export type TabNavListWrapperProps = Required<Omit<TabNavListProps, 'children' | 'className'>> &
  TabNavListProps;

// We have to create a TabNavList components.
const TabNavListWrapper: React.FC<TabNavListWrapperProps> = ({ renderTabBar, ...restProps }) => {
  if (renderTabBar) {
    return renderTabBar(restProps, TabNavList);
  }

  return <TabNavList {...restProps} />;
};

if (process.env.NODE_ENV !== 'production') {
  TabNavListWrapper.displayName = 'TabNavListWrapper';
}

export default TabNavListWrapper;
