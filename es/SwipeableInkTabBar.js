import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import React from 'react';
import createReactClass from 'create-react-class';
import classnames from 'classnames';
import InkTabBarMixin from './InkTabBarMixin';
import SwipeableTabBarMixin from './SwipeableTabBarMixin';
import TabBarMixin from './TabBarMixin';
import RefMixin from './RefMixin';

var SwipeableInkTabBar = createReactClass({
  displayName: 'SwipeableInkTabBar',

  mixins: [RefMixin, TabBarMixin, InkTabBarMixin, SwipeableTabBarMixin],

  getSwipeableTabs: function getSwipeableTabs() {
    var _this = this;

    var props = this.props;
    var children = props.panels;
    var activeKey = props.activeKey;
    var rst = [];
    var prefixCls = props.prefixCls;

    var _flexWidth = 1 / props.pageSize * 100 + '%';
    var tabStyle = {
      WebkitFlexBasis: _flexWidth,
      flexBasis: _flexWidth
    };

    React.Children.forEach(children, function (child) {
      var _classnames;

      if (!child) {
        return;
      }
      var key = child.key;
      var cls = classnames(prefixCls + '-tab', (_classnames = {}, _defineProperty(_classnames, prefixCls + '-tab-active', activeKey === key), _defineProperty(_classnames, prefixCls + '-tab-disabled', child.props.disabled), _classnames));
      var events = {};
      if (!child.props.disabled) {
        events = {
          onClick: _this.onTabClick.bind(_this, key)
        };
      }
      var refProps = {};
      if (activeKey === key) {
        refProps.ref = _this.saveRef('activeTab');
      }
      rst.push(React.createElement(
        'div',
        _extends({
          role: 'tab',
          style: tabStyle,
          'aria-disabled': child.props.disabled ? 'true' : 'false',
          'aria-selected': activeKey === key ? 'true' : 'false'
        }, events, {
          className: cls,
          key: key
        }, refProps),
        child.props.tab
      ));
    });

    return rst;
  },
  render: function render() {
    var inkBarNode = this.getInkBarNode();
    var tabs = this.getSwipeableTabs();
    var scrollbarNode = this.getSwipeBarNode([inkBarNode, tabs]);
    return this.getRootNode(scrollbarNode);
  }
});

export default SwipeableInkTabBar;