import React, { PropTypes } from 'react';
import classnames from 'classnames';
import {
  getTransformByIndex,
  getActiveIndex,
  getTransformPropValue,
} from './utils';

const TabContent = React.createClass({
  propTypes: {
    animated: PropTypes.bool,
    prefixCls: PropTypes.string,
    children: PropTypes.any,
    activeKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    style: PropTypes.any,
    tabBarPosition: PropTypes.string,
  },
  getDefaultProps() {
    return {
      animated: true,
    };
  },
  getTabPanes() {
    const props = this.props;
    const activeKey = props.activeKey;
    const children = props.children;
    const newChildren = [];

    children.forEach((child) => {
      if (!child) {
        return;
      }
      const key = child.props.tabKey;
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
      <div
        className={classes}
        style={style}
      >
        {this.getTabPanes()}
      </div>
    );
  },
});

export default TabContent;
