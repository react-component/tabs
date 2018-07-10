import React from 'react';
import ScrollableTabBarNode from './ScrollableTabBarNode';
import TabBarRootNode from './TabBarRootNode';
import TabBarTabsNode from './TabBarTabsNode';
import SaveRef from './SaveRef';

export default class ScrollableTabBar extends React.Component {
  render() {
    return (
      <SaveRef>
        {(saveRef, getRef) => (
          <TabBarRootNode saveRef={saveRef} {...this.props}>
            <ScrollableTabBarNode saveRef={saveRef} getRef={getRef} {...this.props}>
              <TabBarTabsNode saveRef={saveRef} {...this.props} />
            </ScrollableTabBarNode>
          </TabBarRootNode>
        )}
      </SaveRef>
    );
  }
}
