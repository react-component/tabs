webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (process.env.NODE_ENV !== 'production') {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 12 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(24);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(13);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_warning__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_prop_types__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils__ = __webpack_require__(9);











var TabBarTabsNode = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(TabBarTabsNode, _React$Component);

  function TabBarTabsNode() {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, TabBarTabsNode);

    return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (TabBarTabsNode.__proto__ || Object.getPrototypeOf(TabBarTabsNode)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(TabBarTabsNode, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.panels,
          activeKey = _props.activeKey,
          prefixCls = _props.prefixCls,
          tabBarGutter = _props.tabBarGutter,
          saveRef = _props.saveRef,
          tabBarPosition = _props.tabBarPosition,
          renderTabBarNode = _props.renderTabBarNode,
          direction = _props.direction;

      var rst = [];

      __WEBPACK_IMPORTED_MODULE_6_react___default.a.Children.forEach(children, function (child, index) {
        if (!child) {
          return;
        }
        var key = child.key;
        var cls = activeKey === key ? prefixCls + '-tab-active' : '';
        cls += ' ' + prefixCls + '-tab';
        var events = {};
        if (child.props.disabled) {
          cls += ' ' + prefixCls + '-tab-disabled';
        } else {
          events = {
            onClick: _this2.props.onTabClick.bind(_this2, key)
          };
        }
        var ref = {};
        if (activeKey === key) {
          ref.ref = saveRef('activeTab');
        }

        var gutter = tabBarGutter && index === children.length - 1 ? 0 : tabBarGutter;

        var marginProperty = direction === 'rtl' ? 'marginLeft' : 'marginRight';
        var style = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()({}, Object(__WEBPACK_IMPORTED_MODULE_9__utils__["k" /* isVertical */])(tabBarPosition) ? 'marginBottom' : marginProperty, gutter);
        __WEBPACK_IMPORTED_MODULE_7_warning___default()('tab' in child.props, 'There must be `tab` property on children of Tabs.');

        var node = __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          'div',
          __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
            role: 'tab',
            'aria-disabled': child.props.disabled ? 'true' : 'false',
            'aria-selected': activeKey === key ? 'true' : 'false'
          }, events, {
            className: cls,
            key: key,
            style: style
          }, ref),
          child.props.tab
        );

        if (renderTabBarNode) {
          node = renderTabBarNode(node);
        }

        rst.push(node);
      });

      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        'div',
        { ref: saveRef('navTabsContainer') },
        rst
      );
    }
  }]);

  return TabBarTabsNode;
}(__WEBPACK_IMPORTED_MODULE_6_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (TabBarTabsNode);


TabBarTabsNode.propTypes = {
  activeKey: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.string,
  panels: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.node,
  prefixCls: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.string,
  tabBarGutter: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.number,
  onTabClick: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func,
  saveRef: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func,
  renderTabBarNode: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func,
  tabBarPosition: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.string,
  direction: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.string
};

TabBarTabsNode.defaultProps = {
  panels: [],
  prefixCls: [],
  tabBarGutter: null,
  onTabClick: function onTabClick() {},
  saveRef: function saveRef() {}
};

/***/ }),
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_classnames__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash_debounce__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash_debounce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_lodash_debounce__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_resize_observer_polyfill__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__utils__ = __webpack_require__(9);












var ScrollableTabBarNode = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(ScrollableTabBarNode, _React$Component);

  function ScrollableTabBarNode(props) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, ScrollableTabBarNode);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (ScrollableTabBarNode.__proto__ || Object.getPrototypeOf(ScrollableTabBarNode)).call(this, props));

    _this.prevTransitionEnd = function (e) {
      if (e.propertyName !== 'opacity') {
        return;
      }
      var container = _this.props.getRef('container');
      _this.scrollToActiveTab({
        target: container,
        currentTarget: container
      });
    };

    _this.scrollToActiveTab = function (e) {
      var activeTab = _this.props.getRef('activeTab');
      var navWrap = _this.props.getRef('navWrap');
      if (e && e.target !== e.currentTarget || !activeTab) {
        return;
      }

      // when not scrollable or enter scrollable first time, don't emit scrolling
      var needToSroll = _this.isNextPrevShown() && _this.lastNextPrevShown;
      _this.lastNextPrevShown = _this.isNextPrevShown();
      if (!needToSroll) {
        return;
      }

      var activeTabWH = _this.getScrollWH(activeTab);
      var navWrapNodeWH = _this.getOffsetWH(navWrap);
      var offset = _this.offset;

      var wrapOffset = _this.getOffsetLT(navWrap);
      var activeTabOffset = _this.getOffsetLT(activeTab);
      if (wrapOffset > activeTabOffset) {
        offset += wrapOffset - activeTabOffset;
        _this.setOffset(offset);
      } else if (wrapOffset + navWrapNodeWH < activeTabOffset + activeTabWH) {
        offset -= activeTabOffset + activeTabWH - (wrapOffset + navWrapNodeWH);
        _this.setOffset(offset);
      }
    };

    _this.prev = function (e) {
      _this.props.onPrevClick(e);
      var navWrapNode = _this.props.getRef('navWrap');
      var navWrapNodeWH = _this.getOffsetWH(navWrapNode);
      var offset = _this.offset;

      _this.setOffset(offset + navWrapNodeWH);
    };

    _this.next = function (e) {
      _this.props.onNextClick(e);
      var navWrapNode = _this.props.getRef('navWrap');
      var navWrapNodeWH = _this.getOffsetWH(navWrapNode);
      var offset = _this.offset;

      _this.setOffset(offset - navWrapNodeWH);
    };

    _this.offset = 0;

    _this.state = {
      next: false,
      prev: false
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(ScrollableTabBarNode, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.componentDidUpdate();
      this.debouncedResize = __WEBPACK_IMPORTED_MODULE_8_lodash_debounce___default()(function () {
        _this2.setNextPrev();
        _this2.scrollToActiveTab();
      }, 200);
      this.resizeObserver = new __WEBPACK_IMPORTED_MODULE_9_resize_observer_polyfill__["a" /* default */](this.debouncedResize);
      this.resizeObserver.observe(this.props.getRef('container'));
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
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
      } else if (!prevProps || props.activeKey !== prevProps.activeKey) {
        // can not use props.activeKey
        this.scrollToActiveTab();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
      if (this.debouncedResize && this.debouncedResize.cancel) {
        this.debouncedResize.cancel();
      }
    }
  }, {
    key: 'setNextPrev',
    value: function setNextPrev() {
      var navNode = this.props.getRef('nav');
      var navTabsContainer = this.props.getRef('navTabsContainer');
      var navNodeWH = this.getScrollWH(navTabsContainer || navNode);
      // Add 1px to fix `offsetWidth` with decimal in Chrome not correct handle
      // https://github.com/ant-design/ant-design/issues/13423
      var containerWH = this.getOffsetWH(this.props.getRef('container')) + 1;
      var navWrapNodeWH = this.getOffsetWH(this.props.getRef('navWrap'));
      var offset = this.offset;

      var minOffset = containerWH - navNodeWH;
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
        // Fix https://github.com/ant-design/ant-design/issues/8861
        // Test with container offset which is stable
        // and set the offset of the nav wrap node
        var realOffset = navWrapNodeWH - navNodeWH;
        this.setOffset(realOffset, false);
        offset = realOffset;
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
    }
  }, {
    key: 'getOffsetWH',
    value: function getOffsetWH(node) {
      var tabBarPosition = this.props.tabBarPosition;
      var prop = 'offsetWidth';
      if (tabBarPosition === 'left' || tabBarPosition === 'right') {
        prop = 'offsetHeight';
      }
      return node[prop];
    }
  }, {
    key: 'getScrollWH',
    value: function getScrollWH(node) {
      var tabBarPosition = this.props.tabBarPosition;
      var prop = 'scrollWidth';
      if (tabBarPosition === 'left' || tabBarPosition === 'right') {
        prop = 'scrollHeight';
      }
      return node[prop];
    }
  }, {
    key: 'getOffsetLT',
    value: function getOffsetLT(node) {
      var tabBarPosition = this.props.tabBarPosition;
      var prop = 'left';
      if (tabBarPosition === 'left' || tabBarPosition === 'right') {
        prop = 'top';
      }
      return node.getBoundingClientRect()[prop];
    }
  }, {
    key: 'setOffset',
    value: function setOffset(offset) {
      var checkNextPrev = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var target = Math.min(0, offset);
      if (this.offset !== target) {
        this.offset = target;
        var navOffset = {};
        var tabBarPosition = this.props.tabBarPosition;
        var navStyle = this.props.getRef('nav').style;
        var transformSupported = Object(__WEBPACK_IMPORTED_MODULE_10__utils__["j" /* isTransform3dSupported */])(navStyle);
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
        } else if (transformSupported) {
          if (this.props.direction === 'rtl') {
            target = -target;
          }
          navOffset = {
            value: 'translate3d(' + target + 'px,0,0)'
          };
        } else {
          navOffset = {
            name: 'left',
            value: target + 'px'
          };
        }
        if (transformSupported) {
          Object(__WEBPACK_IMPORTED_MODULE_10__utils__["m" /* setTransform */])(navStyle, navOffset.value);
        } else {
          navStyle[navOffset.name] = navOffset.value;
        }
        if (checkNextPrev) {
          this.setNextPrev();
        }
      }
    }
  }, {
    key: 'setPrev',
    value: function setPrev(v) {
      if (this.state.prev !== v) {
        this.setState({
          prev: v
        });
      }
    }
  }, {
    key: 'setNext',
    value: function setNext(v) {
      if (this.state.next !== v) {
        this.setState({
          next: v
        });
      }
    }
  }, {
    key: 'isNextPrevShown',
    value: function isNextPrevShown(state) {
      if (state) {
        return state.next || state.prev;
      }
      return this.state.next || this.state.prev;
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames, _classnames2, _classnames3, _classnames4;

      var _state2 = this.state,
          next = _state2.next,
          prev = _state2.prev;
      var _props = this.props,
          prefixCls = _props.prefixCls,
          scrollAnimated = _props.scrollAnimated,
          navWrapper = _props.navWrapper,
          prevIcon = _props.prevIcon,
          nextIcon = _props.nextIcon;

      var showNextPrev = prev || next;

      var prevButton = __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'span',
        {
          onClick: prev ? this.prev : null,
          unselectable: 'unselectable',
          className: __WEBPACK_IMPORTED_MODULE_7_classnames___default()((_classnames = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classnames, prefixCls + '-tab-prev', 1), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classnames, prefixCls + '-tab-btn-disabled', !prev), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classnames, prefixCls + '-tab-arrow-show', showNextPrev), _classnames)),
          onTransitionEnd: this.prevTransitionEnd
        },
        prevIcon || __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('span', { className: prefixCls + '-tab-prev-icon' })
      );

      var nextButton = __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'span',
        {
          onClick: next ? this.next : null,
          unselectable: 'unselectable',
          className: __WEBPACK_IMPORTED_MODULE_7_classnames___default()((_classnames2 = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classnames2, prefixCls + '-tab-next', 1), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classnames2, prefixCls + '-tab-btn-disabled', !next), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classnames2, prefixCls + '-tab-arrow-show', showNextPrev), _classnames2))
        },
        nextIcon || __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('span', { className: prefixCls + '-tab-next-icon' })
      );

      var navClassName = prefixCls + '-nav';
      var navClasses = __WEBPACK_IMPORTED_MODULE_7_classnames___default()((_classnames3 = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classnames3, navClassName, true), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classnames3, scrollAnimated ? navClassName + '-animated' : navClassName + '-no-animated', true), _classnames3));

      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        {
          className: __WEBPACK_IMPORTED_MODULE_7_classnames___default()((_classnames4 = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classnames4, prefixCls + '-nav-container', 1), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classnames4, prefixCls + '-nav-container-scrolling', showNextPrev), _classnames4)),
          key: 'container',
          ref: this.props.saveRef('container')
        },
        prevButton,
        nextButton,
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'div',
          { className: prefixCls + '-nav-wrap', ref: this.props.saveRef('navWrap') },
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'div',
            { className: prefixCls + '-nav-scroll' },
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              'div',
              { className: navClasses, ref: this.props.saveRef('nav') },
              navWrapper(this.props.children)
            )
          )
        )
      );
    }
  }]);

  return ScrollableTabBarNode;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (ScrollableTabBarNode);


ScrollableTabBarNode.propTypes = {
  activeKey: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string,
  getRef: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func.isRequired,
  saveRef: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func.isRequired,
  tabBarPosition: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.oneOf(['left', 'right', 'top', 'bottom']),
  prefixCls: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string,
  scrollAnimated: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  onPrevClick: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  onNextClick: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  navWrapper: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  children: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.node,
  prevIcon: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.node,
  nextIcon: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.node,
  direction: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.node
};

ScrollableTabBarNode.defaultProps = {
  tabBarPosition: 'left',
  prefixCls: '',
  scrollAnimated: true,
  onPrevClick: function onPrevClick() {},
  onNextClick: function onNextClick() {},
  navWrapper: function navWrapper(ele) {
    return ele;
  }
};

/***/ }),
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(12),
    now = __webpack_require__(23),
    toNumber = __webpack_require__(25);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(13);

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(12),
    isSymbol = __webpack_require__(26);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(27),
    isObjectLike = __webpack_require__(30);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(14),
    getRawTag = __webpack_require__(28),
    objectToString = __webpack_require__(29);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(14);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 29 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 30 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */
/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = (function () {
    if (typeof Map !== 'undefined') {
        return Map;
    }
    /**
     * Returns index in provided array that matches the specified key.
     *
     * @param {Array<Array>} arr
     * @param {*} key
     * @returns {number}
     */
    function getIndex(arr, key) {
        var result = -1;
        arr.some(function (entry, index) {
            if (entry[0] === key) {
                result = index;
                return true;
            }
            return false;
        });
        return result;
    }
    return /** @class */ (function () {
        function class_1() {
            this.__entries__ = [];
        }
        Object.defineProperty(class_1.prototype, "size", {
            /**
             * @returns {boolean}
             */
            get: function () {
                return this.__entries__.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {*} key
         * @returns {*}
         */
        class_1.prototype.get = function (key) {
            var index = getIndex(this.__entries__, key);
            var entry = this.__entries__[index];
            return entry && entry[1];
        };
        /**
         * @param {*} key
         * @param {*} value
         * @returns {void}
         */
        class_1.prototype.set = function (key, value) {
            var index = getIndex(this.__entries__, key);
            if (~index) {
                this.__entries__[index][1] = value;
            }
            else {
                this.__entries__.push([key, value]);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.delete = function (key) {
            var entries = this.__entries__;
            var index = getIndex(entries, key);
            if (~index) {
                entries.splice(index, 1);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.has = function (key) {
            return !!~getIndex(this.__entries__, key);
        };
        /**
         * @returns {void}
         */
        class_1.prototype.clear = function () {
            this.__entries__.splice(0);
        };
        /**
         * @param {Function} callback
         * @param {*} [ctx=null]
         * @returns {void}
         */
        class_1.prototype.forEach = function (callback, ctx) {
            if (ctx === void 0) { ctx = null; }
            for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
                var entry = _a[_i];
                callback.call(ctx, entry[1], entry[0]);
            }
        };
        return class_1;
    }());
})();

/**
 * Detects whether window and document objects are available in current environment.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

// Returns global object of a current environment.
var global$1 = (function () {
    if (typeof global !== 'undefined' && global.Math === Math) {
        return global;
    }
    if (typeof self !== 'undefined' && self.Math === Math) {
        return self;
    }
    if (typeof window !== 'undefined' && window.Math === Math) {
        return window;
    }
    // eslint-disable-next-line no-new-func
    return Function('return this')();
})();

/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */
var requestAnimationFrame$1 = (function () {
    if (typeof requestAnimationFrame === 'function') {
        // It's required to use a bounded function because IE sometimes throws
        // an "Invalid calling object" error if rAF is invoked without the global
        // object on the left hand side.
        return requestAnimationFrame.bind(global$1);
    }
    return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
})();

// Defines minimum timeout before adding a trailing call.
var trailingTimeout = 2;
/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */
function throttle (callback, delay) {
    var leadingCall = false, trailingCall = false, lastCallTime = 0;
    /**
     * Invokes the original callback function and schedules new invocation if
     * the "proxy" was called during current request.
     *
     * @returns {void}
     */
    function resolvePending() {
        if (leadingCall) {
            leadingCall = false;
            callback();
        }
        if (trailingCall) {
            proxy();
        }
    }
    /**
     * Callback invoked after the specified delay. It will further postpone
     * invocation of the original function delegating it to the
     * requestAnimationFrame.
     *
     * @returns {void}
     */
    function timeoutCallback() {
        requestAnimationFrame$1(resolvePending);
    }
    /**
     * Schedules invocation of the original function.
     *
     * @returns {void}
     */
    function proxy() {
        var timeStamp = Date.now();
        if (leadingCall) {
            // Reject immediately following calls.
            if (timeStamp - lastCallTime < trailingTimeout) {
                return;
            }
            // Schedule new call to be in invoked when the pending one is resolved.
            // This is important for "transitions" which never actually start
            // immediately so there is a chance that we might miss one if change
            // happens amids the pending invocation.
            trailingCall = true;
        }
        else {
            leadingCall = true;
            trailingCall = false;
            setTimeout(timeoutCallback, delay);
        }
        lastCallTime = timeStamp;
    }
    return proxy;
}

// Minimum delay before invoking the update of observers.
var REFRESH_DELAY = 20;
// A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.
var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];
// Check if MutationObserver is available.
var mutationObserverSupported = typeof MutationObserver !== 'undefined';
/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */
var ResizeObserverController = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserverController.
     *
     * @private
     */
    function ResizeObserverController() {
        /**
         * Indicates whether DOM listeners have been added.
         *
         * @private {boolean}
         */
        this.connected_ = false;
        /**
         * Tells that controller has subscribed for Mutation Events.
         *
         * @private {boolean}
         */
        this.mutationEventsAdded_ = false;
        /**
         * Keeps reference to the instance of MutationObserver.
         *
         * @private {MutationObserver}
         */
        this.mutationsObserver_ = null;
        /**
         * A list of connected observers.
         *
         * @private {Array<ResizeObserverSPI>}
         */
        this.observers_ = [];
        this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
        this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    }
    /**
     * Adds observer to observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be added.
     * @returns {void}
     */
    ResizeObserverController.prototype.addObserver = function (observer) {
        if (!~this.observers_.indexOf(observer)) {
            this.observers_.push(observer);
        }
        // Add listeners if they haven't been added yet.
        if (!this.connected_) {
            this.connect_();
        }
    };
    /**
     * Removes observer from observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be removed.
     * @returns {void}
     */
    ResizeObserverController.prototype.removeObserver = function (observer) {
        var observers = this.observers_;
        var index = observers.indexOf(observer);
        // Remove observer if it's present in registry.
        if (~index) {
            observers.splice(index, 1);
        }
        // Remove listeners if controller has no connected observers.
        if (!observers.length && this.connected_) {
            this.disconnect_();
        }
    };
    /**
     * Invokes the update of observers. It will continue running updates insofar
     * it detects changes.
     *
     * @returns {void}
     */
    ResizeObserverController.prototype.refresh = function () {
        var changesDetected = this.updateObservers_();
        // Continue running updates if changes have been detected as there might
        // be future ones caused by CSS transitions.
        if (changesDetected) {
            this.refresh();
        }
    };
    /**
     * Updates every observer from observers list and notifies them of queued
     * entries.
     *
     * @private
     * @returns {boolean} Returns "true" if any observer has detected changes in
     *      dimensions of it's elements.
     */
    ResizeObserverController.prototype.updateObservers_ = function () {
        // Collect observers that have active observations.
        var activeObservers = this.observers_.filter(function (observer) {
            return observer.gatherActive(), observer.hasActive();
        });
        // Deliver notifications in a separate cycle in order to avoid any
        // collisions between observers, e.g. when multiple instances of
        // ResizeObserver are tracking the same element and the callback of one
        // of them changes content dimensions of the observed target. Sometimes
        // this may result in notifications being blocked for the rest of observers.
        activeObservers.forEach(function (observer) { return observer.broadcastActive(); });
        return activeObservers.length > 0;
    };
    /**
     * Initializes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.connect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already added.
        if (!isBrowser || this.connected_) {
            return;
        }
        // Subscription to the "Transitionend" event is used as a workaround for
        // delayed transitions. This way it's possible to capture at least the
        // final state of an element.
        document.addEventListener('transitionend', this.onTransitionEnd_);
        window.addEventListener('resize', this.refresh);
        if (mutationObserverSupported) {
            this.mutationsObserver_ = new MutationObserver(this.refresh);
            this.mutationsObserver_.observe(document, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
            });
        }
        else {
            document.addEventListener('DOMSubtreeModified', this.refresh);
            this.mutationEventsAdded_ = true;
        }
        this.connected_ = true;
    };
    /**
     * Removes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.disconnect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already removed.
        if (!isBrowser || !this.connected_) {
            return;
        }
        document.removeEventListener('transitionend', this.onTransitionEnd_);
        window.removeEventListener('resize', this.refresh);
        if (this.mutationsObserver_) {
            this.mutationsObserver_.disconnect();
        }
        if (this.mutationEventsAdded_) {
            document.removeEventListener('DOMSubtreeModified', this.refresh);
        }
        this.mutationsObserver_ = null;
        this.mutationEventsAdded_ = false;
        this.connected_ = false;
    };
    /**
     * "Transitionend" event handler.
     *
     * @private
     * @param {TransitionEvent} event
     * @returns {void}
     */
    ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
        var _b = _a.propertyName, propertyName = _b === void 0 ? '' : _b;
        // Detect whether transition may affect dimensions of an element.
        var isReflowProperty = transitionKeys.some(function (key) {
            return !!~propertyName.indexOf(key);
        });
        if (isReflowProperty) {
            this.refresh();
        }
    };
    /**
     * Returns instance of the ResizeObserverController.
     *
     * @returns {ResizeObserverController}
     */
    ResizeObserverController.getInstance = function () {
        if (!this.instance_) {
            this.instance_ = new ResizeObserverController();
        }
        return this.instance_;
    };
    /**
     * Holds reference to the controller's instance.
     *
     * @private {ResizeObserverController}
     */
    ResizeObserverController.instance_ = null;
    return ResizeObserverController;
}());

/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */
var defineConfigurable = (function (target, props) {
    for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
        var key = _a[_i];
        Object.defineProperty(target, key, {
            value: props[key],
            enumerable: false,
            writable: false,
            configurable: true
        });
    }
    return target;
});

/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */
var getWindowOf = (function (target) {
    // Assume that the element is an instance of Node, which means that it
    // has the "ownerDocument" property from which we can retrieve a
    // corresponding global object.
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
    // Return the local global object if it's not possible extract one from
    // provided element.
    return ownerGlobal || global$1;
});

// Placeholder of an empty content rectangle.
var emptyRect = createRectInit(0, 0, 0, 0);
/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */
function toFloat(value) {
    return parseFloat(value) || 0;
}
/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */
function getBordersSize(styles) {
    var positions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        positions[_i - 1] = arguments[_i];
    }
    return positions.reduce(function (size, position) {
        var value = styles['border-' + position + '-width'];
        return size + toFloat(value);
    }, 0);
}
/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */
function getPaddings(styles) {
    var positions = ['top', 'right', 'bottom', 'left'];
    var paddings = {};
    for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
        var position = positions_1[_i];
        var value = styles['padding-' + position];
        paddings[position] = toFloat(value);
    }
    return paddings;
}
/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */
function getSVGContentRect(target) {
    var bbox = target.getBBox();
    return createRectInit(0, 0, bbox.width, bbox.height);
}
/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */
function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
    // By this condition we can catch all non-replaced inline, hidden and
    // detached elements. Though elements with width & height properties less
    // than 0.5 will be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.
    if (!clientWidth && !clientHeight) {
        return emptyRect;
    }
    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;
    // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize the getBoundingClientRect if only it's data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.
    var width = toFloat(styles.width), height = toFloat(styles.height);
    // Width & height include paddings and borders when the 'border-box' box
    // model is applied (except for IE).
    if (styles.boxSizing === 'border-box') {
        // Following conditions are required to handle Internet Explorer which
        // doesn't include paddings and borders to computed CSS dimensions.
        //
        // We can say that if CSS dimensions + paddings are equal to the "client"
        // properties then it's either IE, and thus we don't need to subtract
        // anything, or an element merely doesn't have paddings/borders styles.
        if (Math.round(width + horizPad) !== clientWidth) {
            width -= getBordersSize(styles, 'left', 'right') + horizPad;
        }
        if (Math.round(height + vertPad) !== clientHeight) {
            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
        }
    }
    // Following steps can't be applied to the document's root element as its
    // client[Width/Height] properties represent viewport area of the window.
    // Besides, it's as well not necessary as the <html> itself neither has
    // rendered scroll bars nor it can be clipped.
    if (!isDocumentElement(target)) {
        // In some browsers (only in Firefox, actually) CSS width & height
        // include scroll bars size which can be removed at this step as scroll
        // bars are the only difference between rounded dimensions + paddings
        // and "client" properties, though that is not always true in Chrome.
        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
        var horizScrollbar = Math.round(height + vertPad) - clientHeight;
        // Chrome has a rather weird rounding of "client" properties.
        // E.g. for an element with content width of 314.2px it sometimes gives
        // the client width of 315px and for the width of 314.7px it may give
        // 314px. And it doesn't happen all the time. So just ignore this delta
        // as a non-relevant.
        if (Math.abs(vertScrollbar) !== 1) {
            width -= vertScrollbar;
        }
        if (Math.abs(horizScrollbar) !== 1) {
            height -= horizScrollbar;
        }
    }
    return createRectInit(paddings.left, paddings.top, width, height);
}
/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
var isSVGGraphicsElement = (function () {
    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
    // interface.
    if (typeof SVGGraphicsElement !== 'undefined') {
        return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
    }
    // If it's so, then check that element is at least an instance of the
    // SVGElement and that it has the "getBBox" method.
    // eslint-disable-next-line no-extra-parens
    return function (target) { return (target instanceof getWindowOf(target).SVGElement &&
        typeof target.getBBox === 'function'); };
})();
/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
}
/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */
function getContentRect(target) {
    if (!isBrowser) {
        return emptyRect;
    }
    if (isSVGGraphicsElement(target)) {
        return getSVGContentRect(target);
    }
    return getHTMLElementContentRect(target);
}
/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */
function createReadOnlyRect(_a) {
    var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
    var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);
    // Rectangle's properties are not writable and non-enumerable.
    defineConfigurable(rect, {
        x: x, y: y, width: width, height: height,
        top: y,
        right: x + width,
        bottom: height + y,
        left: x
    });
    return rect;
}
/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */
function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}

/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */
var ResizeObservation = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObservation.
     *
     * @param {Element} target - Element to be observed.
     */
    function ResizeObservation(target) {
        /**
         * Broadcasted width of content rectangle.
         *
         * @type {number}
         */
        this.broadcastWidth = 0;
        /**
         * Broadcasted height of content rectangle.
         *
         * @type {number}
         */
        this.broadcastHeight = 0;
        /**
         * Reference to the last observed content rectangle.
         *
         * @private {DOMRectInit}
         */
        this.contentRect_ = createRectInit(0, 0, 0, 0);
        this.target = target;
    }
    /**
     * Updates content rectangle and tells whether it's width or height properties
     * have changed since the last broadcast.
     *
     * @returns {boolean}
     */
    ResizeObservation.prototype.isActive = function () {
        var rect = getContentRect(this.target);
        this.contentRect_ = rect;
        return (rect.width !== this.broadcastWidth ||
            rect.height !== this.broadcastHeight);
    };
    /**
     * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
     * from the corresponding properties of the last observed content rectangle.
     *
     * @returns {DOMRectInit} Last observed content rectangle.
     */
    ResizeObservation.prototype.broadcastRect = function () {
        var rect = this.contentRect_;
        this.broadcastWidth = rect.width;
        this.broadcastHeight = rect.height;
        return rect;
    };
    return ResizeObservation;
}());

var ResizeObserverEntry = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObserverEntry.
     *
     * @param {Element} target - Element that is being observed.
     * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
     */
    function ResizeObserverEntry(target, rectInit) {
        var contentRect = createReadOnlyRect(rectInit);
        // According to the specification following properties are not writable
        // and are also not enumerable in the native implementation.
        //
        // Property accessors are not being used as they'd require to define a
        // private WeakMap storage which may cause memory leaks in browsers that
        // don't support this type of collections.
        defineConfigurable(this, { target: target, contentRect: contentRect });
    }
    return ResizeObserverEntry;
}());

