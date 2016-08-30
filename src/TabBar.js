import React from 'react';
import TabBarMixin from './TabBarMixin';

const TabBar = React.createClass({
  mixins: [TabBarMixin],
  render() {
    const tabs = this.getTabs();
    return this.getRootNode(tabs);
  },
});

export default TabBar;
