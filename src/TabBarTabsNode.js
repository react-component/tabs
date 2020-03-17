import React from 'react';
import warning from 'warning';
import { isVertical } from './utils';

export default class TabBarTabsNode extends React.Component {
  render() {
    const {
      panels: children,
      activeKey,
      prefixCls,
      tabBarGutter,
      saveRef,
      tabBarPosition,
      renderTabBarNode,
      direction,
    } = this.props;
    const rst = [];

    React.Children.forEach(children, (child, index) => {
      if (!child) {
        return;
      }
      const { key } = child;
      let cls = activeKey === key ? `${prefixCls}-tab-active` : '';
      cls += ` ${prefixCls}-tab`;
      let events = {};
      if (child.props.disabled) {
        cls += ` ${prefixCls}-tab-disabled`;
      } else {
        events = {
          onClick: this.props.onTabClick.bind(this, key),
        };
      }
      const ref = {};
      if (activeKey === key) {
        ref.ref = saveRef('activeTab');
      }

      const gutter = tabBarGutter && index === children.length - 1 ? 0 : tabBarGutter;

      const marginProperty = direction === 'rtl' ? 'marginLeft' : 'marginRight';
      const style = {
        [isVertical(tabBarPosition) ? 'marginBottom' : marginProperty]: gutter,
      };
      warning('tab' in child.props, 'There must be `tab` property on children of Tabs.');

      const id = this.props.id ? `${key}-${this.props.id}` : key;

      let node = (
        <div
          role="tab"
          aria-disabled={child.props.disabled ? 'true' : 'false'}
          aria-selected={activeKey === key ? 'true' : 'false'}
          tabIndex={activeKey === key ? 0 : -1}
          {...events}
          className={cls}
          key={key}
          style={style}
          id={`tab-${id}`}
          aria-controls={`tabpane-${id}`}
          {...ref}
        >
          {child.props.tab}
        </div>
      );

      if (renderTabBarNode) {
        node = renderTabBarNode(node);
      }

      rst.push(node);
    });

    return <div ref={saveRef('navTabsContainer')}>{rst}</div>;
  }
}

TabBarTabsNode.defaultProps = {
  panels: [],
  prefixCls: [],
  tabBarGutter: null,
  onTabClick: () => {},
  saveRef: () => {},
};