var ResizeObserverSPI = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback function that is invoked
     *      when one of the observed elements changes it's content dimensions.
     * @param {ResizeObserverController} controller - Controller instance which
     *      is responsible for the updates of observer.
     * @param {ResizeObserver} callbackCtx - Reference to the public
     *      ResizeObserver instance which will be passed to callback function.
     */
    function ResizeObserverSPI(callback, controller, callbackCtx) {
        /**
         * Collection of resize observations that have detected changes in dimensions
         * of elements.
         *
         * @private {Array<ResizeObservation>}
         */
        this.activeObservations_ = [];
        /**
         * Registry of the ResizeObservation instances.
         *
         * @private {Map<Element, ResizeObservation>}
         */
        this.observations_ = new MapShim();
        if (typeof callback !== 'function') {
            throw new TypeError('The callback provided as parameter 1 is not a function.');
        }
        this.callback_ = callback;
        this.controller_ = controller;
        this.callbackCtx_ = callbackCtx;
    }
    /**
     * Starts observing provided element.
     *
     * @param {Element} target - Element to be observed.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.observe = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is already being observed.
        if (observations.has(target)) {
            return;
        }
        observations.set(target, new ResizeObservation(target));
        this.controller_.addObserver(this);
        // Force the update of observations.
        this.controller_.refresh();
    };
    /**
     * Stops observing provided element.
     *
     * @param {Element} target - Element to stop observing.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.unobserve = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is not being observed.
        if (!observations.has(target)) {
            return;
        }
        observations.delete(target);
        if (!observations.size) {
            this.controller_.removeObserver(this);
        }
    };
    /**
     * Stops observing all elements.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.disconnect = function () {
        this.clearActive();
        this.observations_.clear();
        this.controller_.removeObserver(this);
    };
    /**
     * Collects observation instances the associated element of which has changed
     * it's content rectangle.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.gatherActive = function () {
        var _this = this;
        this.clearActive();
        this.observations_.forEach(function (observation) {
            if (observation.isActive()) {
                _this.activeObservations_.push(observation);
            }
        });
    };
    /**
     * Invokes initial callback function with a list of ResizeObserverEntry
     * instances collected from active resize observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.broadcastActive = function () {
        // Do nothing if observer doesn't have active observations.
        if (!this.hasActive()) {
            return;
        }
        var ctx = this.callbackCtx_;
        // Create ResizeObserverEntry instance for every active observation.
        var entries = this.activeObservations_.map(function (observation) {
            return new ResizeObserverEntry(observation.target, observation.broadcastRect());
        });
        this.callback_.call(ctx, entries, ctx);
        this.clearActive();
    };
    /**
     * Clears the collection of active observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.clearActive = function () {
        this.activeObservations_.splice(0);
    };
    /**
     * Tells whether observer has active observations.
     *
     * @returns {boolean}
     */
    ResizeObserverSPI.prototype.hasActive = function () {
        return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI;
}());

// Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.
var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */
var ResizeObserver = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback that is invoked when
     *      dimensions of the observed elements change.
     */
    function ResizeObserver(callback) {
        if (!(this instanceof ResizeObserver)) {
            throw new TypeError('Cannot call a class as a function.');
        }
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        var controller = ResizeObserverController.getInstance();
        var observer = new ResizeObserverSPI(callback, controller, this);
        observers.set(this, observer);
    }
    return ResizeObserver;
}());
// Expose public methods of ResizeObserver.
[
    'observe',
    'unobserve',
    'disconnect'
].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
        var _a;
        return (_a = observers.get(this))[method].apply(_a, arguments);
    };
});

var index = (function () {
    // Export existing implementation if available.
    if (typeof global$1.ResizeObserver !== 'undefined') {
        return global$1.ResizeObserver;
    }
    return ResizeObserver;
})();

/* harmony default export */ __webpack_exports__["a"] = (index);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(17)))

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__InkTabBarNode__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__TabBarTabsNode__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__TabBarRootNode__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ScrollableTabBarNode__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__SaveRef__ = __webpack_require__(20);






/* eslint-disable react/prefer-stateless-function */








var ScrollableInkTabBar = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(ScrollableInkTabBar, _React$Component);

  function ScrollableInkTabBar() {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, ScrollableInkTabBar);

    return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (ScrollableInkTabBar.__proto__ || Object.getPrototypeOf(ScrollableInkTabBar)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(ScrollableInkTabBar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          renderTabBarNode = _props.children,
          restProps = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default()(_props, ['children']);

      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_12__SaveRef__["a" /* default */],
        null,
        function (saveRef, getRef) {
          return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_10__TabBarRootNode__["a" /* default */],
            __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({ saveRef: saveRef }, restProps),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_11__ScrollableTabBarNode__["a" /* default */],
              __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({ saveRef: saveRef, getRef: getRef }, restProps),
              __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__TabBarTabsNode__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({ saveRef: saveRef, renderTabBarNode: renderTabBarNode }, restProps)),
              __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__InkTabBarNode__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({ saveRef: saveRef, getRef: getRef }, restProps))
            )
          );
        }
      );
    }
  }]);

  return ScrollableInkTabBar;
}(__WEBPACK_IMPORTED_MODULE_6_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (ScrollableInkTabBar);


ScrollableInkTabBar.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func
};

/***/ }),
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Hammer__ = __webpack_require__(39);


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__Hammer__["a" /* default */]);

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dom__);








// https://github.com/hammerjs/hammer.js/issues/930
// https://github.com/JedWatson/react-hammerjs/issues/14
// require('hammerjs') when in a browser. This is safe because Hammer is only
// invoked in componentDidMount, which is not executed on the server.
var Hammer = typeof window !== 'undefined' ? __webpack_require__(40) : undefined;

var privateProps = {
	children: true,
	direction: true,
	options: true,
	recognizeWith: true,
	vertical: true
};

/**
 * Hammer Component
 * ================
 */

var handlerToEvent = {
	action: 'tap press',
	onDoubleTap: 'doubletap',
	onPan: 'pan',
	onPanCancel: 'pancancel',
	onPanEnd: 'panend',
	onPanStart: 'panstart',
	onPinch: 'pinch',
	onPinchCancel: 'pinchcancel',
	onPinchEnd: 'pinchend',
	onPinchIn: 'pinchin',
	onPinchOut: 'pinchout',
	onPinchStart: 'pinchstart',
	onPress: 'press',
	onPressUp: 'pressup',
	onRotate: 'rotate',
	onRotateCancel: 'rotatecancel',
	onRotateEnd: 'rotateend',
	onRotateMove: 'rotatemove',
	onRotateStart: 'rotatestart',
	onSwipe: 'swipe',
	onSwipeRight: 'swiperight',
	onSwipeLeft: 'swipeleft',
	onSwipeUp: 'swipeup',
	onSwipeDown: 'swipedown',
	onTap: 'tap'
};

Object.keys(handlerToEvent).forEach(function (i) {
	privateProps[i] = true;
});

function updateHammer(hammer, props) {
	var _this = this;

	if (props.hasOwnProperty('vertical')) {
		console.warn('vertical is deprecated, please use `direction` instead');
	}

	var directionProp = props.direction;
	if (directionProp || props.hasOwnProperty('vertical')) {
		var direction = directionProp ? directionProp : props.vertical ? 'DIRECTION_ALL' : 'DIRECTION_HORIZONTAL';
		hammer.get('pan').set({ direction: Hammer[direction] });
		hammer.get('swipe').set({ direction: Hammer[direction] });
	}

	if (props.options) {
		Object.keys(props.options).forEach(function (option) {
			if (option === 'recognizers') {
				Object.keys(props.options.recognizers).forEach(function (gesture) {
					var recognizer = hammer.get(gesture);
					recognizer.set(props.options.recognizers[gesture]);
					if (props.options.recognizers[gesture].requireFailure) {
						recognizer.requireFailure(props.options.recognizers[gesture].requireFailure);
					}
				}, _this);
			} else {
				var key = option;
				var optionObj = {};
				optionObj[key] = props.options[option];
				hammer.set(optionObj);
			}
		}, this);
	}

	if (props.recognizeWith) {
		Object.keys(props.recognizeWith).forEach(function (gesture) {
			var recognizer = hammer.get(gesture);
			recognizer.recognizeWith(props.recognizeWith[gesture]);
		}, this);
	}

	Object.keys(props).forEach(function (p) {
		var e = handlerToEvent[p];
		if (e) {
			hammer.off(e);
			hammer.on(e, props[p]);
		}
	});
}

var HammerComponent = function (_React$Component) {
	__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(HammerComponent, _React$Component);

	function HammerComponent() {
		__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, HammerComponent);

		return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (HammerComponent.__proto__ || Object.getPrototypeOf(HammerComponent)).apply(this, arguments));
	}

	__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(HammerComponent, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.hammer = new Hammer(__WEBPACK_IMPORTED_MODULE_6_react_dom___default.a.findDOMNode(this));
			updateHammer(this.hammer, this.props);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			if (this.hammer) {
				updateHammer(this.hammer, this.props);
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (this.hammer) {
				this.hammer.stop();
				this.hammer.destroy();
			}
			this.hammer = null;
		}
	}, {
		key: 'render',
		value: function render() {
			var props = {};

			Object.keys(this.props).forEach(function (i) {
				if (!privateProps[i]) {
					props[i] = this.props[i];
				}
			}, this);

			// Reuse the child provided
			// This makes it flexible to use whatever element is wanted (div, ul, etc)
			return __WEBPACK_IMPORTED_MODULE_4_react___default.a.cloneElement(__WEBPACK_IMPORTED_MODULE_4_react___default.a.Children.only(this.props.children), props);
		}
	}]);

	return HammerComponent;
}(__WEBPACK_IMPORTED_MODULE_4_react___default.a.Component);

HammerComponent.displayName = 'Hammer';
HammerComponent.propTypes = {
	className: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string
};
/* harmony default export */ __webpack_exports__["a"] = (HammerComponent);

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(window, document, exportName, undefined) {
  'use strict';

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = document.createElement('div');

var TYPE_FUNCTION = 'function';

var round = Math.round;
var abs = Math.abs;
var now = Date.now;

/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */
function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
}

/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */
function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
        each(arg, context[fn], context);
        return true;
    }
    return false;
}

/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
    var i;

    if (!obj) {
        return;
    }

    if (obj.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
        i = 0;
        while (i < obj.length) {
            iterator.call(context, obj[i], i, obj);
            i++;
        }
    } else {
        for (i in obj) {
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
        }
    }
}

/**
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */
function deprecate(method, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return function() {
        var e = new Error('get-stack-trace');
        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

        var log = window.console && (window.console.warn || window.console.log);
        if (log) {
            log.call(window.console, deprecationMessage, stack);
        }
        return method.apply(this, arguments);
    };
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */
var assign;
if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
} else {
    assign = Object.assign;
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */
var extend = deprecate(function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;
    while (i < keys.length) {
        if (!merge || (merge && dest[keys[i]] === undefined)) {
            dest[keys[i]] = src[keys[i]];
        }
        i++;
    }
    return dest;
}, 'extend', 'Use `assign`.');

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
var merge = deprecate(function merge(dest, src) {
    return extend(dest, src, true);
}, 'merge', 'Use `assign`.');

/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */
function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;

    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
        assign(childP, properties);
    }
}

/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
    return function boundFn() {
        return fn.apply(context, arguments);
    };
}

/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */
function boolOrFn(val, args) {
    if (typeof val == TYPE_FUNCTION) {
        return val.apply(args ? args[0] || undefined : undefined, args);
    }
    return val;
}

/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */
function ifUndefined(val1, val2) {
    return (val1 === undefined) ? val2 : val1;
}

/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function addEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.addEventListener(type, handler, false);
    });
}

/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function removeEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.removeEventListener(type, handler, false);
    });
}

/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
    while (node) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
    return str.indexOf(find) > -1;
}

/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
    return str.trim().split(/\s+/g);
}

/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
        return src.indexOf(find);
    } else {
        var i = 0;
        while (i < src.length) {
            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
                return i;
            }
            i++;
        }
        return -1;
    }
}

/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
}

/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
        var val = key ? src[i][key] : src[i];
        if (inArray(values, val) < 0) {
            results.push(src[i]);
        }
        values[i] = val;
        i++;
    }

    if (sort) {
        if (!key) {
            results = results.sort();
        } else {
            results = results.sort(function sortUniqueArray(a, b) {
                return a[key] > b[key];
            });
        }
    }

    return results;
}

/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);

    var i = 0;
    while (i < VENDOR_PREFIXES.length) {
        prefix = VENDOR_PREFIXES[i];
        prop = (prefix) ? prefix + camelProp : property;

        if (prop in obj) {
            return prop;
        }
        i++;
    }
    return undefined;
}

/**
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
    return _uniqueId++;
}

/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return (doc.defaultView || doc.parentWindow || window);
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = ('ontouchstart' in window);
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';

var COMPUTE_INTERVAL = 25;

var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;

var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;

var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget;

    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.
    this.domHandler = function(ev) {
        if (boolOrFn(manager.options.enable, [manager])) {
            self.handler(ev);
        }
    };

    this.init();

}

Input.prototype = {
    /**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */
    handler: function() { },

    /**
     * bind the events
     */
    init: function() {
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    },

    /**
     * unbind the events
     */
    destroy: function() {
        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
};

/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;

    if (inputClass) {
        Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
        Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
        Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
        Type = MouseInput;
    } else {
        Type = TouchMouseInput;
    }
    return new (Type)(manager, inputHandler);
}

/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */
function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
        manager.session = {};
    }

    // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'
    input.eventType = eventType;

    // compute scale, rotation etc
    computeInputData(manager, input);

    // emit secret event
    manager.emit('hammer.input', input);

    manager.recognize(input);
    manager.session.prevInput = input;
}

/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */
function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length;

    // store the first input to calculate the distance and direction
    if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
    }

    // to compute scale and rotation we need to store the multiple touches
    if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
        session.firstMultiple = false;
    }

    var firstInput = session.firstInput;
    var firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;

    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);

    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

    computeIntervalInputData(session, input);

    // find the correct target
    var target = manager.element;
    if (hasParent(input.srcEvent.target, target)) {
        target = input.srcEvent.target;
    }
    input.target = target;
}

function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
        prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0
        };

        offset = session.offsetDelta = {
            x: center.x,
            y: center.y
        };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */
function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input,
        deltaTime = input.timeStamp - last.timeStamp,
        velocity, velocityX, velocityY, direction;

    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
        var deltaX = input.deltaX - last.deltaX;
        var deltaY = input.deltaY - last.deltaY;

        var v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
        direction = getDirection(deltaX, deltaY);

        session.lastInterval = input;
    } else {
        // use latest velocity info if it doesn't overtake a minimum period
        velocity = last.velocity;
        velocityX = last.velocityX;
        velocityY = last.velocityY;
        direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
}

/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */
function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;
    while (i < input.pointers.length) {
        pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY)
        };
        i++;
    }

    return {
        timeStamp: now(),
        pointers: pointers,
        center: getCenter(pointers),
        deltaX: input.deltaX,
        deltaY: input.deltaY
    };
}

/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */
function getCenter(pointers) {
    var pointersLength = pointers.length;

    // no need to loop when only one touch
    if (pointersLength === 1) {
        return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY)
        };
    }

    var x = 0, y = 0, i = 0;
    while (i < pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
    }

    return {
        x: round(x / pointersLength),
        y: round(y / pointersLength)
    };
}

/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
    return {
        x: x / deltaTime || 0,
        y: y / deltaTime || 0
    };
}

/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
function getDirection(x, y) {
    if (x === y) {
        return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
function getDistance(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];

    return Math.sqrt((x * x) + (y * y));
}

/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */
function getAngle(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */
function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */
function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
};

var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

/**
 * Mouse events input
 * @constructor
 * @extends Input
 */
function MouseInput() {
    this.evEl = MOUSE_ELEMENT_EVENTS;
    this.evWin = MOUSE_WINDOW_EVENTS;

    this.pressed = false; // mousedown state

    Input.apply(this, arguments);
}

inherit(MouseInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function MEhandler(ev) {
        var eventType = MOUSE_INPUT_MAP[ev.type];

        // on start we want to have the left mouse button down
        if (eventType & INPUT_START && ev.button === 0) {
            this.pressed = true;
        }

        if (eventType & INPUT_MOVE && ev.which !== 1) {
            eventType = INPUT_END;
        }

        // mouse must be down
        if (!this.pressed) {
            return;
        }

        if (eventType & INPUT_END) {
            this.pressed = false;
        }

        this.callback(this.manager, eventType, {
            pointers: [ev],
            changedPointers: [ev],
            pointerType: INPUT_TYPE_MOUSE,
            srcEvent: ev
        });
    }
});

var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
};

// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
};

var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

// IE10 has prefixed support, and case-sensitive
if (window.MSPointerEvent && !window.PointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}

/**
 * Pointer events input
 * @constructor
 * @extends Input
 */
function PointerEventInput() {
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;

    Input.apply(this, arguments);

    this.store = (this.manager.session.pointerEvents = []);
}

inherit(PointerEventInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function PEhandler(ev) {
        var store = this.store;
        var removePointer = false;

        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

        // get index of the event in the store
        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

        // start and mouse must be down
        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
                store.push(ev);
                storeIndex = store.length - 1;
            }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
        }

        // it not found, so the pointer hasn't been down (so it's probably a hover)
        if (storeIndex < 0) {
            return;
        }

        // update the event in the store
        store[storeIndex] = ev;

        this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType: pointerType,
            srcEvent: ev
        });

        if (removePointer) {
            // remove from the store
            store.splice(storeIndex, 1);
        }
    }
});

var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Touch events input
 * @constructor
 * @extends Input
 */
function SingleTouchInput() {
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    this.started = false;

    Input.apply(this, arguments);
}

inherit(SingleTouchInput, Input, {
    handler: function TEhandler(ev) {
        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

        // should we handle the touch events?
        if (type === INPUT_START) {
            this.started = true;
        }

        if (!this.started) {
            return;
        }

        var touches = normalizeSingleTouches.call(this, ev, type);

        // when done, reset the started state
        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
            this.started = false;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
        all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
}

var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */
function TouchInput() {
    this.evTarget = TOUCH_TARGET_EVENTS;
    this.targetIds = {};

    Input.apply(this, arguments);
}

inherit(TouchInput, Input, {
    handler: function MTEhandler(ev) {
        var type = TOUCH_INPUT_MAP[ev.type];
        var touches = getTouches.call(this, ev, type);
        if (!touches) {
            return;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds;

    // when there is only one touch, the process can be simplified
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
        targetIds[allTouches[0].identifier] = true;
        return [allTouches, allTouches];
    }

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target;

    // get target touches from touches
    targetTouches = allTouches.filter(function(touch) {
        return hasParent(touch.target, target);
    });

    // collect touches
    if (type === INPUT_START) {
        i = 0;
        while (i < targetTouches.length) {
            targetIds[targetTouches[i].identifier] = true;
            i++;
        }
    }

    // filter changed touches to only contain touches that exist in the collected target ids
    i = 0;
    while (i < changedTouches.length) {
        if (targetIds[changedTouches[i].identifier]) {
            changedTargetTouches.push(changedTouches[i]);
        }

        // cleanup removed touches
        if (type & (INPUT_END | INPUT_CANCEL)) {
            delete targetIds[changedTouches[i].identifier];
        }
        i++;
    }

    if (!changedTargetTouches.length) {
        return;
    }

    return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
        changedTargetTouches
    ];
}

/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */

var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function TouchMouseInput() {
    Input.apply(this, arguments);

    var handler = bindFn(this.handler, this);
    this.touch = new TouchInput(this.manager, handler);
    this.mouse = new MouseInput(this.manager, handler);

    this.primaryTouch = null;
    this.lastTouches = [];
}

inherit(TouchMouseInput, Input, {
    /**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */
    handler: function TMEhandler(manager, inputEvent, inputData) {
        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
            return;
        }

        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
        if (isTouch) {
            recordTouches.call(this, inputEvent, inputData);
        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
            return;
        }

        this.callback(manager, inputEvent, inputData);
    },

    /**
     * remove the event listeners
     */
    destroy: function destroy() {
        this.touch.destroy();
        this.mouse.destroy();
    }
});

function recordTouches(eventType, eventData) {
    if (eventType & INPUT_START) {
        this.primaryTouch = eventData.changedPointers[0].identifier;
        setLastTouch.call(this, eventData);
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        setLastTouch.call(this, eventData);
    }
}

function setLastTouch(eventData) {
    var touch = eventData.changedPointers[0];

    if (touch.identifier === this.primaryTouch) {
        var lastTouch = {x: touch.clientX, y: touch.clientY};
        this.lastTouches.push(lastTouch);
        var lts = this.lastTouches;
        var removeLastTouch = function() {
            var i = lts.indexOf(lastTouch);
            if (i > -1) {
                lts.splice(i, 1);
            }
        };
        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
}

function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
    for (var i = 0; i < this.lastTouches.length; i++) {
        var t = this.lastTouches[i];
        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
            return true;
        }
    }
    return false;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

// magical touchAction value
var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();

/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */
function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
}

TouchAction.prototype = {
    /**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */
    set: function(value) {
        // find out the touch-action by the event handlers
        if (value == TOUCH_ACTION_COMPUTE) {
            value = this.compute();
        }

        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }
        this.actions = value.toLowerCase().trim();
    },

    /**
     * just re-set the touchAction value
     */
    update: function() {
        this.set(this.manager.options.touchAction);
    },

    /**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute: function() {
        var actions = [];
        each(this.manager.recognizers, function(recognizer) {
            if (boolOrFn(recognizer.options.enable, [recognizer])) {
                actions = actions.concat(recognizer.getTouchAction());
            }
        });
        return cleanTouchActions(actions.join(' '));
    },

    /**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults: function(input) {
        var srcEvent = input.srcEvent;
        var direction = input.offsetDirection;

        // if the touch action did prevented once this session
        if (this.manager.session.prevented) {
            srcEvent.preventDefault();
            return;
        }

        var actions = this.actions;
        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

        if (hasNone) {
            //do not prevent defaults if this is a tap gesture

            var isTapPointer = input.pointers.length === 1;
            var isTapMovement = input.distance < 2;
            var isTapTouchTime = input.deltaTime < 250;

            if (isTapPointer && isTapMovement && isTapTouchTime) {
                return;
            }
        }

        if (hasPanX && hasPanY) {
            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
            return;
        }

        if (hasNone ||
            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
            (hasPanX && direction & DIRECTION_VERTICAL)) {
            return this.preventSrc(srcEvent);
        }
    },

    /**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */
    preventSrc: function(srcEvent) {
        this.manager.session.prevented = true;
        srcEvent.preventDefault();
    }
};

/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */
function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
        return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

    // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning
    if (hasPanX && hasPanY) {
        return TOUCH_ACTION_NONE;
    }

    // pan-x OR pan-y
    if (hasPanX || hasPanY) {
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    }

    // manipulation
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
        return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
}

function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
        return false;
    }
    var touchMap = {};
    var cssSupports = window.CSS && window.CSS.supports;
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

        // If css.supports is not supported but there is native touch-action assume it supports
        // all values. This is the case for IE 10 and 11.
        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
    });
    return touchMap;
}

/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */
var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */
function Recognizer(options) {
    this.options = assign({}, this.defaults, options || {});

    this.id = uniqueId();

    this.manager = null;

    // default is enable true
    this.options.enable = ifUndefined(this.options.enable, true);

    this.state = STATE_POSSIBLE;

    this.simultaneous = {};
    this.requireFail = [];
}

Recognizer.prototype = {
    /**
     * @virtual
     * @type {Object}
     */
    defaults: {},

    /**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */
    set: function(options) {
        assign(this.options, options);

        // also update the touchAction, in case something changed about the directions/enabled state
        this.manager && this.manager.touchAction.update();
        return this;
    },

    /**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
            return this;
        }

        var simultaneous = this.simultaneous;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (!simultaneous[otherRecognizer.id]) {
            simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
        }
        return this;
    },

    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRecognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
    },

    /**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
            return this;
        }

        var requireFail = this.requireFail;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (inArray(requireFail, otherRecognizer) === -1) {
            requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
        }
        return this;
    },

    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRequireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        var index = inArray(this.requireFail, otherRecognizer);
        if (index > -1) {
            this.requireFail.splice(index, 1);
        }
        return this;
    },

    /**
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures: function() {
        return this.requireFail.length > 0;
    },

    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith: function(otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
    },

    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit: function(input) {
        var self = this;
        var state = this.state;

        function emit(event) {
            self.manager.emit(event, input);
        }

        // 'panstart' and 'panmove'
        if (state < STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }

        emit(self.options.event); // simple 'eventName' events

        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
            emit(input.additionalEvent);
        }

        // panend and pancancel
        if (state >= STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }
    },

    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */
    tryEmit: function(input) {
        if (this.canEmit()) {
            return this.emit(input);
        }
        // it's failing anyway
        this.state = STATE_FAILED;
    },

    /**
     * can we emit?
     * @returns {boolean}
     */
    canEmit: function() {
        var i = 0;
        while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                return false;
            }
            i++;
        }
        return true;
    },

    /**
     * update the recognizer
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        var inputDataClone = assign({}, inputData);

        // is is enabled and allow recognizing?
        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
            this.reset();
            this.state = STATE_FAILED;
            return;
        }

        // reset when we've reached the end
        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone);

        // the recognizer has recognized a gesture
        // so trigger an event
        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
            this.tryEmit(inputDataClone);
        }
    },

    /**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */
    process: function(inputData) { }, // jshint ignore:line

    /**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction: function() { },

    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset: function() { }
};

/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */
function stateStr(state) {
    if (state & STATE_CANCELLED) {
        return 'cancel';
    } else if (state & STATE_ENDED) {
        return 'end';
    } else if (state & STATE_CHANGED) {
        return 'move';
    } else if (state & STATE_BEGAN) {
        return 'start';
    }
    return '';
}

/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */
function directionStr(direction) {
    if (direction == DIRECTION_DOWN) {
        return 'down';
    } else if (direction == DIRECTION_UP) {
        return 'up';
    } else if (direction == DIRECTION_LEFT) {
        return 'left';
    } else if (direction == DIRECTION_RIGHT) {
        return 'right';
    }
    return '';
}

/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;
    if (manager) {
        return manager.get(otherRecognizer);
    }
    return otherRecognizer;
}

/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */
function AttrRecognizer() {
    Recognizer.apply(this, arguments);
}

