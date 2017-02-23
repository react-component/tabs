import React from 'react';
import InkTabBarMixin from './InkTabBarMixin';
import SwipeableTabBarMixin from './SwipeableTabBarMixin';
import TabBarMixin from './TabBarMixin';

const SwipeableInkTabBar = React.createClass({
  mixins: [TabBarMixin, InkTabBarMixin, SwipeableTabBarMixin],

  render() {
    const inkBarNode = this.getInkBarNode();
    const tabs = this.getTabs();
    const scrollbarNode = this.getSwipeBarNode([inkBarNode, tabs]);
    return this.getRootNode(scrollbarNode);
  },
});

export default SwipeableInkTabBar;
