webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(195);


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

/***/ 195:
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
	
	/* eslint react/no-multi-comp:0, no-console:0, no-alert:0 */
	
	var index = 1;
	
	var Test = _react2.default.createClass({
	  displayName: 'Test',
	  getInitialState: function getInitialState() {
	    return {
	      tabs: [{
	        title: '初始',
	        content: '初始内容'
	      }],
	
	      activeKey: '初始'
	    };
	  },
	  onTabChange: function onTabChange(activeKey) {
	    this.setState({
	      activeKey: activeKey
	    });
	  },
	  construct: function construct() {
	    var _this = this;
	
	    var disabled = true;
	    return this.state.tabs.map(function (t) {
	      return _react2.default.createElement(
	        _rcTabs.TabPane,
	        {
	          tab: _react2.default.createElement(
	            'span',
	            null,
	            t.title,
	            _react2.default.createElement(
	              'a',
	              {
	                style: {
	                  position: 'absolute',
	                  cursor: 'pointer',
	                  color: 'red',
	                  right: 5,
	                  top: 0
	                },
	                onClick: _this.remove.bind(_this, t.title)
	              },
	              'x'
	            )
	          ),
	          key: t.title
	        },
	        _react2.default.createElement(
	          'div',
	          { style: { padding: 100 } },
	          t.content
	        )
	      );
	    }).concat([_react2.default.createElement(_rcTabs.TabPane, {
	      tab: _react2.default.createElement(
	        'a',
	        { style: { color: 'black', cursor: 'pointer' }, onClick: this.add },
	        ' + \u6DFB\u52A0'
	      ),
	      disabled: disabled,
	      key: '__add'
	    })]);
	  },
	  remove: function remove(title, e) {
	    e.stopPropagation();
	    if (this.state.tabs.length === 1) {
	      alert('只剩一个，不能删');
	      return;
	    }
	    var foundIndex = 0;
	    var after = this.state.tabs.filter(function (t, i) {
	      if (t.title !== title) {
	        return true;
	      }
	      foundIndex = i;
	      return false;
	    });
	    var activeKey = this.state.activeKey;
	    if (activeKey === title) {
	      if (foundIndex) {
	        foundIndex--;
	      }
	      activeKey = after[foundIndex].title;
	    }
	    this.setState({
	      tabs: after,
	      activeKey: activeKey
	    });
	  },
	  add: function add(e) {
	    e.stopPropagation();
	    index++;
	    var newTab = {
	      title: '\u540D\u79F0: ' + index,
	      content: '\u5185\u5BB9: ' + index
	    };
	    this.setState({
	      tabs: this.state.tabs.concat(newTab),
	      activeKey: '\u540D\u79F0: ' + index
	    });
	  },
	  render: function render() {
	    var _this2 = this;
	
	    var tabStyle = {
	      width: 500
	    };
	
	    return _react2.default.createElement(
	      'div',
	      { style: { margin: 20 } },
	      _react2.default.createElement(
	        'h2',
	        null,
	        'Addable Tabs'
	      ),
	      _react2.default.createElement(
	        'div',
	        { style: tabStyle },
	        _react2.default.createElement(
	          _rcTabs2.default,
	          {
	            renderTabBar: function renderTabBar() {
	              return _react2.default.createElement(_ScrollableInkTabBar2.default, {
	                extraContent: _react2.default.createElement(
	                  'button',
	                  { onClick: _this2.add },
	                  '+\u6DFB\u52A0'
	                )
	              });
	            },
	            renderTabContent: function renderTabContent() {
	              return _react2.default.createElement(_TabContent2.default, null);
	            },
	            activeKey: this.state.activeKey,
	            onChange: this.onTabChange
	          },
	          this.construct()
	        )
	      )
	    );
	  }
	});
	
	_reactDom2.default.render(_react2.default.createElement(Test, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=add.js.map