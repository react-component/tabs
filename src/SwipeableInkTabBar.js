import React from 'react';
import SwipeableTabBarNode from './SwipeableTabBarNode';
import TabBarSwipeableTabs from './TabBarSwipeableTabs';
import TabBarRootNode from './TabBarRootNode';
import InkTabBarNode from './InkTabBarNode';

export default class SwipeableInkTabBar extends React.Component {
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
        <SwipeableTabBarNode saveRef={this.saveRef} getRef={this.getRef} {...this.props}>
          <InkTabBarNode saveRef={this.saveRef} getRef={this.getRef} {...this.props} />
          <TabBarSwipeableTabs saveRef={this.saveRef} {...this.props} />
        </SwipeableTabBarNode>
      </TabBarRootNode>
    );
  }
}
