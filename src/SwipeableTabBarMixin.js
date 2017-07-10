import React from 'react';
import classnames from 'classnames';
import Hammer from 'rc-hammerjs';
import ReactDOM from 'react-dom';
import {
  isVertical,
  getStyle,
  setPxStyle,
} from './utils';

export default {
  getInitialState() {
    const { hasPrevPage, hasNextPage } = this.checkPaginationByKey(this.props.activeKey);
    return {
      hasPrevPage,
      hasNextPage,
    };
  },
  getDefaultProps() {
    return {
      hammerOptions: {},
      pageSize: 5, // per page show how many tabs
      speed: 7, // swipe speed, 1 to 10, more bigger more faster
    };
  },
  checkPaginationByKey(activeKey) {
    const { panels, pageSize } = this.props;
    const index = this.getIndexByKey(activeKey);
    const centerTabCount = Math.floor(pageSize / 2);
    // the basic rule is to make activeTab be shown in the center of TabBar viewport
    return {
      hasPrevPage: index - centerTabCount > 0,
      hasNextPage: index + centerTabCount < panels.length,
    };
  },
  /**
   * used for props.activeKey setting, not for swipe callback
   */
  getDeltaByKey(activeKey) {
    const { pageSize } = this.props;
    const index = this.getIndexByKey(activeKey);
    const centerTabCount = Math.floor(pageSize / 2);
    const { tabWidth } = this.cache;
    const delta = (index - centerTabCount) * tabWidth * -1;
    return delta;
  },
  getIndexByKey(activeKey) {
    const { panels } = this.props;
    const length = panels.length;
    for (let i = 0; i < length; i++) {
      // 存在key为number activeKey为string 或者相反的情况
      if (panels[i].key == activeKey) { // eslint-disable-line
        return i;
      }
    }
    return -1;
  },
  checkPaginationByDelta(delta) {
    const { totalAvaliableDelta } = this.cache;
    return {
      hasPrevPage: delta < 0,
      hasNextPage: -delta < totalAvaliableDelta,
    };
  },
  setSwipePositionByKey(activeKey) {
    const { hasPrevPage, hasNextPage } = this.checkPaginationByKey(activeKey);
    const { totalAvaliableDelta } = this.cache;
    this.setState({
      hasPrevPage,
      hasNextPage,
    });
    let delta;
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
  setSwipePosition() {
    const { totalDelta, vertical } = this.cache;
    setPxStyle(this.swipeNode, totalDelta, vertical);
  },
  componentDidMount() {
    const { swipe, nav } = this.refs;
    const { tabBarPosition, pageSize, panels, activeKey } = this.props;
    this.swipeNode = ReactDOM.findDOMNode(swipe); // dom which scroll (9999px)
    this.realNode = ReactDOM.findDOMNode(nav); // dom which visiable in screen (viewport)
    const _isVertical = isVertical(tabBarPosition);
    const _viewSize = getStyle(this.realNode, _isVertical ? 'height' : 'width');
    const _tabWidth = _viewSize / pageSize;
    this.cache = {
      vertical: _isVertical,
      totalAvaliableDelta: _tabWidth * panels.length - _viewSize,
      tabWidth: _tabWidth,
    };
    this.setSwipePositionByKey(activeKey);
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.activeKey && nextProps.activeKey !== this.props.activeKey) {
      this.setSwipePositionByKey(nextProps.activeKey);
    }
  },
  onPan(e) {
    const { vertical, totalAvaliableDelta, totalDelta } = this.cache;
    const { speed } = this.props;
    // calculate touch distance
    let nowDelta = vertical ? e.deltaY : e.deltaX;
    nowDelta = nowDelta * (speed / 10);

    // calculate distance dom need transform
    let _nextDelta = nowDelta + totalDelta;
    if (_nextDelta >= 0) {
      _nextDelta = 0;
    } else if (_nextDelta <= -totalAvaliableDelta) {
      _nextDelta = -totalAvaliableDelta;
    }

    this.cache.totalDelta = _nextDelta;
    this.setSwipePosition();

    // calculate pagination display
    const { hasPrevPage, hasNextPage } = this.checkPaginationByDelta(this.cache.totalDelta);
    if (hasPrevPage !== this.state.hasPrevPage || hasNextPage !== this.state.hasNextPage) {
      this.setState({
        hasPrevPage,
        hasNextPage,
      });
    }
  },
  getSwipeBarNode(tabs) {
    const { prefixCls, hammerOptions, tabBarPosition } = this.props;
    const { hasPrevPage, hasNextPage } = this.state;
    const navClassName = `${prefixCls}-nav`;
    const navClasses = classnames({
      [navClassName]: true,
    });
    const events = {
      onPan: this.onPan,
    };
    return (
      <div
        className={classnames({
          [`${prefixCls}-nav-container`]: 1,
          [`${prefixCls}-nav-swipe-container`]: 1,
          // page classname can be used to render special style when there has a prev/next page
          [`${prefixCls}-prevpage`]: hasPrevPage,
          [`${prefixCls}-nextpage`]: hasNextPage,
        })}
        key="container"
        ref="container"
      >
        <div className={`${prefixCls}-nav-wrap`} ref="navWrap">
          <Hammer
            {...events}
            direction={isVertical(tabBarPosition) ? 'DIRECTION_ALL' : 'DIRECTION_HORIZONTAL'}
            options={hammerOptions}
          >
            <div className={`${prefixCls}-nav-swipe`} ref="swipe">
              <div className={navClasses} ref="nav">
                {tabs}
              </div>
            </div>
          </Hammer>
        </div>
      </div>
    );
  },
};
