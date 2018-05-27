import React from 'react';
import InkTabBarNode from './InkTabBarNode';
import TabBarTabsNode from './TabBarTabsNode';
import TabBarRootNode from './TabBarRootNode';
import ScrollableTabBarNode from './ScrollableTabBarNode';

export default class ScrollableInkTabBar extends React.Component {
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
          <InkTabBarNode saveRef={this.saveRef} getRef={this.getRef} {...this.props} />
          <TabBarTabsNode saveRef={this.saveRef} {...this.props} />
        </ScrollableTabBarNode>
      </TabBarRootNode>
    );
  }
}