inherit(AttrRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof AttrRecognizer
     */
    defaults: {
        /**
         * @type {Number}
         * @default 1
         */
        pointers: 1
    },

    /**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */
    attrTest: function(input) {
        var optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
    },

    /**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process: function(input) {
        var state = this.state;
        var eventType = input.eventType;

        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        var isValid = this.attrTest(input);

        // on cancel input and we've recognized before, return STATE_CANCELLED
        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
            return state | STATE_CANCELLED;
        } else if (isRecognized || isValid) {
            if (eventType & INPUT_END) {
                return state | STATE_ENDED;
            } else if (!(state & STATE_BEGAN)) {
                return STATE_BEGAN;
            }
            return state | STATE_CHANGED;
        }
        return STATE_FAILED;
    }
});

/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function PanRecognizer() {
    AttrRecognizer.apply(this, arguments);

    this.pX = null;
    this.pY = null;
}

inherit(PanRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PanRecognizer
     */
    defaults: {
        event: 'pan',
        threshold: 10,
        pointers: 1,
        direction: DIRECTION_ALL
    },

    getTouchAction: function() {
        var direction = this.options.direction;
        var actions = [];
        if (direction & DIRECTION_HORIZONTAL) {
            actions.push(TOUCH_ACTION_PAN_Y);
        }
        if (direction & DIRECTION_VERTICAL) {
            actions.push(TOUCH_ACTION_PAN_X);
        }
        return actions;
    },

    directionTest: function(input) {
        var options = this.options;
        var hasMoved = true;
        var distance = input.distance;
        var direction = input.direction;
        var x = input.deltaX;
        var y = input.deltaY;

        // lock to axis?
        if (!(direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                hasMoved = x != this.pX;
                distance = Math.abs(input.deltaX);
            } else {
                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                hasMoved = y != this.pY;
                distance = Math.abs(input.deltaY);
            }
        }
        input.direction = direction;
        return hasMoved && distance > options.threshold && direction & options.direction;
    },

    attrTest: function(input) {
        return AttrRecognizer.prototype.attrTest.call(this, input) &&
            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
    },

    emit: function(input) {

        this.pX = input.deltaX;
        this.pY = input.deltaY;

        var direction = directionStr(input.direction);

        if (direction) {
            input.additionalEvent = this.options.event + direction;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */
function PinchRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(PinchRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'pinch',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },

    emit: function(input) {
        if (input.scale !== 1) {
            var inOut = input.scale < 1 ? 'in' : 'out';
            input.additionalEvent = this.options.event + inOut;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */
function PressRecognizer() {
    Recognizer.apply(this, arguments);

    this._timer = null;
    this._input = null;
}

inherit(PressRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PressRecognizer
     */
    defaults: {
        event: 'press',
        pointers: 1,
        time: 251, // minimal time of the pointer to be pressed
        threshold: 9 // a minimal movement is ok, but keep it low
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_AUTO];
    },

    process: function(input) {
        var options = this.options;
        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTime = input.deltaTime > options.time;

        this._input = input;

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
            this.reset();
        } else if (input.eventType & INPUT_START) {
            this.reset();
            this._timer = setTimeoutContext(function() {
                this.state = STATE_RECOGNIZED;
                this.tryEmit();
            }, options.time, this);
        } else if (input.eventType & INPUT_END) {
            return STATE_RECOGNIZED;
        }
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function(input) {
        if (this.state !== STATE_RECOGNIZED) {
            return;
        }

        if (input && (input.eventType & INPUT_END)) {
            this.manager.emit(this.options.event + 'up', input);
        } else {
            this._input.timeStamp = now();
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */
function RotateRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(RotateRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof RotateRecognizer
     */
    defaults: {
        event: 'rotate',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    }
});

/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function SwipeRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(SwipeRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof SwipeRecognizer
     */
    defaults: {
        event: 'swipe',
        threshold: 10,
        velocity: 0.3,
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
        pointers: 1
    },

    getTouchAction: function() {
        return PanRecognizer.prototype.getTouchAction.call(this);
    },

    attrTest: function(input) {
        var direction = this.options.direction;
        var velocity;

        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
            velocity = input.overallVelocity;
        } else if (direction & DIRECTION_HORIZONTAL) {
            velocity = input.overallVelocityX;
        } else if (direction & DIRECTION_VERTICAL) {
            velocity = input.overallVelocityY;
        }

        return this._super.attrTest.call(this, input) &&
            direction & input.offsetDirection &&
            input.distance > this.options.threshold &&
            input.maxPointers == this.options.pointers &&
            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },

    emit: function(input) {
        var direction = directionStr(input.offsetDirection);
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }

        this.manager.emit(this.options.event, input);
    }
});

/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */
function TapRecognizer() {
    Recognizer.apply(this, arguments);

    // previous time and center,
    // used for tap counting
    this.pTime = false;
    this.pCenter = false;

    this._timer = null;
    this._input = null;
    this.count = 0;
}

inherit(TapRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'tap',
        pointers: 1,
        taps: 1,
        interval: 300, // max time between the multi-tap taps
        time: 250, // max time of the pointer to be down (like finger on the screen)
        threshold: 9, // a minimal movement is ok, but keep it low
        posThreshold: 10 // a multi-tap can be a bit off the initial position
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_MANIPULATION];
    },

    process: function(input) {
        var options = this.options;

        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTouchTime = input.deltaTime < options.time;

        this.reset();

        if ((input.eventType & INPUT_START) && (this.count === 0)) {
            return this.failTimeout();
        }

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (validMovement && validTouchTime && validPointers) {
            if (input.eventType != INPUT_END) {
                return this.failTimeout();
            }

            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

            this.pTime = input.timeStamp;
            this.pCenter = input.center;

            if (!validMultiTap || !validInterval) {
                this.count = 1;
            } else {
                this.count += 1;
            }

            this._input = input;

            // if tap count matches we have recognized it,
            // else it has began recognizing...
            var tapCount = this.count % options.taps;
            if (tapCount === 0) {
                // no failing requirements, immediately trigger the tap event
                // or wait as long as the multitap interval to trigger
                if (!this.hasRequireFailures()) {
                    return STATE_RECOGNIZED;
                } else {
                    this._timer = setTimeoutContext(function() {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.interval, this);
                    return STATE_BEGAN;
                }
            }
        }
        return STATE_FAILED;
    },

    failTimeout: function() {
        this._timer = setTimeoutContext(function() {
            this.state = STATE_FAILED;
        }, this.options.interval, this);
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function() {
        if (this.state == STATE_RECOGNIZED) {
            this._input.tapCount = this.count;
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Hammer(element, options) {
    options = options || {};
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
    return new Manager(element, options);
}

/**
 * @const {string}
 */
Hammer.VERSION = '2.0.7';

/**
 * default settings
 * @namespace
 */
Hammer.defaults = {
    /**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */
    preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, {enable: false}],
        [PinchRecognizer, {enable: false}, ['rotate']],
        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
        [TapRecognizer],
        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
        [PressRecognizer]
    ],

    /**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
        /**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: 'none',

        /**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: 'none',

        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: 'none',

        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: 'none',

        /**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: 'none',

        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: 'rgba(0,0,0,0)'
    }
};

var STOP = 1;
var FORCED_STOP = 2;

/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Manager(element, options) {
    this.options = assign({}, Hammer.defaults, options || {});

    this.options.inputTarget = this.options.inputTarget || element;

    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};

    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);

    toggleCssProps(this, true);

    each(this.options.recognizers, function(item) {
        var recognizer = this.add(new (item[0])(item[1]));
        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
    }, this);
}

Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function(options) {
        assign(this.options, options);

        // Options that need a little more setup
        if (options.touchAction) {
            this.touchAction.update();
        }
        if (options.inputTarget) {
            // Clean up existing event listeners and reinitialize
            this.input.destroy();
            this.input.target = options.inputTarget;
            this.input.init();
        }
        return this;
    },

    /**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */
    stop: function(force) {
        this.session.stopped = force ? FORCED_STOP : STOP;
    },

    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        var session = this.session;
        if (session.stopped) {
            return;
        }

        // run the touch-action polyfill
        this.touchAction.preventDefaults(inputData);

        var recognizer;
        var recognizers = this.recognizers;

        // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`
        var curRecognizer = session.curRecognizer;

        // reset when the last recognizer is recognized
        // or when we're in a new session
        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
            curRecognizer = session.curRecognizer = null;
        }

        var i = 0;
        while (i < recognizers.length) {
            recognizer = recognizers[i];

            // find out if we are allowed try to recognize the input for this one.
            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
            //      that is being recognized.
            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
            //      this can be setup with the `recognizeWith()` method on the recognizer.
            if (session.stopped !== FORCED_STOP && ( // 1
                    !curRecognizer || recognizer == curRecognizer || // 2
                    recognizer.canRecognizeWith(curRecognizer))) { // 3
                recognizer.recognize(inputData);
            } else {
                recognizer.reset();
            }

            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
            // current active recognizer. but only if we don't already have an active recognizer
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                curRecognizer = session.curRecognizer = recognizer;
            }
            i++;
        }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function(recognizer) {
        if (recognizer instanceof Recognizer) {
            return recognizer;
        }

        var recognizers = this.recognizers;
        for (var i = 0; i < recognizers.length; i++) {
            if (recognizers[i].options.event == recognizer) {
                return recognizers[i];
            }
        }
        return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function(recognizer) {
        if (invokeArrayArg(recognizer, 'add', this)) {
            return this;
        }

        // remove existing
        var existing = this.get(recognizer.options.event);
        if (existing) {
            this.remove(existing);
        }

        this.recognizers.push(recognizer);
        recognizer.manager = this;

        this.touchAction.update();
        return recognizer;
    },

    /**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */
    remove: function(recognizer) {
        if (invokeArrayArg(recognizer, 'remove', this)) {
            return this;
        }

        recognizer = this.get(recognizer);

        // let's make sure this recognizer exists
        if (recognizer) {
            var recognizers = this.recognizers;
            var index = inArray(recognizers, recognizer);

            if (index !== -1) {
                recognizers.splice(index, 1);
                this.touchAction.update();
            }
        }

        return this;
    },

    /**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */
    on: function(events, handler) {
        if (events === undefined) {
            return;
        }
        if (handler === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
        });
        return this;
    },

    /**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */
    off: function(events, handler) {
        if (events === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            if (!handler) {
                delete handlers[event];
            } else {
                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
            }
        });
        return this;
    },

    /**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit: function(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) {
            triggerDomEvent(event, data);
        }

        // no handlers, so skip it all
        var handlers = this.handlers[event] && this.handlers[event].slice();
        if (!handlers || !handlers.length) {
            return;
        }

        data.type = event;
        data.preventDefault = function() {
            data.srcEvent.preventDefault();
        };

        var i = 0;
        while (i < handlers.length) {
            handlers[i](data);
            i++;
        }
    },

    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy: function() {
        this.element && toggleCssProps(this, false);

        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
    }
};

/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */
function toggleCssProps(manager, add) {
    var element = manager.element;
    if (!element.style) {
        return;
    }
    var prop;
    each(manager.options.cssProps, function(value, name) {
        prop = prefixed(element.style, name);
        if (add) {
            manager.oldCssProps[prop] = element.style[prop];
            element.style[prop] = value;
        } else {
            element.style[prop] = manager.oldCssProps[prop] || '';
        }
    });
    if (!add) {
        manager.oldCssProps = {};
    }
}

/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */
function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
}

assign(Hammer, {
    INPUT_START: INPUT_START,
    INPUT_MOVE: INPUT_MOVE,
    INPUT_END: INPUT_END,
    INPUT_CANCEL: INPUT_CANCEL,

    STATE_POSSIBLE: STATE_POSSIBLE,
    STATE_BEGAN: STATE_BEGAN,
    STATE_CHANGED: STATE_CHANGED,
    STATE_ENDED: STATE_ENDED,
    STATE_RECOGNIZED: STATE_RECOGNIZED,
    STATE_CANCELLED: STATE_CANCELLED,
    STATE_FAILED: STATE_FAILED,

    DIRECTION_NONE: DIRECTION_NONE,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_UP: DIRECTION_UP,
    DIRECTION_DOWN: DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
    DIRECTION_ALL: DIRECTION_ALL,

    Manager: Manager,
    Input: Input,
    TouchAction: TouchAction,

    TouchInput: TouchInput,
    MouseInput: MouseInput,
    PointerEventInput: PointerEventInput,
    TouchMouseInput: TouchMouseInput,
    SingleTouchInput: SingleTouchInput,

    Recognizer: Recognizer,
    AttrRecognizer: AttrRecognizer,
    Tap: TapRecognizer,
    Pan: PanRecognizer,
    Swipe: SwipeRecognizer,
    Pinch: PinchRecognizer,
    Rotate: RotateRecognizer,
    Press: PressRecognizer,

    on: addEventListeners,
    off: removeEventListeners,
    each: each,
    merge: merge,
    extend: extend,
    assign: assign,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
});

// this prevents errors when Hammer is loaded in the presence of an AMD
//  style loader but by script tag, not by the loader.
var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
freeGlobal.Hammer = Hammer;

if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
        return Hammer;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module != 'undefined' && module.exports) {
    module.exports = Hammer;
} else {
    window[exportName] = Hammer;
}

})(window, document, 'Hammer');


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rc_hammerjs__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_dom__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__TabContent__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__utils__ = __webpack_require__(9);












var RESISTANCE_COEF = 0.6;

function computeIndex(_ref) {
  var maxIndex = _ref.maxIndex,
      startIndex = _ref.startIndex,
      delta = _ref.delta,
      viewSize = _ref.viewSize;

  var index = startIndex + -delta / viewSize;
  if (index < 0) {
    index = Math.exp(index * RESISTANCE_COEF) - 1;
  } else if (index > maxIndex) {
    index = maxIndex + 1 - Math.exp((maxIndex - index) * RESISTANCE_COEF);
  }
  return index;
}

function getIndexByDelta(e) {
  var delta = Object(__WEBPACK_IMPORTED_MODULE_10__utils__["k" /* isVertical */])(this.props.tabBarPosition) ? e.deltaY : e.deltaX;
  var otherDelta = Object(__WEBPACK_IMPORTED_MODULE_10__utils__["k" /* isVertical */])(this.props.tabBarPosition) ? e.deltaX : e.deltaY;
  if (Math.abs(delta) < Math.abs(otherDelta)) {
    return undefined;
  }
  var currentIndex = computeIndex({
    maxIndex: this.maxIndex,
    viewSize: this.viewSize,
    startIndex: this.startIndex,
    delta: delta
  });
  var showIndex = delta < 0 ? Math.floor(currentIndex + 1) : Math.floor(currentIndex);
  if (showIndex < 0) {
    showIndex = 0;
  } else if (showIndex > this.maxIndex) {
    showIndex = this.maxIndex;
  }
  if (this.children[showIndex].props.disabled) {
    return undefined;
  }
  return currentIndex;
}

var SwipeableTabContent = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(SwipeableTabContent, _React$Component);

  function SwipeableTabContent() {
    var _ref2;

    var _temp, _this, _ret;

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, SwipeableTabContent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_ref2 = SwipeableTabContent.__proto__ || Object.getPrototypeOf(SwipeableTabContent)).call.apply(_ref2, [this].concat(args))), _this), _this.onPanStart = function () {
      var _this$props = _this.props,
          tabBarPosition = _this$props.tabBarPosition,
          children = _this$props.children,
          activeKey = _this$props.activeKey,
          animated = _this$props.animated;

      _this.startIndex = Object(__WEBPACK_IMPORTED_MODULE_10__utils__["a" /* getActiveIndex */])(children, activeKey);
      var startIndex = _this.startIndex;
      if (startIndex === -1) {
        return;
      }
      if (animated) {
        Object(__WEBPACK_IMPORTED_MODULE_10__utils__["n" /* setTransition */])(_this.rootNode.style, 'none');
      }
      _this.startDrag = true;
      _this.children = Object(__WEBPACK_IMPORTED_MODULE_10__utils__["o" /* toArray */])(children);
      _this.maxIndex = _this.children.length - 1;
      _this.viewSize = Object(__WEBPACK_IMPORTED_MODULE_10__utils__["k" /* isVertical */])(tabBarPosition) ? _this.rootNode.offsetHeight : _this.rootNode.offsetWidth;
    }, _this.onPan = function (e) {
      if (!_this.startDrag) {
        return;
      }
      var tabBarPosition = _this.props.tabBarPosition;

      var currentIndex = getIndexByDelta.call(_this, e);
      if (currentIndex !== undefined) {
        Object(__WEBPACK_IMPORTED_MODULE_10__utils__["m" /* setTransform */])(_this.rootNode.style, Object(__WEBPACK_IMPORTED_MODULE_10__utils__["h" /* getTransformByIndex */])(currentIndex, tabBarPosition));
      }
    }, _this.onPanEnd = function (e) {
      if (!_this.startDrag) {
        return;
      }
      _this.end(e);
    }, _this.onSwipe = function (e) {
      _this.end(e, true);
    }, _this.end = function (e, swipe) {
      var _this$props2 = _this.props,
          tabBarPosition = _this$props2.tabBarPosition,
          animated = _this$props2.animated;

      _this.startDrag = false;
      if (animated) {
        Object(__WEBPACK_IMPORTED_MODULE_10__utils__["n" /* setTransition */])(_this.rootNode.style, '');
      }
      var currentIndex = getIndexByDelta.call(_this, e);
      var finalIndex = _this.startIndex;
      if (currentIndex !== undefined) {
        if (currentIndex < 0) {
          finalIndex = 0;
        } else if (currentIndex > _this.maxIndex) {
          finalIndex = _this.maxIndex;
        } else if (swipe) {
          var delta = Object(__WEBPACK_IMPORTED_MODULE_10__utils__["k" /* isVertical */])(tabBarPosition) ? e.deltaY : e.deltaX;
          finalIndex = delta < 0 ? Math.ceil(currentIndex) : Math.floor(currentIndex);
        } else {
          var floorIndex = Math.floor(currentIndex);
          if (currentIndex - floorIndex > 0.6) {
            finalIndex = floorIndex + 1;
          } else {
            finalIndex = floorIndex;
          }
        }
      }
      if (_this.children[finalIndex].props.disabled) {
        return;
      }
      if (_this.startIndex === finalIndex) {
        if (animated) {
          Object(__WEBPACK_IMPORTED_MODULE_10__utils__["m" /* setTransform */])(_this.rootNode.style, Object(__WEBPACK_IMPORTED_MODULE_10__utils__["h" /* getTransformByIndex */])(finalIndex, _this.props.tabBarPosition));
        }
      } else {
        _this.props.onChange(Object(__WEBPACK_IMPORTED_MODULE_10__utils__["b" /* getActiveKey */])(_this.props.children, finalIndex));
      }
    }, _temp), __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(_this, _ret);
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(SwipeableTabContent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.rootNode = __WEBPACK_IMPORTED_MODULE_8_react_dom___default.a.findDOMNode(this);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          tabBarPosition = _props.tabBarPosition,
          hammerOptions = _props.hammerOptions,
          animated = _props.animated;

      var events = {
        onSwipe: this.onSwipe,
        onPanStart: this.onPanStart
      };
      if (animated !== false) {
        events = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, events, {
          onPan: this.onPan,
          onPanEnd: this.onPanEnd
        });
      }
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_7_rc_hammerjs__["a" /* default */],
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, events, {
          direction: Object(__WEBPACK_IMPORTED_MODULE_10__utils__["k" /* isVertical */])(tabBarPosition) ? 'DIRECTION_ALL' : 'DIRECTION_HORIZONTAL',
          options: hammerOptions
        }),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__TabContent__["a" /* default */], this.props)
      );
    }
  }]);

  return SwipeableTabContent;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (SwipeableTabContent);


SwipeableTabContent.propTypes = {
  tabBarPosition: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string,
  onChange: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  children: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.node,
  hammerOptions: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  animated: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  activeKey: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string
};

SwipeableTabContent.defaultProps = {
  animated: true
};

/***/ }),
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.INIT_COORDS = 'dnd-core/INIT_COORDS';
exports.BEGIN_DRAG = 'dnd-core/BEGIN_DRAG';
exports.PUBLISH_DRAG_SOURCE = 'dnd-core/PUBLISH_DRAG_SOURCE';
exports.HOVER = 'dnd-core/HOVER';
exports.DROP = 'dnd-core/DROP';
exports.END_DRAG = 'dnd-core/END_DRAG';


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isFunction(input) {
    return typeof input === 'function';
}
exports.isFunction = isFunction;
function noop() {
    // noop
}
exports.noop = noop;
function isObjectLike(input) {
    return typeof input === 'object' && input !== null;
}
function isPlainObject(input) {
    if (!isObjectLike(input)) {
        return false;
    }
    if (Object.getPrototypeOf(input) === null) {
        return true;
    }
    var proto = input;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(input) === proto;
}
exports.isPlainObject = isPlainObject;


/***/ }),
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * drop-in replacement for _.get
 * @param obj
 * @param path
 * @param defaultValue
 */
function get(obj, path, defaultValue) {
    return path
        .split('.')
        .reduce(function (a, c) { return (a && a[c] ? a[c] : defaultValue || null); }, obj);
}
exports.get = get;
/**
 * drop-in replacement for _.without
 */
function without(items, item) {
    return items.filter(function (i) { return i !== item; });
}
exports.without = without;
/**
 * drop-in replacement for _.isString
 * @param input
 */
function isString(input) {
    return typeof input === 'string';
}
exports.isString = isString;
/**
 * drop-in replacement for _.isString
 * @param input
 */
function isObject(input) {
    return typeof input === 'object';
}
exports.isObject = isObject;
/**
 * repalcement for _.xor
 * @param itemsA
 * @param itemsB
 */
function xor(itemsA, itemsB) {
    var map = new Map();
    var insertItem = function (item) {
        return map.set(item, map.has(item) ? map.get(item) + 1 : 1);
    };
    itemsA.forEach(insertItem);
    itemsB.forEach(insertItem);
    var result = [];
    map.forEach(function (count, key) {
        if (count === 1) {
            result.push(key);
        }
    });
    return result;
}
exports.xor = xor;
/**
 * replacement for _.intersection
 * @param itemsA
 * @param itemsB
 */
function intersection(itemsA, itemsB) {
    return itemsA.filter(function (t) { return itemsB.indexOf(t) > -1; });
}
exports.intersection = intersection;


/***/ }),
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var dnd_core_1 = __webpack_require__(237);
var checkDecoratorArguments_1 = __webpack_require__(75);
var isRefable_1 = __webpack_require__(96);
var invariant = __webpack_require__(8);
var hoistStatics = __webpack_require__(97);
/**
 * Create the React Context
 */
exports.context = React.createContext({
    dragDropManager: undefined,
});
exports.Consumer = exports.context.Consumer, exports.Provider = exports.context.Provider;
/**
 * Creates the context object we're providing
 * @param backend
 * @param context
 */
function createChildContext(backend, context, debugMode) {
    return {
        dragDropManager: dnd_core_1.createDragDropManager(backend, context, debugMode),
    };
}
exports.createChildContext = createChildContext;
/**
 * A React component that provides the React-DnD context
 */
exports.DragDropContextProvider = function (_a) {
    var backend = _a.backend, context = _a.context, debugMode = _a.debugMode, children = _a.children;
    var contextValue = createChildContext(backend, context, debugMode);
    return React.createElement(exports.Provider, { value: contextValue }, children);
};
/**
 * Wrap the root component of your application with DragDropContext decorator to set up React DnD.
 * This lets you specify the backend, and sets up the shared DnD state behind the scenes.
 * @param backendFactory The DnD backend factory
 * @param backendContext The backend context
 */
function DragDropContext(backendFactory, backendContext, debugMode) {
    checkDecoratorArguments_1.default('DragDropContext', 'backend', backendFactory);
    var childContext = createChildContext(backendFactory, backendContext, debugMode);
    return function decorateContext(DecoratedComponent) {
        var Decorated = DecoratedComponent;
        var displayName = Decorated.displayName || Decorated.name || 'Component';
        var DragDropContextContainer = /** @class */ (function (_super) {
            __extends(DragDropContextContainer, _super);
            function DragDropContextContainer() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.ref = React.createRef();
                _this.getManager = function () { return childContext.dragDropManager; };
                return _this;
            }
            DragDropContextContainer.prototype.getDecoratedComponentInstance = function () {
                invariant(this.ref.current, 'In order to access an instance of the decorated component, it must either be a class component or use React.forwardRef()');
                return this.ref.current;
            };
            DragDropContextContainer.prototype.render = function () {
                return (React.createElement(exports.Provider, { value: childContext },
                    React.createElement(Decorated, __assign({}, this.props, { ref: isRefable_1.isRefable(Decorated) ? this.ref : null }))));
            };
            DragDropContextContainer.DecoratedComponent = DecoratedComponent;
            DragDropContextContainer.displayName = "DragDropContext(" + displayName + ")";
            return DragDropContextContainer;
        }(React.Component));
        return hoistStatics(DragDropContextContainer, DecoratedComponent);
    };
}
exports.DragDropContext = DragDropContext;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var beginDrag_1 = __webpack_require__(246);
var publishDragSource_1 = __webpack_require__(248);
var hover_1 = __webpack_require__(249);
var drop_1 = __webpack_require__(250);
var endDrag_1 = __webpack_require__(251);
__export(__webpack_require__(52));
function createDragDropActions(manager) {
    return {
        beginDrag: beginDrag_1.default(manager),
        publishDragSource: publishDragSource_1.default(manager),
        hover: hover_1.default(manager),
        drop: drop_1.default(manager),
        endDrag: endDrag_1.default(manager),
    };
}
exports.default = createDragDropActions;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ADD_SOURCE = 'dnd-core/ADD_SOURCE';
exports.ADD_TARGET = 'dnd-core/ADD_TARGET';
exports.REMOVE_SOURCE = 'dnd-core/REMOVE_SOURCE';
exports.REMOVE_TARGET = 'dnd-core/REMOVE_TARGET';
function addSource(sourceId) {
    return {
        type: exports.ADD_SOURCE,
        payload: {
            sourceId: sourceId,
        },
    };
}
exports.addSource = addSource;
function addTarget(targetId) {
    return {
        type: exports.ADD_TARGET,
        payload: {
            targetId: targetId,
        },
    };
}
exports.addTarget = addTarget;
function removeSource(sourceId) {
    return {
        type: exports.REMOVE_SOURCE,
        payload: {
            sourceId: sourceId,
        },
    };
}
exports.removeSource = removeSource;
function removeTarget(targetId) {
    return {
        type: exports.REMOVE_TARGET,
        payload: {
            targetId: targetId,
        },
    };
}
exports.removeTarget = removeTarget;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
function checkDecoratorArguments(functionName, signature) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (process.env.NODE_ENV !== 'production') {
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var arg = args_1[_a];
            if (arg && arg.prototype && arg.prototype.render) {
                // tslint:disable-next-line no-console
                console.error('You seem to be applying the arguments in the wrong order. ' +
                    ("It should be " + functionName + "(" + signature + ")(Component), not the other way around. ") +
                    'Read more: http://react-dnd.github.io/react-dnd/docs/troubleshooting#you-seem-to-be-applying-the-arguments-in-the-wrong-order');
                return;
            }
        }
    }
}
exports.default = checkDecoratorArguments;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 76 */
/***/ (function(module, exports) {

//

module.exports = function shallowEqual(objA, objB, compare, compareContext) {
  var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

  if (ret !== void 0) {
    return !!ret;
  }

  if (objA === objB) {
    return true;
  }

  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  // Test for A's keys different from B.
  for (var idx = 0; idx < keysA.length; idx++) {
    var key = keysA[idx];

    if (!bHasOwnProperty(key)) {
      return false;
    }

    var valueA = objA[key];
    var valueB = objB[key];

    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

    if (ret === false || (ret === void 0 && valueA !== valueB)) {
      return false;
    }
  }

  return true;
};


/***/ }),
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.FILE = '__NATIVE_FILE__';
exports.URL = '__NATIVE_URL__';
exports.TEXT = '__NATIVE_TEXT__';


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isClassComponent(Component) {
    return (Component &&
        Component.prototype &&
        typeof Component.prototype.render === 'function');
}
function isRefForwardingComponent(C) {
    return (C && C.$$typeof && C.$$typeof.toString() === 'Symbol(react.forward_ref)');
}
exports.isRefForwardingComponent = isRefForwardingComponent;
function isRefable(C) {
    return isClassComponent(C) || isRefForwardingComponent(C);
}
exports.isRefable = isRefable;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var ReactIs = __webpack_require__(93);
var REACT_STATICS = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
};

var FORWARD_REF_STATICS = {
    '$$typeof': true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true
};

var MEMO_STATICS = {
    '$$typeof': true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true
};

var TYPE_STATICS = {};
TYPE_STATICS[ReactIs.ForwardRef] = FORWARD_REF_STATICS;

function getStatics(component) {
    if (ReactIs.isMemo(component)) {
        return MEMO_STATICS;
    }
    return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
        // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        var targetStatics = getStatics(targetComponent);
        var sourceStatics = getStatics(sourceComponent);

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try {
                    // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(0);
var DragDropContext_1 = __webpack_require__(72);
var invariant = __webpack_require__(8);
/**
 * A hook to retrieve the DragDropManager from Context
 */
function useDragDropManager() {
    var dragDropManager = react_1.useContext(DragDropContext_1.context).dragDropManager;
    invariant(dragDropManager != null, 'Expected drag drop context');
    return dragDropManager;
}
exports.useDragDropManager = useDragDropManager;


/***/ }),
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function memoize(fn) {
    var result = null;
    var memoized = function () {
        if (result == null) {
            result = fn();
        }
        return result;
    };
    return memoized;
}
exports.memoize = memoize;
/**
 * drop-in replacement for _.without
 */
