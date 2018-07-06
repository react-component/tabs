import _extends from 'babel-runtime/helpers/extends';
import TabContent from './TabContent';
import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import Hammer from 'rc-hammerjs';
import ReactDOM from 'react-dom';
import { isVertical, getActiveIndex, getTransformByIndex, setTransform, getActiveKey, toArray, setTransition } from './utils';

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
  var delta = isVertical(this.props.tabBarPosition) ? e.deltaY : e.deltaX;
  var otherDelta = isVertical(this.props.tabBarPosition) ? e.deltaX : e.deltaY;
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

var SwipeableTabContent = createReactClass({
  displayName: 'SwipeableTabContent',

  propTypes: {
    tabBarPosition: PropTypes.string,
    onChange: PropTypes.func,
    children: PropTypes.any,
    hammerOptions: PropTypes.any,
    animated: PropTypes.bool,
    activeKey: PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      animated: true
    };
  },
  componentDidMount: function componentDidMount() {
    this.rootNode = ReactDOM.findDOMNode(this);
  },
  onPanStart: function onPanStart() {
    var _props = this.props,
        tabBarPosition = _props.tabBarPosition,
        children = _props.children,
        activeKey = _props.activeKey,
        animated = _props.animated;

    var startIndex = this.startIndex = getActiveIndex(children, activeKey);
    if (startIndex === -1) {
      return;
    }
    if (animated) {
      setTransition(this.rootNode.style, 'none');
    }
    this.startDrag = true;
    this.children = toArray(children);
    this.maxIndex = this.children.length - 1;
    this.viewSize = isVertical(tabBarPosition) ? this.rootNode.offsetHeight : this.rootNode.offsetWidth;
  },
  onPan: function onPan(e) {
    if (!this.startDrag) {
      return;
    }
    var tabBarPosition = this.props.tabBarPosition;

    var currentIndex = getIndexByDelta.call(this, e);
    if (currentIndex !== undefined) {
      setTransform(this.rootNode.style, getTransformByIndex(currentIndex, tabBarPosition));
    }
  },
  onPanEnd: function onPanEnd(e) {
    if (!this.startDrag) {
      return;
    }
    this.end(e);
  },
  onSwipe: function onSwipe(e) {
    this.end(e, true);
  },
  end: function end(e, swipe) {
    var _props2 = this.props,
        tabBarPosition = _props2.tabBarPosition,
        animated = _props2.animated;

    this.startDrag = false;
    if (animated) {
      setTransition(this.rootNode.style, '');
    }
    var currentIndex = getIndexByDelta.call(this, e);
    var finalIndex = this.startIndex;
    if (currentIndex !== undefined) {
      if (currentIndex < 0) {
        finalIndex = 0;
      } else if (currentIndex > this.maxIndex) {
        finalIndex = this.maxIndex;
      } else if (swipe) {
        var delta = isVertical(tabBarPosition) ? e.deltaY : e.deltaX;
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
    if (this.children[finalIndex].props.disabled) {
      return;
    }
    if (this.startIndex === finalIndex) {
      if (animated) {
        setTransform(this.rootNode.style, getTransformByIndex(finalIndex, this.props.tabBarPosition));
      }
    } else {
      this.props.onChange(getActiveKey(this.props.children, finalIndex));
    }
  },
  render: function render() {
    var _props3 = this.props,
        tabBarPosition = _props3.tabBarPosition,
        hammerOptions = _props3.hammerOptions,
        animated = _props3.animated;

    var events = {
      onSwipe: this.onSwipe,
      onPanStart: this.onPanStart
    };
    if (animated !== false) {
      events = _extends({}, events, {
        onPan: this.onPan,
        onPanEnd: this.onPanEnd
      });
    }
    return React.createElement(
      Hammer,
      _extends({}, events, {
        direction: isVertical(tabBarPosition) ? 'DIRECTION_ALL' : 'DIRECTION_HORIZONTAL',
        options: hammerOptions
      }),
      React.createElement(TabContent, this.props)
    );
  }
});

export default SwipeableTabContent;