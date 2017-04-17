import TabContent from './TabContent';
import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import Hammer from 'react-hammerjs';
import ReactDOM from 'react-dom';
import {
  isVertical,
  getActiveIndex,
  getTransformByIndex,
  setTransform,
  getActiveKey,
  toArray,
  setTransition,
} from './utils';

const RESISTANCE_COEF = 0.6;

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

function getIndexByDelta(e) {
  const delta = isVertical(this.props.tabBarPosition) ? e.deltaY : e.deltaX;
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

const SwipeableTabContent = createReactClass({
  propTypes: {
    tabBarPosition: PropTypes.string,
    onChange: PropTypes.func,
    children: PropTypes.any,
    hammerOptions: PropTypes.any,
    animated: PropTypes.bool,
    activeKey: PropTypes.string,
  },

  getDefaultProps() {
    return {
      animated: true,
    };
  },

  componentDidMount() {
    this.rootNode = ReactDOM.findDOMNode(this);
  },

  onPanStart() {
    const { tabBarPosition, children, activeKey, animated } = this.props;
    const startIndex = this.startIndex = getActiveIndex(children, activeKey);
    if (startIndex === -1) {
      return;
    }
    if (animated) {
      setTransition(this.rootNode.style, 'none');
    }
    this.startDrag = true;
    this.children = toArray(children);
    this.maxIndex = this.children.length - 1;
    this.viewSize = isVertical(tabBarPosition) ?
      this.rootNode.offsetHeight :
      this.rootNode.offsetWidth;
  },
  onPan(e) {
    if (!this.startDrag) {
      return;
    }
    const { tabBarPosition } = this.props;
    const currentIndex = getIndexByDelta.call(this, e);
    if (currentIndex !== undefined) {
      setTransform(this.rootNode.style, getTransformByIndex(currentIndex, tabBarPosition));
    }
  },
  onPanEnd(e) {
    if (!this.startDrag) {
      return;
    }
    this.end(e);
  },
  onSwipe(e) {
    this.end(e, true);
  },

  end(e, swipe) {
    const { tabBarPosition, animated } = this.props;
    this.startDrag = false;
    if (animated) {
      setTransition(this.rootNode.style, '');
    }
    const currentIndex = getIndexByDelta.call(this, e);
    let finalIndex = this.startIndex;
    if (currentIndex !== undefined) {
      if (currentIndex < 0) {
        finalIndex = 0;
      } else if (currentIndex > this.maxIndex) {
        finalIndex = this.maxIndex;
      } else if (swipe) {
        const delta = isVertical(tabBarPosition) ? e.deltaY : e.deltaX;
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
          getTransformByIndex(finalIndex, this.props.tabBarPosition));
      }
    } else {
      this.props.onChange(getActiveKey(this.props.children, finalIndex));
    }
  },
  render() {
    const { tabBarPosition, hammerOptions, animated } = this.props;
    let direction = {};
    if (isVertical(tabBarPosition)) {
      direction = {
        vertical: true,
      };
    }
    let events = {
      onSwipe: this.onSwipe,
      onPanStart: this.onPanStart,
    };
    if (animated !== false) {
      events = {
        ...events,
        onPan: this.onPan,
        onPanEnd: this.onPanEnd,
      };
    }
    return (
      <Hammer
        {...events}
        {...direction}
        options={hammerOptions}
      >
        <TabContent {...this.props}/>
      </Hammer>
    );
  },
});

export default SwipeableTabContent;
