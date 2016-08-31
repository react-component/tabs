import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { getTransformPropertyName, getTranslateByIndex, getActiveIndex } from './utils';

/* eslint react/no-did-mount-set-state:0 */

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

  getInitialState() {
    return {
      transformName: 'transform',
    };
  },
  componentDidMount() {
    if (this.props.animated) {
      const transformName = getTransformPropertyName();
      // support server render
      if (transformName !== this.state.transformName) {
        this.setState({
          transformName,
        });
      }
    }
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
    const { prefixCls, children, activeKey, tabBarPosition } = props;
    let { style } = props;
    const { transformName } = this.state;
    const classes = classnames({
      [`${prefixCls}-content`]: true,
      [props.animated && transformName ?
        `${prefixCls}-content-animated` :
        `${prefixCls}-content-no-animated`]: true,
    });
    if (props.animated && transformName) {
      const activeIndex = getActiveIndex(children, activeKey);
      if (activeIndex !== -1) {
        style = {
          ...style,
          ...getTranslateByIndex(activeIndex, tabBarPosition, transformName),
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
