import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  getTransformByIndex,
  getActiveIndex,
  getTransformPropValue,
  getMarginStyle,
} from './utils';

export default class TabContent extends React.Component {
  getTabPanes() {
    const props = this.props;
    const activeKey = props.activeKey;
    const children = props.children;
    const newChildren = [];

    React.Children.forEach(children, (child) => {
      if (!child) {
        return;
      }
      const key = child.key;
      const active = activeKey === key;
      newChildren.push(React.cloneElement(child, {
        active,
        destroyInactiveTabPane: props.destroyInactiveTabPane,
        rootPrefixCls: props.prefixCls,
      }));
    });

    return newChildren;
  }

  render() {
    const { props } = this;
    const {
      prefixCls, children, activeKey, className,
      tabBarPosition, animated, animatedWithMargin,
      direction,
    } = props;
    let { style } = props;
    const classes = classnames({
      [`${prefixCls}-content`]: true,
      [animated ?
        `${prefixCls}-content-animated` :
        `${prefixCls}-content-no-animated`]: true,
    }, className);
    if (animated) {
      const activeIndex = getActiveIndex(children, activeKey);
      if (activeIndex !== -1) {
        const animatedStyle = animatedWithMargin ?
          getMarginStyle(activeIndex, tabBarPosition, direction) :
          getTransformPropValue(getTransformByIndex(activeIndex, tabBarPosition, direction));
        style = {
          ...style,
          ...animatedStyle,
        };
      } else {
        style = {
          ...style,
          display: 'none',
        };
      }
    }
    return (
      <div
        className={classes}
        style={style}
      >
        {this.getTabPanes()}
      </div>
    );
  }
}

TabContent.propTypes = {
  animated: PropTypes.bool,
  animatedWithMargin: PropTypes.bool,
  prefixCls: PropTypes.string,
  children: PropTypes.node,
  activeKey: PropTypes.string,
  style: PropTypes.any,
  tabBarPosition: PropTypes.string,
  className: PropTypes.string,
  destroyInactiveTabPane: PropTypes.bool,
  direction: PropTypes.string,
};

TabContent.defaultProps = {
  animated: true,
};
