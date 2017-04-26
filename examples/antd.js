webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(321);


/***/ },

/***/ 315:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createReactClass = __webpack_require__(302);
	
	var _createReactClass2 = _interopRequireDefault(_createReactClass);
	
	var _InkTabBarMixin = __webpack_require__(316);
	
	var _InkTabBarMixin2 = _interopRequireDefault(_InkTabBarMixin);
	
	var _ScrollableTabBarMixin = __webpack_require__(317);
	
	var _ScrollableTabBarMixin2 = _interopRequireDefault(_ScrollableTabBarMixin);
	
	var _TabBarMixin = __webpack_require__(318);
	
	var _TabBarMixin2 = _interopRequireDefault(_TabBarMixin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ScrollableInkTabBar = (0, _createReactClass2.default)({
	  displayName: 'ScrollableInkTabBar',
	  mixins: [_TabBarMixin2.default, _InkTabBarMixin2.default, _ScrollableTabBarMixin2.default],
	  render: function render() {
	    var inkBarNode = this.getInkBarNode();
	    var tabs = this.getTabs();
	    var scrollbarNode = this.getScrollBarNode([inkBarNode, tabs]);
	    return this.getRootNode(scrollbarNode);
	  }
	});
	
	exports.default = ScrollableInkTabBar;
	module.exports = exports['default'];

/***/ },

