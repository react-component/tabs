import React from 'react';
import ScrollableTabBarNode from './ScrollableTabBarNode';
import TabBarRootNode from './TabBarRootNode';
import TabBarTabsNode from './TabBarTabsNode';

export default class ScrollableTabBar extends React.Component {
  getRef = (name) => {
    return this[name];
  }

  saveRef = (name) => {
    return (node) => {
      if (node) {
        this[name] = node;
      }
    };
  }

  render() {
    return (
      <TabBarRootNode saveRef={this.saveRef} {...this.props}>
        <ScrollableTabBarNode saveRef={this.saveRef} getRef={this.getRef} {...this.props}>
          <TabBarTabsNode saveRef={this.saveRef} {...this.props} />
        </ScrollableTabBarNode>
      </TabBarRootNode>
    );
  }
}
