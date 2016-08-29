import React from 'react';
import InkTabBarMixin from './InkTabBarMixin';
import ScrollableTabBarMixin from './ScrollableTabBarMixin';
import TabBarMixin from './TabBarMixin';

const DefaultTabBar = React.createClass({
  mixins:[TabBarMixin, InkTabBarMixin, ScrollableTabBarMixin],

  render(){
    const inkBarNode = this.getInkBarNode();
    const tabs = this.getTabs();
    const scrollbarNode = this.getScrollBarNode([inkBarNode, tabs]);
    return this.getRootNode(scrollbarNode);
  }
});

export default DefaultTabBar;
