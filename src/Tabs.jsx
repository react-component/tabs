import React, { PropTypes, Children } from 'react';
import KeyCode from './KeyCode';
import TabPane from './TabPane';
import classnames from 'classnames';
import { childrenEqual, replaceTabKeyChildrenToArray } from './utils';

function noop() {
}

function getDefaultActiveKey(props) {
  let activeKey;
  Children.forEach(props.children, (child) => {
    if (child && !activeKey && !child.props.disabled) {
      activeKey = child.props.children.key;
    }
  });
  return activeKey;
}

const Tabs = React.createClass({
  propTypes: {
    destroyInactiveTabPane: PropTypes.bool,
    renderTabBar: PropTypes.func.isRequired,
    renderTabContent: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    children: PropTypes.any,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    tabBarPosition: PropTypes.string,
    style: PropTypes.object,
    drag: PropTypes.bool,
    dragStart: PropTypes.func,
    onDrag: PropTypes.func,
    dragStop: PropTypes.func,
  },

  getDefaultProps() {
    return {
      prefixCls: 'rc-tabs',
      destroyInactiveTabPane: false,
      onChange: noop,
      dragStart: noop,
      onDrag: noop,
      dragStop: noop,
      tabBarPosition: 'top',
      style: {},
      drag: false,
    };
  },

  getInitialState() {
    const props = this.props;
    let activeKey;
    if ('activeKey' in props) {
      activeKey = props.activeKey || getDefaultActiveKey(props);
    } else if ('defaultActiveKey' in props) {
      activeKey = props.defaultActiveKey || getDefaultActiveKey(props);
    } else {
      activeKey = getDefaultActiveKey(props);
    }

    return {
      activeKey,
      children: replaceTabKeyChildrenToArray(props.children),
    };
  },

  componentWillReceiveProps(nextProps) {
    if ('activeKey' in nextProps) {
      this.setState({
        activeKey: nextProps.activeKey,
      });
    }

    if (!childrenEqual(this.props.children, nextProps.children)) {
      this.setState({
        children: replaceTabKeyChildrenToArray(nextProps.children),
      });
    }
  },

  onTabClick(activeKey) {
    if (this.tabBar.props.onTabClick) {
      this.tabBar.props.onTabClick(activeKey);
    }
    this.setActiveKey(activeKey);
  },

  onNavKeyDown(e) {
    const eventKeyCode = e.keyCode;
    if (eventKeyCode === KeyCode.RIGHT || eventKeyCode === KeyCode.DOWN) {
      e.preventDefault();
      const nextKey = this.getNextActiveKey(true);
      this.onTabClick(nextKey);
    } else if (eventKeyCode === KeyCode.LEFT || eventKeyCode === KeyCode.UP) {
      e.preventDefault();
      const previousKey = this.getNextActiveKey(false);
      this.onTabClick(previousKey);
    }
  },

  setActiveKey(activeKey) {
    if (this.state.activeKey !== activeKey) {
      if (!('activeKey' in this.props)) {
        this.setState({
          activeKey,
        });
      }
      this.props.onChange(activeKey);
    }
  },

  getNextActiveKey(next) {
    const activeKey = this.state.activeKey;
    const children = [];
    this.state.children.forEach((c) => {
      if (c && !c.props.disabled) {
        if (next) {
          children.push(c);
        } else {
          children.unshift(c);
        }
      }
    });
    const length = children.length;
    let ret = length && children[0].key;
    children.forEach((child, i) => {
      if (child.props.tabKey === activeKey) {
        if (i === length - 1) {
          ret = children[0].key;
        } else {
          ret = children[i + 1].key;
        }
      }
    });
    return ret;
  },

  swapTab(fromKey, toKey) {
    const { children } = this.state;
    // create new array for children.
    const newChildren = children.slice();

    if (fromKey && toKey) {
      const fromIndex = children.findIndex((child) => child.props.tabKey === fromKey);
      const toIndex = children.findIndex((child) => child.props.tabKey === toKey);
      const tmp = newChildren[fromIndex];
      newChildren[fromIndex] = newChildren[toIndex];
      newChildren[toIndex] = tmp;
    }

    this.setState({
      children: newChildren,
    });
  },

  render() {
    const props = this.props;
    const state = this.state;
    const {
      prefixCls,
      tabBarPosition, className,
      renderTabContent,
      renderTabBar,
      drag,
      dragStart,
      onDrag,
      dragStop,
    } = props;
    const cls = classnames({
      [prefixCls]: 1,
      [`${prefixCls}-${tabBarPosition}`]: 1,
      [className]: !!className,
    });

    this.tabBar = renderTabBar();
    const contents = [
      React.cloneElement(this.tabBar, {
        drag,
        dragStart,
        onDrag,
        dragStop,
        prefixCls,
        tabBarPosition,
        key: 'tabBar',
        swapTab: this.swapTab,
        onKeyDown: this.onNavKeyDown,
        onTabClick: this.onTabClick,
        panels: state.children,
        activeKey: this.state.activeKey,
      }),
      React.cloneElement(renderTabContent(), {
        prefixCls,
        tabBarPosition,
        activeKey: this.state.activeKey,
        destroyInactiveTabPane: props.destroyInactiveTabPane,
        children: state.children,
        onChange: this.setActiveKey,
        key: 'tabContent',
      }),
    ];
    if (tabBarPosition === 'bottom') {
      contents.reverse();
    }
    return (
      <div
        className={cls}
        style={props.style}
      >
        {contents}
      </div>
    );
  },
});

Tabs.TabPane = TabPane;

export default Tabs;
