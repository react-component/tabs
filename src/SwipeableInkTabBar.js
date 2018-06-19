import React from 'react';
import SwipeableTabBarNode from './SwipeableTabBarNode';
import TabBarSwipeableTabs from './TabBarSwipeableTabs';
import TabBarRootNode from './TabBarRootNode';
import InkTabBarNode from './InkTabBarNode';
import SaveRef from './SaveRef';

export default class SwipeableInkTabBar extends React.Component {
  render() {
    return (
      <SaveRef>
        {(saveRef, getRef) => (
          <TabBarRootNode saveRef={saveRef} {...this.props}>
            <SwipeableTabBarNode saveRef={saveRef} getRef={getRef} {...this.props}>
              <TabBarSwipeableTabs saveRef={saveRef} {...this.props} />
              <InkTabBarNode saveRef={saveRef} getRef={getRef} {...this.props} />
            </SwipeableTabBarNode>
          </TabBarRootNode>
        )}
      </SaveRef>
    );
  }
}
