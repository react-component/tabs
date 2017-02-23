import React from 'react';
import SwipeableTabBarMixin from './SwipeableTabBarMixin';
import TabBarMixin from './TabBarMixin';


const SwipeableTabBar = React.createClass({
  mixins: [TabBarMixin, SwipeableTabBarMixin],
  render() {
    const tabs = this.getTabs();
    const swipebarNode = this.getSwipeBarNode(tabs);
    return this.getRootNode(swipebarNode);
  },
});

export default SwipeableTabBar;
