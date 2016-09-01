webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(277);


/***/ },

/***/ 2:
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _typeof2 = __webpack_require__(4);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	
	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },

/***/ 72:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _setPrototypeOf = __webpack_require__(73);
	
	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
	
	var _create = __webpack_require__(77);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _typeof2 = __webpack_require__(4);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }
	
	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },

/***/ 73:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(74), __esModule: true };

/***/ },

/***/ 74:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(75);
	module.exports = __webpack_require__(15).Object.setPrototypeOf;

/***/ },

/***/ 75:
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(13);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(76).set});

/***/ },

/***/ 76:
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(21)
	  , anObject = __webpack_require__(20);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(16)(Function.call, __webpack_require__(68).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },

/***/ 77:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(78), __esModule: true };

/***/ },

/***/ 78:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(79);
	var $Object = __webpack_require__(15).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },

/***/ 79:
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(13)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(32)});

/***/ },

/***/ 277:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(3);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(72);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	__webpack_require__(80);
	
	var _react = __webpack_require__(81);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(114);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rcTabs = __webpack_require__(252);
	
	var _rcTabs2 = _interopRequireDefault(_rcTabs);
	
	var _TabContent = __webpack_require__(268);
	
	var _TabContent2 = _interopRequireDefault(_TabContent);
	
	var _ScrollableInkTabBar = __webpack_require__(272);
	
	var _ScrollableInkTabBar2 = _interopRequireDefault(_ScrollableInkTabBar);
	
	var _InkTabBar = __webpack_require__(278);
	
	var _InkTabBar2 = _interopRequireDefault(_InkTabBar);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var PanelContent = function (_React$Component) {
	  (0, _inherits3.default)(PanelContent, _React$Component);
	
	  function PanelContent(props) {
	    (0, _classCallCheck3.default)(this, PanelContent);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));
	
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
	}(_react2.default.Component); /* eslint react/no-multi-comp:0, no-console:0 */
	
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

/***/ 278:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(81);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _InkTabBarMixin = __webpack_require__(273);
	
	var _InkTabBarMixin2 = _interopRequireDefault(_InkTabBarMixin);
	
	var _TabBarMixin = __webpack_require__(275);
	
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