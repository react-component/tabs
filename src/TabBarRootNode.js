import React, { cloneElement } from 'react';
import classnames from 'classnames';
import { getDataAttr } from './utils';

export default class TabBarRootNode extends React.Component {
  getExtraContentStyle = () => {
    const { tabBarPosition, direction } = this.props;
    const topOrBottom = tabBarPosition === 'top' || tabBarPosition === 'bottom';
    if (direction === 'rtl') {
      return topOrBottom ? { float: 'left' } : {};
    }
    return topOrBottom ? { float: 'right' } : {};
  };

  render() {
    const {
      prefixCls,
      onKeyDown,
      className,
      extraContent,
      style,
      tabBarPosition,
      children,
      direction,
      ...restProps
    } = this.props;
    const cls = classnames(`${prefixCls}-bar`, {
      [className]: !!className,
    });
    const topOrBottom = tabBarPosition === 'top' || tabBarPosition === 'bottom';
    const extraContentStyle = extraContent && extraContent.props ? extraContent.props.style : {};
    let newChildren = children;
    if (extraContent) {
      newChildren = [
        cloneElement(extraContent, {
          key: 'extra',
          onKeyDown: e => e.stopPropagation(),
          style: {
            ...this.getExtraContentStyle(topOrBottom, direction),
            ...extraContentStyle,
          },
        }),
        cloneElement(children, { key: 'content' }),
      ];
      newChildren = topOrBottom ? newChildren : newChildren.reverse();
    }
    return (
      <div
        role="tablist"
        tabIndex={-1}
        className={cls}
        ref={this.props.saveRef('root')}
        onKeyDown={onKeyDown}
        style={style}
        {...getDataAttr(restProps)}
      >
        {newChildren}
      </div>
    );
  }
}

TabBarRootNode.defaultProps = {
  prefixCls: '',
  className: '',
  style: {},
  tabBarPosition: 'top',
  extraContent: null,
  children: null,
  onKeyDown: () => {},
  saveRef: () => {},
  getRef: () => {},
};
