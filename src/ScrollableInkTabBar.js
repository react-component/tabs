/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import InkTabBarNode from './InkTabBarNode';
import TabBarTabsNode from './TabBarTabsNode';
import TabBarRootNode from './TabBarRootNode';
import ScrollableTabBarNode from './ScrollableTabBarNode';
import SaveRef from './SaveRef';

export default class ScrollableInkTabBar extends React.Component {
  render() {
    const { children: renderTabBarNode, ...restProps } = this.props;

    return (
      <SaveRef>
        {(saveRef, getRef) => (
          <TabBarRootNode saveRef={saveRef} getRef={getRef} {...restProps}>
            <ScrollableTabBarNode saveRef={saveRef} getRef={getRef} {...restProps}>
              <TabBarTabsNode
                saveRef={saveRef}
                renderTabBarNode={renderTabBarNode}
                {...restProps}
              />
              <InkTabBarNode saveRef={saveRef} getRef={getRef} {...restProps} />
            </ScrollableTabBarNode>
          </TabBarRootNode>
        )}
      </SaveRef>
    );
  }
}