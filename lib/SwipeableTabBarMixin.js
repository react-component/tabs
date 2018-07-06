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

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _rcHammerjs = require('rc-hammerjs');

var _rcHammerjs2 = _interopRequireDefault(_rcHammerjs);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = {
  getInitialState: function getInitialState() {
    var _checkPaginationByKey = this.checkPaginationByKey(this.props.activeKey),
        hasPrevPage = _checkPaginationByKey.hasPrevPage,
        hasNextPage = _checkPaginationByKey.hasNextPage;

    return {
      hasPrevPage: hasPrevPage,
      hasNextPage: hasNextPage
    };
  },
  getDefaultProps: function getDefaultProps() {
    return {
      hammerOptions: {},
      pageSize: 5, // per page show how many tabs
      speed: 7 // swipe speed, 1 to 10, more bigger more faster
    };
  },
  checkPaginationByKey: function checkPaginationByKey(activeKey) {
    var _props = this.props,
        panels = _props.panels,
        pageSize = _props.pageSize;

    var index = this.getIndexByKey(activeKey);
    var centerTabCount = Math.floor(pageSize / 2);
    // the basic rule is to make activeTab be shown in the center of TabBar viewport
    return {
      hasPrevPage: index - centerTabCount > 0,
      hasNextPage: index + centerTabCount < panels.length
    };
  },

  /**
   * used for props.activeKey setting, not for swipe callback
   */
  getDeltaByKey: function getDeltaByKey(activeKey) {
    var pageSize = this.props.pageSize;

    var index = this.getIndexByKey(activeKey);
    var centerTabCount = Math.floor(pageSize / 2);
    var tabWidth = this.cache.tabWidth;

    var delta = (index - centerTabCount) * tabWidth * -1;
    return delta;
  },
  getIndexByKey: function getIndexByKey(activeKey) {
    var panels = this.props.panels;

    var length = panels.length;
    for (var i = 0; i < length; i++) {
      if (panels[i].key === activeKey) {
        return i;
      }
    }
    return -1;
  },
  checkPaginationByDelta: function checkPaginationByDelta(delta) {
    var totalAvaliableDelta = this.cache.totalAvaliableDelta;

    return {
      hasPrevPage: delta < 0,
      hasNextPage: -delta < totalAvaliableDelta
    };
  },
  setSwipePositionByKey: function setSwipePositionByKey(activeKey) {
    var _checkPaginationByKey2 = this.checkPaginationByKey(activeKey),
        hasPrevPage = _checkPaginationByKey2.hasPrevPage,
        hasNextPage = _checkPaginationByKey2.hasNextPage;

    var totalAvaliableDelta = this.cache.totalAvaliableDelta;

    this.setState({
      hasPrevPage: hasPrevPage,
      hasNextPage: hasNextPage
    });
    var delta = void 0;
    if (!hasPrevPage) {
      // the first page
      delta = 0;
    } else if (!hasNextPage) {
      // the last page
      delta = -totalAvaliableDelta;
    } else if (hasNextPage) {
      // the middle page
      delta = this.getDeltaByKey(activeKey);
    }
    this.cache.totalDelta = delta;
    this.setSwipePosition();
  },
  setSwipePosition: function setSwipePosition() {
    var _cache = this.cache,
        totalDelta = _cache.totalDelta,
        vertical = _cache.vertical;

    (0, _utils.setPxStyle)(this.swipeNode, totalDelta, vertical);
  },
  componentDidMount: function componentDidMount() {
    var swipe = this.swipe,
        nav = this.nav;
    var _props2 = this.props,
        tabBarPosition = _props2.tabBarPosition,
        pageSize = _props2.pageSize,
        panels = _props2.panels,
        activeKey = _props2.activeKey;

    this.swipeNode = _reactDom2['default'].findDOMNode(swipe); // dom which scroll (9999px)
    this.realNode = _reactDom2['default'].findDOMNode(nav); // dom which visiable in screen (viewport)
    var _isVertical = (0, _utils.isVertical)(tabBarPosition);
    var _viewSize = (0, _utils.getStyle)(this.realNode, _isVertical ? 'height' : 'width');
    var _tabWidth = _viewSize / pageSize;
    this.cache = {
      vertical: _isVertical,
      totalAvaliableDelta: _tabWidth * panels.length - _viewSize,
      tabWidth: _tabWidth
    };
    this.setSwipePositionByKey(activeKey);
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.activeKey && nextProps.activeKey !== this.props.activeKey) {
      this.setSwipePositionByKey(nextProps.activeKey);
    }
  },
  onPan: function onPan(e) {
    var _cache2 = this.cache,
        vertical = _cache2.vertical,
        totalAvaliableDelta = _cache2.totalAvaliableDelta,
        totalDelta = _cache2.totalDelta;
    var speed = this.props.speed;
    // calculate touch distance

    var nowDelta = vertical ? e.deltaY : e.deltaX;
    nowDelta = nowDelta * (speed / 10);

    // calculate distance dom need transform
    var _nextDelta = nowDelta + totalDelta;
    if (_nextDelta >= 0) {
      _nextDelta = 0;
    } else if (_nextDelta <= -totalAvaliableDelta) {
      _nextDelta = -totalAvaliableDelta;
    }

    this.cache.totalDelta = _nextDelta;
    this.setSwipePosition();

    // calculate pagination display

    var _checkPaginationByDel = this.checkPaginationByDelta(this.cache.totalDelta),
        hasPrevPage = _checkPaginationByDel.hasPrevPage,
        hasNextPage = _checkPaginationByDel.hasNextPage;

    if (hasPrevPage !== this.state.hasPrevPage || hasNextPage !== this.state.hasNextPage) {
      this.setState({
        hasPrevPage: hasPrevPage,
        hasNextPage: hasNextPage
      });
    }
  },
  getSwipeBarNode: function getSwipeBarNode(tabs) {
    var _classnames2;

    var _props3 = this.props,
        prefixCls = _props3.prefixCls,
        hammerOptions = _props3.hammerOptions,
        tabBarPosition = _props3.tabBarPosition;
    var _state = this.state,
        hasPrevPage = _state.hasPrevPage,
        hasNextPage = _state.hasNextPage;

    var navClassName = prefixCls + '-nav';
    var navClasses = (0, _classnames4['default'])((0, _defineProperty3['default'])({}, navClassName, true));
    var events = {
      onPan: this.onPan
    };
    return _react2['default'].createElement(
      'div',
      {
        className: (0, _classnames4['default'])((_classnames2 = {}, (0, _defineProperty3['default'])(_classnames2, prefixCls + '-nav-container', 1), (0, _defineProperty3['default'])(_classnames2, prefixCls + '-nav-swipe-container', 1), (0, _defineProperty3['default'])(_classnames2, prefixCls + '-prevpage', hasPrevPage), (0, _defineProperty3['default'])(_classnames2, prefixCls + '-nextpage', hasNextPage), _classnames2)),
        key: 'container',
        ref: this.saveRef('container')
      },
      _react2['default'].createElement(
        'div',
        { className: prefixCls + '-nav-wrap', ref: this.saveRef('navWrap') },
        _react2['default'].createElement(
          _rcHammerjs2['default'],
          (0, _extends3['default'])({}, events, {
            direction: (0, _utils.isVertical)(tabBarPosition) ? 'DIRECTION_ALL' : 'DIRECTION_HORIZONTAL',
            options: hammerOptions
          }),
          _react2['default'].createElement(
            'div',
            { className: prefixCls + '-nav-swipe', ref: this.saveRef('swipe') },
            _react2['default'].createElement(
              'div',
              { className: navClasses, ref: this.saveRef('nav') },
              tabs
            )
          )
        )
      )
    );
  }
};
module.exports = exports['default'];