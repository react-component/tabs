import React from 'react';
import createReactClass from 'create-react-class';
import classnames from 'classnames';
import InkTabBarMixin from './InkTabBarMixin';
import SwipeableTabBarMixin from './SwipeableTabBarMixin';
import TabBarMixin from './TabBarMixin';

const SwipeableInkTabBar = createReactClass({
  displayName: 'SwipeableInkTabBar',

  mixins: [TabBarMixin, InkTabBarMixin, SwipeableTabBarMixin],

  getSwipeableTabs() {
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
          onClick: this.onTabClick.bind(this, key),
        };
      }
      const refProps = {};
      if (activeKey === key) {
        refProps.ref = 'activeTab';
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
  },

  render() {
    const inkBarNode = this.getInkBarNode();
    const tabs = this.getSwipeableTabs();
    const scrollbarNode = this.getSwipeBarNode([inkBarNode, tabs]);
    return this.getRootNode(scrollbarNode);
  },
});

export default SwipeableInkTabBar;
