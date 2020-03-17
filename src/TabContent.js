import React from 'react';
import classnames from 'classnames';
import {
  getTransformByIndex,
  getActiveIndex,
  getTransformPropValue,
  getMarginStyle,
} from './utils';

export default class TabContent extends React.Component {
  getTabPanes() {
    const { props } = this;
    const { activeKey } = props;
    const { children } = props;
    const newChildren = [];

    React.Children.forEach(children, child => {
      if (!child) {
        return;
      }
      const { key } = child;
      const active = activeKey === key;
      newChildren.push(
        React.cloneElement(child, {
          active,
          destroyInactiveTabPane: props.destroyInactiveTabPane,
          rootPrefixCls: props.prefixCls,
          id: props.id,
        }),
      );
    });

    return newChildren;
  }

  render() {
    const { props } = this;
    const {
      prefixCls,
      children,
      activeKey,
      className,
      tabBarPosition,
      animated,
      animatedWithMargin,
      direction,
    } = props;
    let { style } = props;
    const classes = classnames(
      {
        [`${prefixCls}-content`]: true,
        [animated ? `${prefixCls}-content-animated` : `${prefixCls}-content-no-animated`]: true,
      },
      className,
    );
    if (animated) {
      const activeIndex = getActiveIndex(children, activeKey);
      if (activeIndex !== -1) {
        const animatedStyle = animatedWithMargin
          ? getMarginStyle(activeIndex, tabBarPosition, direction)
          : getTransformPropValue(getTransformByIndex(activeIndex, tabBarPosition, direction));
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
      <div className={classes} style={style}>
        {this.getTabPanes()}
      </div>
    );
  }
}

TabContent.defaultProps = {
  animated: true,
};
