import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import raf from 'raf';
import KeyCode from './KeyCode';
import TabPane from './TabPane';
import { getDataAttr } from './utils';
import Sentinel, { SentinelProvider } from './Sentinel';

function noop() {
}

function getDefaultActiveKey(props) {
  let activeKey;
  React.Children.forEach(props.children, (child) => {
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

export default class Tabs extends React.Component {
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

  componentWillReceiveProps(nextProps) {
    if ('activeKey' in nextProps) {
      this.setState({
        activeKey: nextProps.activeKey,
      });
    } else if (!activeKeyIsValid(nextProps, this.state.activeKey)) {
      // https://github.com/ant-design/ant-design/issues/7093
      this.setState({
        activeKey: getDefaultActiveKey(nextProps),
      });
    }
  }

  componentWillUnmount() {
    this.destroy = true;
    raf.cancel(this.sentinelId);
  }

  onTabClick = (activeKey, e) => {
    if (this.tabBar.props.onTabClick) {
      this.tabBar.props.onTabClick(activeKey, e);
    }
    this.setActiveKey(activeKey);
  }

  onNavKeyDown = (e) => {
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
  }

  onScroll = ({ target, currentTarget }) => {
    if (target === currentTarget && target.scrollLeft > 0) {
      target.scrollLeft = 0;
    }
  };

  // Sentinel for tab index
  setSentinelStart = (node) => {
    this.sentinelStart = node;
  };

  setSentinelEnd = (node) => {
    this.sentinelEnd = node;
  };

  setPanelSentinelStart = (node) => {
    if (node !== this.panelSentinelStart) {
      this.updateSentinelContext();
    }
    this.panelSentinelStart = node;
  };

  setPanelSentinelEnd = (node) => {
    if (node !== this.panelSentinelEnd) {
      this.updateSentinelContext();
    }
    this.panelSentinelEnd = node;
  };

  setActiveKey = (activeKey) => {
    if (this.state.activeKey !== activeKey) {
      if (!('activeKey' in this.props)) {
        this.setState({
          activeKey,
        });
      }
      this.props.onChange(activeKey);
    }
  }

  getNextActiveKey = (next) => {
    const activeKey = this.state.activeKey;
    const children = [];
    React.Children.forEach(this.props.children, (c) => {
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
      if (child.key === activeKey) {
        if (i === length - 1) {
          ret = children[0].key;
        } else {
          ret = children[i + 1].key;
        }
      }
    });
    return ret;
  }

  updateSentinelContext() {
    if (this.destroy) return;

    raf.cancel(this.sentinelId);
    this.sentinelId = raf(() => {
      if (this.destroy) return;
      this.forceUpdate();
    });
  }

  render() {
    const props = this.props;
    const {
      prefixCls,
      navWrapper,
      tabBarPosition, className,
      renderTabContent,
      renderTabBar,
      destroyInactiveTabPane,
      ...restProps
    } = props;
    const cls = classnames({
      [prefixCls]: 1,
      [`${prefixCls}-${tabBarPosition}`]: 1,
      [className]: !!className,
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
    });

    const tabContent = React.cloneElement(renderTabContent(), {
      prefixCls,
      tabBarPosition,
      activeKey: this.state.activeKey,
      destroyInactiveTabPane,
      children: props.children,
      onChange: this.setActiveKey,
      key: 'tabContent',
    });

    const sentinelStart = (
      <Sentinel
        key="sentinelStart"
        setRef={this.setSentinelStart}
        nextElement={this.panelSentinelStart}
      />
    );
    const sentinelEnd = (
      <Sentinel
        key="sentinelEnd"
        setRef={this.setSentinelEnd}
        prevElement={this.panelSentinelEnd}
      />
    );

    const contents = [];
    if (tabBarPosition === 'bottom') {
      contents.push(sentinelStart, tabContent, sentinelEnd, tabBar);
    } else {
      contents.push(tabBar, sentinelStart, tabContent, sentinelEnd);
    }

    return (
      <SentinelProvider
        value={{
          sentinelStart: this.sentinelStart,
          sentinelEnd: this.sentinelEnd,
          setPanelSentinelStart: this.setPanelSentinelStart,
          setPanelSentinelEnd: this.setPanelSentinelEnd,
        }}
      >
        <div
          className={cls}
          style={props.style}
          {...getDataAttr(restProps)}
          onScroll={this.onScroll}
        >
          {contents}
        </div>
      </SentinelProvider>
    );
  }
}

Tabs.propTypes = {
  destroyInactiveTabPane: PropTypes.bool,
  renderTabBar: PropTypes.func.isRequired,
  renderTabContent: PropTypes.func.isRequired,
  navWrapper: PropTypes.func,
  onChange: PropTypes.func,
  children: PropTypes.node,
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  tabBarPosition: PropTypes.string,
  style: PropTypes.object,
  activeKey: PropTypes.string,
  defaultActiveKey: PropTypes.string,
};

Tabs.defaultProps = {
  prefixCls: 'rc-tabs',
  destroyInactiveTabPane: false,
  onChange: noop,
  navWrapper: arg => arg,
  tabBarPosition: 'top',
  children: null,
  style: {},
};

Tabs.TabPane = TabPane;
