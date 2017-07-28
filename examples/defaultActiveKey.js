webpackJsonp([5],{

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_create_react_class__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_create_react_class___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_create_react_class__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__InkTabBarMixin__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ScrollableTabBarMixin__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TabBarMixin__ = __webpack_require__(29);





var ScrollableInkTabBar = __WEBPACK_IMPORTED_MODULE_0_create_react_class___default()({
  displayName: 'ScrollableInkTabBar',
  mixins: [__WEBPACK_IMPORTED_MODULE_3__TabBarMixin__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__InkTabBarMixin__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__ScrollableTabBarMixin__["a" /* default */]],
  render: function render() {
    var inkBarNode = this.getInkBarNode();
    var tabs = this.getTabs();
    var scrollbarNode = this.getScrollBarNode([inkBarNode, tabs]);
    return this.getRootNode(scrollbarNode);
  }
});

/* harmony default export */ __webpack_exports__["a"] = (ScrollableInkTabBar);

/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);





/* harmony default export */ __webpack_exports__["a"] = ({
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
      var transformSupported = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["l" /* isTransformSupported */])(navStyle);
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["e" /* setTransform */])(navStyle, navOffset.value);
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
    var _classnames, _classnames2, _classnames3, _classnames4;

    var _state2 = this.state,
        next = _state2.next,
        prev = _state2.prev;
    var _props = this.props,
        prefixCls = _props.prefixCls,
        scrollAnimated = _props.scrollAnimated;

    var showNextPrev = prev || next;

    var prevButton = __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
      'span',
      {
        onClick: prev ? this.prev : null,
        unselectable: 'unselectable',
        className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()((_classnames = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classnames, prefixCls + '-tab-prev', 1), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classnames, prefixCls + '-tab-btn-disabled', !prev), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classnames, prefixCls + '-tab-arrow-show', showNextPrev), _classnames))
      },
      __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('span', { className: prefixCls + '-tab-prev-icon' })
    );

    var nextButton = __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
      'span',
      {
        onClick: next ? this.next : null,
        unselectable: 'unselectable',
        className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()((_classnames2 = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classnames2, prefixCls + '-tab-next', 1), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classnames2, prefixCls + '-tab-btn-disabled', !next), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classnames2, prefixCls + '-tab-arrow-show', showNextPrev), _classnames2))
      },
      __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('span', { className: prefixCls + '-tab-next-icon' })
    );

    var navClassName = prefixCls + '-nav';
    var navClasses = __WEBPACK_IMPORTED_MODULE_1_classnames___default()((_classnames3 = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classnames3, navClassName, true), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classnames3, scrollAnimated ? navClassName + '-animated' : navClassName + '-no-animated', true), _classnames3));

    return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
      'div',
      {
        className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()((_classnames4 = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classnames4, prefixCls + '-nav-container', 1), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classnames4, prefixCls + '-nav-container-scrolling', showNextPrev), _classnames4)),
        key: 'container',
        ref: 'container'
      },
      prevButton,
      nextButton,
      __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
        'div',
        { className: prefixCls + '-nav-wrap', ref: 'navWrap' },
        __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
          'div',
          { className: prefixCls + '-nav-scroll' },
          __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
            'div',
            { className: navClasses, ref: 'nav' },
            content
          )
        )
      )
    );
  }
});

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_tabs_assets_index_less__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_tabs_assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rc_tabs_assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rc_tabs__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rc_tabs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rc_tabs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_TabContent__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_ScrollableInkTabBar__ = __webpack_require__(17);




/* eslint react/no-multi-comp:0, no-console:0, react/prop-types:0 */







var PanelContent = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(PanelContent, _React$Component);

  function PanelContent(props) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, PanelContent);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (PanelContent.__proto__ || Object.getPrototypeOf(PanelContent)).call(this, props));

    console.log(_this.props.id, 'constructor');
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(PanelContent, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      console.log(this.props.id, 'componentWillReceiveProps');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var count = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // new Array(4) skip forEach ....
      var els = count.map(function (c, i) {
        return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'p',
          { key: i },
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'button',
            null,
            _this2.props.id
          )
        );
      });
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        { style: { height: 200, overflow: 'auto' } },
        els
      );
    }
  }]);

  return PanelContent;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

var defaultTabKey = '2';

var Component = __WEBPACK_IMPORTED_MODULE_5_react___default.a.createClass({
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
    return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'div',
      null,
      __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'h1',
        null,
        'Simple Tabs'
      ),
      __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'p',
        null,
        'current: ',
        this.state.tabKey
      ),
      __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_7_rc_tabs___default.a,
        {
          defaultActiveKey: defaultTabKey,
          renderTabBar: function renderTabBar() {
            return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__src_ScrollableInkTabBar__["a" /* default */], { onTabClick: _this3.onTabClick });
          },
          renderTabContent: function renderTabContent() {
            return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__src_TabContent__["a" /* default */], null);
          },
          onChange: this.onChange
        },
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_7_rc_tabs__["TabPane"],
          { tab: 'tab ' + start, key: '1' },
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(PanelContent, { id: start })
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_7_rc_tabs__["TabPane"],
          { tab: 'tab ' + (start + 1), key: '2' },
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(PanelContent, { id: start + 1 })
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_7_rc_tabs__["TabPane"],
          { tab: 'tab ' + (start + 2), key: '3', disabled: disabled },
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(PanelContent, { id: start + 2 })
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_7_rc_tabs__["TabPane"],
          { tab: 'tab ' + (start + 3), key: '4' },
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(PanelContent, { id: start + 3 })
        )
      ),
      __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'button',
        { onClick: this.tick },
        'rerender'
      )
    );
  }
});

__WEBPACK_IMPORTED_MODULE_6_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(Component, null), document.getElementById('__react-content'));

/***/ }),

/***/ 369:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(183);


/***/ })

},[369]);
//# sourceMappingURL=defaultActiveKey.js.map