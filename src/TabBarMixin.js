import React from 'react';

const tabBarExtraContentStyle = {
  float: 'right',
};

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
      rst.push(<div
        role="tab"
        aria-disabled={child.props.disabled ? 'true' : 'false'}
        aria-selected={activeKey === key ? 'true' : 'false'}
        {...events}
        className={cls}
        key={key}
        {...ref}
      >
        {child.props.tab}
      </div>);
    });

    return rst;
  },
  getRootNode(contents){
    const { prefixCls, onKeyDown, styles, tabBarExtraContent } = this.props;
    return (
      <div
        role="tablist"
        className={`${prefixCls}-bar`}
        tabIndex="0"
        ref="root"
        onKeyDown={onKeyDown}
        style={styles.bar}
      >
        {tabBarExtraContent ?
          (<div
            style={tabBarExtraContentStyle}
            key="extra"
          >
            {tabBarExtraContent}
          </div>) : null}
        {contents}
      </div>);
  }
}
