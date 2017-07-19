import TabContent from './TabContent';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {
  isVertical,
  getActiveIndex,
  getTransformByIndex,
  setTransform,
  getActiveKey,
  toArray,
} from './utils';

const RESISTANCE_COEF = 0.6;

// inspired by  of http://hammerjs.github.io/recognizer-swipe/
const VELOCITY = 0.3; //       Minimal velocity required before recognizing, unit is in px per ms.
const THRESHOLD = 10; // Minimal distance required before recognizing.

function computeIndex({
  maxIndex,
  startIndex,
  delta,
  viewSize,
}) {
  let index = startIndex + -delta / viewSize;
  if (index < 0) {
    index = Math.exp(index * RESISTANCE_COEF) - 1;
  } else if (index > maxIndex) {
    index = maxIndex + 1 - Math.exp((maxIndex - index) * RESISTANCE_COEF);
  }
  return index;
}

export default class SwipeableTabContent extends Component {

  static propTypes = {
    tabBarPosition: PropTypes.string,
    onChange: PropTypes.func,
    children: PropTypes.any,
    hammerOptions: PropTypes.any,
    animated: PropTypes.bool,
    activeKey: PropTypes.string,
  };

  static defaultProps = {
    animated: true,
  };

  componentDidMount() {
    this.rootNode = ReactDOM.findDOMNode(this);
  }

  getIndexByDelta = (delta) => {
    const currentIndex = computeIndex({
      maxIndex: this.maxIndex,
      viewSize: this.viewSize,
      startIndex: this.startIndex,
      delta,
    });
    let showIndex = delta < 0 ? Math.floor(currentIndex + 1) : Math.floor(currentIndex);
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

  handleStart = (e) => {
    const { tabBarPosition, children, activeKey } = this.props;
    const startIndex = this.startIndex = getActiveIndex(children, activeKey);
    if (startIndex === -1) {
      return;
    }
    const { clientX, clientY } = e.touches[0];
    this.swipeObj = {
      startTimeStamp: Date.now(),
      startClientX: clientX,
      startClientY: clientY,
    };
    this.children = toArray(children);
    this.maxIndex = this.children.length - 1;
    this.viewSize = isVertical(tabBarPosition) ?
      this.rootNode.offsetHeight :
      this.rootNode.offsetWidth;
  }
  handleMove = (e) => {
    const { tabBarPosition } = this.props;
    const { clientX, clientY } = e.touches[0];
    const { startClientX, startClientY } = this.swipeObj;
    this.swipeObj = {
      ...this.swipeObj,
      startDrag: true,
      deltaX: clientX - startClientX,
      deltaY: clientY - startClientY,
      endClientX: clientX,
      endClientY: clientY,
      endTimeStamp: Date.now(),
    };
    const delta = isVertical(tabBarPosition) ? this.swipeObj.deltaY : this.swipeObj.deltaX;
    const currentIndex = this.getIndexByDelta(delta);
    if (currentIndex !== undefined) {
      setTransform(this.rootNode.style, getTransformByIndex(currentIndex, tabBarPosition));
    }
  }
  handleEnd = (e) => {
    const { tabBarPosition, animated, children } = this.props;
    if (!this.swipeObj || !this.swipeObj.startDrag) {
      return;
    }
    let clientX;
    let clientY;
    if (e && e.touches && e.touches[0]) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = this.swipeObj.endClientX;
      clientY = this.swipeObj.endClientY;
    }
    const { startClientX, startClientY, startTimeStamp } = this.swipeObj;
    const finalDeltaX = clientX - startClientX;
    const finalDeltaY = clientY - startClientY;
    const endTimeStamp = Date.now();
    const deltaTime = endTimeStamp - startTimeStamp;
    this.swipeObj = {
      ...this.swipeObj,
      startDrag: false,
      deltaX: finalDeltaX,
      deltaY: finalDeltaY,
      endClientX: clientX,
      endClientY: clientY,
      endTimeStamp,
      deltaTime,
      velocityX: finalDeltaX / deltaTime,
      velocityY: finalDeltaY / deltaTime,
    };
    const delta = isVertical(tabBarPosition) ? this.swipeObj.deltaY : this.swipeObj.deltaX;
    const velocity = isVertical(tabBarPosition) ? this.swipeObj.velocityY : this.swipeObj.velocityX;
    if (Math.abs(delta) >= THRESHOLD && Math.abs(velocity) >= VELOCITY) {
      // trigger swipe
      this.swipeObj = {
        ...this.swipeObj,
        triggerSwipe: true,
      };
    }
    const currentIndex = this.getIndexByDelta(delta);
    let finalIndex = this.startIndex;
    if (currentIndex !== undefined) {
      if (currentIndex < 0) {
        finalIndex = 0;
      } else if (currentIndex > this.maxIndex) {
        finalIndex = this.maxIndex;
      } else if (this.swipeObj.triggerSwipe) {
        finalIndex = delta < 0 ? Math.ceil(currentIndex) : Math.floor(currentIndex);
      } else {
        const floorIndex = Math.floor(currentIndex);
        if (currentIndex - floorIndex > 0.6) {
          finalIndex = floorIndex + 1;
        } else {
          finalIndex = floorIndex;
        }
      }
    }
    if (this.children[finalIndex].props.disabled) {
      return;
    }
    if (this.startIndex === finalIndex) {
      if (animated) {
        setTransform(this.rootNode.style,
          getTransformByIndex(finalIndex, tabBarPosition));
      }
    } else {
      this.props.onChange(getActiveKey(children, finalIndex));
    }
  }

  render() {
    return (
      <TabContent
        {...this.props}
        onTouchStart={this.handleStart}
        onTouchMove={this.handleMove}
        onTouchEnd={this.handleEnd}
      />
    );
  }
}
