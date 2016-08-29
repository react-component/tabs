import React from 'react';
import classnames from 'classnames';
import getTransformPropertyName from './getTransformPropertyName';

const TabContent = React.createClass({
  getDefaultProps() {
    return {
      animated: true,
    };
  },

  getInitialState(){
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
  getActiveIndex() {
    const c = [];
    React.Children.forEach(this.props.children, child => c.push(child));
    for (let i = 0; i < c.length; i++) {
      if (c[i].key === this.props.activeKey) {
        return i;
      }
    }
    return -1;
  },
  render() {
    const { props } = this;
    const { prefixCls } = props;
    let { style, tabBarPosition } = props;
    const { transformName } = this.state;
    const classes = classnames({
      [`${prefixCls}-content`]: true,
      [props.animated && transformName ?
        `${prefixCls}-content-animated` :
        `${prefixCls}-content-no-animated`]: true,
    });
    if (props.animated && transformName) {
      const activeIndex = this.getActiveIndex();
      if (activeIndex !== -1) {
        const translate = (tabBarPosition === 'left' || tabBarPosition === 'right') ?
          'translateY' : 'translateX';
        style = {
          ...style,
          [transformName]: `${translate}(-${activeIndex * 100}%) translateZ(0)`,
        }
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
});

export  default  TabContent;
