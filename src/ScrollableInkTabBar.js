import React from 'react';
import InkTabBarNode from './InkTabBarNode';
import TabBarTabsNode from './TabBarTabsNode';
import TabBarRootNode from './TabBarRootNode';
import ScrollableTabBarNode from './ScrollableTabBarNode';
import SaveRef from './SaveRef';

export default class ScrollableInkTabBar extends React.Component {
  render() {
    return (
      <SaveRef>
        {(saveRef, getRef) => (
          <TabBarRootNode saveRef={saveRef} {...this.props}>
            <ScrollableTabBarNode saveRef={saveRef} getRef={getRef} {...this.props}>
              <TabBarTabsNode saveRef={saveRef} {...this.props} />
              <InkTabBarNode saveRef={saveRef} getRef={getRef} {...this.props} />
            </ScrollableTabBarNode>
          </TabBarRootNode>
        )}
      </SaveRef>
    );
  }
}