function without(items, item) {
    return items.filter(function (i) { return i !== item; });
}
exports.without = without;
function union(itemsA, itemsB) {
    var set = new Set();
    var insertItem = function (item) { return set.add(item); };
    itemsA.forEach(insertItem);
    itemsB.forEach(insertItem);
    var result = [];
    set.forEach(function (key) { return result.push(key); });
    return result;
}
exports.union = union;


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var discount_lodash_1 = __webpack_require__(126);
exports.isFirefox = discount_lodash_1.memoize(function () {
    return /firefox/i.test(navigator.userAgent);
});
exports.isSafari = discount_lodash_1.memoize(function () { return Boolean(window.safari); });


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HandlerRole;
(function (HandlerRole) {
    HandlerRole["SOURCE"] = "SOURCE";
    HandlerRole["TARGET"] = "TARGET";
})(HandlerRole = exports.HandlerRole || (exports.HandlerRole = {}));


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function matchesType(targetType, draggedItemType) {
    if (draggedItemType === null) {
        return targetType === null;
    }
    return Array.isArray(targetType)
        ? targetType.some(function (t) { return t === draggedItemType; })
        : targetType === draggedItemType;
}
exports.default = matchesType;


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.strictEquality = function (a, b) { return a === b; };
/**
 * Determine if two cartesian coordinate offsets are equal
 * @param offsetA
 * @param offsetB
 */
function areCoordsEqual(offsetA, offsetB) {
    if (!offsetA && !offsetB) {
        return true;
    }
    else if (!offsetA || !offsetB) {
        return false;
    }
    else {
        return offsetA.x === offsetB.x && offsetA.y === offsetB.y;
    }
}
exports.areCoordsEqual = areCoordsEqual;
/**
 * Determines if two arrays of items are equal
 * @param a The first array of items
 * @param b The second array of items
 */
function areArraysEqual(a, b, isEqual) {
    if (isEqual === void 0) { isEqual = exports.strictEquality; }
    if (a.length !== b.length) {
        return false;
    }
    for (var i = 0; i < a.length; ++i) {
        if (!isEqual(a[i], b[i])) {
            return false;
        }
    }
    return true;
}
exports.areArraysEqual = areArraysEqual;


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var discount_lodash_1 = __webpack_require__(59);
exports.NONE = [];
exports.ALL = [];
exports.NONE.__IS_NONE__ = true;
exports.ALL.__IS_ALL__ = true;
/**
 * Determines if the given handler IDs are dirty or not.
 *
 * @param dirtyIds The set of dirty handler ids
 * @param handlerIds The set of handler ids to check
 */
function areDirty(dirtyIds, handlerIds) {
    if (dirtyIds === exports.NONE) {
        return false;
    }
    if (dirtyIds === exports.ALL || typeof handlerIds === 'undefined') {
        return true;
    }
    var commonIds = discount_lodash_1.intersection(handlerIds, dirtyIds);
    return commonIds.length > 0;
}
exports.areDirty = areDirty;


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var DragDropContext_1 = __webpack_require__(72);
var disposables_1 = __webpack_require__(265);
var isRefable_1 = __webpack_require__(96);
var discount_lodash_1 = __webpack_require__(53);
var invariant = __webpack_require__(8);
var hoistStatics = __webpack_require__(97);
var shallowEqual = __webpack_require__(76);
function decorateHandler(_a) {
    var DecoratedComponent = _a.DecoratedComponent, createHandler = _a.createHandler, createMonitor = _a.createMonitor, createConnector = _a.createConnector, registerHandler = _a.registerHandler, containerDisplayName = _a.containerDisplayName, getType = _a.getType, collect = _a.collect, options = _a.options;
    var _b = options.arePropsEqual, arePropsEqual = _b === void 0 ? shallowEqual : _b;
    var Decorated = DecoratedComponent;
    var displayName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component';
    var DragDropContainer = /** @class */ (function (_super) {
        __extends(DragDropContainer, _super);
        function DragDropContainer(props) {
            var _this = _super.call(this, props) || this;
            _this.decoratedRef = React.createRef();
            _this.handleChange = function () {
                var nextState = _this.getCurrentState();
                if (!shallowEqual(nextState, _this.state)) {
                    _this.setState(nextState);
                }
            };
            _this.disposable = new disposables_1.SerialDisposable();
            _this.receiveProps(props);
            _this.dispose();
            return _this;
        }
        DragDropContainer.prototype.getHandlerId = function () {
            return this.handlerId;
        };
        DragDropContainer.prototype.getDecoratedComponentInstance = function () {
            invariant(this.decoratedRef.current, 'In order to access an instance of the decorated component, it must either be a class component or use React.forwardRef()');
            return this.decoratedRef.current;
        };
        DragDropContainer.prototype.shouldComponentUpdate = function (nextProps, nextState) {
            return (!arePropsEqual(nextProps, this.props) ||
                !shallowEqual(nextState, this.state));
        };
        DragDropContainer.prototype.componentDidMount = function () {
            this.disposable = new disposables_1.SerialDisposable();
            this.currentType = undefined;
            this.receiveProps(this.props);
            this.handleChange();
        };
        DragDropContainer.prototype.componentDidUpdate = function (prevProps) {
            if (!arePropsEqual(this.props, prevProps)) {
                this.receiveProps(this.props);
                this.handleChange();
            }
        };
        DragDropContainer.prototype.componentWillUnmount = function () {
            this.dispose();
        };
        DragDropContainer.prototype.receiveProps = function (props) {
            if (!this.handler) {
                return;
            }
            this.handler.receiveProps(props);
            this.receiveType(getType(props));
        };
        DragDropContainer.prototype.receiveType = function (type) {
            if (!this.handlerMonitor || !this.manager || !this.handlerConnector) {
                return;
            }
            if (type === this.currentType) {
                return;
            }
            this.currentType = type;
            var _a = registerHandler(type, this.handler, this.manager), handlerId = _a[0], unregister = _a[1];
            this.handlerId = handlerId;
            this.handlerMonitor.receiveHandlerId(handlerId);
            this.handlerConnector.receiveHandlerId(handlerId);
            var globalMonitor = this.manager.getMonitor();
            var unsubscribe = globalMonitor.subscribeToStateChange(this.handleChange, { handlerIds: [handlerId] });
            this.disposable.setDisposable(new disposables_1.CompositeDisposable(new disposables_1.Disposable(unsubscribe), new disposables_1.Disposable(unregister)));
        };
        DragDropContainer.prototype.dispose = function () {
            this.disposable.dispose();
            if (this.handlerConnector) {
                this.handlerConnector.receiveHandlerId(null);
            }
        };
        DragDropContainer.prototype.getCurrentState = function () {
            if (!this.handlerConnector) {
                return {};
            }
            var nextState = collect(this.handlerConnector.hooks, this.handlerMonitor, this.props);
            if (process.env.NODE_ENV !== 'production') {
                invariant(discount_lodash_1.isPlainObject(nextState), 'Expected `collect` specified as the second argument to ' +
                    '%s for %s to return a plain object of props to inject. ' +
                    'Instead, received %s.', containerDisplayName, displayName, nextState);
            }
            return nextState;
        };
        DragDropContainer.prototype.render = function () {
            var _this = this;
            return (React.createElement(DragDropContext_1.Consumer, null, function (_a) {
                var dragDropManager = _a.dragDropManager;
                _this.receiveDragDropManager(dragDropManager);
                if (typeof requestAnimationFrame !== 'undefined') {
                    requestAnimationFrame(function () { return _this.handlerConnector.reconnect(); });
                }
                return (React.createElement(Decorated, __assign({}, _this.props, _this.getCurrentState(), { 
                    // NOTE: if Decorated is a Function Component, decoratedRef will not be populated unless it's a refforwarding component.
                    ref: isRefable_1.isRefable(Decorated) ? _this.decoratedRef : null })));
            }));
        };
        DragDropContainer.prototype.receiveDragDropManager = function (dragDropManager) {
            if (this.manager !== undefined) {
                return;
            }
            invariant(dragDropManager !== undefined, 'Could not find the drag and drop manager in the context of %s. ' +
                'Make sure to wrap the top-level component of your app with DragDropContext. ' +
                'Read more: http://react-dnd.github.io/react-dnd/docs/troubleshooting#could-not-find-the-drag-and-drop-manager-in-the-context', displayName, displayName);
            if (dragDropManager === undefined) {
                return;
            }
            this.manager = dragDropManager;
            this.handlerMonitor = createMonitor(dragDropManager);
            this.handlerConnector = createConnector(dragDropManager.getBackend());
            this.handler = createHandler(this.handlerMonitor, this.decoratedRef);
        };
        DragDropContainer.DecoratedComponent = DecoratedComponent;
        DragDropContainer.displayName = containerDisplayName + "(" + displayName + ")";
        return DragDropContainer;
    }(React.Component));
    return hoistStatics(DragDropContainer, DecoratedComponent);
}
exports.default = decorateHandler;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function registerSource(type, source, manager) {
    var registry = manager.getRegistry();
    var sourceId = registry.addSource(type, source);
    return [sourceId, function () { return registry.removeSource(sourceId); }];
}
exports.default = registerSource;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getDecoratedComponent(instanceRef) {
    var currentRef = instanceRef.current;
    if (currentRef == null) {
        return null;
    }
    else if (currentRef.decoratedRef) {
        // go through the private field in decorateHandler to avoid the invariant hit
        return currentRef.decoratedRef.current;
    }
    else {
        return currentRef;
    }
}
exports.getDecoratedComponent = getDecoratedComponent;


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var invariant = __webpack_require__(8);
var isCallingCanDrag = false;
var isCallingIsDragging = false;
var DragSourceMonitorImpl = /** @class */ (function () {
    function DragSourceMonitorImpl(manager) {
        this.sourceId = null;
        this.internalMonitor = manager.getMonitor();
    }
    DragSourceMonitorImpl.prototype.receiveHandlerId = function (sourceId) {
        this.sourceId = sourceId;
    };
    DragSourceMonitorImpl.prototype.getHandlerId = function () {
        return this.sourceId;
    };
    DragSourceMonitorImpl.prototype.canDrag = function () {
        invariant(!isCallingCanDrag, 'You may not call monitor.canDrag() inside your canDrag() implementation. ' +
            'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor');
        try {
            isCallingCanDrag = true;
            return this.internalMonitor.canDragSource(this.sourceId);
        }
        finally {
            isCallingCanDrag = false;
        }
    };
    DragSourceMonitorImpl.prototype.isDragging = function () {
        if (!this.sourceId) {
            return false;
        }
        invariant(!isCallingIsDragging, 'You may not call monitor.isDragging() inside your isDragging() implementation. ' +
            'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor');
        try {
            isCallingIsDragging = true;
            return this.internalMonitor.isDraggingSource(this.sourceId);
        }
        finally {
            isCallingIsDragging = false;
        }
    };
    DragSourceMonitorImpl.prototype.subscribeToStateChange = function (listener, options) {
        return this.internalMonitor.subscribeToStateChange(listener, options);
    };
    DragSourceMonitorImpl.prototype.isDraggingSource = function (sourceId) {
        return this.internalMonitor.isDraggingSource(sourceId);
    };
    DragSourceMonitorImpl.prototype.isOverTarget = function (targetId, options) {
        return this.internalMonitor.isOverTarget(targetId, options);
    };
    DragSourceMonitorImpl.prototype.getTargetIds = function () {
        return this.internalMonitor.getTargetIds();
    };
    DragSourceMonitorImpl.prototype.isSourcePublic = function () {
        return this.internalMonitor.isSourcePublic();
    };
    DragSourceMonitorImpl.prototype.getSourceId = function () {
        return this.internalMonitor.getSourceId();
    };
    DragSourceMonitorImpl.prototype.subscribeToOffsetChange = function (listener) {
        return this.internalMonitor.subscribeToOffsetChange(listener);
    };
    DragSourceMonitorImpl.prototype.canDragSource = function (sourceId) {
        return this.internalMonitor.canDragSource(sourceId);
    };
    DragSourceMonitorImpl.prototype.canDropOnTarget = function (targetId) {
        return this.internalMonitor.canDropOnTarget(targetId);
    };
    DragSourceMonitorImpl.prototype.getItemType = function () {
        return this.internalMonitor.getItemType();
    };
    DragSourceMonitorImpl.prototype.getItem = function () {
        return this.internalMonitor.getItem();
    };
    DragSourceMonitorImpl.prototype.getDropResult = function () {
        return this.internalMonitor.getDropResult();
    };
    DragSourceMonitorImpl.prototype.didDrop = function () {
        return this.internalMonitor.didDrop();
    };
    DragSourceMonitorImpl.prototype.getInitialClientOffset = function () {
        return this.internalMonitor.getInitialClientOffset();
    };
    DragSourceMonitorImpl.prototype.getInitialSourceClientOffset = function () {
        return this.internalMonitor.getInitialSourceClientOffset();
    };
    DragSourceMonitorImpl.prototype.getSourceClientOffset = function () {
        return this.internalMonitor.getSourceClientOffset();
    };
    DragSourceMonitorImpl.prototype.getClientOffset = function () {
        return this.internalMonitor.getClientOffset();
    };
    DragSourceMonitorImpl.prototype.getDifferenceFromInitialOffset = function () {
        return this.internalMonitor.getDifferenceFromInitialOffset();
    };
    return DragSourceMonitorImpl;
}());
exports.default = DragSourceMonitorImpl;


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var wrapConnectorHooks_1 = __webpack_require__(137);
var isRef_1 = __webpack_require__(138);
var shallowEqual = __webpack_require__(76);
var SourceConnector = /** @class */ (function () {
    function SourceConnector(backend) {
        var _this = this;
        this.backend = backend;
        this.hooks = wrapConnectorHooks_1.default({
            dragSource: function (node, options) {
                _this.dragSourceOptions = options || null;
                if (isRef_1.isRef(node)) {
                    _this.dragSourceRef = node;
                }
                else {
                    _this.dragSourceNode = node;
                }
                _this.reconnectDragSource();
            },
            dragPreview: function (node, options) {
                _this.dragPreviewOptions = options || null;
                if (isRef_1.isRef(node)) {
                    _this.dragPreviewRef = node;
                }
                else {
                    _this.dragPreviewNode = node;
                }
                _this.reconnectDragPreview();
            },
        });
        this.handlerId = null;
        // The drop target may either be attached via ref or connect function
        this.dragSourceRef = null;
        this.dragSourceOptionsInternal = null;
        // The drag preview may either be attached via ref or connect function
        this.dragPreviewRef = null;
        this.dragPreviewOptionsInternal = null;
        this.lastConnectedHandlerId = null;
        this.lastConnectedDragSource = null;
        this.lastConnectedDragSourceOptions = null;
        this.lastConnectedDragPreview = null;
        this.lastConnectedDragPreviewOptions = null;
    }
    SourceConnector.prototype.receiveHandlerId = function (newHandlerId) {
        if (this.handlerId === newHandlerId) {
            return;
        }
        this.handlerId = newHandlerId;
        this.reconnect();
    };
    Object.defineProperty(SourceConnector.prototype, "connectTarget", {
        get: function () {
            return this.dragSource;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SourceConnector.prototype, "dragSourceOptions", {
        get: function () {
            return this.dragSourceOptionsInternal;
        },
        set: function (options) {
            this.dragSourceOptionsInternal = options;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SourceConnector.prototype, "dragPreviewOptions", {
        get: function () {
            return this.dragPreviewOptionsInternal;
        },
        set: function (options) {
            this.dragPreviewOptionsInternal = options;
        },
        enumerable: true,
        configurable: true
    });
    SourceConnector.prototype.reconnect = function () {
        this.reconnectDragSource();
        this.reconnectDragPreview();
    };
    SourceConnector.prototype.reconnectDragSource = function () {
        var dragSource = this.dragSource;
        if (!this.handlerId || !dragSource) {
            return;
        }
        // if nothing has changed then don't resubscribe
        if (this.didHandlerIdChange() ||
            this.didConnectedDragSourceChange() ||
            this.didDragSourceOptionsChange()) {
            this.disconnectDragSource();
            this.lastConnectedHandlerId = this.handlerId;
            this.lastConnectedDragSource = dragSource;
            this.lastConnectedDragSourceOptions = this.dragSourceOptions;
            this.dragSourceUnsubscribe = this.backend.connectDragSource(this.handlerId, dragSource, this.dragSourceOptions);
        }
    };
    SourceConnector.prototype.reconnectDragPreview = function () {
        var dragPreview = this.dragPreview;
        if (!this.handlerId || !dragPreview) {
            return;
        }
        // if nothing has changed then don't resubscribe
        if (this.didHandlerIdChange() ||
            this.didConnectedDragPreviewChange() ||
            this.didDragPreviewOptionsChange()) {
            this.disconnectDragPreview();
            this.lastConnectedHandlerId = this.handlerId;
            this.lastConnectedDragPreview = dragPreview;
            this.lastConnectedDragPreviewOptions = this.dragPreviewOptions;
            this.dragPreviewUnsubscribe = this.backend.connectDragPreview(this.handlerId, dragPreview, this.dragPreviewOptions);
        }
    };
    SourceConnector.prototype.didHandlerIdChange = function () {
        return this.lastConnectedHandlerId !== this.handlerId;
    };
    SourceConnector.prototype.didConnectedDragSourceChange = function () {
        return this.lastConnectedDragSource !== this.dragSource;
    };
    SourceConnector.prototype.didConnectedDragPreviewChange = function () {
        return this.lastConnectedDragPreview !== this.dragPreview;
    };
    SourceConnector.prototype.didDragSourceOptionsChange = function () {
        return !shallowEqual(this.lastConnectedDragSourceOptions, this.dragSourceOptions);
    };
    SourceConnector.prototype.didDragPreviewOptionsChange = function () {
        return !shallowEqual(this.lastConnectedDragPreviewOptions, this.dragPreviewOptions);
    };
    SourceConnector.prototype.disconnectDragSource = function () {
        if (this.dragSourceUnsubscribe) {
            this.dragSourceUnsubscribe();
            this.dragSourceUnsubscribe = undefined;
            this.dragPreviewNode = null;
            this.dragPreviewRef = null;
        }
    };
    SourceConnector.prototype.disconnectDragPreview = function () {
        if (this.dragPreviewUnsubscribe) {
            this.dragPreviewUnsubscribe();
            this.dragPreviewUnsubscribe = undefined;
            this.dragPreviewNode = null;
            this.dragPreviewRef = null;
        }
    };
    Object.defineProperty(SourceConnector.prototype, "dragSource", {
        get: function () {
            return (this.dragSourceNode || (this.dragSourceRef && this.dragSourceRef.current));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SourceConnector.prototype, "dragPreview", {
        get: function () {
            return (this.dragPreviewNode ||
                (this.dragPreviewRef && this.dragPreviewRef.current));
        },
        enumerable: true,
        configurable: true
    });
    return SourceConnector;
}());
exports.default = SourceConnector;


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(0);
var cloneWithRef_1 = __webpack_require__(270);
__webpack_require__(271);
function throwIfCompositeComponentElement(element) {
    // Custom components can no longer be wrapped directly in React DnD 2.0
    // so that we don't need to depend on findDOMNode() from react-dom.
    if (typeof element.type === 'string') {
        return;
    }
    var displayName = element.type.displayName || element.type.name || 'the component';
    throw new Error('Only native element nodes can now be passed to React DnD connectors.' +
        ("You can either wrap " + displayName + " into a <div>, or turn it into a ") +
        'drag source or a drop target itself.');
}
function wrapHookToRecognizeElement(hook) {
    return function (elementOrNode, options) {
        if (elementOrNode === void 0) { elementOrNode = null; }
        if (options === void 0) { options = null; }
        // When passed a node, call the hook straight away.
        if (!react_1.isValidElement(elementOrNode)) {
            var node = elementOrNode;
            hook(node, options);
            // return the node so it can be chained (e.g. when within callback refs
            // <div ref={node => connectDragSource(connectDropTarget(node))}/>
            return node;
        }
        // If passed a ReactElement, clone it and attach this function as a ref.
        // This helps us achieve a neat API where user doesn't even know that refs
        // are being used under the hood.
        var element = elementOrNode;
        throwIfCompositeComponentElement(element);
        // When no options are passed, use the hook directly
        var ref = options ? function (node) { return hook(node, options); } : hook;
        return cloneWithRef_1.default(element, ref);
    };
}
function wrapConnectorHooks(hooks) {
    var wrappedHooks = {};
    Object.keys(hooks).forEach(function (key) {
        var hook = hooks[key];
        // ref objects should be passed straight through without wrapping
        if (key.endsWith('Ref')) {
            wrappedHooks[key] = hooks[key];
        }
        else {
            var wrappedHook_1 = wrapHookToRecognizeElement(hook);
            wrappedHooks[key] = function () { return wrappedHook_1; };
        }
    });
    return wrappedHooks;
}
exports.default = wrapConnectorHooks;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isRef(obj) {
    if (obj !== null && typeof obj === 'object') {
        var keys = Object.keys(obj);
        return keys.length === 1 && keys[0] === 'current';
    }
    return false;
}
exports.isRef = isRef;


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isValidType(type, allowArray) {
    return (typeof type === 'string' ||
        typeof type === 'symbol' ||
        (!!allowArray &&
            Array.isArray(type) &&
            type.every(function (t) { return isValidType(t, false); })));
}
exports.default = isValidType;


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function registerTarget(type, target, manager) {
    var registry = manager.getRegistry();
    var targetId = registry.addTarget(type, target);
    return [targetId, function () { return registry.removeTarget(targetId); }];
}
exports.default = registerTarget;


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var invariant = __webpack_require__(8);
var isCallingCanDrop = false;
var DropTargetMonitorImpl = /** @class */ (function () {
    function DropTargetMonitorImpl(manager) {
        this.targetId = null;
        this.internalMonitor = manager.getMonitor();
    }
    DropTargetMonitorImpl.prototype.receiveHandlerId = function (targetId) {
        this.targetId = targetId;
    };
    DropTargetMonitorImpl.prototype.getHandlerId = function () {
        return this.targetId;
    };
    DropTargetMonitorImpl.prototype.subscribeToStateChange = function (listener, options) {
        return this.internalMonitor.subscribeToStateChange(listener, options);
    };
    DropTargetMonitorImpl.prototype.canDrop = function () {
        // Cut out early if the target id has not been set. This should prevent errors
        // where the user has an older version of dnd-core like in
        // https://github.com/react-dnd/react-dnd/issues/1310
        if (!this.targetId) {
            return false;
        }
        invariant(!isCallingCanDrop, 'You may not call monitor.canDrop() inside your canDrop() implementation. ' +
            'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor');
        try {
            isCallingCanDrop = true;
            return this.internalMonitor.canDropOnTarget(this.targetId);
        }
        finally {
            isCallingCanDrop = false;
        }
    };
    DropTargetMonitorImpl.prototype.isOver = function (options) {
        if (!this.targetId) {
            return false;
        }
        return this.internalMonitor.isOverTarget(this.targetId, options);
    };
    DropTargetMonitorImpl.prototype.getItemType = function () {
        return this.internalMonitor.getItemType();
    };
    DropTargetMonitorImpl.prototype.getItem = function () {
        return this.internalMonitor.getItem();
    };
    DropTargetMonitorImpl.prototype.getDropResult = function () {
        return this.internalMonitor.getDropResult();
    };
    DropTargetMonitorImpl.prototype.didDrop = function () {
        return this.internalMonitor.didDrop();
    };
    DropTargetMonitorImpl.prototype.getInitialClientOffset = function () {
        return this.internalMonitor.getInitialClientOffset();
    };
    DropTargetMonitorImpl.prototype.getInitialSourceClientOffset = function () {
        return this.internalMonitor.getInitialSourceClientOffset();
    };
    DropTargetMonitorImpl.prototype.getSourceClientOffset = function () {
        return this.internalMonitor.getSourceClientOffset();
    };
    DropTargetMonitorImpl.prototype.getClientOffset = function () {
        return this.internalMonitor.getClientOffset();
    };
    DropTargetMonitorImpl.prototype.getDifferenceFromInitialOffset = function () {
        return this.internalMonitor.getDifferenceFromInitialOffset();
    };
    return DropTargetMonitorImpl;
}());
exports.default = DropTargetMonitorImpl;


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var wrapConnectorHooks_1 = __webpack_require__(137);
var isRef_1 = __webpack_require__(138);
var shallowEqual = __webpack_require__(76);
var TargetConnector = /** @class */ (function () {
    function TargetConnector(backend) {
        var _this = this;
        this.backend = backend;
        this.hooks = wrapConnectorHooks_1.default({
            dropTarget: function (node, options) {
                _this.dropTargetOptions = options;
                if (isRef_1.isRef(node)) {
                    _this.dropTargetRef = node;
                }
                else {
                    _this.dropTargetNode = node;
                }
                _this.reconnect();
            },
        });
        this.handlerId = null;
        // The drop target may either be attached via ref or connect function
        this.dropTargetRef = null;
        this.dropTargetOptionsInternal = null;
        this.lastConnectedHandlerId = null;
        this.lastConnectedDropTarget = null;
        this.lastConnectedDropTargetOptions = null;
    }
    Object.defineProperty(TargetConnector.prototype, "connectTarget", {
        get: function () {
            return this.dropTarget;
        },
        enumerable: true,
        configurable: true
    });
    TargetConnector.prototype.reconnect = function () {
        var dropTarget = this.dropTarget;
        if (!this.handlerId || !dropTarget) {
            return;
        }
        // if nothing has changed then don't resubscribe
        if (this.didHandlerIdChange() ||
            this.didDropTargetChange() ||
            this.didOptionsChange()) {
            this.disconnectDropTarget();
            this.lastConnectedHandlerId = this.handlerId;
            this.lastConnectedDropTarget = dropTarget;
            this.lastConnectedDropTargetOptions = this.dropTargetOptions;
            this.unsubscribeDropTarget = this.backend.connectDropTarget(this.handlerId, dropTarget, this.dropTargetOptions);
        }
    };
    TargetConnector.prototype.receiveHandlerId = function (newHandlerId) {
        if (newHandlerId === this.handlerId) {
            return;
        }
        this.handlerId = newHandlerId;
        this.reconnect();
    };
    Object.defineProperty(TargetConnector.prototype, "dropTargetOptions", {
        get: function () {
            return this.dropTargetOptionsInternal;
        },
        set: function (options) {
            this.dropTargetOptionsInternal = options;
        },
        enumerable: true,
        configurable: true
    });
    TargetConnector.prototype.didHandlerIdChange = function () {
        return this.lastConnectedHandlerId !== this.handlerId;
    };
    TargetConnector.prototype.didDropTargetChange = function () {
        return this.lastConnectedDropTarget !== this.dropTarget;
    };
    TargetConnector.prototype.didOptionsChange = function () {
        return !shallowEqual(this.lastConnectedDropTargetOptions, this.dropTargetOptions);
    };
    TargetConnector.prototype.disconnectDropTarget = function () {
        if (this.unsubscribeDropTarget) {
            this.unsubscribeDropTarget();
            this.unsubscribeDropTarget = undefined;
        }
    };
    Object.defineProperty(TargetConnector.prototype, "dropTarget", {
        get: function () {
            return (this.dropTargetNode || (this.dropTargetRef && this.dropTargetRef.current));
        },
        enumerable: true,
        configurable: true
    });
    return TargetConnector;
}());
exports.default = TargetConnector;


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(0);
var useCollector_1 = __webpack_require__(144);
function useMonitorOutput(monitor, collect, onCollect) {
    var _a = useCollector_1.useCollector(monitor, collect, onCollect), collected = _a[0], updateCollected = _a[1];
    react_1.useEffect(function subscribeToMonitorStateChange() {
        var handlerId = monitor.getHandlerId();
        if (handlerId == null) {
            return undefined;
        }
        var unsubscribe = monitor.subscribeToStateChange(updateCollected, {
            handlerIds: [handlerId],
        });
        return unsubscribe;
    }, [monitor]);
    return collected;
}
exports.useMonitorOutput = useMonitorOutput;


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// declare var require: any
// const shallowEqual = require('shallowequal')
var react_1 = __webpack_require__(0);
/**
 *
 * @param monitor The monitor to colelct state from
 * @param collect The collecting function
 * @param onUpdate A method to invoke when updates occur
 */
function useCollector(monitor, collect, onUpdate) {
    var _a = react_1.useState(function () { return collect(monitor); }), collected = _a[0], setCollected = _a[1];
    var updateCollected = function () {
        var nextValue = collect(monitor);
        // TODO: we need this shallowequal check to work
        // so that we can operate performantly, but the examples
        // are broken with it in currently
        // if (!shallowEqual(collected, nextValue)) {
        setCollected(nextValue);
        if (onUpdate) {
            onUpdate();
        }
        // }
    };
    return [collected, updateCollected];
}
exports.useCollector = useCollector;


/***/ }),
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(224);


/***/ }),
/* 224 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_tabs_assets_index_less__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_tabs_assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rc_tabs_assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dnd_html5_backend__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dnd_html5_backend___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dnd_html5_backend__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rc_tabs__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_immutability_helper__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_immutability_helper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_immutability_helper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rc_tabs_lib_SwipeableTabContent__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rc_tabs_lib_ScrollableInkTabBar__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_react_dnd__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_react_dnd___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_react_dnd__);




/* eslint react/no-multi-comp:0, no-console:0, react/prop-types:0 */










// Drag & Drop node

var TabNode = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(TabNode, _React$Component);

  function TabNode() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, TabNode);

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (TabNode.__proto__ || Object.getPrototypeOf(TabNode)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(TabNode, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          connectDragSource = _props.connectDragSource,
          connectDropTarget = _props.connectDropTarget,
          children = _props.children;


      return connectDragSource(connectDropTarget(children));
    }
  }]);

  return TabNode;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

