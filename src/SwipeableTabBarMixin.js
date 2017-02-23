import React from 'react';
import classnames from 'classnames';
import Hammer from 'react-hammerjs';
import ReactDOM from 'react-dom';
import {
  isVertical,
} from './utils';

export default {
  getDefaultProps() {
    return {
      hammerOptions: {},
    };
  },
  componentDidMount() {
    this.swipeNode = ReactDOM.findDOMNode(this.refs.swipe);
    this.realNode = ReactDOM.findDOMNode(this.refs.nav);
    // todo: do we need to handle possible props.tabBarPosition change in componentWillReceiveProps
    this._isVertical = isVertical(this.props.tabBarPosition);
    this._relativeDirection = this._isVertical ? 'top' : 'left';
    const screen = document.documentElement;
    const screenSize = this._isVertical ? screen.clientHeight : screen.clientWidth;
    const totalSize = this._isVertical ? this.realNode.offsetHeight : this.realNode.offsetWidth;
    this._totalAvaliableDelta = totalSize - screenSize;
  },
  onPan(e) {
    const nowDelta = this._isVertical ? e.deltaY : e.deltaX;
    const preDelta = +getComputedStyle(this.swipeNode)
      .getPropertyValue(this._relativeDirection)
      .replace('px', '');
    const nextTotalDelta = nowDelta + preDelta;
    if (nextTotalDelta < 0 && -nextTotalDelta < this._totalAvaliableDelta) {
      this.swipeNode.style[this._relativeDirection] = `${nextTotalDelta}px`;
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
