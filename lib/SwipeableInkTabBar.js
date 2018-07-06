'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _InkTabBarMixin = require('./InkTabBarMixin');

var _InkTabBarMixin2 = _interopRequireDefault(_InkTabBarMixin);

var _SwipeableTabBarMixin = require('./SwipeableTabBarMixin');

var _SwipeableTabBarMixin2 = _interopRequireDefault(_SwipeableTabBarMixin);

var _TabBarMixin = require('./TabBarMixin');

var _TabBarMixin2 = _interopRequireDefault(_TabBarMixin);

var _RefMixin = require('./RefMixin');

var _RefMixin2 = _interopRequireDefault(_RefMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var SwipeableInkTabBar = (0, _createReactClass2['default'])({
  displayName: 'SwipeableInkTabBar',

  mixins: [_RefMixin2['default'], _TabBarMixin2['default'], _InkTabBarMixin2['default'], _SwipeableTabBarMixin2['default']],

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

    _react2['default'].Children.forEach(children, function (child) {
      var _classnames;

      if (!child) {
        return;
      }
      var key = child.key;
      var cls = (0, _classnames3['default'])(prefixCls + '-tab', (_classnames = {}, (0, _defineProperty3['default'])(_classnames, prefixCls + '-tab-active', activeKey === key), (0, _defineProperty3['default'])(_classnames, prefixCls + '-tab-disabled', child.props.disabled), _classnames));
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
      rst.push(_react2['default'].createElement(
        'div',
        (0, _extends3['default'])({
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

exports['default'] = SwipeableInkTabBar;
module.exports = exports['default'];