var cardTarget = {
  drop: function drop(props, monitor) {
    var dragKey = monitor.getItem().index;
    var hoverKey = props.index;

    if (dragKey === hoverKey) {
      return;
    }

    props.moveTabNode(dragKey, hoverKey);
    monitor.getItem().index = hoverKey;
  }
};

var cardSource = {
  beginDrag: function beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

var WrapTabNode = Object(__WEBPACK_IMPORTED_MODULE_12_react_dnd__["DropTarget"])('DND_NODE', cardTarget, function (connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
})(Object(__WEBPACK_IMPORTED_MODULE_12_react_dnd__["DragSource"])('DND_NODE', cardSource, function (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
})(TabNode));

// Demo

var Demo = function (_React$Component2) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Demo, _React$Component2);

  function Demo() {
    var _ref;

    var _temp, _this2, _ret;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Demo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_ref = Demo.__proto__ || Object.getPrototypeOf(Demo)).call.apply(_ref, [this].concat(args))), _this2), _this2.state = {
      activeKey: '1',
      tabs: ['1', '2', '3']
    }, _this2.onChange = function (activeKey) {
      console.log('onChange ' + activeKey);
      _this2.setState({
        activeKey: activeKey
      });
    }, _this2.onTabClick = function (key) {
      console.log('onTabClick ' + key);
      if (key === _this2.state.activeKey) {
        _this2.setState({
          activeKey: ''
        });
      }
    }, _this2.moveTabNode = function (dragKey, hoverKey) {
      var tabs = _this2.state.tabs;

      var dragIndex = tabs.indexOf(dragKey);
      var hoverIndex = tabs.indexOf(hoverKey);
      var dragTab = _this2.state.tabs[dragIndex];
      _this2.setState(__WEBPACK_IMPORTED_MODULE_9_immutability_helper___default()(_this2.state, {
        tabs: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragTab]]
        }
      }));
    }, _this2.renderTabBarNode = function (node) {
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        WrapTabNode,
        { key: node.key, index: node.key, moveTabNode: _this2.moveTabNode },
        node
      );
    }, _temp), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(_this2, _ret);
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Demo, [{
    key: 'render',
    value: function render() {
      var _this3 = this;

      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_12_react_dnd__["DragDropContextProvider"],
        { backend: __WEBPACK_IMPORTED_MODULE_6_react_dnd_html5_backend___default.a },
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'div',
          { style: { margin: 20 } },
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'h1',
            null,
            'Simple Tabs'
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_8_rc_tabs__["b" /* default */],
            {
              renderTabBar: function renderTabBar() {
                return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                  __WEBPACK_IMPORTED_MODULE_11_rc_tabs_lib_ScrollableInkTabBar__["a" /* default */],
                  { onTabClick: _this3.onTabClick },
                  _this3.renderTabBarNode
                );
              },
              renderTabContent: function renderTabContent() {
                return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10_rc_tabs_lib_SwipeableTabContent__["a" /* default */], { animatedWithMargin: true });
              },
              activeKey: this.state.activeKey,
              onChange: this.onChange
            },
            this.state.tabs.map(function (id) {
              return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_8_rc_tabs__["a" /* TabPane */],
                { tab: 'tab ' + id, key: id },
                id
              );
            })
          )
        )
      );
    }
  }]);

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_7_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HTML5Backend_1 = __webpack_require__(226);
var getEmptyImage_1 = __webpack_require__(234);
exports.getEmptyImage = getEmptyImage_1.default;
var NativeTypes = __webpack_require__(95);
exports.NativeTypes = NativeTypes;
function createHTML5Backend(manager) {
    return new HTML5Backend_1.default(manager);
}
exports.default = createHTML5Backend;


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var EnterLeaveCounter_1 = __webpack_require__(227);
var BrowserDetector_1 = __webpack_require__(127);
var OffsetUtils_1 = __webpack_require__(228);
var NativeDragSources_1 = __webpack_require__(230);
var NativeTypes = __webpack_require__(95);
var HTML5Backend = /** @class */ (function () {
    function HTML5Backend(manager) {
        var _this = this;
        this.sourcePreviewNodes = new Map();
        this.sourcePreviewNodeOptions = new Map();
        this.sourceNodes = new Map();
        this.sourceNodeOptions = new Map();
        this.dragStartSourceIds = null;
        this.dropTargetIds = [];
        this.dragEnterTargetIds = [];
        this.currentNativeSource = null;
        this.currentNativeHandle = null;
        this.currentDragSourceNode = null;
        this.altKeyPressed = false;
        this.mouseMoveTimeoutTimer = null;
        this.asyncEndDragFrameId = null;
        this.dragOverTargetIds = null;
        this.getSourceClientOffset = function (sourceId) {
            return OffsetUtils_1.getNodeClientOffset(_this.sourceNodes.get(sourceId));
        };
        this.endDragNativeItem = function () {
            if (!_this.isDraggingNativeItem()) {
                return;
            }
            _this.actions.endDrag();
            _this.registry.removeSource(_this.currentNativeHandle);
            _this.currentNativeHandle = null;
            _this.currentNativeSource = null;
        };
        this.isNodeInDocument = function (node) {
            // Check the node either in the main document or in the current context
            return ((!!document && document.body.contains(node)) ||
                (!!_this.window && _this.window.document.body.contains(node)));
        };
        this.endDragIfSourceWasRemovedFromDOM = function () {
            var node = _this.currentDragSourceNode;
            if (_this.isNodeInDocument(node)) {
                return;
            }
            if (_this.clearCurrentDragSourceNode()) {
                _this.actions.endDrag();
            }
        };
        this.handleTopDragStartCapture = function () {
            _this.clearCurrentDragSourceNode();
            _this.dragStartSourceIds = [];
        };
        this.handleTopDragStart = function (e) {
            var dragStartSourceIds = _this.dragStartSourceIds;
            _this.dragStartSourceIds = null;
            var clientOffset = OffsetUtils_1.getEventClientOffset(e);
            // Avoid crashing if we missed a drop event or our previous drag died
            if (_this.monitor.isDragging()) {
                _this.actions.endDrag();
            }
            // Don't publish the source just yet (see why below)
            _this.actions.beginDrag(dragStartSourceIds || [], {
                publishSource: false,
                getSourceClientOffset: _this.getSourceClientOffset,
                clientOffset: clientOffset,
            });
            var dataTransfer = e.dataTransfer;
            var nativeType = NativeDragSources_1.matchNativeItemType(dataTransfer);
            if (_this.monitor.isDragging()) {
                if (dataTransfer && typeof dataTransfer.setDragImage === 'function') {
                    // Use custom drag image if user specifies it.
                    // If child drag source refuses drag but parent agrees,
                    // use parent's node as drag image. Neither works in IE though.
                    var sourceId = _this.monitor.getSourceId();
                    var sourceNode = _this.sourceNodes.get(sourceId);
                    var dragPreview = _this.sourcePreviewNodes.get(sourceId) || sourceNode;
                    if (dragPreview) {
                        var _a = _this.getCurrentSourcePreviewNodeOptions(), anchorX = _a.anchorX, anchorY = _a.anchorY, offsetX = _a.offsetX, offsetY = _a.offsetY;
                        var anchorPoint = { anchorX: anchorX, anchorY: anchorY };
                        var offsetPoint = { offsetX: offsetX, offsetY: offsetY };
                        var dragPreviewOffset = OffsetUtils_1.getDragPreviewOffset(sourceNode, dragPreview, clientOffset, anchorPoint, offsetPoint);
                        dataTransfer.setDragImage(dragPreview, dragPreviewOffset.x, dragPreviewOffset.y);
                    }
                }
                try {
                    // Firefox won't drag without setting data
                    dataTransfer.setData('application/json', {});
                }
                catch (err) {
                    // IE doesn't support MIME types in setData
                }
                // Store drag source node so we can check whether
                // it is removed from DOM and trigger endDrag manually.
                _this.setCurrentDragSourceNode(e.target);
                // Now we are ready to publish the drag source.. or are we not?
                var captureDraggingState = _this.getCurrentSourcePreviewNodeOptions().captureDraggingState;
                if (!captureDraggingState) {
                    // Usually we want to publish it in the next tick so that browser
                    // is able to screenshot the current (not yet dragging) state.
                    //
                    // It also neatly avoids a situation where render() returns null
                    // in the same tick for the source element, and browser freaks out.
                    setTimeout(function () { return _this.actions.publishDragSource(); }, 0);
                }
                else {
                    // In some cases the user may want to override this behavior, e.g.
                    // to work around IE not supporting custom drag previews.
                    //
                    // When using a custom drag layer, the only way to prevent
                    // the default drag preview from drawing in IE is to screenshot
                    // the dragging state in which the node itself has zero opacity
                    // and height. In this case, though, returning null from render()
                    // will abruptly end the dragging, which is not obvious.
                    //
                    // This is the reason such behavior is strictly opt-in.
                    _this.actions.publishDragSource();
                }
            }
            else if (nativeType) {
                // A native item (such as URL) dragged from inside the document
                _this.beginDragNativeItem(nativeType);
            }
            else if (dataTransfer &&
                !dataTransfer.types &&
                ((e.target && !e.target.hasAttribute) ||
                    !e.target.hasAttribute('draggable'))) {
                // Looks like a Safari bug: dataTransfer.types is null, but there was no draggable.
                // Just let it drag. It's a native type (URL or text) and will be picked up in
                // dragenter handler.
                return;
            }
            else {
                // If by this time no drag source reacted, tell browser not to drag.
                e.preventDefault();
            }
        };
        this.handleTopDragEndCapture = function () {
            if (_this.clearCurrentDragSourceNode()) {
                // Firefox can dispatch this event in an infinite loop
                // if dragend handler does something like showing an alert.
                // Only proceed if we have not handled it already.
                _this.actions.endDrag();
            }
        };
        this.handleTopDragEnterCapture = function (e) {
            _this.dragEnterTargetIds = [];
            var isFirstEnter = _this.enterLeaveCounter.enter(e.target);
            if (!isFirstEnter || _this.monitor.isDragging()) {
                return;
            }
            var dataTransfer = e.dataTransfer;
            var nativeType = NativeDragSources_1.matchNativeItemType(dataTransfer);
            if (nativeType) {
                // A native item (such as file or URL) dragged from outside the document
                _this.beginDragNativeItem(nativeType);
            }
        };
        this.handleTopDragEnter = function (e) {
            var dragEnterTargetIds = _this.dragEnterTargetIds;
            _this.dragEnterTargetIds = [];
            if (!_this.monitor.isDragging()) {
                // This is probably a native item type we don't understand.
                return;
            }
            _this.altKeyPressed = e.altKey;
            if (!BrowserDetector_1.isFirefox()) {
                // Don't emit hover in `dragenter` on Firefox due to an edge case.
                // If the target changes position as the result of `dragenter`, Firefox
                // will still happily dispatch `dragover` despite target being no longer
                // there. The easy solution is to only fire `hover` in `dragover` on FF.
                _this.actions.hover(dragEnterTargetIds, {
                    clientOffset: OffsetUtils_1.getEventClientOffset(e),
                });
            }
            var canDrop = dragEnterTargetIds.some(function (targetId) {
                return _this.monitor.canDropOnTarget(targetId);
            });
            if (canDrop) {
                // IE requires this to fire dragover events
                e.preventDefault();
                if (e.dataTransfer) {
                    e.dataTransfer.dropEffect = _this.getCurrentDropEffect();
                }
            }
        };
        this.handleTopDragOverCapture = function () {
            _this.dragOverTargetIds = [];
        };
        this.handleTopDragOver = function (e) {
            var dragOverTargetIds = _this.dragOverTargetIds;
            _this.dragOverTargetIds = [];
            if (!_this.monitor.isDragging()) {
                // This is probably a native item type we don't understand.
                // Prevent default "drop and blow away the whole document" action.
                e.preventDefault();
                if (e.dataTransfer) {
                    e.dataTransfer.dropEffect = 'none';
                }
                return;
            }
            _this.altKeyPressed = e.altKey;
            _this.actions.hover(dragOverTargetIds || [], {
                clientOffset: OffsetUtils_1.getEventClientOffset(e),
            });
            var canDrop = (dragOverTargetIds || []).some(function (targetId) {
                return _this.monitor.canDropOnTarget(targetId);
            });
            if (canDrop) {
                // Show user-specified drop effect.
                e.preventDefault();
                if (e.dataTransfer) {
                    e.dataTransfer.dropEffect = _this.getCurrentDropEffect();
                }
            }
            else if (_this.isDraggingNativeItem()) {
                // Don't show a nice cursor but still prevent default
                // "drop and blow away the whole document" action.
                e.preventDefault();
            }
            else {
                e.preventDefault();
                if (e.dataTransfer) {
                    e.dataTransfer.dropEffect = 'none';
                }
            }
        };
        this.handleTopDragLeaveCapture = function (e) {
            if (_this.isDraggingNativeItem()) {
                e.preventDefault();
            }
            var isLastLeave = _this.enterLeaveCounter.leave(e.target);
            if (!isLastLeave) {
                return;
            }
            if (_this.isDraggingNativeItem()) {
                _this.endDragNativeItem();
            }
        };
        this.handleTopDropCapture = function (e) {
            _this.dropTargetIds = [];
            e.preventDefault();
            if (_this.isDraggingNativeItem()) {
                _this.currentNativeSource.mutateItemByReadingDataTransfer(e.dataTransfer);
            }
            _this.enterLeaveCounter.reset();
        };
        this.handleTopDrop = function (e) {
            var dropTargetIds = _this.dropTargetIds;
            _this.dropTargetIds = [];
            _this.actions.hover(dropTargetIds, {
                clientOffset: OffsetUtils_1.getEventClientOffset(e),
            });
            _this.actions.drop({ dropEffect: _this.getCurrentDropEffect() });
            if (_this.isDraggingNativeItem()) {
                _this.endDragNativeItem();
            }
            else {
                _this.endDragIfSourceWasRemovedFromDOM();
            }
        };
        this.handleSelectStart = function (e) {
            var target = e.target;
            // Only IE requires us to explicitly say
            // we want drag drop operation to start
            if (typeof target.dragDrop !== 'function') {
                return;
            }
            // Inputs and textareas should be selectable
            if (target.tagName === 'INPUT' ||
                target.tagName === 'SELECT' ||
                target.tagName === 'TEXTAREA' ||
                target.isContentEditable) {
                return;
            }
            // For other targets, ask IE
            // to enable drag and drop
            e.preventDefault();
            target.dragDrop();
        };
        this.actions = manager.getActions();
        this.monitor = manager.getMonitor();
        this.registry = manager.getRegistry();
        this.context = manager.getContext();
        this.enterLeaveCounter = new EnterLeaveCounter_1.default(this.isNodeInDocument);
    }
    Object.defineProperty(HTML5Backend.prototype, "window", {
        // public for test
        get: function () {
            if (this.context && this.context.window) {
                return this.context.window;
            }
            else if (typeof window !== 'undefined') {
                return window;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    HTML5Backend.prototype.setup = function () {
        if (this.window === undefined) {
            return;
        }
        if (this.window.__isReactDndBackendSetUp) {
            throw new Error('Cannot have two HTML5 backends at the same time.');
        }
        this.window.__isReactDndBackendSetUp = true;
        this.addEventListeners(this.window);
    };
    HTML5Backend.prototype.teardown = function () {
        if (this.window === undefined) {
            return;
        }
        this.window.__isReactDndBackendSetUp = false;
        this.removeEventListeners(this.window);
        this.clearCurrentDragSourceNode();
        if (this.asyncEndDragFrameId) {
            this.window.cancelAnimationFrame(this.asyncEndDragFrameId);
        }
    };
    HTML5Backend.prototype.connectDragPreview = function (sourceId, node, options) {
        var _this = this;
        this.sourcePreviewNodeOptions.set(sourceId, options);
        this.sourcePreviewNodes.set(sourceId, node);
        return function () {
            _this.sourcePreviewNodes.delete(sourceId);
            _this.sourcePreviewNodeOptions.delete(sourceId);
        };
    };
    HTML5Backend.prototype.connectDragSource = function (sourceId, node, options) {
        var _this = this;
        this.sourceNodes.set(sourceId, node);
        this.sourceNodeOptions.set(sourceId, options);
        var handleDragStart = function (e) { return _this.handleDragStart(e, sourceId); };
        var handleSelectStart = function (e) { return _this.handleSelectStart(e); };
        node.setAttribute('draggable', 'true');
        node.addEventListener('dragstart', handleDragStart);
        node.addEventListener('selectstart', handleSelectStart);
        return function () {
            _this.sourceNodes.delete(sourceId);
            _this.sourceNodeOptions.delete(sourceId);
            node.removeEventListener('dragstart', handleDragStart);
            node.removeEventListener('selectstart', handleSelectStart);
            node.setAttribute('draggable', 'false');
        };
    };
    HTML5Backend.prototype.connectDropTarget = function (targetId, node) {
        var _this = this;
        var handleDragEnter = function (e) { return _this.handleDragEnter(e, targetId); };
        var handleDragOver = function (e) { return _this.handleDragOver(e, targetId); };
        var handleDrop = function (e) { return _this.handleDrop(e, targetId); };
        node.addEventListener('dragenter', handleDragEnter);
        node.addEventListener('dragover', handleDragOver);
        node.addEventListener('drop', handleDrop);
        return function () {
            node.removeEventListener('dragenter', handleDragEnter);
            node.removeEventListener('dragover', handleDragOver);
            node.removeEventListener('drop', handleDrop);
        };
    };
    HTML5Backend.prototype.addEventListeners = function (target) {
        // SSR Fix (https://github.com/react-dnd/react-dnd/pull/813
        if (!target.addEventListener) {
            return;
        }
        target.addEventListener('dragstart', this
            .handleTopDragStart);
        target.addEventListener('dragstart', this.handleTopDragStartCapture, true);
        target.addEventListener('dragend', this.handleTopDragEndCapture, true);
        target.addEventListener('dragenter', this
            .handleTopDragEnter);
        target.addEventListener('dragenter', this.handleTopDragEnterCapture, true);
        target.addEventListener('dragleave', this.handleTopDragLeaveCapture, true);
        target.addEventListener('dragover', this.handleTopDragOver);
        target.addEventListener('dragover', this.handleTopDragOverCapture, true);
        target.addEventListener('drop', this.handleTopDrop);
        target.addEventListener('drop', this.handleTopDropCapture, true);
    };
    HTML5Backend.prototype.removeEventListeners = function (target) {
        // SSR Fix (https://github.com/react-dnd/react-dnd/pull/813
        if (!target.removeEventListener) {
            return;
        }
        target.removeEventListener('dragstart', this.handleTopDragStart);
        target.removeEventListener('dragstart', this.handleTopDragStartCapture, true);
        target.removeEventListener('dragend', this.handleTopDragEndCapture, true);
        target.removeEventListener('dragenter', this
            .handleTopDragEnter);
        target.removeEventListener('dragenter', this.handleTopDragEnterCapture, true);
        target.removeEventListener('dragleave', this.handleTopDragLeaveCapture, true);
        target.removeEventListener('dragover', this
            .handleTopDragOver);
        target.removeEventListener('dragover', this.handleTopDragOverCapture, true);
        target.removeEventListener('drop', this.handleTopDrop);
        target.removeEventListener('drop', this.handleTopDropCapture, true);
    };
    HTML5Backend.prototype.getCurrentSourceNodeOptions = function () {
        var sourceId = this.monitor.getSourceId();
        var sourceNodeOptions = this.sourceNodeOptions.get(sourceId);
        return __assign({ dropEffect: this.altKeyPressed ? 'copy' : 'move' }, (sourceNodeOptions || {}));
    };
    HTML5Backend.prototype.getCurrentDropEffect = function () {
        if (this.isDraggingNativeItem()) {
            // It makes more sense to default to 'copy' for native resources
            return 'copy';
        }
        return this.getCurrentSourceNodeOptions().dropEffect;
    };
    HTML5Backend.prototype.getCurrentSourcePreviewNodeOptions = function () {
        var sourceId = this.monitor.getSourceId();
        var sourcePreviewNodeOptions = this.sourcePreviewNodeOptions.get(sourceId);
        return __assign({ anchorX: 0.5, anchorY: 0.5, captureDraggingState: false }, (sourcePreviewNodeOptions || {}));
    };
    HTML5Backend.prototype.isDraggingNativeItem = function () {
        var itemType = this.monitor.getItemType();
        return Object.keys(NativeTypes).some(function (key) { return NativeTypes[key] === itemType; });
    };
    HTML5Backend.prototype.beginDragNativeItem = function (type) {
        this.clearCurrentDragSourceNode();
        this.currentNativeSource = NativeDragSources_1.createNativeDragSource(type);
        this.currentNativeHandle = this.registry.addSource(type, this.currentNativeSource);
        this.actions.beginDrag([this.currentNativeHandle]);
    };
    HTML5Backend.prototype.setCurrentDragSourceNode = function (node) {
        var _this = this;
        this.clearCurrentDragSourceNode();
        this.currentDragSourceNode = node;
        // A timeout of > 0 is necessary to resolve Firefox issue referenced
        // See:
        //   * https://github.com/react-dnd/react-dnd/pull/928
        //   * https://github.com/react-dnd/react-dnd/issues/869
        var MOUSE_MOVE_TIMEOUT = 1000;
        // Receiving a mouse event in the middle of a dragging operation
        // means it has ended and the drag source node disappeared from DOM,
        // so the browser didn't dispatch the dragend event.
        //
        // We need to wait before we start listening for mousemove events.
        // This is needed because the drag preview needs to be drawn or else it fires an 'mousemove' event
        // immediately in some browsers.
        //
        // See:
        //   * https://github.com/react-dnd/react-dnd/pull/928
        //   * https://github.com/react-dnd/react-dnd/issues/869
        //
        this.mouseMoveTimeoutTimer = setTimeout(function () {
            return (_this.window &&
                _this.window.addEventListener('mousemove', _this.endDragIfSourceWasRemovedFromDOM, true));
        }, MOUSE_MOVE_TIMEOUT);
    };
    HTML5Backend.prototype.clearCurrentDragSourceNode = function () {
        if (this.currentDragSourceNode) {
            this.currentDragSourceNode = null;
            if (this.window) {
                this.window.clearTimeout(this.mouseMoveTimeoutTimer || undefined);
                this.window.removeEventListener('mousemove', this.endDragIfSourceWasRemovedFromDOM, true);
            }
            this.mouseMoveTimeoutTimer = null;
            return true;
        }
        return false;
    };
    HTML5Backend.prototype.handleDragStart = function (e, sourceId) {
        if (!this.dragStartSourceIds) {
            this.dragStartSourceIds = [];
        }
        this.dragStartSourceIds.unshift(sourceId);
    };
    HTML5Backend.prototype.handleDragEnter = function (e, targetId) {
        this.dragEnterTargetIds.unshift(targetId);
    };
    HTML5Backend.prototype.handleDragOver = function (e, targetId) {
        if (this.dragOverTargetIds === null) {
            this.dragOverTargetIds = [];
        }
        this.dragOverTargetIds.unshift(targetId);
    };
    HTML5Backend.prototype.handleDrop = function (e, targetId) {
        this.dropTargetIds.unshift(targetId);
    };
    return HTML5Backend;
}());
exports.default = HTML5Backend;


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var discount_lodash_1 = __webpack_require__(126);
var EnterLeaveCounter = /** @class */ (function () {
    function EnterLeaveCounter(isNodeInDocument) {
        this.entered = [];
        this.isNodeInDocument = isNodeInDocument;
    }
    EnterLeaveCounter.prototype.enter = function (enteringNode) {
        var _this = this;
        var previousLength = this.entered.length;
        var isNodeEntered = function (node) {
            return _this.isNodeInDocument(node) &&
                (!node.contains || node.contains(enteringNode));
        };
        this.entered = discount_lodash_1.union(this.entered.filter(isNodeEntered), [enteringNode]);
        return previousLength === 0 && this.entered.length > 0;
    };
    EnterLeaveCounter.prototype.leave = function (leavingNode) {
        var previousLength = this.entered.length;
        this.entered = discount_lodash_1.without(this.entered.filter(this.isNodeInDocument), leavingNode);
        return previousLength > 0 && this.entered.length === 0;
    };
    EnterLeaveCounter.prototype.reset = function () {
        this.entered = [];
    };
    return EnterLeaveCounter;
}());
exports.default = EnterLeaveCounter;


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BrowserDetector_1 = __webpack_require__(127);
var MonotonicInterpolant_1 = __webpack_require__(229);
var ELEMENT_NODE = 1;
function getNodeClientOffset(node) {
    var el = node.nodeType === ELEMENT_NODE ? node : node.parentElement;
    if (!el) {
        return null;
    }
    var _a = el.getBoundingClientRect(), top = _a.top, left = _a.left;
    return { x: left, y: top };
}
exports.getNodeClientOffset = getNodeClientOffset;
function getEventClientOffset(e) {
    return {
        x: e.clientX,
        y: e.clientY,
    };
}
exports.getEventClientOffset = getEventClientOffset;
function isImageNode(node) {
    return (node.nodeName === 'IMG' &&
        (BrowserDetector_1.isFirefox() || !document.documentElement.contains(node)));
}
function getDragPreviewSize(isImage, dragPreview, sourceWidth, sourceHeight) {
    var dragPreviewWidth = isImage ? dragPreview.width : sourceWidth;
    var dragPreviewHeight = isImage ? dragPreview.height : sourceHeight;
    // Work around @2x coordinate discrepancies in browsers
    if (BrowserDetector_1.isSafari() && isImage) {
        dragPreviewHeight /= window.devicePixelRatio;
        dragPreviewWidth /= window.devicePixelRatio;
    }
    return { dragPreviewWidth: dragPreviewWidth, dragPreviewHeight: dragPreviewHeight };
}
function getDragPreviewOffset(sourceNode, dragPreview, clientOffset, anchorPoint, offsetPoint) {
    // The browsers will use the image intrinsic size under different conditions.
    // Firefox only cares if it's an image, but WebKit also wants it to be detached.
    var isImage = isImageNode(dragPreview);
    var dragPreviewNode = isImage ? sourceNode : dragPreview;
    var dragPreviewNodeOffsetFromClient = getNodeClientOffset(dragPreviewNode);
    var offsetFromDragPreview = {
        x: clientOffset.x - dragPreviewNodeOffsetFromClient.x,
        y: clientOffset.y - dragPreviewNodeOffsetFromClient.y,
    };
    var sourceWidth = sourceNode.offsetWidth, sourceHeight = sourceNode.offsetHeight;
    var anchorX = anchorPoint.anchorX, anchorY = anchorPoint.anchorY;
    var _a = getDragPreviewSize(isImage, dragPreview, sourceWidth, sourceHeight), dragPreviewWidth = _a.dragPreviewWidth, dragPreviewHeight = _a.dragPreviewHeight;
    var calculateYOffset = function () {
        var interpolantY = new MonotonicInterpolant_1.default([0, 0.5, 1], [
            // Dock to the top
            offsetFromDragPreview.y,
            // Align at the center
            (offsetFromDragPreview.y / sourceHeight) * dragPreviewHeight,
            // Dock to the bottom
            offsetFromDragPreview.y + dragPreviewHeight - sourceHeight,
        ]);
        var y = interpolantY.interpolate(anchorY);
        // Work around Safari 8 positioning bug
        if (BrowserDetector_1.isSafari() && isImage) {
            // We'll have to wait for @3x to see if this is entirely correct
            y += (window.devicePixelRatio - 1) * dragPreviewHeight;
        }
        return y;
    };
    var calculateXOffset = function () {
        // Interpolate coordinates depending on anchor point
        // If you know a simpler way to do this, let me know
        var interpolantX = new MonotonicInterpolant_1.default([0, 0.5, 1], [
            // Dock to the left
            offsetFromDragPreview.x,
            // Align at the center
            (offsetFromDragPreview.x / sourceWidth) * dragPreviewWidth,
            // Dock to the right
            offsetFromDragPreview.x + dragPreviewWidth - sourceWidth,
        ]);
        return interpolantX.interpolate(anchorX);
    };
    // Force offsets if specified in the options.
    var offsetX = offsetPoint.offsetX, offsetY = offsetPoint.offsetY;
    var isManualOffsetX = offsetX === 0 || offsetX;
    var isManualOffsetY = offsetY === 0 || offsetY;
    return {
        x: isManualOffsetX ? offsetX : calculateXOffset(),
        y: isManualOffsetY ? offsetY : calculateYOffset(),
    };
}
exports.getDragPreviewOffset = getDragPreviewOffset;


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MonotonicInterpolant = /** @class */ (function () {
    function MonotonicInterpolant(xs, ys) {
        var length = xs.length;
        // Rearrange xs and ys so that xs is sorted
        var indexes = [];
        for (var i = 0; i < length; i++) {
            indexes.push(i);
        }
        indexes.sort(function (a, b) { return (xs[a] < xs[b] ? -1 : 1); });
        // Get consecutive differences and slopes
        var dys = [];
        var dxs = [];
        var ms = [];
        var dx;
        var dy;
        for (var i = 0; i < length - 1; i++) {
            dx = xs[i + 1] - xs[i];
            dy = ys[i + 1] - ys[i];
            dxs.push(dx);
            dys.push(dy);
            ms.push(dy / dx);
        }
        // Get degree-1 coefficients
        var c1s = [ms[0]];
        for (var i = 0; i < dxs.length - 1; i++) {
            var m2 = ms[i];
            var mNext = ms[i + 1];
            if (m2 * mNext <= 0) {
                c1s.push(0);
            }
            else {
                dx = dxs[i];
                var dxNext = dxs[i + 1];
                var common = dx + dxNext;
                c1s.push(3 * common / ((common + dxNext) / m2 + (common + dx) / mNext));
            }
        }
        c1s.push(ms[ms.length - 1]);
        // Get degree-2 and degree-3 coefficients
        var c2s = [];
        var c3s = [];
        var m;
        for (var i = 0; i < c1s.length - 1; i++) {
            m = ms[i];
            var c1 = c1s[i];
            var invDx = 1 / dxs[i];
            var common = c1 + c1s[i + 1] - m - m;
            c2s.push((m - c1 - common) * invDx);
            c3s.push(common * invDx * invDx);
        }
        this.xs = xs;
        this.ys = ys;
        this.c1s = c1s;
        this.c2s = c2s;
        this.c3s = c3s;
    }
    MonotonicInterpolant.prototype.interpolate = function (x) {
        var _a = this, xs = _a.xs, ys = _a.ys, c1s = _a.c1s, c2s = _a.c2s, c3s = _a.c3s;
        // The rightmost point in the dataset should give an exact result
        var i = xs.length - 1;
        if (x === xs[i]) {
            return ys[i];
        }
        // Search for the interval x is in, returning the corresponding y if x is one of the original xs
        var low = 0;
        var high = c3s.length - 1;
        var mid;
        while (low <= high) {
            mid = Math.floor(0.5 * (low + high));
            var xHere = xs[mid];
            if (xHere < x) {
                low = mid + 1;
            }
            else if (xHere > x) {
                high = mid - 1;
            }
            else {
                return ys[mid];
            }
        }
        i = Math.max(0, high);
        // Interpolate
        var diff = x - xs[i];
        var diffSq = diff * diff;
        return ys[i] + c1s[i] * diff + c2s[i] * diffSq + c3s[i] * diff * diffSq;
    };
    return MonotonicInterpolant;
}());
exports.default = MonotonicInterpolant;


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nativeTypesConfig_1 = __webpack_require__(231);
var NativeDragSource_1 = __webpack_require__(233);
function createNativeDragSource(type) {
    return new NativeDragSource_1.NativeDragSource(nativeTypesConfig_1.nativeTypesConfig[type]);
}
exports.createNativeDragSource = createNativeDragSource;
function matchNativeItemType(dataTransfer) {
    if (!dataTransfer) {
        return null;
    }
    var dataTransferTypes = Array.prototype.slice.call(dataTransfer.types || []);
    return (Object.keys(nativeTypesConfig_1.nativeTypesConfig).filter(function (nativeItemType) {
        var matchesTypes = nativeTypesConfig_1.nativeTypesConfig[nativeItemType].matchesTypes;
        return matchesTypes.some(function (t) { return dataTransferTypes.indexOf(t) > -1; });
    })[0] || null);
}
exports.matchNativeItemType = matchNativeItemType;


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var NativeTypes = __webpack_require__(95);
var getDataFromDataTransfer_1 = __webpack_require__(232);
exports.nativeTypesConfig = (_a = {},
    _a[NativeTypes.FILE] = {
        exposeProperties: {
            files: function (dataTransfer) {
                return Array.prototype.slice.call(dataTransfer.files);
            },
            items: function (dataTransfer) { return dataTransfer.items; },
        },
        matchesTypes: ['Files'],
    },
    _a[NativeTypes.URL] = {
        exposeProperties: {
            urls: function (dataTransfer, matchesTypes) {
                return getDataFromDataTransfer_1.getDataFromDataTransfer(dataTransfer, matchesTypes, '').split('\n');
            },
        },
        matchesTypes: ['Url', 'text/uri-list'],
    },
    _a[NativeTypes.TEXT] = {
        exposeProperties: {
            text: function (dataTransfer, matchesTypes) {
                return getDataFromDataTransfer_1.getDataFromDataTransfer(dataTransfer, matchesTypes, '');
            },
        },
        matchesTypes: ['Text', 'text/plain'],
    },
    _a);


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getDataFromDataTransfer(dataTransfer, typesToTry, defaultValue) {
    var result = typesToTry.reduce(function (resultSoFar, typeToTry) { return resultSoFar || dataTransfer.getData(typeToTry); }, '');
    return result != null ? result : defaultValue;
}
exports.getDataFromDataTransfer = getDataFromDataTransfer;


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NativeDragSource = /** @class */ (function () {
    function NativeDragSource(config) {
        var _this = this;
        this.config = config;
        this.item = {};
        Object.keys(this.config.exposeProperties).forEach(function (property) {
            Object.defineProperty(_this.item, property, {
                configurable: true,
                enumerable: true,
                get: function () {
                    // tslint:disable-next-line no-console
                    console.warn("Browser doesn't allow reading \"" + property + "\" until the drop event.");
                    return null;
                },
            });
        });
    }
    NativeDragSource.prototype.mutateItemByReadingDataTransfer = function (dataTransfer) {
        var _this = this;
        var newProperties = {};
        if (dataTransfer) {
            Object.keys(this.config.exposeProperties).forEach(function (property) {
                newProperties[property] = {
                    value: _this.config.exposeProperties[property](dataTransfer, _this.config.matchesTypes),
                };
            });
        }
        Object.defineProperties(this.item, newProperties);
    };
    NativeDragSource.prototype.canDrag = function () {
        return true;
    };
    NativeDragSource.prototype.beginDrag = function () {
        return this.item;
    };
    NativeDragSource.prototype.isDragging = function (monitor, handle) {
        return handle === monitor.getSourceId();
    };
    NativeDragSource.prototype.endDrag = function () {
        // empty
    };
    return NativeDragSource;
}());
exports.NativeDragSource = NativeDragSource;


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var emptyImage;
function getEmptyImage() {
    if (!emptyImage) {
        emptyImage = new Image();
        emptyImage.src =
            'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    }
    return emptyImage;
}
exports.default = getEmptyImage;


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

var invariant = __webpack_require__(8);

var hasOwnProperty = Object.prototype.hasOwnProperty;
var splice = Array.prototype.splice;

var toString = Object.prototype.toString
var type = function(obj) {
  return toString.call(obj).slice(8, -1);
}

var assign = Object.assign || /* istanbul ignore next */ function assign(target, source) {
  getAllKeys(source).forEach(function(key) {
    if (hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  });
  return target;
};

var getAllKeys = typeof Object.getOwnPropertySymbols === 'function' ?
  function(obj) { return Object.keys(obj).concat(Object.getOwnPropertySymbols(obj)) } :
  /* istanbul ignore next */ function(obj) { return Object.keys(obj) };

/* istanbul ignore next */
function copy(object) {
  if (Array.isArray(object)) {
    return assign(object.constructor(object.length), object)
  } else if (type(object) === 'Map') {
    return new Map(object)
  } else if (type(object) === 'Set') {
    return new Set(object)
  } else if (object && typeof object === 'object') {
    var prototype = Object.getPrototypeOf(object);
    return assign(Object.create(prototype), object);
  } else {
    return object;
  }
}

function newContext() {
  var commands = assign({}, defaultCommands);
  update.extend = function(directive, fn) {
    commands[directive] = fn;
  };
  update.isEquals = function(a, b) { return a === b; };

  return update;

  function update(object, spec) {
    if (typeof spec === 'function') {
      spec = { $apply: spec };
    }

    if (!(Array.isArray(object) && Array.isArray(spec))) {
      invariant(
        !Array.isArray(spec),
        'update(): You provided an invalid spec to update(). The spec may ' +
        'not contain an array except as the value of $set, $push, $unshift, ' +
        '$splice or any custom command allowing an array value.'
      );
    }

    invariant(
      typeof spec === 'object' && spec !== null,
      'update(): You provided an invalid spec to update(). The spec and ' +
      'every included key path must be plain objects containing one of the ' +
      'following commands: %s.',
      Object.keys(commands).join(', ')
    );

    var nextObject = object;
    var index, key;
    getAllKeys(spec).forEach(function(key) {
      if (hasOwnProperty.call(commands, key)) {
        var objectWasNextObject = object === nextObject;
        nextObject = commands[key](spec[key], nextObject, spec, object);
        if (objectWasNextObject && update.isEquals(nextObject, object)) {
          nextObject = object;
        }
      } else {
        var nextValueForKey =
          type(object) === 'Map'
            ? update(object.get(key), spec[key])
            : update(object[key], spec[key]);
        var nextObjectValue =
          type(nextObject) === 'Map'
              ? nextObject.get(key)
              : nextObject[key];
        if (!update.isEquals(nextValueForKey, nextObjectValue) || typeof nextValueForKey === 'undefined' && !hasOwnProperty.call(object, key)) {
          if (nextObject === object) {
            nextObject = copy(object);
          }
          if (type(nextObject) === 'Map') {
            nextObject.set(key, nextValueForKey);
          } else {
            nextObject[key] = nextValueForKey;
          }
        }
      }
    })
    return nextObject;
  }

}

var defaultCommands = {
  $push: function(value, nextObject, spec) {
    invariantPushAndUnshift(nextObject, spec, '$push');
    return value.length ? nextObject.concat(value) : nextObject;
  },
  $unshift: function(value, nextObject, spec) {
    invariantPushAndUnshift(nextObject, spec, '$unshift');
    return value.length ? value.concat(nextObject) : nextObject;
  },
  $splice: function(value, nextObject, spec, originalObject) {
    invariantSplices(nextObject, spec);
    value.forEach(function(args) {
      invariantSplice(args);
      if (nextObject === originalObject && args.length) nextObject = copy(originalObject);
      splice.apply(nextObject, args);
    });
    return nextObject;
  },
  $set: function(value, nextObject, spec) {
    invariantSet(spec);
    return value;
  },
  $toggle: function(targets, nextObject) {
    invariantSpecArray(targets, '$toggle');
    var nextObjectCopy = targets.length ? copy(nextObject) : nextObject;

    targets.forEach(function(target) {
      nextObjectCopy[target] = !nextObject[target];
    });

    return nextObjectCopy;
  },
  $unset: function(value, nextObject, spec, originalObject) {
    invariantSpecArray(value, '$unset');
    value.forEach(function(key) {
      if (Object.hasOwnProperty.call(nextObject, key)) {
        if (nextObject === originalObject) nextObject = copy(originalObject);
        delete nextObject[key];
      }
    });
    return nextObject;
  },
  $add: function(value, nextObject, spec, originalObject) {
    invariantMapOrSet(nextObject, '$add');
    invariantSpecArray(value, '$add');
    if (type(nextObject) === 'Map') {
      value.forEach(function(pair) {
        var key = pair[0];
        var value = pair[1];
        if (nextObject === originalObject && nextObject.get(key) !== value) nextObject = copy(originalObject);
        nextObject.set(key, value);
      });
    } else {
      value.forEach(function(value) {
        if (nextObject === originalObject && !nextObject.has(value)) nextObject = copy(originalObject);
        nextObject.add(value);
      });
    }
    return nextObject;
  },
  $remove: function(value, nextObject, spec, originalObject) {
    invariantMapOrSet(nextObject, '$remove');
    invariantSpecArray(value, '$remove');
    value.forEach(function(key) {
      if (nextObject === originalObject && nextObject.has(key)) nextObject = copy(originalObject);
      nextObject.delete(key);
    });
    return nextObject;
  },
  $merge: function(value, nextObject, spec, originalObject) {
    invariantMerge(nextObject, value);
    getAllKeys(value).forEach(function(key) {
      if (value[key] !== nextObject[key]) {
        if (nextObject === originalObject) nextObject = copy(originalObject);
        nextObject[key] = value[key];
      }
    });
    return nextObject;
  },
  $apply: function(value, original) {
    invariantApply(value);
    return value(original);
  }
};

var contextForExport = newContext();

module.exports = contextForExport;
module.exports.default = contextForExport;
module.exports.newContext = newContext;

// invariants

function invariantPushAndUnshift(value, spec, command) {
  invariant(
    Array.isArray(value),
    'update(): expected target of %s to be an array; got %s.',
    command,
    value
  );
  invariantSpecArray(spec[command], command)
}

function invariantSpecArray(spec, command) {
  invariant(
    Array.isArray(spec),
    'update(): expected spec of %s to be an array; got %s. ' +
    'Did you forget to wrap your parameter in an array?',
    command,
    spec
  );
}

function invariantSplices(value, spec) {
  invariant(
    Array.isArray(value),
    'Expected $splice target to be an array; got %s',
    value
  );
  invariantSplice(spec['$splice']);
}

function invariantSplice(value) {
  invariant(
    Array.isArray(value),
    'update(): expected spec of $splice to be an array of arrays; got %s. ' +
    'Did you forget to wrap your parameters in an array?',
    value
  );
}

function invariantApply(fn) {
  invariant(
    typeof fn === 'function',
    'update(): expected spec of $apply to be a function; got %s.',
    fn
  );
}

function invariantSet(spec) {
  invariant(
    Object.keys(spec).length === 1,
    'Cannot have more than one key in an object with $set'
  );
}

function invariantMerge(target, specValue) {
  invariant(
    specValue && typeof specValue === 'object',
    'update(): $merge expects a spec of type \'object\'; got %s',
    specValue
  );
  invariant(
    target && typeof target === 'object',
    'update(): $merge expects a target of type \'object\'; got %s',
    target
  );
}

function invariantMapOrSet(target, command) {
  var typeOfTarget = type(target);
  invariant(
    typeOfTarget === 'Map' || typeOfTarget === 'Set',
    'update(): %s expects a target of type Set or Map; got %s',
    command,
    typeOfTarget
  );
}


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DragDropContext_1 = __webpack_require__(72);
exports.DragDropContext = DragDropContext_1.DragDropContext;
exports.DragDropContextProvider = DragDropContext_1.DragDropContextProvider;
exports.DragDropContextConsumer = DragDropContext_1.Consumer;
var DragLayer_1 = __webpack_require__(263);
exports.DragLayer = DragLayer_1.default;
var DragSource_1 = __webpack_require__(264);
exports.DragSource = DragSource_1.default;
var DropTarget_1 = __webpack_require__(272);
exports.DropTarget = DropTarget_1.default;
var DragPreviewImage_1 = __webpack_require__(274);
exports.DragPreviewImage = DragPreviewImage_1.default;
var hooks_1 = __webpack_require__(275);
exports.__EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ = {
    useDrag: hooks_1.useDrag,
    useDragLayer: hooks_1.useDragLayer,
    useDrop: hooks_1.useDrop,
};


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(128));
__export(__webpack_require__(238));


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DragDropManagerImpl_1 = __webpack_require__(239);
function createDragDropManager(backend, context, debugMode) {
    return new DragDropManagerImpl_1.default(backend, context, debugMode);
}
exports.createDragDropManager = createDragDropManager;


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = __webpack_require__(240);
var reducers_1 = __webpack_require__(244);
var dragDrop_1 = __webpack_require__(73);
var DragDropMonitorImpl_1 = __webpack_require__(256);
var HandlerRegistryImpl_1 = __webpack_require__(258);
function makeStoreInstance(debugMode) {
    // TODO: if we ever make a react-native version of this,
    // we'll need to consider how to pull off dev-tooling
    var reduxDevTools = typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION__;
    return redux_1.createStore(reducers_1.default, debugMode &&
        reduxDevTools &&
        reduxDevTools({
            name: 'dnd-core',
            instanceId: 'dnd-core',
        }));
}
var DragDropManagerImpl = /** @class */ (function () {
    function DragDropManagerImpl(createBackend, context, debugMode) {
        var _this = this;
        if (context === void 0) { context = {}; }
        if (debugMode === void 0) { debugMode = false; }
        this.context = context;
        this.isSetUp = false;
        this.handleRefCountChange = function () {
            var shouldSetUp = _this.store.getState().refCount > 0;
            if (shouldSetUp && !_this.isSetUp) {
                _this.backend.setup();
                _this.isSetUp = true;
            }
            else if (!shouldSetUp && _this.isSetUp) {
                _this.backend.teardown();
                _this.isSetUp = false;
            }
        };
        var store = makeStoreInstance(debugMode);
        this.store = store;
        this.monitor = new DragDropMonitorImpl_1.default(store, new HandlerRegistryImpl_1.default(store));
        this.backend = createBackend(this);
        store.subscribe(this.handleRefCountChange);
    }
    DragDropManagerImpl.prototype.getContext = function () {
        return this.context;
    };
    DragDropManagerImpl.prototype.getMonitor = function () {
        return this.monitor;
    };
    DragDropManagerImpl.prototype.getBackend = function () {
        return this.backend;
    };
    DragDropManagerImpl.prototype.getRegistry = function () {
        return this.monitor.registry;
    };
    DragDropManagerImpl.prototype.getActions = function () {
        var manager = this;
        var dispatch = this.store.dispatch;
        function bindActionCreator(actionCreator) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var action = actionCreator.apply(manager, args);
                if (typeof action !== 'undefined') {
                    dispatch(action);
                }
            };
        }
        var actions = dragDrop_1.default(this);
        return Object.keys(actions).reduce(function (boundActions, key) {
            var action = actions[key];
            boundActions[key] = bindActionCreator(action);
            return boundActions;
        }, {});
    };
    DragDropManagerImpl.prototype.dispatch = function (action) {
        this.store.dispatch(action);
    };
    return DragDropManagerImpl;
}());
exports.default = DragDropManagerImpl;


/***/ }),
/* 240 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStore", function() { return createStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combineReducers", function() { return combineReducers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bindActionCreators", function() { return bindActionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyMiddleware", function() { return applyMiddleware; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compose", function() { return compose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__DO_NOT_USE__ActionTypes", function() { return ActionTypes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_symbol_observable__ = __webpack_require__(241);


/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[__WEBPACK_IMPORTED_MODULE_0_symbol_observable__["a" /* default */]] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[__WEBPACK_IMPORTED_MODULE_0_symbol_observable__["a" /* default */]] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionDescription = actionType && "action \"" + String(actionType) + "\"" || 'an action';
  return "Given " + actionDescription + ", reducer \"" + key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.";
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle " + ActionTypes.INIT + " or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning("No reducer provided for key \"" + key + "\"");
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers);
  var unexpectedKeyCache;

  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

      if (warningMessage) {
        warning(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error("bindActionCreators expected an object or a function, instead received " + (actionCreators === null ? 'null' : typeof actionCreators) + ". " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error("Dispatching while constructing your middleware is not allowed. " + "Other middleware would not be applied to this dispatch.");
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */

function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
}



/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(6)))

