import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import KeyCode from './KeyCode';
import TabPane from './TabPane';
import Nav from './Nav';
import Animate from 'rc-animate';

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
    onTabClick: PropTypes.func,
    onChange: PropTypes.func,
    children: PropTypes.any,
    tabBarExtraContent: PropTypes.any,
    animation: PropTypes.string,
  },

  getDefaultProps() {
    return {
      prefixCls: 'rc-tabs',
      destroyInactiveTabPane: false,
      tabBarExtraContent: null,
      onChange: noop,
      tabPosition: 'top',
      style: {},
      contentStyle: {},
      navStyle: {},
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
    // cache panels
    this.renderPanels = {};
    return {activeKey};
  },

  componentWillReceiveProps(nextProps) {
    let newActiveKey = this.state.activeKey;
    if ('activeKey' in nextProps) {
      newActiveKey = nextProps.activeKey;
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

  onTabDestroy(key) {
    delete this.renderPanels[key];
  },

  onTabClick(key) {
    this.props.onTabClick(key);
    this.setActiveKey(key);
    if (this.state.activeKey !== key) {
      this.props.onChange(key);
    }
  },

  onKeyDown(e) {
    if (e.target !== ReactDOM.findDOMNode(this)) {
      return;
    }
    const eventKeyCode = e.keyCode;
    switch (eventKeyCode) {
    case KeyCode.RIGHT:
    case KeyCode.DOWN:
      e.preventDefault();
      const nextKey = this.getNextActiveKey(true);
      this.onTabClick(nextKey);
      break;
    case KeyCode.LEFT:
    case KeyCode.UP:
      e.preventDefault();
      const previousKey = this.getNextActiveKey(false);
      this.onTabClick(previousKey);
      break;
    default:
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
    const renderPanels = this.renderPanels;

    React.Children.forEach(children, (c) => {
      let child = c;
      const key = child.key;
      const active = activeKey === key;
      if (active || renderPanels[key]) {
        child = active ? child : renderPanels[key];
        renderPanels[key] = React.cloneElement(child, {
          active: active,
          onDestroy: this.onTabDestroy.bind(this, key),
          // eventKey: key,
          rootPrefixCls: props.prefixCls,
        });
        newChildren.push(renderPanels[key]);
      } else {
        // do not change owner ...
        // or else will destroy and reinit
        // newChildren.push(<TabPane active={false}
        //  key={key}
        //  eventKey={key}
        //  rootPrefixCls={this.props.prefixCls}></TabPane>);
        // return
        // lazy load
        newChildren.push(React.cloneElement(child, {
          active: false,
          // eventKey: key,
          rootPrefixCls: props.prefixCls,
        }, []));
      }
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
    return {currentIndex, nextIndex};
  },

  setActiveKey(activeKey, props) {
    const currentActiveKey = this.state.activeKey;
    if (currentActiveKey === activeKey) {
      return;
    }
    if (!currentActiveKey) {
      this.setState({
        activeKey: activeKey,
      });
    } else {
      let {currentIndex, nextIndex} = this.getIndexPair(props || this.props, currentActiveKey, activeKey);
      // removed
      if (currentIndex === -1) {
        const newPair = this.getIndexPair(this.props, currentActiveKey, activeKey);
        currentIndex = newPair.currentIndex;
        nextIndex = newPair.nextIndex;
      }
      const tabMovingDirection = currentIndex > nextIndex ? 'backward' : 'forward';
      this.setState({
        activeKey: activeKey,
        tabMovingDirection: tabMovingDirection,
      });
    }
  },

  render() {
    const props = this.props;
    const {destroyInactiveTabPane, prefixCls, tabPosition} = props;
    let cls = `${prefixCls} ${prefixCls}-${tabPosition}`;
    const tabMovingDirection = this.state.tabMovingDirection;
    if (props.className) {
      cls += ' ' + props.className;
    }
    const animation = this.props.animation;
    let tabPanes = this.getTabPanes();
    let transitionName;
    transitionName = props.transitionName && props.transitionName[tabMovingDirection || 'backward'];
    if (!transitionName && animation) {
      transitionName = `${prefixCls}-${animation}-${tabMovingDirection || 'backward'}`;
    }
    if (destroyInactiveTabPane) {
      tabPanes = tabPanes.filter((panel)=> {
        return panel.props.active;
      });
    }
    if (transitionName) {
      if (destroyInactiveTabPane) {
        tabPanes = (<Animate exclusive
                             transitionName={transitionName}>
          {tabPanes}
        </Animate>);
      } else {
        tabPanes = (<Animate showProp="active"
                             exclusive
                             transitionName={transitionName}>
          {tabPanes}
        </Animate>);
      }
    }
    const contents = [
      (<Nav prefixCls={prefixCls}
            key="nav"
            tabBarExtraContent={this.props.tabBarExtraContent}
            tabPosition={tabPosition}
            style={props.navStyle}
            onTabClick={this.onTabClick}
            tabMovingDirection={tabMovingDirection}
            panels={this.props.children}
            activeKey={this.state.activeKey}/>),
      (<div className={`${prefixCls}-content`}
            style={props.contentStyle}
            key="content">
        {tabPanes}
      </div>),
    ];
    if (tabPosition === 'bottom') {
      contents.reverse();
    }
    return (
      <div className={cls}
           tabIndex="0"
           style={props.style}
           onKeyDown={this.onKeyDown}>
        {contents}
      </div>
    );
  },
});

Tabs.TabPane = TabPane;

export default Tabs;
