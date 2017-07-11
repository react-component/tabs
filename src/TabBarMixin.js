import React, { cloneElement } from 'react';
import classnames from 'classnames';
import warning from 'warning';
import pickAttrs from 'rc-util/lib/pickAttrs';

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
    const { panels: children, activeKey, prefixCls } = this.props;
    const rst = [];

    React.Children.forEach(children, (child) => {
      if (!child) {
        return;
      }
      const key = child.key;
      let cls = this.props.activeKey === key ? `${prefixCls}-tab-active` : '';
      cls += ` ${prefixCls}-tab`;
      let events = {};
      if (child.props.disabled) {
        cls += ` ${prefixCls}-tab-disabled`;
      } else {
        events = {
          onClick: this.onTabClick.bind(this, key),
        };
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
          ref={(tab) => {
            if (this.props.activeKey === key) {
              this.activeTab = tab;
            }
          }}
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
        {...pickAttrs(restProps)}
      >
        {children}
      </div>
    );
  },
};