/***/ }),
/* 241 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ponyfill_js__ = __webpack_require__(243);
/* global window */


var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = Object(__WEBPACK_IMPORTED_MODULE_0__ponyfill_js__["a" /* default */])(root);
/* harmony default export */ __webpack_exports__["a"] = (result);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(17), __webpack_require__(242)(module)))

/***/ }),
/* 242 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 243 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var dragOffset_1 = __webpack_require__(245);
var dragOperation_1 = __webpack_require__(252);
var refCount_1 = __webpack_require__(253);
var dirtyHandlerIds_1 = __webpack_require__(254);
var stateId_1 = __webpack_require__(255);
var discount_lodash_1 = __webpack_require__(59);
function reduce(state, action) {
    if (state === void 0) { state = {}; }
    return {
        dirtyHandlerIds: dirtyHandlerIds_1.default(state.dirtyHandlerIds, {
            type: action.type,
            payload: __assign({}, action.payload, { prevTargetIds: discount_lodash_1.get(state, 'dragOperation.targetIds', []) }),
        }),
        dragOffset: dragOffset_1.default(state.dragOffset, action),
        refCount: refCount_1.default(state.refCount, action),
        dragOperation: dragOperation_1.default(state.dragOperation, action),
        stateId: stateId_1.default(state.stateId),
    };
}
exports.default = reduce;


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var dragDrop_1 = __webpack_require__(73);
var equality_1 = __webpack_require__(130);
var initialState = {
    initialSourceClientOffset: null,
    initialClientOffset: null,
    clientOffset: null,
};
function dragOffset(state, action) {
    if (state === void 0) { state = initialState; }
    var payload = action.payload;
    switch (action.type) {
        case dragDrop_1.INIT_COORDS:
        case dragDrop_1.BEGIN_DRAG:
            return {
                initialSourceClientOffset: payload.sourceClientOffset,
                initialClientOffset: payload.clientOffset,
                clientOffset: payload.clientOffset,
            };
        case dragDrop_1.HOVER:
            if (equality_1.areCoordsEqual(state.clientOffset, payload.clientOffset)) {
                return state;
            }
            return __assign({}, state, { clientOffset: payload.clientOffset });
        case dragDrop_1.END_DRAG:
        case dragDrop_1.DROP:
            return initialState;
        default:
            return state;
    }
}
exports.default = dragOffset;


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var setClientOffset_1 = __webpack_require__(247);
var discount_lodash_1 = __webpack_require__(59);
var invariant = __webpack_require__(8);
var types_1 = __webpack_require__(52);
var ResetCoordinatesAction = {
    type: types_1.INIT_COORDS,
    payload: {
        clientOffset: null,
        sourceClientOffset: null,
    },
};
function createBeginDrag(manager) {
    return function beginDrag(sourceIds, options) {
        if (sourceIds === void 0) { sourceIds = []; }
        if (options === void 0) { options = {
            publishSource: true,
        }; }
        var _a = options.publishSource, publishSource = _a === void 0 ? true : _a, clientOffset = options.clientOffset, getSourceClientOffset = options.getSourceClientOffset;
        var monitor = manager.getMonitor();
        var registry = manager.getRegistry();
        // Initialize the coordinates using the client offset
        manager.dispatch(setClientOffset_1.setClientOffset(clientOffset));
        verifyInvariants(sourceIds, monitor, registry);
        // Get the draggable source
        var sourceId = getDraggableSource(sourceIds, monitor);
        if (sourceId === null) {
            manager.dispatch(ResetCoordinatesAction);
            return;
        }
        // Get the source client offset
        var sourceClientOffset = null;
        if (clientOffset) {
            verifyGetSourceClientOffsetIsFunction(getSourceClientOffset);
            sourceClientOffset = getSourceClientOffset(sourceId);
        }
        // Initialize the full coordinates
        manager.dispatch(setClientOffset_1.setClientOffset(clientOffset, sourceClientOffset));
        var source = registry.getSource(sourceId);
        var item = source.beginDrag(monitor, sourceId);
        verifyItemIsObject(item);
        registry.pinSource(sourceId);
        var itemType = registry.getSourceType(sourceId);
        return {
            type: types_1.BEGIN_DRAG,
            payload: {
                itemType: itemType,
                item: item,
                sourceId: sourceId,
                clientOffset: clientOffset || null,
                sourceClientOffset: sourceClientOffset || null,
                isSourcePublic: !!publishSource,
            },
        };
    };
}
exports.default = createBeginDrag;
function verifyInvariants(sourceIds, monitor, registry) {
    invariant(!monitor.isDragging(), 'Cannot call beginDrag while dragging.');
    for (var _i = 0, sourceIds_1 = sourceIds; _i < sourceIds_1.length; _i++) {
        var s = sourceIds_1[_i];
        invariant(registry.getSource(s), 'Expected sourceIds to be registered.');
    }
}
function verifyGetSourceClientOffsetIsFunction(getSourceClientOffset) {
    invariant(typeof getSourceClientOffset === 'function', 'When clientOffset is provided, getSourceClientOffset must be a function.');
}
function verifyItemIsObject(item) {
    invariant(discount_lodash_1.isObject(item), 'Item must be an object.');
}
function getDraggableSource(sourceIds, monitor) {
    var sourceId = null;
    for (var i = sourceIds.length - 1; i >= 0; i--) {
        if (monitor.canDragSource(sourceIds[i])) {
            sourceId = sourceIds[i];
            break;
        }
    }
    return sourceId;
}


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(52);
function setClientOffset(clientOffset, sourceClientOffset) {
    return {
        type: types_1.INIT_COORDS,
        payload: {
            sourceClientOffset: sourceClientOffset || null,
            clientOffset: clientOffset || null,
        },
    };
}
exports.setClientOffset = setClientOffset;


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(52);
function createPublishDragSource(manager) {
    return function publishDragSource() {
        var monitor = manager.getMonitor();
        if (monitor.isDragging()) {
            return { type: types_1.PUBLISH_DRAG_SOURCE };
        }
    };
}
exports.default = createPublishDragSource;


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var matchesType_1 = __webpack_require__(129);
var types_1 = __webpack_require__(52);
var invariant = __webpack_require__(8);
function createHover(manager) {
    return function hover(targetIdsArg, _a) {
        var clientOffset = (_a === void 0 ? {} : _a).clientOffset;
        verifyTargetIdsIsArray(targetIdsArg);
        var targetIds = targetIdsArg.slice(0);
        var monitor = manager.getMonitor();
        var registry = manager.getRegistry();
        checkInvariants(targetIds, monitor, registry);
        var draggedItemType = monitor.getItemType();
        removeNonMatchingTargetIds(targetIds, registry, draggedItemType);
        hoverAllTargets(targetIds, monitor, registry);
        return {
            type: types_1.HOVER,
            payload: {
                targetIds: targetIds,
                clientOffset: clientOffset || null,
            },
        };
    };
}
exports.default = createHover;
function verifyTargetIdsIsArray(targetIdsArg) {
    invariant(Array.isArray(targetIdsArg), 'Expected targetIds to be an array.');
}
function checkInvariants(targetIds, monitor, registry) {
    invariant(monitor.isDragging(), 'Cannot call hover while not dragging.');
    invariant(!monitor.didDrop(), 'Cannot call hover after drop.');
    for (var i = 0; i < targetIds.length; i++) {
        var targetId = targetIds[i];
        invariant(targetIds.lastIndexOf(targetId) === i, 'Expected targetIds to be unique in the passed array.');
        var target = registry.getTarget(targetId);
        invariant(target, 'Expected targetIds to be registered.');
    }
}
function removeNonMatchingTargetIds(targetIds, registry, draggedItemType) {
    // Remove those targetIds that don't match the targetType.  This
    // fixes shallow isOver which would only be non-shallow because of
    // non-matching targets.
    for (var i = targetIds.length - 1; i >= 0; i--) {
        var targetId = targetIds[i];
        var targetType = registry.getTargetType(targetId);
        if (!matchesType_1.default(targetType, draggedItemType)) {
            targetIds.splice(i, 1);
        }
    }
}
function hoverAllTargets(targetIds, monitor, registry) {
    // Finally call hover on all matching targets.
    for (var _i = 0, targetIds_1 = targetIds; _i < targetIds_1.length; _i++) {
        var targetId = targetIds_1[_i];
        var target = registry.getTarget(targetId);
        target.hover(monitor, targetId);
    }
}


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(52);
var discount_lodash_1 = __webpack_require__(59);
var invariant = __webpack_require__(8);
function createDrop(manager) {
    return function drop(options) {
        if (options === void 0) { options = {}; }
        var monitor = manager.getMonitor();
        var registry = manager.getRegistry();
        verifyInvariants(monitor);
        var targetIds = getDroppableTargets(monitor);
        // Multiple actions are dispatched here, which is why this doesn't return an action
        targetIds.forEach(function (targetId, index) {
            var dropResult = determineDropResult(targetId, index, registry, monitor);
            var action = {
                type: types_1.DROP,
                payload: {
                    dropResult: __assign({}, options, dropResult),
                },
            };
            manager.dispatch(action);
        });
    };
}
exports.default = createDrop;
function verifyInvariants(monitor) {
    invariant(monitor.isDragging(), 'Cannot call drop while not dragging.');
    invariant(!monitor.didDrop(), 'Cannot call drop twice during one drag operation.');
}
function determineDropResult(targetId, index, registry, monitor) {
    var target = registry.getTarget(targetId);
    var dropResult = target.drop(monitor, targetId);
    verifyDropResultType(dropResult);
    if (typeof dropResult === 'undefined') {
        dropResult = index === 0 ? {} : monitor.getDropResult();
    }
    return dropResult;
}
function verifyDropResultType(dropResult) {
    invariant(typeof dropResult === 'undefined' || discount_lodash_1.isObject(dropResult), 'Drop result must either be an object or undefined.');
}
function getDroppableTargets(monitor) {
    var targetIds = monitor
        .getTargetIds()
        .filter(monitor.canDropOnTarget, monitor);
    targetIds.reverse();
    return targetIds;
}


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(52);
var invariant = __webpack_require__(8);
function createEndDrag(manager) {
    return function endDrag() {
        var monitor = manager.getMonitor();
        var registry = manager.getRegistry();
        verifyIsDragging(monitor);
        var sourceId = monitor.getSourceId();
        var source = registry.getSource(sourceId, true);
        source.endDrag(monitor, sourceId);
        registry.unpinSource();
        return { type: types_1.END_DRAG };
    };
}
exports.default = createEndDrag;
function verifyIsDragging(monitor) {
    invariant(monitor.isDragging(), 'Cannot call endDrag while not dragging.');
}


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var dragDrop_1 = __webpack_require__(73);
var registry_1 = __webpack_require__(74);
var discount_lodash_1 = __webpack_require__(59);
var initialState = {
    itemType: null,
    item: null,
    sourceId: null,
    targetIds: [],
    dropResult: null,
    didDrop: false,
    isSourcePublic: null,
};
function dragOperation(state, action) {
    if (state === void 0) { state = initialState; }
    var payload = action.payload;
    switch (action.type) {
        case dragDrop_1.BEGIN_DRAG:
            return __assign({}, state, { itemType: payload.itemType, item: payload.item, sourceId: payload.sourceId, isSourcePublic: payload.isSourcePublic, dropResult: null, didDrop: false });
        case dragDrop_1.PUBLISH_DRAG_SOURCE:
            return __assign({}, state, { isSourcePublic: true });
        case dragDrop_1.HOVER:
            return __assign({}, state, { targetIds: payload.targetIds });
        case registry_1.REMOVE_TARGET:
            if (state.targetIds.indexOf(payload.targetId) === -1) {
                return state;
            }
            return __assign({}, state, { targetIds: discount_lodash_1.without(state.targetIds, payload.targetId) });
        case dragDrop_1.DROP:
            return __assign({}, state, { dropResult: payload.dropResult, didDrop: true, targetIds: [] });
        case dragDrop_1.END_DRAG:
            return __assign({}, state, { itemType: null, item: null, sourceId: null, dropResult: null, didDrop: false, isSourcePublic: null, targetIds: [] });
        default:
            return state;
    }
}
exports.default = dragOperation;


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var registry_1 = __webpack_require__(74);
function refCount(state, action) {
    if (state === void 0) { state = 0; }
    switch (action.type) {
        case registry_1.ADD_SOURCE:
        case registry_1.ADD_TARGET:
            return state + 1;
        case registry_1.REMOVE_SOURCE:
        case registry_1.REMOVE_TARGET:
            return state - 1;
        default:
            return state;
    }
}
exports.default = refCount;


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dragDrop_1 = __webpack_require__(73);
var registry_1 = __webpack_require__(74);
var equality_1 = __webpack_require__(130);
var dirtiness_1 = __webpack_require__(131);
var discount_lodash_1 = __webpack_require__(59);
function dirtyHandlerIds(state, action) {
    if (state === void 0) { state = dirtiness_1.NONE; }
    switch (action.type) {
        case dragDrop_1.HOVER:
            break;
        case registry_1.ADD_SOURCE:
        case registry_1.ADD_TARGET:
        case registry_1.REMOVE_TARGET:
        case registry_1.REMOVE_SOURCE:
            return dirtiness_1.NONE;
        case dragDrop_1.BEGIN_DRAG:
        case dragDrop_1.PUBLISH_DRAG_SOURCE:
        case dragDrop_1.END_DRAG:
        case dragDrop_1.DROP:
        default:
            return dirtiness_1.ALL;
    }
    var _a = action.payload, _b = _a.targetIds, targetIds = _b === void 0 ? [] : _b, _c = _a.prevTargetIds, prevTargetIds = _c === void 0 ? [] : _c;
    var result = discount_lodash_1.xor(targetIds, prevTargetIds);
    var didChange = result.length > 0 || !equality_1.areArraysEqual(targetIds, prevTargetIds);
    if (!didChange) {
        return dirtiness_1.NONE;
    }
    // Check the target ids at the innermost position. If they are valid, add them
    // to the result
    var prevInnermostTargetId = prevTargetIds[prevTargetIds.length - 1];
    var innermostTargetId = targetIds[targetIds.length - 1];
    if (prevInnermostTargetId !== innermostTargetId) {
        if (prevInnermostTargetId) {
            result.push(prevInnermostTargetId);
        }
        if (innermostTargetId) {
            result.push(innermostTargetId);
        }
    }
    return result;
}
exports.default = dirtyHandlerIds;


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function stateId(state) {
    if (state === void 0) { state = 0; }
    return state + 1;
}
exports.default = stateId;


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var matchesType_1 = __webpack_require__(129);
var coords_1 = __webpack_require__(257);
var dirtiness_1 = __webpack_require__(131);
var invariant = __webpack_require__(8);
var DragDropMonitorImpl = /** @class */ (function () {
    function DragDropMonitorImpl(store, registry) {
        this.store = store;
        this.registry = registry;
    }
    DragDropMonitorImpl.prototype.subscribeToStateChange = function (listener, options) {
        var _this = this;
        if (options === void 0) { options = { handlerIds: undefined }; }
        var handlerIds = options.handlerIds;
        invariant(typeof listener === 'function', 'listener must be a function.');
        invariant(typeof handlerIds === 'undefined' || Array.isArray(handlerIds), 'handlerIds, when specified, must be an array of strings.');
        var prevStateId = this.store.getState().stateId;
        var handleChange = function () {
            var state = _this.store.getState();
            var currentStateId = state.stateId;
            try {
                var canSkipListener = currentStateId === prevStateId ||
                    (currentStateId === prevStateId + 1 &&
                        !dirtiness_1.areDirty(state.dirtyHandlerIds, handlerIds));
                if (!canSkipListener) {
                    listener();
                }
            }
            finally {
                prevStateId = currentStateId;
            }
        };
        return this.store.subscribe(handleChange);
    };
    DragDropMonitorImpl.prototype.subscribeToOffsetChange = function (listener) {
        var _this = this;
        invariant(typeof listener === 'function', 'listener must be a function.');
        var previousState = this.store.getState().dragOffset;
        var handleChange = function () {
            var nextState = _this.store.getState().dragOffset;
            if (nextState === previousState) {
                return;
            }
            previousState = nextState;
            listener();
        };
        return this.store.subscribe(handleChange);
    };
    DragDropMonitorImpl.prototype.canDragSource = function (sourceId) {
        if (!sourceId) {
            return false;
        }
        var source = this.registry.getSource(sourceId);
        invariant(source, 'Expected to find a valid source.');
        if (this.isDragging()) {
            return false;
        }
        return source.canDrag(this, sourceId);
    };
    DragDropMonitorImpl.prototype.canDropOnTarget = function (targetId) {
        // undefined on initial render
        if (!targetId) {
            return false;
        }
        var target = this.registry.getTarget(targetId);
        invariant(target, 'Expected to find a valid target.');
        if (!this.isDragging() || this.didDrop()) {
            return false;
        }
        var targetType = this.registry.getTargetType(targetId);
        var draggedItemType = this.getItemType();
        return (matchesType_1.default(targetType, draggedItemType) && target.canDrop(this, targetId));
    };
    DragDropMonitorImpl.prototype.isDragging = function () {
        return Boolean(this.getItemType());
    };
    DragDropMonitorImpl.prototype.isDraggingSource = function (sourceId) {
        // undefined on initial render
        if (!sourceId) {
            return false;
        }
        var source = this.registry.getSource(sourceId, true);
        invariant(source, 'Expected to find a valid source.');
        if (!this.isDragging() || !this.isSourcePublic()) {
            return false;
        }
        var sourceType = this.registry.getSourceType(sourceId);
        var draggedItemType = this.getItemType();
        if (sourceType !== draggedItemType) {
            return false;
        }
        return source.isDragging(this, sourceId);
    };
    DragDropMonitorImpl.prototype.isOverTarget = function (targetId, options) {
        if (options === void 0) { options = { shallow: false }; }
        // undefined on initial render
        if (!targetId) {
            return false;
        }
        var shallow = options.shallow;
        if (!this.isDragging()) {
            return false;
        }
        var targetType = this.registry.getTargetType(targetId);
        var draggedItemType = this.getItemType();
        if (draggedItemType && !matchesType_1.default(targetType, draggedItemType)) {
            return false;
        }
        var targetIds = this.getTargetIds();
        if (!targetIds.length) {
            return false;
        }
        var index = targetIds.indexOf(targetId);
        if (shallow) {
            return index === targetIds.length - 1;
        }
        else {
            return index > -1;
        }
    };
    DragDropMonitorImpl.prototype.getItemType = function () {
        return this.store.getState().dragOperation.itemType;
    };
    DragDropMonitorImpl.prototype.getItem = function () {
        return this.store.getState().dragOperation.item;
    };
    DragDropMonitorImpl.prototype.getSourceId = function () {
        return this.store.getState().dragOperation.sourceId;
    };
    DragDropMonitorImpl.prototype.getTargetIds = function () {
        return this.store.getState().dragOperation.targetIds;
    };
    DragDropMonitorImpl.prototype.getDropResult = function () {
        return this.store.getState().dragOperation.dropResult;
    };
    DragDropMonitorImpl.prototype.didDrop = function () {
        return this.store.getState().dragOperation.didDrop;
    };
    DragDropMonitorImpl.prototype.isSourcePublic = function () {
        return this.store.getState().dragOperation.isSourcePublic;
    };
    DragDropMonitorImpl.prototype.getInitialClientOffset = function () {
        return this.store.getState().dragOffset.initialClientOffset;
    };
    DragDropMonitorImpl.prototype.getInitialSourceClientOffset = function () {
        return this.store.getState().dragOffset.initialSourceClientOffset;
    };
    DragDropMonitorImpl.prototype.getClientOffset = function () {
        return this.store.getState().dragOffset.clientOffset;
    };
    DragDropMonitorImpl.prototype.getSourceClientOffset = function () {
        return coords_1.getSourceClientOffset(this.store.getState().dragOffset);
    };
    DragDropMonitorImpl.prototype.getDifferenceFromInitialOffset = function () {
        return coords_1.getDifferenceFromInitialOffset(this.store.getState().dragOffset);
    };
    return DragDropMonitorImpl;
}());
exports.default = DragDropMonitorImpl;


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Coordinate addition
 * @param a The first coordinate
 * @param b The second coordinate
 */
