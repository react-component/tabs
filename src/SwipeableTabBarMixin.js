import React from 'react';
import classnames from 'classnames';
import Hammer from 'react-hammerjs';
import ReactDOM from 'react-dom';
import {
  isVertical,
} from './utils';

const getStyle = (el, property) => {
  return +getComputedStyle(el).getPropertyValue(property).replace('px', '');
};
const setPosition = (node, property, value) => {
  node.style[property] = `${value}px`;
};

export default {
  getDefaultProps() {
    return {
      hammerOptions: {},
      pageSize: 5, // per page show how many tabs
      speed: 5, // 1 ~ 10, more faster
    };
  },
  setSwipePosition(value) {
    setPosition(this.swipeNode, this._relativeDirection, value);
  },
  setSwipePositionByKey() {
    const { panels, activeKey, pageSize } = this.props;
    const index = panels.findIndex(panel => panel.key === activeKey);
    if (index + 1 > pageSize) {
      const delta = (index - (pageSize / 2)) * this._tabSize;
      this.setSwipePosition(delta);
    }
  },
  componentDidMount() {
    const { swipe, nav } = this.refs;
    const { tabBarPosition, pageSize, panels } = this.props;
    this.swipeNode = ReactDOM.findDOMNode(swipe); // dom which scroll
    this.realNode = ReactDOM.findDOMNode(nav); // dom which visiable in screen
    // todo: do we need to handle possible props.tabBarPosition change in componentWillReceiveProps
    this._isVertical = isVertical(tabBarPosition);
    this._relativeDirection = this._isVertical ? 'top' : 'left';
    const containerDirection = this._isVertical ? 'height' : 'width';
    // the viewport size, like screenWidth if fullscreen
    const viewSize = getStyle(this.realNode, containerDirection);
    this._tabSize = viewSize / pageSize;
    const totalSize = this._tabSize * panels.length;
    this._totalAvaliableDelta = totalSize - viewSize;
    this.setSwipePositionByKey();
  },
  onPan(e) {
    let nowDelta = this._isVertical ? e.deltaY : e.deltaX;
    nowDelta = nowDelta * (this.props.speed / 10);
    const preDelta = +getComputedStyle(this.swipeNode)
      .getPropertyValue(this._relativeDirection)
      .replace('px', '');
    const nextTotalDelta = nowDelta + preDelta;
    if (nextTotalDelta < 0 && -nextTotalDelta < this._totalAvaliableDelta) {
      this.setSwipePotion(nextTotalDelta);
    }
  },
  getSwipeBarNode(tabs) {
    const { prefixCls, hammerOptions, tabBarPosition } = this.props;
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
