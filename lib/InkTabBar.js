'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _InkTabBarMixin = require('./InkTabBarMixin');

var _InkTabBarMixin2 = _interopRequireDefault(_InkTabBarMixin);

var _TabBarMixin = require('./TabBarMixin');

var _TabBarMixin2 = _interopRequireDefault(_TabBarMixin);

var _RefMixin = require('./RefMixin');

var _RefMixin2 = _interopRequireDefault(_RefMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var InkTabBar = (0, _createReactClass2['default'])({
  displayName: 'InkTabBar',
  mixins: [_RefMixin2['default'], _TabBarMixin2['default'], _InkTabBarMixin2['default']],
  render: function render() {
    var inkBarNode = this.getInkBarNode();
    var tabs = this.getTabs();
    return this.getRootNode([inkBarNode, tabs]);
  }
});

exports['default'] = InkTabBar;
module.exports = exports['default'];