function add(a, b) {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
    };
}
exports.add = add;
/**
 * Coordinate subtraction
 * @param a The first coordinate
 * @param b The second coordinate
 */
function subtract(a, b) {
    return {
        x: a.x - b.x,
        y: a.y - b.y,
    };
}
exports.subtract = subtract;
/**
 * Returns the cartesian distance of the drag source component's position, based on its position
 * at the time when the current drag operation has started, and the movement difference.
 *
 * Returns null if no item is being dragged.
 *
 * @param state The offset state to compute from
 */
function getSourceClientOffset(state) {
    var clientOffset = state.clientOffset, initialClientOffset = state.initialClientOffset, initialSourceClientOffset = state.initialSourceClientOffset;
    if (!clientOffset || !initialClientOffset || !initialSourceClientOffset) {
        return null;
    }
    return subtract(add(clientOffset, initialSourceClientOffset), initialClientOffset);
}
exports.getSourceClientOffset = getSourceClientOffset;
/**
 * Determines the x,y offset between the client offset and the initial client offset
 *
 * @param state The offset state to compute from
 */
function getDifferenceFromInitialOffset(state) {
    var clientOffset = state.clientOffset, initialClientOffset = state.initialClientOffset;
    if (!clientOffset || !initialClientOffset) {
        return null;
    }
    return subtract(clientOffset, initialClientOffset);
}
exports.getDifferenceFromInitialOffset = getDifferenceFromInitialOffset;


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var registry_1 = __webpack_require__(74);
var getNextUniqueId_1 = __webpack_require__(259);
var interfaces_1 = __webpack_require__(128);
var contracts_1 = __webpack_require__(260);
var invariant = __webpack_require__(8);
var asap = __webpack_require__(261);
function getNextHandlerId(role) {
    var id = getNextUniqueId_1.default().toString();
    switch (role) {
        case interfaces_1.HandlerRole.SOURCE:
            return "S" + id;
        case interfaces_1.HandlerRole.TARGET:
            return "T" + id;
        default:
            throw new Error("Unknown Handler Role: " + role);
    }
}
function parseRoleFromHandlerId(handlerId) {
    switch (handlerId[0]) {
        case 'S':
            return interfaces_1.HandlerRole.SOURCE;
        case 'T':
            return interfaces_1.HandlerRole.TARGET;
        default:
            invariant(false, "Cannot parse handler ID: " + handlerId);
    }
}
function mapContainsValue(map, searchValue) {
    var entries = map.entries();
    var isDone = false;
    do {
        var _a = entries.next(), done = _a.done, _b = _a.value, value = _b[1];
        if (value === searchValue) {
            return true;
        }
        isDone = done;
    } while (!isDone);
    return false;
}
var HandlerRegistryImpl = /** @class */ (function () {
    function HandlerRegistryImpl(store) {
        this.store = store;
        this.types = new Map();
        this.dragSources = new Map();
        this.dropTargets = new Map();
        this.pinnedSourceId = null;
        this.pinnedSource = null;
    }
    HandlerRegistryImpl.prototype.addSource = function (type, source) {
        contracts_1.validateType(type);
        contracts_1.validateSourceContract(source);
        var sourceId = this.addHandler(interfaces_1.HandlerRole.SOURCE, type, source);
        this.store.dispatch(registry_1.addSource(sourceId));
        return sourceId;
    };
    HandlerRegistryImpl.prototype.addTarget = function (type, target) {
        contracts_1.validateType(type, true);
        contracts_1.validateTargetContract(target);
        var targetId = this.addHandler(interfaces_1.HandlerRole.TARGET, type, target);
        this.store.dispatch(registry_1.addTarget(targetId));
        return targetId;
    };
    HandlerRegistryImpl.prototype.containsHandler = function (handler) {
        return (mapContainsValue(this.dragSources, handler) ||
            mapContainsValue(this.dropTargets, handler));
    };
    HandlerRegistryImpl.prototype.getSource = function (sourceId, includePinned) {
        if (includePinned === void 0) { includePinned = false; }
        invariant(this.isSourceId(sourceId), 'Expected a valid source ID.');
        var isPinned = includePinned && sourceId === this.pinnedSourceId;
        var source = isPinned ? this.pinnedSource : this.dragSources.get(sourceId);
        return source;
    };
    HandlerRegistryImpl.prototype.getTarget = function (targetId) {
        invariant(this.isTargetId(targetId), 'Expected a valid target ID.');
        return this.dropTargets.get(targetId);
    };
    HandlerRegistryImpl.prototype.getSourceType = function (sourceId) {
        invariant(this.isSourceId(sourceId), 'Expected a valid source ID.');
        return this.types.get(sourceId);
    };
    HandlerRegistryImpl.prototype.getTargetType = function (targetId) {
        invariant(this.isTargetId(targetId), 'Expected a valid target ID.');
        return this.types.get(targetId);
    };
    HandlerRegistryImpl.prototype.isSourceId = function (handlerId) {
        var role = parseRoleFromHandlerId(handlerId);
        return role === interfaces_1.HandlerRole.SOURCE;
    };
    HandlerRegistryImpl.prototype.isTargetId = function (handlerId) {
        var role = parseRoleFromHandlerId(handlerId);
        return role === interfaces_1.HandlerRole.TARGET;
    };
    HandlerRegistryImpl.prototype.removeSource = function (sourceId) {
        var _this = this;
        invariant(this.getSource(sourceId), 'Expected an existing source.');
        this.store.dispatch(registry_1.removeSource(sourceId));
        asap(function () {
            _this.dragSources.delete(sourceId);
            _this.types.delete(sourceId);
        });
    };
    HandlerRegistryImpl.prototype.removeTarget = function (targetId) {
        invariant(this.getTarget(targetId), 'Expected an existing target.');
        this.store.dispatch(registry_1.removeTarget(targetId));
        this.dropTargets.delete(targetId);
        this.types.delete(targetId);
    };
    HandlerRegistryImpl.prototype.pinSource = function (sourceId) {
        var source = this.getSource(sourceId);
        invariant(source, 'Expected an existing source.');
        this.pinnedSourceId = sourceId;
        this.pinnedSource = source;
    };
    HandlerRegistryImpl.prototype.unpinSource = function () {
        invariant(this.pinnedSource, 'No source is pinned at the time.');
        this.pinnedSourceId = null;
        this.pinnedSource = null;
    };
    HandlerRegistryImpl.prototype.addHandler = function (role, type, handler) {
        var id = getNextHandlerId(role);
        this.types.set(id, type);
        if (role === interfaces_1.HandlerRole.SOURCE) {
            this.dragSources.set(id, handler);
        }
        else if (role === interfaces_1.HandlerRole.TARGET) {
            this.dropTargets.set(id, handler);
        }
        return id;
    };
    return HandlerRegistryImpl;
}());
exports.default = HandlerRegistryImpl;


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nextUniqueId = 0;
function getNextUniqueId() {
    return nextUniqueId++;
}
exports.default = getNextUniqueId;


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var invariant = __webpack_require__(8);
function validateSourceContract(source) {
    invariant(typeof source.canDrag === 'function', 'Expected canDrag to be a function.');
    invariant(typeof source.beginDrag === 'function', 'Expected beginDrag to be a function.');
    invariant(typeof source.endDrag === 'function', 'Expected endDrag to be a function.');
}
exports.validateSourceContract = validateSourceContract;
function validateTargetContract(target) {
    invariant(typeof target.canDrop === 'function', 'Expected canDrop to be a function.');
    invariant(typeof target.hover === 'function', 'Expected hover to be a function.');
    invariant(typeof target.drop === 'function', 'Expected beginDrag to be a function.');
}
exports.validateTargetContract = validateTargetContract;
function validateType(type, allowArray) {
    if (allowArray && Array.isArray(type)) {
        type.forEach(function (t) { return validateType(t, false); });
        return;
    }
    invariant(typeof type === 'string' || typeof type === 'symbol', allowArray
        ? 'Type can only be a string, a symbol, or an array of either.'
        : 'Type can only be a string or a symbol.');
}
exports.validateType = validateType;


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// rawAsap provides everything we need except exception management.
var rawAsap = __webpack_require__(262);
// RawTasks are recycled to reduce GC churn.
var freeTasks = [];
// We queue errors to ensure they are thrown in right order (FIFO).
// Array-as-queue is good enough here, since we are just dealing with exceptions.
var pendingErrors = [];
var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);

function throwFirstError() {
    if (pendingErrors.length) {
        throw pendingErrors.shift();
    }
}

/**
 * Calls a task as soon as possible after returning, in its own event, with priority
 * over other events like animation, reflow, and repaint. An error thrown from an
 * event will not interrupt, nor even substantially slow down the processing of
 * other events, but will be rather postponed to a lower priority event.
 * @param {{call}} task A callable object, typically a function that takes no
 * arguments.
 */
module.exports = asap;
function asap(task) {
    var rawTask;
    if (freeTasks.length) {
        rawTask = freeTasks.pop();
    } else {
        rawTask = new RawTask();
    }
    rawTask.task = task;
    rawAsap(rawTask);
}

// We wrap tasks with recyclable task objects.  A task object implements
// `call`, just like a function.
function RawTask() {
    this.task = null;
}

// The sole purpose of wrapping the task is to catch the exception and recycle
// the task object after its single use.
RawTask.prototype.call = function () {
    try {
        this.task.call();
    } catch (error) {
        if (asap.onerror) {
            // This hook exists purely for testing purposes.
            // Its name will be periodically randomized to break any code that
            // depends on its existence.
            asap.onerror(error);
        } else {
            // In a web browser, exceptions are not fatal. However, to avoid
            // slowing down the queue of pending tasks, we rethrow the error in a
            // lower priority turn.
            pendingErrors.push(error);
            requestErrorThrow();
        }
    } finally {
        this.task = null;
        freeTasks[freeTasks.length] = this;
    }
};


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// Use the fastest means possible to execute a task in its own turn, with
// priority over other events including IO, animation, reflow, and redraw
// events in browsers.
//
// An exception thrown by a task will permanently interrupt the processing of
// subsequent tasks. The higher level `asap` function ensures that if an
// exception is thrown by a task, that the task queue will continue flushing as
// soon as possible, but if you use `rawAsap` directly, you are responsible to
// either ensure that no exceptions are thrown from your task, or to manually
// call `rawAsap.requestFlush` if an exception is thrown.
module.exports = rawAsap;
function rawAsap(task) {
    if (!queue.length) {
        requestFlush();
        flushing = true;
    }
    // Equivalent to push, but avoids a function call.
    queue[queue.length] = task;
}

var queue = [];
// Once a flush has been requested, no further calls to `requestFlush` are
// necessary until the next `flush` completes.
var flushing = false;
// `requestFlush` is an implementation-specific method that attempts to kick
// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
// the event queue before yielding to the browser's own event loop.
var requestFlush;
// The position of the next task to execute in the task queue. This is
// preserved between calls to `flush` so that it can be resumed if
// a task throws an exception.
var index = 0;
// If a task schedules additional tasks recursively, the task queue can grow
// unbounded. To prevent memory exhaustion, the task queue will periodically
// truncate already-completed tasks.
var capacity = 1024;

// The flush function processes all tasks that have been scheduled with
// `rawAsap` unless and until one of those tasks throws an exception.
// If a task throws an exception, `flush` ensures that its state will remain
// consistent and will resume where it left off when called again.
// However, `flush` does not make any arrangements to be called again if an
// exception is thrown.
function flush() {
    while (index < queue.length) {
        var currentIndex = index;
        // Advance the index before calling the task. This ensures that we will
        // begin flushing on the next task the task throws an error.
        index = index + 1;
        queue[currentIndex].call();
        // Prevent leaking memory for long chains of recursive calls to `asap`.
        // If we call `asap` within tasks scheduled by `asap`, the queue will
        // grow, but to avoid an O(n) walk for every task we execute, we don't
        // shift tasks off the queue after they have been executed.
        // Instead, we periodically shift 1024 tasks off the queue.
        if (index > capacity) {
            // Manually shift all values starting at the index back to the
            // beginning of the queue.
            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
        }
    }
    queue.length = 0;
    index = 0;
    flushing = false;
}

// `requestFlush` is implemented using a strategy based on data collected from
// every available SauceLabs Selenium web driver worker at time of writing.
// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593

// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
// have WebKitMutationObserver but not un-prefixed MutationObserver.
// Must use `global` or `self` instead of `window` to work in both frames and web
// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.

/* globals self */
var scope = typeof global !== "undefined" ? global : self;
var BrowserMutationObserver = scope.MutationObserver || scope.WebKitMutationObserver;

// MutationObservers are desirable because they have high priority and work
// reliably everywhere they are implemented.
// They are implemented in all modern browsers.
//
// - Android 4-4.3
// - Chrome 26-34
// - Firefox 14-29
// - Internet Explorer 11
// - iPad Safari 6-7.1
// - iPhone Safari 7-7.1
// - Safari 6-7
if (typeof BrowserMutationObserver === "function") {
    requestFlush = makeRequestCallFromMutationObserver(flush);

// MessageChannels are desirable because they give direct access to the HTML
// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
// 11-12, and in web workers in many engines.
// Although message channels yield to any queued rendering and IO tasks, they
// would be better than imposing the 4ms delay of timers.
// However, they do not work reliably in Internet Explorer or Safari.

// Internet Explorer 10 is the only browser that has setImmediate but does
// not have MutationObservers.
// Although setImmediate yields to the browser's renderer, it would be
// preferrable to falling back to setTimeout since it does not have
// the minimum 4ms penalty.
// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
// Desktop to a lesser extent) that renders both setImmediate and
// MessageChannel useless for the purposes of ASAP.
// https://github.com/kriskowal/q/issues/396

// Timers are implemented universally.
// We fall back to timers in workers in most engines, and in foreground
// contexts in the following browsers.
// However, note that even this simple case requires nuances to operate in a
// broad spectrum of browsers.
//
// - Firefox 3-13
// - Internet Explorer 6-9
// - iPad Safari 4.3
// - Lynx 2.8.7
} else {
    requestFlush = makeRequestCallFromTimer(flush);
}

// `requestFlush` requests that the high priority event queue be flushed as
// soon as possible.
// This is useful to prevent an error thrown in a task from stalling the event
// queue if the exception handled by Node.js’s
// `process.on("uncaughtException")` or by a domain.
rawAsap.requestFlush = requestFlush;

// To request a high priority event, we induce a mutation observer by toggling
// the text of a text node between "1" and "-1".
function makeRequestCallFromMutationObserver(callback) {
    var toggle = 1;
    var observer = new BrowserMutationObserver(callback);
    var node = document.createTextNode("");
    observer.observe(node, {characterData: true});
    return function requestCall() {
        toggle = -toggle;
        node.data = toggle;
    };
}

// The message channel technique was discovered by Malte Ubl and was the
// original foundation for this library.
// http://www.nonblocking.io/2011/06/windownexttick.html

// Safari 6.0.5 (at least) intermittently fails to create message ports on a
// page's first load. Thankfully, this version of Safari supports
// MutationObservers, so we don't need to fall back in that case.

// function makeRequestCallFromMessageChannel(callback) {
//     var channel = new MessageChannel();
//     channel.port1.onmessage = callback;
//     return function requestCall() {
//         channel.port2.postMessage(0);
//     };
// }

// For reasons explained above, we are also unable to use `setImmediate`
// under any circumstances.
// Even if we were, there is another bug in Internet Explorer 10.
// It is not sufficient to assign `setImmediate` to `requestFlush` because
// `setImmediate` must be called *by name* and therefore must be wrapped in a
// closure.
// Never forget.

// function makeRequestCallFromSetImmediate(callback) {
//     return function requestCall() {
//         setImmediate(callback);
//     };
// }

// Safari 6.0 has a problem where timers will get lost while the user is
// scrolling. This problem does not impact ASAP because Safari 6.0 supports
// mutation observers, so that implementation is used instead.
// However, if we ever elect to use timers in Safari, the prevalent work-around
// is to add a scroll event listener that calls for a flush.

// `setTimeout` does not call the passed callback if the delay is less than
// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
// even then.

function makeRequestCallFromTimer(callback) {
    return function requestCall() {
        // We dispatch a timeout with a specified delay of 0 for engines that
        // can reliably accommodate that request. This will usually be snapped
        // to a 4 milisecond delay, but once we're flushing, there's no delay
        // between events.
        var timeoutHandle = setTimeout(handleTimer, 0);
        // However, since this timer gets frequently dropped in Firefox
        // workers, we enlist an interval handle that will try to fire
        // an event 20 times per second until it succeeds.
        var intervalHandle = setInterval(handleTimer, 50);

        function handleTimer() {
            // Whichever timer succeeds will cancel both timers and
            // execute the callback.
            clearTimeout(timeoutHandle);
            clearInterval(intervalHandle);
            callback();
        }
    };
}

