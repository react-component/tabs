webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(190);


/***/ },

/***/ 190:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(36);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rcTabs = __webpack_require__(174);
	
	var _rcTabs2 = _interopRequireDefault(_rcTabs);
	
	var _TabContent = __webpack_require__(181);
	
	var _TabContent2 = _interopRequireDefault(_TabContent);
	
	var _ScrollableInkTabBar = __webpack_require__(185);
	
	var _ScrollableInkTabBar2 = _interopRequireDefault(_ScrollableInkTabBar);
	
	var _InkTabBar = __webpack_require__(191);
	
	var _InkTabBar2 = _interopRequireDefault(_InkTabBar);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); } /* eslint react/no-multi-comp:0, no-console:0 */
	
	var PanelContent = function (_React$Component) {
	  _inherits(PanelContent, _React$Component);
	
	  function PanelContent(props) {
	    _classCallCheck(this, PanelContent);
	
	    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));
	
	    console.log(_this.props.id, 'constructor');
	    return _this;
	  }
	
	  PanelContent.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    console.log(nextProps.id, 'componentWillReceiveProps');
	  };
	
	  PanelContent.prototype.render = function render() {
	    var length = Math.round(10 * Math.random() + 4);
	    var count = new Array(length); // new Array(4) skip forEach ....
	    for (var i = 0; i < length; i++) {
	      count[i] = 1;
	    }
	    var content = new Array(Math.round(100 * Math.random()) + 4).join(' ' + this.props.id);
	    var els = count.map(function (c, i) {
	      return _react2.default.createElement(
	        'p',
	        { key: i },
	        content
	      );
	    });
	    return _react2.default.createElement(
	      'div',
	      null,
	      els
	    );
	  };
	
	  return PanelContent;
	}(_react2.default.Component);
	
	PanelContent.propTypes = {
	  id: _react2.default.PropTypes.number
	};
	
	function construct(start, num) {
	  var ends = [];
	  var index = 1;
	  for (var i = start; i < start + num; i++) {
	    ends.push(_react2.default.createElement(
	      _rcTabs.TabPane,
	      {
	        placeholder: 'loading ' + i,
	        tab: 'tab ' + i,
	        disabled: !!(i % 2),
	        key: index
	      },
	      _react2.default.createElement(PanelContent, { id: i })
	    ));
	    index++;
	  }
	  return ends;
	}
	
	var Component = _react2.default.createClass({
	  displayName: 'Component',
	  getInitialState: function getInitialState() {
	    return {
	      tabBarPosition: 'top',
	      activeKey: '3',
	      start: 0
	    };
	  },
	  onChange: function onChange(key) {
	    console.log('onChange ' + key);
	  },
	  onChange2: function onChange2(activeKey) {
	    this.setState({ activeKey: activeKey });
	  },
	  onTabClick: function onTabClick(key) {
	    console.log('onTabClick ' + key);
	  },
	  tick: function tick() {
	    this.setState({
	      start: this.state.start + 10
	    });
	  },
	  changeTabPosition: function changeTabPosition(e) {
	    this.setState({
	      tabBarPosition: e.target.value
	    });
	  },
	  scrollToActive: function scrollToActive() {
	    this.bar.scrollToActiveTab();
	  },
	  switchToLast: function switchToLast(ends) {
	    if (this.state.activeKey !== ends[ends.length - 1].key) {
	      this.setState({ activeKey: ends[ends.length - 1].key }, this.scrollToActive);
	    } else {
	      this.scrollToActive();
	    }
	  },
	  saveBar: function saveBar(bar) {
	    this.bar = bar;
	  },
	  render: function render() {
	    var _this2 = this;
	
	    var start = this.state.start;
	    var ends = construct(start, 9);
	    var ends2 = construct(start, 3);
	    var tabBarPosition = this.state.tabBarPosition;
	    var style = void 0;
	    var contentStyle = void 0;
	    contentStyle = {
	      height: 400
	    };
	    if (tabBarPosition === 'left' || tabBarPosition === 'right') {
	      style = contentStyle;
	    } else {
	      style = {
	        width: 500
	      };
	    }
	
	    return _react2.default.createElement(
	      'div',
	      { style: { margin: 20 } },
	      _react2.default.createElement(
	        'h2',
	        null,
	        'Simple Tabs'
	      ),
	      _react2.default.createElement(
	        'p',
	        null,
	        'tabBarPosition:',
	        _react2.default.createElement(
	          'select',
	          { value: this.state.tabBarPosition, onChange: this.changeTabPosition },
	          _react2.default.createElement(
	            'option',
	            { value: 'top' },
	            'top'
	          ),
	          _react2.default.createElement(
	            'option',
	            { value: 'bottom' },
	            'bottom'
	          ),
	          _react2.default.createElement(
	            'option',
	            { value: 'left' },
	            'left'
	          ),
	          _react2.default.createElement(
	            'option',
	            { value: 'right' },
	            'right'
	          )
	        )
	      ),
	      _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          _rcTabs2.default,
	          {
	            defaultActiveKey: '3',
	            style: style,
	            tabBarPosition: this.state.tabBarPosition,
	            renderTabBar: function renderTabBar() {
	              return _react2.default.createElement(_InkTabBar2.default, { onTabClick: _this2.onTabClick });
	            },
	            renderTabContent: function renderTabContent() {
	              return _react2.default.createElement(_TabContent2.default, { style: contentStyle });
	            },
	            onChange: this.onChange
	          },
	          ends2
	        )
	      ),
	      _react2.default.createElement(
	        'h2',
	        null,
	        'Scroll Tabs'
	      ),
	      _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'button',
	          {
	            onClick: function onClick() {
	              return _this2.switchToLast(ends);
	            }
	          },
	          'switch to last tab'
	        ),
	        _react2.default.createElement(
	          _rcTabs2.default,
	          {
	            activeKey: this.state.activeKey,
	            style: style,
	            tabBarPosition: this.state.tabBarPosition,
	            renderTabBar: function renderTabBar() {
	              return _react2.default.createElement(_ScrollableInkTabBar2.default, {
	                ref: _this2.saveBar,
	                onTabClick: _this2.onTabClick
	              });
	            },
	            renderTabContent: function renderTabContent() {
	              return _react2.default.createElement(_TabContent2.default, { style: contentStyle });
	            },
	            onChange: this.onChange2
	          },
	          ends
	        )
	      ),
	      _react2.default.createElement(
	        'button',
	        { onClick: this.tick },
	        'rerender'
	      )
	    );
	  }
	});
	
	_reactDom2.default.render(_react2.default.createElement(Component, null), document.getElementById('__react-content'));

/***/ },

/***/ 191:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _InkTabBarMixin = __webpack_require__(186);
	
	var _InkTabBarMixin2 = _interopRequireDefault(_InkTabBarMixin);
	
	var _TabBarMixin = __webpack_require__(188);
	
	var _TabBarMixin2 = _interopRequireDefault(_TabBarMixin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var InkTabBar = _react2.default.createClass({
	  displayName: 'InkTabBar',
	
	  mixins: [_TabBarMixin2.default, _InkTabBarMixin2.default],
	  render: function render() {
	    var inkBarNode = this.getInkBarNode();
	    var tabs = this.getTabs();
	    return this.getRootNode([inkBarNode, tabs]);
	  }
	});
	
	exports.default = InkTabBar;
	module.exports = exports['default'];

/***/ }

});
//# sourceMappingURL=antd.js.map