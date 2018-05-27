import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class TabBarSwipeableTabs extends React.Component {
  render() {
    const props = this.props;
    const children = props.panels;
    const activeKey = props.activeKey;
    const rst = [];
    const prefixCls = props.prefixCls;

    const _flexWidth = `${1 / props.pageSize * 100}%`;
    const tabStyle = {
      WebkitFlexBasis: _flexWidth,
      flexBasis: _flexWidth,
    };

    React.Children.forEach(children, (child) => {
      if (!child) {
        return;
      }
      const key = child.key;
      const cls = classnames(`${prefixCls}-tab`, {
        [`${prefixCls}-tab-active`]: activeKey === key,
        [`${prefixCls}-tab-disabled`]: child.props.disabled,
      });
      let events = {};
      if (!child.props.disabled) {
        events = {
          onClick: this.props.onTabClick.bind(this, key),
        };
      }
      const refProps = {};
      if (activeKey === key) {
        refProps.ref = this.props.saveRef('activeTab');
      }
      rst.push(<div
        role="tab"
        style={tabStyle}
        aria-disabled={child.props.disabled ? 'true' : 'false'}
        aria-selected={activeKey === key ? 'true' : 'false'}
        {...events}
        className={cls}
        key={key}
        {...refProps}
      >
        {child.props.tab}
      </div>);
    });

    return rst;
  }
}

TabBarSwipeableTabs.propTypes = {
  pageSize: PropTypes.number,
  onTabClick: PropTypes.func,
  saveRef: PropTypes.func,
};

TabBarSwipeableTabs.defaultProps = {
  pageSize: 5,
  onTabClick: () => {},
  saveRef: () => {},
};