/***/ 317:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defineProperty2 = __webpack_require__(294);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _classnames5 = __webpack_require__(304);
	
	var _classnames6 = _interopRequireDefault(_classnames5);
	
	var _utils = __webpack_require__(311);
	
	var _react = __webpack_require__(81);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  getDefaultProps: function getDefaultProps() {
	    return {
	      scrollAnimated: true,
	      onPrevClick: function onPrevClick() {},
	      onNextClick: function onNextClick() {}
	    };
	  },
	  getInitialState: function getInitialState() {
	    this.offset = 0;
	    return {
	      next: false,
	      prev: false
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    this.componentDidUpdate();
	  },
	  componentDidUpdate: function componentDidUpdate(prevProps) {
	    var props = this.props;
	    if (prevProps && prevProps.tabBarPosition !== props.tabBarPosition) {
	      this.setOffset(0);
	      return;
	    }
	    var nextPrev = this.setNextPrev();
	    // wait next, prev show hide
	    /* eslint react/no-did-update-set-state:0 */
	    if (this.isNextPrevShown(this.state) !== this.isNextPrevShown(nextPrev)) {
	      this.setState({}, this.scrollToActiveTab);
	    } else {
	      // can not use props.activeKey
	      if (!prevProps || props.activeKey !== prevProps.activeKey) {
	        this.scrollToActiveTab();
	      }
	    }
	  },
	  setNextPrev: function setNextPrev() {
	    var navNode = this.refs.nav;
	    var navNodeWH = this.getOffsetWH(navNode);
	    var navWrapNode = this.refs.navWrap;
	    var navWrapNodeWH = this.getOffsetWH(navWrapNode);
	    var offset = this.offset;
	
	    var minOffset = navWrapNodeWH - navNodeWH;
	    var _state = this.state,
	        next = _state.next,
	        prev = _state.prev;
	
	    if (minOffset >= 0) {
	      next = false;
	      this.setOffset(0, false);
	      offset = 0;
	    } else if (minOffset < offset) {
	      next = true;
	    } else {
	      next = false;
	      this.setOffset(minOffset, false);
	      offset = minOffset;
	    }
	
	    if (offset < 0) {
	      prev = true;
	    } else {
	      prev = false;
	    }
	
	    this.setNext(next);
	    this.setPrev(prev);
	    return {
	      next: next,
	      prev: prev
	    };
	  },
	  getOffsetWH: function getOffsetWH(node) {
	    var tabBarPosition = this.props.tabBarPosition;
	    var prop = 'offsetWidth';
	    if (tabBarPosition === 'left' || tabBarPosition === 'right') {
	      prop = 'offsetHeight';
	    }
	    return node[prop];
	  },
	  getOffsetLT: function getOffsetLT(node) {
	    var tabBarPosition = this.props.tabBarPosition;
	    var prop = 'left';
	    if (tabBarPosition === 'left' || tabBarPosition === 'right') {
	      prop = 'top';
	    }
	    return node.getBoundingClientRect()[prop];
	  },
	  setOffset: function setOffset(offset) {
	    var checkNextPrev = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	
	    var target = Math.min(0, offset);
	    if (this.offset !== target) {
	      this.offset = target;
	      var navOffset = {};
	      var tabBarPosition = this.props.tabBarPosition;
	      var navStyle = this.refs.nav.style;
	      var transformSupported = (0, _utils.isTransformSupported)(navStyle);
	      if (tabBarPosition === 'left' || tabBarPosition === 'right') {
	        if (transformSupported) {
	          navOffset = {
	            value: 'translate3d(0,' + target + 'px,0)'
	          };
	        } else {
	          navOffset = {
	            name: 'top',
	            value: target + 'px'
	          };
	        }
	      } else {
	        if (transformSupported) {
	          navOffset = {
	            value: 'translate3d(' + target + 'px,0,0)'
	          };
	        } else {
	          navOffset = {
	            name: 'left',
	            value: target + 'px'
	          };
	        }
	      }
	      if (transformSupported) {
	        (0, _utils.setTransform)(navStyle, navOffset.value);
	      } else {
	        navStyle[navOffset.name] = navOffset.value;
	      }
	      if (checkNextPrev) {
	        this.setNextPrev();
	      }
	    }
	  },
	  setPrev: function setPrev(v) {
	    if (this.state.prev !== v) {
	      this.setState({
	        prev: v
	      });
	    }
	  },
	  setNext: function setNext(v) {
	    if (this.state.next !== v) {
	      this.setState({
	        next: v
	      });
	    }
	  },
	  isNextPrevShown: function isNextPrevShown(state) {
	    return state.next || state.prev;
	  },
	  scrollToActiveTab: function scrollToActiveTab() {
	    var _refs = this.refs,
	        activeTab = _refs.activeTab,
	        navWrap = _refs.navWrap;
	
	    if (activeTab) {
	      var activeTabWH = this.getOffsetWH(activeTab);
	      var navWrapNodeWH = this.getOffsetWH(navWrap);
	      var offset = this.offset;
	
	      var wrapOffset = this.getOffsetLT(navWrap);
	      var activeTabOffset = this.getOffsetLT(activeTab);
	      if (wrapOffset > activeTabOffset) {
	        offset += wrapOffset - activeTabOffset;
	        this.setOffset(offset);
	      } else if (wrapOffset + navWrapNodeWH < activeTabOffset + activeTabWH) {
	        offset -= activeTabOffset + activeTabWH - (wrapOffset + navWrapNodeWH);
	        this.setOffset(offset);
	      }
	    }
	  },
	  prev: function prev(e) {
	    this.props.onPrevClick(e);
	    var navWrapNode = this.refs.navWrap;
	    var navWrapNodeWH = this.getOffsetWH(navWrapNode);
	    var offset = this.offset;
	
	    this.setOffset(offset + navWrapNodeWH);
	  },
	  next: function next(e) {
	    this.props.onNextClick(e);
	    var navWrapNode = this.refs.navWrap;
	    var navWrapNodeWH = this.getOffsetWH(navWrapNode);
	    var offset = this.offset;
	
	    this.setOffset(offset - navWrapNodeWH);
	  },
	  getScrollBarNode: function getScrollBarNode(content) {
	    var _classnames3, _classnames4;
	
	    var _state2 = this.state,
	        next = _state2.next,
	        prev = _state2.prev;
	    var _props = this.props,
	        prefixCls = _props.prefixCls,
	        scrollAnimated = _props.scrollAnimated;
	
	    var nextButton = void 0;
	    var prevButton = void 0;
	    var showNextPrev = prev || next;
	
	    if (showNextPrev) {
	      var _classnames, _classnames2;
	
	      prevButton = _react2.default.createElement(
	        'span',
	        {
	          onClick: prev ? this.prev : null,
	          unselectable: 'unselectable',
	          className: (0, _classnames6.default)((_classnames = {}, (0, _defineProperty3.default)(_classnames, prefixCls + '-tab-prev', 1), (0, _defineProperty3.default)(_classnames, prefixCls + '-tab-btn-disabled', !prev), _classnames))
	        },
	        _react2.default.createElement('span', { className: prefixCls + '-tab-prev-icon' })
	      );
	
	      nextButton = _react2.default.createElement(
	        'span',
	        {
	          onClick: next ? this.next : null,
	          unselectable: 'unselectable',
	          className: (0, _classnames6.default)((_classnames2 = {}, (0, _defineProperty3.default)(_classnames2, prefixCls + '-tab-next', 1), (0, _defineProperty3.default)(_classnames2, prefixCls + '-tab-btn-disabled', !next), _classnames2))
	        },
	        _react2.default.createElement('span', { className: prefixCls + '-tab-next-icon' })
	      );
	    }
	
	    var navClassName = prefixCls + '-nav';
	    var navClasses = (0, _classnames6.default)((_classnames3 = {}, (0, _defineProperty3.default)(_classnames3, navClassName, true), (0, _defineProperty3.default)(_classnames3, scrollAnimated ? navClassName + '-animated' : navClassName + '-no-animated', true), _classnames3));
	
	    return _react2.default.createElement(
	      'div',
	      {
	        className: (0, _classnames6.default)((_classnames4 = {}, (0, _defineProperty3.default)(_classnames4, prefixCls + '-nav-container', 1), (0, _defineProperty3.default)(_classnames4, prefixCls + '-nav-container-scrolling', showNextPrev), _classnames4)),
	        key: 'container',
	        ref: 'container'
	      },
	      prevButton,
	      nextButton,
	      _react2.default.createElement(
	        'div',
	        { className: prefixCls + '-nav-wrap', ref: 'navWrap' },
	        _react2.default.createElement(
	          'div',
	          { className: prefixCls + '-nav-scroll' },
	          _react2.default.createElement(
	            'div',
	            { className: navClasses, ref: 'nav' },
	            content
	          )
	        )
	      )
	    );
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 321:
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
	
	var _reactDom = __webpack_require__(112);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rcTabs = __webpack_require__(291);
	
	var _rcTabs2 = _interopRequireDefault(_rcTabs);
	
	var _TabContent = __webpack_require__(305);
	
	var _TabContent2 = _interopRequireDefault(_TabContent);
	
	var _ScrollableInkTabBar = __webpack_require__(315);
	
	var _ScrollableInkTabBar2 = _interopRequireDefault(_ScrollableInkTabBar);
	
	var _InkTabBar = __webpack_require__(322);
	
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
	}(_react2.default.Component); /* eslint react/no-multi-comp:0, no-console:0, react/prop-types:0 */
	
	
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
	
	var Demo = function (_React$Component2) {
	  (0, _inherits3.default)(Demo, _React$Component2);
	
	  function Demo() {
	    var _temp, _this2, _ret;
	
	    (0, _classCallCheck3.default)(this, Demo);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this2 = (0, _possibleConstructorReturn3.default)(this, _React$Component2.call.apply(_React$Component2, [this].concat(args))), _this2), _this2.state = {
	      tabBarPosition: 'top',
	      activeKey: '3',
	      start: 0
	    }, _this2.onChange = function (key) {
	      console.log('onChange ' + key);
	    }, _this2.onChange2 = function (activeKey) {
	      _this2.setState({ activeKey: activeKey });
	    }, _this2.onTabClick = function (key) {
	      console.log('onTabClick ' + key);
	    }, _this2.tick = function () {
	      _this2.setState({
	        start: _this2.state.start + 10
	      });
	    }, _this2.changeTabPosition = function (e) {
	      _this2.setState({
	        tabBarPosition: e.target.value
	      });
	    }, _this2.scrollToActive = function () {
	      _this2.bar.scrollToActiveTab();
	    }, _this2.switchToLast = function (ends) {
	      if (_this2.state.activeKey !== ends[ends.length - 1].key) {
	        _this2.setState({ activeKey: ends[ends.length - 1].key }, _this2.scrollToActive);
	      } else {
	        _this2.scrollToActive();
	      }
	    }, _this2.saveBar = function (bar) {
	      _this2.bar = bar;
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this2, _ret);
	  }
	
	  Demo.prototype.render = function render() {
	    var _this3 = this;
	
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
	              return _react2.default.createElement(_InkTabBar2.default, { onTabClick: _this3.onTabClick });
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
	          { onClick: function onClick() {
	              return _this3.switchToLast(ends);
	            } },
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
	                ref: _this3.saveBar,
	                onTabClick: _this3.onTabClick
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
	  };
	
	  return Demo;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ },

/***/ 322:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createReactClass = __webpack_require__(302);
	
	var _createReactClass2 = _interopRequireDefault(_createReactClass);
	
	var _InkTabBarMixin = __webpack_require__(316);
	
	var _InkTabBarMixin2 = _interopRequireDefault(_InkTabBarMixin);
	
	var _TabBarMixin = __webpack_require__(318);
	
	var _TabBarMixin2 = _interopRequireDefault(_TabBarMixin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var InkTabBar = (0, _createReactClass2.default)({
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