import React from 'react';
import PropTypes from 'prop-types';
import InkTabBarNode from './InkTabBarNode';
import TabBarTabsNode from './TabBarTabsNode';
import TabBarRootNode from './TabBarRootNode';

export default class InkTabBar extends React.Component {
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
        <InkTabBarNode saveRef={this.saveRef} getRef={this.getRef} {...this.props} />
        <TabBarTabsNode onTabClick={this.props.onTabClick} saveRef={this.saveRef} {...this.props} />
      </TabBarRootNode>
    );
  }
}

InkTabBar.propTypes = {
  onTabClick: PropTypes.func,
};

InkTabBar.defaultProps = {
  onTabClick: () => {},
};
