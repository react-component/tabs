import React, { PropTypes } from 'react';
import classnames from 'classnames';
import {
  getTransformByIndex,
  getActiveIndex,
  isTransitionSupported,
  getTransformPropValue,
} from './utils';

let added;

// or user modernizr inside <head> for server render
function detectCssTransition() {
  if (!added && typeof window !== undefined && window.document && window.document.documentElement) {
    const { documentElement } = window.document;
    const NO_CSS_TRANSITION = 'no-csstransitions';
    if (!isTransitionSupported(documentElement.style) &&
      documentElement.className.indexOf(NO_CSS_TRANSITION) === -1) {
      documentElement.className += ` ${NO_CSS_TRANSITION}`;
    }
    added = true;
  }
}

detectCssTransition();

const TabContent = React.createClass({
  propTypes: {
    animated: PropTypes.bool,
    prefixCls: PropTypes.string,
    children: PropTypes.any,
    activeKey: PropTypes.string,
    style: PropTypes.any,
    tabBarPosition: PropTypes.string,
  },
  getDefaultProps() {
    return {
      animated: true,
    };
  },
  componentDidMount() {
    detectCssTransition();
  },
  getTabPanes() {
    const props = this.props;
    const activeKey = props.activeKey;
    const children = props.children;
    const newChildren = [];

    React.Children.forEach(children, (child) => {
      const key = child.key;
      const active = activeKey === key;
      newChildren.push(React.cloneElement(child, {
        active,
        destroyInactiveTabPane: props.destroyInactiveTabPane,
        rootPrefixCls: props.prefixCls,
      }));
    });

    return newChildren;
  },
  render() {
    const { props } = this;
    const {
      prefixCls, children, activeKey,
      tabBarPosition, animated,
    } = props;
    let { style } = props;
    const classes = classnames({
      [`${prefixCls}-content`]: true,
      [animated ?
        `${prefixCls}-content-animated` :
        `${prefixCls}-content-no-animated`]: true,
    });
    if (animated) {
      const activeIndex = getActiveIndex(children, activeKey);
      if (activeIndex !== -1) {
        style = {
          ...style,
          ...getTransformPropValue(getTransformByIndex(activeIndex, tabBarPosition)),
        };
      } else {
        style = {
          ...style,
          display: 'none',
        };
      }
    }
    return (
      <div className={`${prefixCls}-content-wrapper`} style={style}>
        <div className={classes}>
          {this.getTabPanes()}
        </div>
      </div>
    );
  },
});

export default TabContent;
