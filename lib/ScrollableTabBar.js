'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _ScrollableTabBarMixin = require('./ScrollableTabBarMixin');

var _ScrollableTabBarMixin2 = _interopRequireDefault(_ScrollableTabBarMixin);

var _TabBarMixin = require('./TabBarMixin');

var _TabBarMixin2 = _interopRequireDefault(_TabBarMixin);

var _RefMixin = require('./RefMixin');

var _RefMixin2 = _interopRequireDefault(_RefMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ScrollableTabBar = (0, _createReactClass2['default'])({
  displayName: 'ScrollableTabBar',
  mixins: [_RefMixin2['default'], _TabBarMixin2['default'], _ScrollableTabBarMixin2['default']],
  render: function render() {
    var inkBarNode = this.getInkBarNode();
    var tabs = this.getTabs();
    var scrollbarNode = this.getScrollBarNode([inkBarNode, tabs]);
    return this.getRootNode(scrollbarNode);
  }
});

exports['default'] = ScrollableTabBar;
module.exports = exports['default'];