// This is for `asap.js` only.
// Its name will be periodically randomized to break any code that depends on
// its existence.
rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;

// ASAP was originally a nextTick shim included in Q. This was factored out
// into this ASAP package. It was later adapted to RSVP which made further
// amendments. These decisions, particularly to marginalize MessageChannel and
// to capture the MutationObserver implementation in a closure, were integrated
// back into ASAP proper.
// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var checkDecoratorArguments_1 = __webpack_require__(75);
var DragDropContext_1 = __webpack_require__(72);
var isRefable_1 = __webpack_require__(96);
var discount_lodash_1 = __webpack_require__(53);
var hoistStatics = __webpack_require__(97);
var invariant = __webpack_require__(8);
var shallowEqual = __webpack_require__(76);
function DragLayer(collect, options) {
    if (options === void 0) { options = {}; }
    checkDecoratorArguments_1.default('DragLayer', 'collect[, options]', collect, options);
    invariant(typeof collect === 'function', 'Expected "collect" provided as the first argument to DragLayer to be a function that collects props to inject into the component. ', 'Instead, received %s. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-layer', collect);
    invariant(discount_lodash_1.isPlainObject(options), 'Expected "options" provided as the second argument to DragLayer to be a plain object when specified. ' +
        'Instead, received %s. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-layer', options);
    return function decorateLayer(DecoratedComponent) {
        var Decorated = DecoratedComponent;
        var _a = options.arePropsEqual, arePropsEqual = _a === void 0 ? shallowEqual : _a;
        var displayName = Decorated.displayName || Decorated.name || 'Component';
        var DragLayerContainer = /** @class */ (function (_super) {
            __extends(DragLayerContainer, _super);
            function DragLayerContainer() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.isCurrentlyMounted = false;
                _this.ref = React.createRef();
                _this.handleChange = function () {
                    if (!_this.isCurrentlyMounted) {
                        return;
                    }
                    var nextState = _this.getCurrentState();
                    if (!shallowEqual(nextState, _this.state)) {
                        _this.setState(nextState);
                    }
                };
                return _this;
            }
            DragLayerContainer.prototype.getDecoratedComponentInstance = function () {
                invariant(this.ref.current, 'In order to access an instance of the decorated component, it must either be a class component or use React.forwardRef()');
                return this.ref.current;
            };
            DragLayerContainer.prototype.shouldComponentUpdate = function (nextProps, nextState) {
                return (!arePropsEqual(nextProps, this.props) ||
                    !shallowEqual(nextState, this.state));
            };
            DragLayerContainer.prototype.componentDidMount = function () {
                this.isCurrentlyMounted = true;
                this.handleChange();
            };
            DragLayerContainer.prototype.componentWillUnmount = function () {
                this.isCurrentlyMounted = false;
                if (this.unsubscribeFromOffsetChange) {
                    this.unsubscribeFromOffsetChange();
                    this.unsubscribeFromOffsetChange = undefined;
                }
                if (this.unsubscribeFromStateChange) {
                    this.unsubscribeFromStateChange();
                    this.unsubscribeFromStateChange = undefined;
                }
            };
            DragLayerContainer.prototype.render = function () {
                var _this = this;
                return (React.createElement(DragDropContext_1.Consumer, null, function (_a) {
                    var dragDropManager = _a.dragDropManager;
                    if (dragDropManager === undefined) {
                        return null;
                    }
                    _this.receiveDragDropManager(dragDropManager);
                    // Let componentDidMount fire to initialize the collected state
                    if (!_this.isCurrentlyMounted) {
                        return null;
                    }
                    return (React.createElement(Decorated, __assign({}, _this.props, _this.state, { ref: isRefable_1.isRefable(Decorated) ? _this.ref : null })));
                }));
            };
            DragLayerContainer.prototype.receiveDragDropManager = function (dragDropManager) {
                if (this.manager !== undefined) {
                    return;
                }
                this.manager = dragDropManager;
                invariant(typeof dragDropManager === 'object', 'Could not find the drag and drop manager in the context of %s. ' +
                    'Make sure to wrap the top-level component of your app with DragDropContext. ' +
                    'Read more: http://react-dnd.github.io/react-dnd/docs/troubleshooting#could-not-find-the-drag-and-drop-manager-in-the-context', displayName, displayName);
                var monitor = this.manager.getMonitor();
                this.unsubscribeFromOffsetChange = monitor.subscribeToOffsetChange(this.handleChange);
                this.unsubscribeFromStateChange = monitor.subscribeToStateChange(this.handleChange);
            };
            DragLayerContainer.prototype.getCurrentState = function () {
                if (!this.manager) {
                    return {};
                }
                var monitor = this.manager.getMonitor();
                return collect(monitor, this.props);
            };
            DragLayerContainer.displayName = "DragLayer(" + displayName + ")";
            DragLayerContainer.DecoratedComponent = DecoratedComponent;
            return DragLayerContainer;
        }(React.Component));
        return hoistStatics(DragLayerContainer, DecoratedComponent);
    };
}
exports.default = DragLayer;


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var checkDecoratorArguments_1 = __webpack_require__(75);
var decorateHandler_1 = __webpack_require__(132);
var registerSource_1 = __webpack_require__(133);
var createSourceFactory_1 = __webpack_require__(269);
var DragSourceMonitorImpl_1 = __webpack_require__(135);
var SourceConnector_1 = __webpack_require__(136);
var isValidType_1 = __webpack_require__(139);
var discount_lodash_1 = __webpack_require__(53);
var invariant = __webpack_require__(8);
/**
 * Decorates a component as a dragsource
 * @param type The dragsource type
 * @param spec The drag source specification
 * @param collect The props collector function
 * @param options DnD options
 */
function DragSource(type, spec, collect, options) {
    if (options === void 0) { options = {}; }
    checkDecoratorArguments_1.default('DragSource', 'type, spec, collect[, options]', type, spec, collect, options);
    var getType = type;
    if (typeof type !== 'function') {
        invariant(isValidType_1.default(type), 'Expected "type" provided as the first argument to DragSource to be ' +
            'a string, or a function that returns a string given the current props. ' +
            'Instead, received %s. ' +
            'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', type);
        getType = function () { return type; };
    }
    invariant(discount_lodash_1.isPlainObject(spec), 'Expected "spec" provided as the second argument to DragSource to be ' +
        'a plain object. Instead, received %s. ' +
        'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', spec);
    var createSource = createSourceFactory_1.default(spec);
    invariant(typeof collect === 'function', 'Expected "collect" provided as the third argument to DragSource to be ' +
        'a function that returns a plain object of props to inject. ' +
        'Instead, received %s. ' +
        'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', collect);
    invariant(discount_lodash_1.isPlainObject(options), 'Expected "options" provided as the fourth argument to DragSource to be ' +
        'a plain object when specified. ' +
        'Instead, received %s. ' +
        'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', collect);
    return function decorateSource(DecoratedComponent) {
        return decorateHandler_1.default({
            containerDisplayName: 'DragSource',
            createHandler: createSource,
            registerHandler: registerSource_1.default,
            createConnector: function (backend) { return new SourceConnector_1.default(backend); },
            createMonitor: function (manager) {
                return new DragSourceMonitorImpl_1.default(manager);
            },
            DecoratedComponent: DecoratedComponent,
            getType: getType,
            collect: collect,
            options: options,
        });
    };
}
exports.default = DragSource;


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(266));
__export(__webpack_require__(267));
__export(__webpack_require__(268));


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var discount_lodash_1 = __webpack_require__(53);
/**
 * Provides a set of static methods for creating Disposables.
 * @param {Function} action Action to run during the first call to dispose.
 * The action is guaranteed to be run at most once.
 */
var Disposable = /** @class */ (function () {
    function Disposable(action) {
        this.isDisposed = false;
        this.action = discount_lodash_1.isFunction(action) ? action : discount_lodash_1.noop;
    }
    /**
     * Validates whether the given object is a disposable
     * @param {Object} Object to test whether it has a dispose method
     * @returns {Boolean} true if a disposable object, else false.
     */
    Disposable.isDisposable = function (d) {
        return d && discount_lodash_1.isFunction(d.dispose);
    };
    Disposable._fixup = function (result) {
        return Disposable.isDisposable(result) ? result : Disposable.empty;
    };
    /**
     * Creates a disposable object that invokes the specified action when disposed.
     * @param {Function} dispose Action to run during the first call to dispose.
     * The action is guaranteed to be run at most once.
     * @return {Disposable} The disposable object that runs the given action upon disposal.
     */
    Disposable.create = function (action) {
        return new Disposable(action);
    };
    /** Performs the task of cleaning up resources. */
    Disposable.prototype.dispose = function () {
        if (!this.isDisposed) {
            this.action();
            this.isDisposed = true;
        }
    };
    /**
     * Gets the disposable that does nothing when disposed.
     */
    Disposable.empty = { dispose: discount_lodash_1.noop };
    return Disposable;
}());
exports.Disposable = Disposable;


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a disposable resource whose underlying disposable resource can
 * be replaced by another disposable resource, causing automatic disposal of
 * the previous underlying disposable resource.
 */
var SerialDisposable = /** @class */ (function () {
    function SerialDisposable() {
        this.isDisposed = false;
    }
    /**
     * Gets the underlying disposable.
     * @returns {Any} the underlying disposable.
     */
    SerialDisposable.prototype.getDisposable = function () {
        return this.current;
    };
    SerialDisposable.prototype.setDisposable = function (value) {
        var shouldDispose = this.isDisposed;
        if (!shouldDispose) {
            var old = this.current;
            this.current = value;
            if (old) {
                old.dispose();
            }
        }
        if (shouldDispose && value) {
            value.dispose();
        }
    };
    /** Performs the task of cleaning up resources. */
    SerialDisposable.prototype.dispose = function () {
        if (!this.isDisposed) {
            this.isDisposed = true;
            var old = this.current;
            this.current = undefined;
            if (old) {
                old.dispose();
            }
        }
    };
    return SerialDisposable;
}());
exports.SerialDisposable = SerialDisposable;


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a group of disposable resources that are disposed together.
 * @constructor
 */
var CompositeDisposable = /** @class */ (function () {
    function CompositeDisposable() {
        var disposables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            disposables[_i] = arguments[_i];
        }
        this.isDisposed = false;
        this.disposables = disposables;
    }
    /**
     * Adds a disposable to the CompositeDisposable or disposes the disposable if the CompositeDisposable is disposed.
     * @param {Any} item Disposable to add.
     */
    CompositeDisposable.prototype.add = function (item) {
        if (this.isDisposed) {
            item.dispose();
        }
        else {
            this.disposables.push(item);
        }
    };
    /**
     * Removes and disposes the first occurrence of a disposable from the CompositeDisposable.
     * @param {Any} item Disposable to remove.
     * @returns {Boolean} true if found; false otherwise.
     */
    CompositeDisposable.prototype.remove = function (item) {
        var shouldDispose = false;
        if (!this.isDisposed) {
            var idx = this.disposables.indexOf(item);
            if (idx !== -1) {
                shouldDispose = true;
                this.disposables.splice(idx, 1);
                item.dispose();
            }
        }
        return shouldDispose;
    };
    /**
     *  Disposes all disposables in the group and removes them from the group but
     *  does not dispose the CompositeDisposable.
     */
    CompositeDisposable.prototype.clear = function () {
        if (!this.isDisposed) {
            var len = this.disposables.length;
            var currentDisposables = new Array(len);
            for (var i = 0; i < len; i++) {
                currentDisposables[i] = this.disposables[i];
            }
            this.disposables = [];
            for (var i = 0; i < len; i++) {
                currentDisposables[i].dispose();
            }
        }
    };
    /**
     *  Disposes all disposables in the group and removes them from the group.
     */
    CompositeDisposable.prototype.dispose = function () {
        if (!this.isDisposed) {
            this.isDisposed = true;
            var len = this.disposables.length;
            var currentDisposables = new Array(len);
            for (var i = 0; i < len; i++) {
                currentDisposables[i] = this.disposables[i];
            }
            this.disposables = [];
            for (var i = 0; i < len; i++) {
                currentDisposables[i].dispose();
            }
        }
    };
    return CompositeDisposable;
}());
exports.CompositeDisposable = CompositeDisposable;


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
var getDecoratedComponent_1 = __webpack_require__(134);
var discount_lodash_1 = __webpack_require__(53);
var invariant = __webpack_require__(8);
var ALLOWED_SPEC_METHODS = ['canDrag', 'beginDrag', 'isDragging', 'endDrag'];
var REQUIRED_SPEC_METHODS = ['beginDrag'];
var SourceImpl = /** @class */ (function () {
    function SourceImpl(spec, monitor, ref) {
        var _this = this;
        this.spec = spec;
        this.monitor = monitor;
        this.ref = ref;
        this.props = null;
        this.beginDrag = function () {
            if (!_this.props) {
                return;
            }
            var item = _this.spec.beginDrag(_this.props, _this.monitor, _this.ref.current);
            if (process.env.NODE_ENV !== 'production') {
                invariant(discount_lodash_1.isPlainObject(item), 'beginDrag() must return a plain object that represents the dragged item. ' +
                    'Instead received %s. ' +
                    'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', item);
            }
            return item;
        };
    }
    SourceImpl.prototype.receiveProps = function (props) {
        this.props = props;
    };
    SourceImpl.prototype.canDrag = function () {
        if (!this.props) {
            return false;
        }
        if (!this.spec.canDrag) {
            return true;
        }
        return this.spec.canDrag(this.props, this.monitor);
    };
    SourceImpl.prototype.isDragging = function (globalMonitor, sourceId) {
        if (!this.props) {
            return false;
        }
        if (!this.spec.isDragging) {
            return sourceId === globalMonitor.getSourceId();
        }
        return this.spec.isDragging(this.props, this.monitor);
    };
    SourceImpl.prototype.endDrag = function () {
        if (!this.props) {
            return;
        }
        if (!this.spec.endDrag) {
            return;
        }
        this.spec.endDrag(this.props, this.monitor, getDecoratedComponent_1.getDecoratedComponent(this.ref));
    };
    return SourceImpl;
}());
function createSourceFactory(spec) {
    Object.keys(spec).forEach(function (key) {
        invariant(ALLOWED_SPEC_METHODS.indexOf(key) > -1, 'Expected the drag source specification to only have ' +
            'some of the following keys: %s. ' +
            'Instead received a specification with an unexpected "%s" key. ' +
            'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', ALLOWED_SPEC_METHODS.join(', '), key);
        invariant(typeof spec[key] === 'function', 'Expected %s in the drag source specification to be a function. ' +
            'Instead received a specification with %s: %s. ' +
            'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', key, key, spec[key]);
    });
    REQUIRED_SPEC_METHODS.forEach(function (key) {
        invariant(typeof spec[key] === 'function', 'Expected %s in the drag source specification to be a function. ' +
            'Instead received a specification with %s: %s. ' +
            'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', key, key, spec[key]);
    });
    return function createSource(monitor, ref) {
        return new SourceImpl(spec, monitor, ref);
    };
}
exports.default = createSourceFactory;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(0);
var invariant = __webpack_require__(8);
function setRef(ref, node) {
    if (typeof ref === 'function') {
        ref(node);
    }
    else {
        ref.current = node;
    }
}
function cloneWithRef(element, newRef) {
    var previousRef = element.ref;
    invariant(typeof previousRef !== 'string', 'Cannot connect React DnD to an element with an existing string ref. ' +
        'Please convert it to use a callback ref instead, or wrap it into a <span> or <div>. ' +
        'Read more: https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute');
    if (!previousRef) {
        // When there is no ref on the element, use the new ref directly
        return react_1.cloneElement(element, {
            ref: newRef,
        });
    }
    return react_1.cloneElement(element, {
        ref: function (node) {
            setRef(newRef, node);
            if (previousRef) {
                setRef(previousRef, node);
            }
        },
    });
}
exports.default = cloneWithRef;


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (search, thisLen) {
        if (thisLen === undefined || thisLen > this.length) {
            thisLen = this.length;
        }
        return this.substring(thisLen - search.length, thisLen) === search;
    };
}


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var checkDecoratorArguments_1 = __webpack_require__(75);
var decorateHandler_1 = __webpack_require__(132);
var registerTarget_1 = __webpack_require__(140);
var createTargetFactory_1 = __webpack_require__(273);
var isValidType_1 = __webpack_require__(139);
var DropTargetMonitorImpl_1 = __webpack_require__(141);
var TargetConnector_1 = __webpack_require__(142);
var discount_lodash_1 = __webpack_require__(53);
var invariant = __webpack_require__(8);
function DropTarget(type, spec, collect, options) {
    if (options === void 0) { options = {}; }
    checkDecoratorArguments_1.default('DropTarget', 'type, spec, collect[, options]', type, spec, collect, options);
    var getType = type;
    if (typeof type !== 'function') {
        invariant(isValidType_1.default(type, true), 'Expected "type" provided as the first argument to DropTarget to be ' +
            'a string, an array of strings, or a function that returns either given ' +
            'the current props. Instead, received %s. ' +
            'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', type);
        getType = function () { return type; };
    }
    invariant(discount_lodash_1.isPlainObject(spec), 'Expected "spec" provided as the second argument to DropTarget to be ' +
        'a plain object. Instead, received %s. ' +
        'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', spec);
    var createTarget = createTargetFactory_1.default(spec);
    invariant(typeof collect === 'function', 'Expected "collect" provided as the third argument to DropTarget to be ' +
        'a function that returns a plain object of props to inject. ' +
        'Instead, received %s. ' +
        'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', collect);
    invariant(discount_lodash_1.isPlainObject(options), 'Expected "options" provided as the fourth argument to DropTarget to be ' +
        'a plain object when specified. ' +
        'Instead, received %s. ' +
        'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', collect);
    return function decorateTarget(DecoratedComponent) {
        return decorateHandler_1.default({
            containerDisplayName: 'DropTarget',
            createHandler: createTarget,
            registerHandler: registerTarget_1.default,
            createMonitor: function (manager) {
                return new DropTargetMonitorImpl_1.default(manager);
            },
            createConnector: function (backend) { return new TargetConnector_1.default(backend); },
            DecoratedComponent: DecoratedComponent,
            getType: getType,
            collect: collect,
            options: options,
        });
    };
}
exports.default = DropTarget;


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
var getDecoratedComponent_1 = __webpack_require__(134);
var discount_lodash_1 = __webpack_require__(53);
var invariant = __webpack_require__(8);
var ALLOWED_SPEC_METHODS = ['canDrop', 'hover', 'drop'];
var TargetImpl = /** @class */ (function () {
    function TargetImpl(spec, monitor, ref) {
        this.spec = spec;
        this.monitor = monitor;
        this.ref = ref;
        this.props = null;
    }
    TargetImpl.prototype.receiveProps = function (props) {
        this.props = props;
    };
    TargetImpl.prototype.receiveMonitor = function (monitor) {
        this.monitor = monitor;
    };
    TargetImpl.prototype.canDrop = function () {
        if (!this.spec.canDrop) {
            return true;
        }
        return this.spec.canDrop(this.props, this.monitor);
    };
    TargetImpl.prototype.hover = function () {
        if (!this.spec.hover) {
            return;
        }
        this.spec.hover(this.props, this.monitor, getDecoratedComponent_1.getDecoratedComponent(this.ref));
    };
    TargetImpl.prototype.drop = function () {
        if (!this.spec.drop) {
            return undefined;
        }
        var dropResult = this.spec.drop(this.props, this.monitor, this.ref.current);
        if (process.env.NODE_ENV !== 'production') {
            invariant(typeof dropResult === 'undefined' || discount_lodash_1.isPlainObject(dropResult), 'drop() must either return undefined, or an object that represents the drop result. ' +
                'Instead received %s. ' +
                'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', dropResult);
        }
        return dropResult;
    };
    return TargetImpl;
}());
function createTargetFactory(spec) {
    Object.keys(spec).forEach(function (key) {
        invariant(ALLOWED_SPEC_METHODS.indexOf(key) > -1, 'Expected the drop target specification to only have ' +
            'some of the following keys: %s. ' +
            'Instead received a specification with an unexpected "%s" key. ' +
            'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', ALLOWED_SPEC_METHODS.join(', '), key);
        invariant(typeof spec[key] === 'function', 'Expected %s in the drop target specification to be a function. ' +
            'Instead received a specification with %s: %s. ' +
            'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', key, key, spec[key]);
    });
    return function createTarget(monitor, ref) {
        return new TargetImpl(spec, monitor, ref);
    };
}
exports.default = createTargetFactory;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
/*
 * A utility for rendering a drag preview image
 */
var DragPreviewImage = React.memo(function (_a) {
    var connect = _a.connect, src = _a.src;
    if (typeof Image !== 'undefined') {
        var img_1 = new Image();
        img_1.src = src;
        img_1.onload = function () { return connect(img_1); };
    }
    return null;
});
exports.default = DragPreviewImage;


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(276));
__export(__webpack_require__(278));
__export(__webpack_require__(280));


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var useMonitorOutput_1 = __webpack_require__(143);
var drag_1 = __webpack_require__(277);
var react_1 = __webpack_require__(0);
var invariant = __webpack_require__(8);
/**
 * useDragSource hook (This API is experimental and subject to breaking changes in non-major versions)
 * @param sourceSpec The drag source specification *
 */
function useDrag(spec) {
    var specRef = react_1.useRef(spec);
    // TODO: wire options into createSourceConnector
    invariant(spec.item != null, 'item must be defined');
    invariant(spec.item.type != null, 'item type must be defined');
    var _a = drag_1.useDragSourceMonitor(), monitor = _a[0], connector = _a[1];
    drag_1.useDragHandler(specRef, monitor, connector);
    var result = useMonitorOutput_1.useMonitorOutput(monitor, specRef.current.collect || (function () { return ({}); }), function () { return connector.reconnect(); });
    var connectDragSource = react_1.useMemo(function () { return connector.hooks.dragSource(); }, [
        connector,
    ]);
    var connectDragPreview = react_1.useMemo(function () { return connector.hooks.dragPreview(); }, [
        connector,
    ]);
    react_1.useEffect(function () {
        connector.dragSourceOptions = specRef.current.options || null;
        connector.reconnect();
    }, [connector]);
    react_1.useEffect(function () {
        connector.dragPreviewOptions = specRef.current.previewOptions || null;
        connector.reconnect();
    }, [connector]);
    return [result, connectDragSource, connectDragPreview];
}
exports.useDrag = useDrag;


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(0);
var registerSource_1 = __webpack_require__(133);
var useDragDropManager_1 = __webpack_require__(98);
var DragSourceMonitorImpl_1 = __webpack_require__(135);
var SourceConnector_1 = __webpack_require__(136);
var invariant = __webpack_require__(8);
function useDragSourceMonitor() {
    var manager = useDragDropManager_1.useDragDropManager();
    var monitor = react_1.useMemo(function () { return new DragSourceMonitorImpl_1.default(manager); }, [manager]);
    var connector = react_1.useMemo(function () { return new SourceConnector_1.default(manager.getBackend()); }, [
        manager,
    ]);
    return [monitor, connector];
}
exports.useDragSourceMonitor = useDragSourceMonitor;
function useDragHandler(spec, monitor, connector) {
    var manager = useDragDropManager_1.useDragDropManager();
    // Can't use createSourceFactory, as semantics are different
    var handler = react_1.useMemo(function () {
        return {
            beginDrag: function () {
                var _a = spec.current, begin = _a.begin, item = _a.item;
                if (begin) {
                    var beginResult = begin(monitor);
                    invariant(beginResult == null || typeof beginResult === 'object', 'dragSpec.begin() must either return an object, undefined, or null');
                    return beginResult || item || {};
                }
                return item || {};
            },
            canDrag: function () {
                if (typeof spec.current.canDrag === 'boolean') {
                    return spec.current.canDrag;
                }
                else if (typeof spec.current.canDrag === 'function') {
                    return spec.current.canDrag(monitor);
                }
                else {
                    return true;
                }
            },
            isDragging: function (globalMonitor, target) {
                var isDragging = spec.current.isDragging;
                return isDragging
                    ? isDragging(monitor)
                    : target === globalMonitor.getSourceId();
            },
            endDrag: function () {
                var end = spec.current.end;
                if (end) {
                    end(monitor.getItem(), monitor);
                }
                connector.reconnect();
            },
        };
    }, []);
    react_1.useEffect(function registerHandler() {
        // console.log('Register Handler')
        var _a = registerSource_1.default(spec.current.item.type, handler, manager), handlerId = _a[0], unregister = _a[1];
        monitor.receiveHandlerId(handlerId);
        connector.receiveHandlerId(handlerId);
        return unregister;
    }, []);
}
exports.useDragHandler = useDragHandler;


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var useMonitorOutput_1 = __webpack_require__(143);
var drop_1 = __webpack_require__(279);
var react_1 = __webpack_require__(0);
var invariant = __webpack_require__(8);
/**
 * useDropTarget Hook (This API is experimental and subject to breaking changes in non-breaking versions)
 * @param spec The drop target specification
 */
function useDrop(spec) {
    var specRef = react_1.useRef(spec);
    invariant(spec.accept != null, 'accept must be defined');
    var _a = drop_1.useDropTargetMonitor(), monitor = _a[0], connector = _a[1];
    drop_1.useDropHandler(specRef, monitor, connector);
    var result = useMonitorOutput_1.useMonitorOutput(monitor, specRef.current.collect || (function () { return ({}); }), function () { return connector.reconnect(); });
    var connectDropTarget = react_1.useMemo(function () { return connector.hooks.dropTarget(); }, [
        connector,
    ]);
    react_1.useEffect(function () {
        connector.dropTargetOptions = spec.options || null;
        connector.reconnect();
    }, [spec.options]);
    return [result, connectDropTarget];
}
exports.useDrop = useDrop;


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(0);
var registerTarget_1 = __webpack_require__(140);
var useDragDropManager_1 = __webpack_require__(98);
var TargetConnector_1 = __webpack_require__(142);
var DropTargetMonitorImpl_1 = __webpack_require__(141);
function useDropTargetMonitor() {
    var manager = useDragDropManager_1.useDragDropManager();
    var monitor = react_1.useMemo(function () { return new DropTargetMonitorImpl_1.default(manager); }, [manager]);
    var connector = react_1.useMemo(function () { return new TargetConnector_1.default(manager.getBackend()); }, [
        manager,
    ]);
    return [monitor, connector];
}
exports.useDropTargetMonitor = useDropTargetMonitor;
function useDropHandler(spec, monitor, connector) {
    var manager = useDragDropManager_1.useDragDropManager();
    // Can't use createSourceFactory, as semantics are different
    var handler = react_1.useMemo(function () {
        // console.log('create drop target handler')
        return {
            canDrop: function () {
                var canDrop = spec.current.canDrop;
                return canDrop ? canDrop(monitor.getItem(), monitor) : true;
            },
            hover: function () {
                var hover = spec.current.hover;
                if (hover) {
                    hover(monitor.getItem(), monitor);
                }
            },
            drop: function () {
                var drop = spec.current.drop;
                if (drop) {
                    return drop(monitor.getItem(), monitor);
                }
            },
        };
    }, [monitor]);
    react_1.useEffect(function registerHandler() {
        // console.log('register droptarget handler')
        var _a = registerTarget_1.default(spec.current.accept, handler, manager), handlerId = _a[0], unregister = _a[1];
        monitor.receiveHandlerId(handlerId);
        connector.receiveHandlerId(handlerId);
        return unregister;
    }, [monitor, connector]);
}
exports.useDropHandler = useDropHandler;


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(0);
var useDragDropManager_1 = __webpack_require__(98);
var useCollector_1 = __webpack_require__(144);
/**
 * useDragLayer Hook  (This API is experimental and subject to breaking changes in non-breaking versions)
 * @param collector The property collector
 */
function useDragLayer(collect) {
    var dragDropManager = useDragDropManager_1.useDragDropManager();
    var monitor = dragDropManager.getMonitor();
    var _a = useCollector_1.useCollector(monitor, collect), collected = _a[0], updateCollected = _a[1];
    react_1.useEffect(function () { return monitor.subscribeToOffsetChange(updateCollected); });
    react_1.useEffect(function () { return monitor.subscribeToStateChange(updateCollected); });
    return collected;
}
exports.useDragLayer = useDragLayer;


/***/ })
],[223]);
//# sourceMappingURL=dnd.js.map