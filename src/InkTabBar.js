import React from 'react';
import PropTypes from 'prop-types';
import InkTabBarNode from './InkTabBarNode';
import TabBarTabsNode from './TabBarTabsNode';
import TabBarRootNode from './TabBarRootNode';
import SaveRef from './SaveRef';

export default class InkTabBar extends React.Component {
  render() {
    return (
      <SaveRef>
        {(saveRef, getRef) => (
          <TabBarRootNode saveRef={saveRef} {...this.props}>
            <TabBarTabsNode onTabClick={this.props.onTabClick} saveRef={saveRef} {...this.props} />
            <InkTabBarNode saveRef={saveRef} getRef={getRef} {...this.props} />
          </TabBarRootNode>
        )}
      </SaveRef>
    );
  }
}

InkTabBar.propTypes = {
  onTabClick: PropTypes.func,
};

InkTabBar.defaultProps = {
  onTabClick: () => {},
};
