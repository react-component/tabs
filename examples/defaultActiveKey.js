webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(198);


/***/ },

/***/ 191:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _InkTabBarMixin = __webpack_require__(192);
	
	var _InkTabBarMixin2 = _interopRequireDefault(_InkTabBarMixin);
	
	var _ScrollableTabBarMixin = __webpack_require__(193);
	
	var _ScrollableTabBarMixin2 = _interopRequireDefault(_ScrollableTabBarMixin);
	
	var _TabBarMixin = __webpack_require__(194);
	
	var _TabBarMixin2 = _interopRequireDefault(_TabBarMixin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ScrollableInkTabBar = _react2.default.createClass({
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

/***/ 193:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classnames5 = __webpack_require__(185);
	
	var _classnames6 = _interopRequireDefault(_classnames5);
	
	var _utils = __webpack_require__(188);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
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
	          className: (0, _classnames6.default)((_classnames = {}, _defineProperty(_classnames, prefixCls + '-tab-prev', 1), _defineProperty(_classnames, prefixCls + '-tab-btn-disabled', !prev), _classnames))
	        },
	        _react2.default.createElement('span', { className: prefixCls + '-tab-prev-icon' })
	      );
	
	      nextButton = _react2.default.createElement(
	        'span',
	        {
	          onClick: next ? this.next : null,
	          unselectable: 'unselectable',
	          className: (0, _classnames6.default)((_classnames2 = {}, _defineProperty(_classnames2, prefixCls + '-tab-next', 1), _defineProperty(_classnames2, prefixCls + '-tab-btn-disabled', !next), _classnames2))
	        },
	        _react2.default.createElement('span', { className: prefixCls + '-tab-next-icon' })
	      );
	    }
	
	    var navClassName = prefixCls + '-nav';
	    var navClasses = (0, _classnames6.default)((_classnames3 = {}, _defineProperty(_classnames3, navClassName, true), _defineProperty(_classnames3, scrollAnimated ? navClassName + '-animated' : navClassName + '-no-animated', true), _classnames3));
	
	    return _react2.default.createElement(
	      'div',
	      {
	        className: (0, _classnames6.default)((_classnames4 = {}, _defineProperty(_classnames4, prefixCls + '-nav-container', 1), _defineProperty(_classnames4, prefixCls + '-nav-container-scrolling', showNextPrev), _classnames4)),
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

/***/ 198:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(34);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rcTabs = __webpack_require__(180);
	
	var _rcTabs2 = _interopRequireDefault(_rcTabs);
	
	var _TabContent = __webpack_require__(187);
	
	var _TabContent2 = _interopRequireDefault(_TabContent);
	
	var _ScrollableInkTabBar = __webpack_require__(191);
	
	var _ScrollableInkTabBar2 = _interopRequireDefault(_ScrollableInkTabBar);
	
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
	
	  PanelContent.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
	    console.log(this.props.id, 'componentWillReceiveProps');
	  };
	
	  PanelContent.prototype.render = function render() {
	    var _this2 = this;
	
	    var count = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // new Array(4) skip forEach ....
	    var els = count.map(function (c, i) {
	      return _react2.default.createElement(
	        'p',
	        { key: i },
	        _react2.default.createElement(
	          'button',
	          null,
	          _this2.props.id
	        )
	      );
	    });
	    return _react2.default.createElement(
	      'div',
	      { style: { height: 200, overflow: 'auto' } },
	      els
	    );
	  };
	
	  return PanelContent;
	}(_react2.default.Component);
	
	PanelContent.propTypes = {
	  id: _react2.default.PropTypes.number
	};
	
	var defaultTabKey = '2';
	
	var Component = _react2.default.createClass({
	  displayName: 'Component',
	  getInitialState: function getInitialState() {
	    return {
	      start: 0,
	      tabKey: defaultTabKey
	    };
	  },
	  onChange: function onChange(key) {
	    console.log('onChange ' + key);
	  },
	  onTabClick: function onTabClick(key) {
	    console.log('onTabClick ' + key);
	    this.setState({
	      tabKey: key
	    });
	  },
	  tick: function tick() {
	    this.setState({
	      start: this.state.start + 10
	    });
	  },
	  render: function render() {
	    var _this3 = this;
	
	    var start = this.state.start;
	    var disabled = true;
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'h1',
	        null,
	        'Simple Tabs'
	      ),
	      _react2.default.createElement(
	        'p',
	        null,
	        'current: ',
	        this.state.tabKey
	      ),
	      _react2.default.createElement(
	        _rcTabs2.default,
	        {
	          defaultActiveKey: defaultTabKey,
	          renderTabBar: function renderTabBar() {
	            return _react2.default.createElement(_ScrollableInkTabBar2.default, { onTabClick: _this3.onTabClick });
	          },
	          renderTabContent: function renderTabContent() {
	            return _react2.default.createElement(_TabContent2.default, null);
	          },
	          onChange: this.onChange
	        },
	        _react2.default.createElement(
	          _rcTabs.TabPane,
	          { tab: 'tab ' + start, key: '1' },
	          _react2.default.createElement(PanelContent, { id: start })
	        ),
	        _react2.default.createElement(
	          _rcTabs.TabPane,
	          { tab: 'tab ' + (start + 1), key: '2' },
	          _react2.default.createElement(PanelContent, { id: start + 1 })
	        ),
	        _react2.default.createElement(
	          _rcTabs.TabPane,
	          { tab: 'tab ' + (start + 2), key: '3', disabled: disabled },
	          _react2.default.createElement(PanelContent, { id: start + 2 })
	        ),
	        _react2.default.createElement(
	          _rcTabs.TabPane,
	          { tab: 'tab ' + (start + 3), key: '4' },
	          _react2.default.createElement(PanelContent, { id: start + 3 })
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

/***/ }

});
//# sourceMappingURL=defaultActiveKey.js.map