import React from 'react';
import classnames from 'classnames';

export default class TabBarSwipeableTabs extends React.Component {
  render() {
    const { props } = this;
    const children = props.panels;
    const { activeKey } = props;
    const rst = [];
    const { prefixCls } = props;

    const _flexWidth = `${(1 / props.pageSize) * 100}%`;
    const tabStyle = {
      WebkitFlexBasis: _flexWidth,
      flexBasis: _flexWidth,
    };

    React.Children.forEach(children, child => {
      if (!child) {
        return;
      }
      const { key } = child;
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
      const id = this.props.id ? `${key}-${this.props.id}` : key;
      rst.push(
        <div
          role="tab"
          style={tabStyle}
          aria-disabled={child.props.disabled ? 'true' : 'false'}
          aria-selected={activeKey === key ? 'true' : 'false'}
          tabIndex={activeKey === key ? 0 : -1}
          {...events}
          className={cls}
          key={key}
          id={`tab-${id}`}
          aria-controls={`tabpane-${id}`}
          {...refProps}
        >
          {child.props.tab}
        </div>,
      );
    });

    return rst;
  }
}

TabBarSwipeableTabs.defaultProps = {
  pageSize: 5,
  onTabClick: () => {},
  saveRef: () => {},
};
