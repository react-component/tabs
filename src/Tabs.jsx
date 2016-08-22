import React, { PropTypes } from 'react';
import KeyCode from './KeyCode';
import TabPane from './TabPane';
import Nav from './Nav';
import Animate from 'rc-animate';
import classnames from 'classnames';

function noop() {
}

function getDefaultActiveKey(props) {
  let activeKey;
  React.Children.forEach(props.children, (child) => {
    if (!activeKey && !child.props.disabled) {
      activeKey = child.key;
    }
  });
  return activeKey;
}

const Tabs = React.createClass({
  propTypes: {
    destroyInactiveTabPane: PropTypes.bool,
    allowInkBar: PropTypes.bool,
    allowScrollBar: PropTypes.bool,
    onTabClick: PropTypes.func,
    onChange: PropTypes.func,
    children: PropTypes.any,
    tabBarExtraContent: PropTypes.any,
    animation: PropTypes.string,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    tabPosition: PropTypes.string,
    styles: PropTypes.object,
  },

  getDefaultProps() {
    return {
      prefixCls: 'rc-tabs',
      destroyInactiveTabPane: false,
      allowInkBar: true,
      allowScrollBar: true,
      tabBarExtraContent: null,
      onChange: noop,
      tabPosition: 'top',
      style: {},
      contentStyle: {},
      styles: {},
      onTabClick: noop,
    };
  },

  getInitialState() {
    const props = this.props;
    let activeKey;
    if ('activeKey' in props) {
      activeKey = props.activeKey;
    } else if ('defaultActiveKey' in props) {
      activeKey = props.defaultActiveKey;
    } else {
      activeKey = getDefaultActiveKey(props);
    }
    return {
      activeKey,
    };
  },

  componentWillReceiveProps(nextProps) {
    let newActiveKey = this.state.activeKey;
    if ('activeKey' in nextProps) {
      newActiveKey = nextProps.activeKey;
      if (!newActiveKey) {
        this.setState({
          activeKey: newActiveKey,
        });
        return;
      }
    }
    let found;
    React.Children.forEach(nextProps.children, (child) => {
      if (child.key === newActiveKey) {
        found = true;
      }
    });
    if (found) {
      this.setActiveKey(newActiveKey, nextProps);
    } else {
      this.setActiveKey(getDefaultActiveKey(nextProps), nextProps);
    }
  },

  onTabClick(key) {
    this.setActiveKey(key);
    this.props.onTabClick(key);
    if (this.state.activeKey !== key) {
      this.props.onChange(key);
    }
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

  getNextActiveKey(next) {
    const activeKey = this.state.activeKey;
    const children = [];
    React.Children.forEach(this.props.children, (c) => {
      if (!c.props.disabled) {
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
  },

  getTabPanes() {
    const state = this.state;
    const props = this.props;
    const activeKey = state.activeKey;
    const children = props.children;
    const newChildren = [];

    React.Children.forEach(children, (child) => {
      const key = child.key;
      const active = activeKey === key;
      newChildren.push(React.cloneElement(child, {
        active,
        // eventKey: key,
        rootPrefixCls: props.prefixCls,
      }));
    });

    return newChildren;
  },

  getIndexPair(props, currentActiveKey, activeKey) {
    const keys = [];
    React.Children.forEach(props.children, c => {
      keys.push(c.key);
    });
    const currentIndex = keys.indexOf(currentActiveKey);
    const nextIndex = keys.indexOf(activeKey);
    return {
      currentIndex, nextIndex,
    };
  },

  setActiveKey(activeKey, ps) {
    const props = ps || this.props;
    const currentActiveKey = this.state.activeKey;
    if (currentActiveKey === activeKey || (('activeKey' in props) && (props === this.props))) {
      return;
    }
    if (!currentActiveKey) {
      this.setState({
        activeKey,
      });
    } else {
      let { currentIndex, nextIndex } = this.getIndexPair(props, currentActiveKey, activeKey);
      // removed
      if (currentIndex === -1) {
        const newPair = this.getIndexPair(this.props, currentActiveKey, activeKey);
        currentIndex = newPair.currentIndex;
        nextIndex = newPair.nextIndex;
      }
      const tabMovingDirection = currentIndex > nextIndex ? 'backward' : 'forward';
      this.setState({
        activeKey,
        tabMovingDirection,
      });
    }
  },

  render() {
    const props = this.props;
    const {
      destroyInactiveTabPane, prefixCls,
      tabPosition, className, animation,
      styles,
    } = props;
    const cls = classnames({
      [prefixCls]: 1,
      [`${prefixCls}-${tabPosition}`]: 1,
      [className]: !!className,
    });
    const tabMovingDirection = this.state.tabMovingDirection;
    let tabPanes = this.getTabPanes();
    let transitionName;
    transitionName = props.transitionName && props.transitionName[tabMovingDirection || 'backward'];
    if (!transitionName && animation) {
      transitionName = `${prefixCls}-${animation}-${tabMovingDirection || 'backward'}`;
    }
    if (destroyInactiveTabPane) {
      tabPanes = tabPanes.filter((panel) => {
        return panel.props.active;
      });
    }
    if (transitionName) {
      if (destroyInactiveTabPane) {
        tabPanes = (<Animate
          exclusive
          component="div"
          transitionName={transitionName}
        >
          {tabPanes}
        </Animate>);
      } else {
        tabPanes = (<Animate
          showProp="active"
          exclusive
          component="div"
          transitionName={transitionName}
        >
          {tabPanes}
        </Animate>);
      }
    }
    const contents = [
      (<Nav
        prefixCls={prefixCls}
        key="nav"
        allowInkBar={props.allowInkBar}
        allowScrollBar={props.allowScrollBar}
        onKeyDown={this.onNavKeyDown}
        tabBarExtraContent={props.tabBarExtraContent}
        tabPosition={tabPosition}
        styles={styles}
        onTabClick={this.onTabClick}
        tabMovingDirection={tabMovingDirection}
        panels={props.children}
        activeKey={this.state.activeKey}
      />),
      (<div
        className={`${prefixCls}-content`}
        style={props.contentStyle}
        key="content"
      >
        {tabPanes}
      </div>),
    ];
    if (tabPosition === 'bottom') {
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
