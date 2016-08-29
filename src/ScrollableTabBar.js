import React from 'react';
import ScrollableTabBarMixin from './ScrollableTabBarMixin';
import TabBarMixin from './TabBarMixin';

const ScrollableTabBar = React.createClass({
  mixins:[TabBarMixin, ScrollableTabBarMixin],
  render(){
    const inkBarNode = this.getInkBarNode();
    const tabs = this.getTabs();
    const scrollbarNode = this.getScrollBarNode([inkBarNode, tabs]);
    return this.getRootNode(scrollbarNode);
  }
});

export default ScrollableTabBar;
