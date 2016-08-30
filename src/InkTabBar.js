import React from 'react';
import InkTabBarMixin from './InkTabBarMixin';
import TabBarMixin from './TabBarMixin';

const InkTabBar = React.createClass({
  mixins: [TabBarMixin, InkTabBarMixin],
  render() {
    const inkBarNode = this.getInkBarNode();
    const tabs = this.getTabs();
    return this.getRootNode([inkBarNode, tabs]);
  },
});

export default InkTabBar;
