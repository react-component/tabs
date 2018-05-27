import React from 'react';
import TabBarRootNode from './TabBarRootNode';
import TabBarTabsNode from './TabBarTabsNode';

export default class TabBar1 extends React.Component {
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
        <TabBarTabsNode saveRef={this.saveRef} {...this.props} />
      </TabBarRootNode>
    );
  }
}
