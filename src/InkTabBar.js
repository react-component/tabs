import React from 'react';
import createReactClass from 'create-react-class';
import InkTabBarMixin from './InkTabBarMixin';
import TabBarMixin from './TabBarMixin';

const InkTabBar = createReactClass({
  mixins: [TabBarMixin, InkTabBarMixin],
  render() {
    const inkBarNode = this.getInkBarNode();
    const tabs = this.getTabs();
    return this.getRootNode([inkBarNode, tabs]);
  },
});

export default InkTabBar;
