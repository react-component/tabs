import React from 'react';
import classnames from 'classnames';
import KeyCode from './KeyCode';
import TabPane from './TabPane';
import { getDataAttr } from './utils';

function noop() {}

function getDefaultActiveKey(props) {
  let activeKey;
  React.Children.forEach(props.children, child => {
    if (child && !activeKey && !child.props.disabled) {
      activeKey = child.key;
    }
  });
  return activeKey;
}

function activeKeyIsValid(props, key) {
  const keys = React.Children.map(props.children, child => child && child.key);
  return keys.indexOf(key) >= 0;
}

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    let activeKey;
    if ('activeKey' in props) {
      activeKey = props.activeKey;
    } else if ('defaultActiveKey' in props) {
      activeKey = props.defaultActiveKey;
    } else {
      activeKey = getDefaultActiveKey(props);
    }

    this.state = {
      activeKey,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const newState = {};
    if ('activeKey' in props) {
      newState.activeKey = props.activeKey;
    } else if (!activeKeyIsValid(props, state.activeKey)) {
      newState.activeKey = getDefaultActiveKey(props);
    }
    if (Object.keys(newState).length > 0) {
      return newState;
    }
    return null;
  }

  componentWillUnmount() {
    this.destroy = true;
  }

  onTabClick = (activeKey, e) => {
    if (this.tabBar.props.onTabClick) {
      this.tabBar.props.onTabClick(activeKey, e);
    }
    this.setActiveKey(activeKey);
  };

  onNavKeyDown = e => {
    const { keyboard } = this.props;
    if (!keyboard) {
      return;
    }
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
  };

  onScroll = ({ target, currentTarget }) => {
    if (target === currentTarget && target.scrollLeft > 0) {
      target.scrollLeft = 0;
    }
  };

  setActiveKey = activeKey => {
    if (this.state.activeKey !== activeKey) {
      if (!('activeKey' in this.props)) {
        this.setState({
          activeKey,
        });
      }
      this.props.onChange(activeKey);
    }
  };

  getNextActiveKey = next => {
    const { activeKey } = this.state;
    const children = [];
    React.Children.forEach(this.props.children, c => {
      if (c && !c.props.disabled) {
        if (next) {
          children.push(c);
        } else {
          children.unshift(c);
        }
      }
    });
    const { length } = children;
    let ret = length && children[0].key;
    children.forEach((child, i) => {
      if (child.key === activeKey) {
        if (i === length - 1) {
          ret = children[0].key;
        } else {
          ret = children[i + 1].key;
        }
      }
    });
    return ret;
  };

  render() {
    const { props } = this;
    const {
      prefixCls,
      navWrapper,
      tabBarPosition,
      className,
      renderTabContent,
      renderTabBar,
      destroyInactiveTabPane,
      direction,
      id,
      ...restProps
    } = props;
    const cls = classnames({
      [prefixCls]: 1,
      [`${prefixCls}-${tabBarPosition}`]: 1,
      [className]: !!className,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    });

    this.tabBar = renderTabBar();

    const tabBar = React.cloneElement(this.tabBar, {
      prefixCls,
      navWrapper,
      key: 'tabBar',
      onKeyDown: this.onNavKeyDown,
      tabBarPosition,
      onTabClick: this.onTabClick,
      panels: props.children,
      activeKey: this.state.activeKey,
      direction: this.props.direction,
      id,
    });

    const tabContent = React.cloneElement(renderTabContent(), {
      prefixCls,
      tabBarPosition,
      activeKey: this.state.activeKey,
      destroyInactiveTabPane,
      children: props.children,
      onChange: this.setActiveKey,
      key: 'tabContent',
      direction: this.props.direction,
      id,
    });

    const contents = [];
    if (tabBarPosition === 'bottom') {
      contents.push(tabContent, tabBar);
    } else {
      contents.push(tabBar, tabContent);
    }

    return (
      <div
        className={cls}
        style={props.style}
        {...getDataAttr(restProps)}
        onScroll={this.onScroll}
        id={id}
      >
        {contents}
      </div>
    );
  }
}

Tabs.defaultProps = {
  prefixCls: 'rc-tabs',
  destroyInactiveTabPane: false,
  onChange: noop,
  keyboard: true,
  navWrapper: arg => arg,
  tabBarPosition: 'top',
  children: null,
  style: {},
  direction: 'ltr',
};

Tabs.TabPane = TabPane;

export default Tabs;
