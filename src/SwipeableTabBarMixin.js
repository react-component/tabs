import React from 'react';
import classnames from 'classnames';
import Hammer from 'react-hammerjs';
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
      speed: 5, // swipe speed, 1 to 10, more bigger more faster
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
    for (let i = 0; i <= length; i++) {
      if (panels[i].key === activeKey) {
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
    this.setSwipePositionByDelta(delta);
  },
  setSwipePositionByDelta(value) {
    const { relativeDirection } = this.cache;
    setPxStyle(this.swipeNode, relativeDirection, value);
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
      relativeDirection: _isVertical ? 'top' : 'left',
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
    const { vertical, relativeDirection } = this.cache;
    const { speed } = this.props;
    let nowDelta = vertical ? e.deltaY : e.deltaX;
    nowDelta = nowDelta * (speed / 10);
    const preDelta = getStyle(this.swipeNode, relativeDirection);
    const nextTotalDelta = nowDelta + preDelta;
    const { hasPrevPage, hasNextPage } = this.checkPaginationByDelta(nextTotalDelta);
    this.setState({
      hasPrevPage,
      hasNextPage,
    });
    if (hasPrevPage && hasNextPage) {
      this.setSwipePositionByDelta(nextTotalDelta);
    }
  },
  getSwipeBarNode(tabs) {
    const { prefixCls, hammerOptions, tabBarPosition } = this.props;
    const { hasPrevPage, hasNextPage } = this.state;
    const navClassName = `${prefixCls}-nav`;
    const navClasses = classnames({
      [navClassName]: true,
    });
    let direction = {};
    if (isVertical(tabBarPosition)) {
      direction = {
        vertical: true,
      };
    }
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
            {...direction}
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
