import React from 'react';
import warning from 'warning';
import PropTypes from 'prop-types';
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
    } = this.props;
    const rst = [];

    React.Children.forEach(children, (child, index) => {
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
          onClick: this.props.onTabClick.bind(this, key),
        };
      }
      const ref = {};
      if (activeKey === key) {
        ref.ref = saveRef('activeTab');
      }

      const gutter = tabBarGutter && index === children.length - 1 ? 0 : tabBarGutter;
      const style = {
        [isVertical(tabBarPosition) ? 'marginBottom' : 'marginRight']: gutter,
      };
      warning('tab' in child.props, 'There must be `tab` property on children of Tabs.');
      rst.push(
        <div
          role="tab"
          aria-disabled={child.props.disabled ? 'true' : 'false'}
          aria-selected={activeKey === key ? 'true' : 'false'}
          {...events}
          className={cls}
          key={key}
          style={ style }
          {...ref}
        >
          {child.props.tab}
        </div>
      );
    });

    return (
      <div ref={saveRef('navTabsContainer')}>
        {rst}
      </div>
    );
  }
}

TabBarTabsNode.propTypes = {
  activeKey: PropTypes.string,
  panels: PropTypes.node,
  prefixCls: PropTypes.string,
  tabBarGutter: PropTypes.number,
  onTabClick: PropTypes.func,
  saveRef: PropTypes.func,
  tabBarPosition: PropTypes.string,
};

TabBarTabsNode.defaultProps = {
  panels: [],
  prefixCls: [],
  tabBarGutter: null,
  onTabClick: () => {},
  saveRef: () => {},
};
