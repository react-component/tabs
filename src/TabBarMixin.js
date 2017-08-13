import React, { cloneElement } from 'react';
import classnames from 'classnames';
import warning from 'warning';

export default {
  getDefaultProps() {
    return {
      styles: {},
    };
  },
  onTabClick(key) {
    this.props.onTabClick(key);
  },
  getTabs() {
    const props = this.props;
    const children = props.panels;
    const activeKey = props.activeKey;
    const rst = [];
    const prefixCls = props.prefixCls;

    React.Children.forEach(children, (child) => {
      if (!child) {
        return;
      }
      const key = child.key;
      let cls = activeKey === key ? `${prefixCls}-tab-active` : '';
      cls += ` ${prefixCls}-tab`;
      let events = {};
      if (child.props.disabled) {
        cls += ` ${prefixCls}-tab-disabled`;
      } else {
        events = {
          onClick: this.onTabClick.bind(this, key),
        };
      }
      const ref = {};
      if (activeKey === key) {
        ref.ref = 'activeTab';
      }
      warning('tab' in child.props, 'There must be `tab` property on children of Tabs.');
      rst.push(
        <div
          role="tab"
          aria-disabled={child.props.disabled ? 'true' : 'false'}
          aria-selected={activeKey === key ? 'true' : 'false'}
          {...events}
          className={cls}
          key={key}
          {...ref}
        >
          {child.props.tab}
        </div>
      );
    });

    return rst;
  },
  getRootNode(contents) {
    const {
      prefixCls, onKeyDown, className, extraContent, style, tabBarPosition,
      pageSize, styles, inkBarAnimated, hammerOptions, onTabClick, panels, activeKey,
      ...restProps,
    } = this.props;
    const cls = classnames(`${prefixCls}-bar`, {
      [className]: !!className,
    });
    const topOrBottom = (tabBarPosition === 'top' || tabBarPosition === 'bottom');
    const tabBarExtraContentStyle = topOrBottom ? { float: 'right' } : {};
    const extraContentStyle = (extraContent && extraContent.props) ? extraContent.props.style : {};
    let children = contents;
    if (extraContent) {
      children = [
        cloneElement(extraContent, {
          key: 'extra',
          style: {
            ...tabBarExtraContentStyle,
            ...extraContentStyle,
          },
        }),
        cloneElement(contents, { key: 'content' }),
      ];
      children = topOrBottom ? children : children.reverse();
    }
    return (
      <div
        role="tablist"
        className={cls}
        tabIndex="0"
        ref="root"
        onKeyDown={onKeyDown}
        style={style}
        {...restProps}
      >
        {children}
      </div>
    );
  },
};
