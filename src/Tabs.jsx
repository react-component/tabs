import React from 'react';
import KeyCode from './KeyCode';
import TabPane from './TabPane';
import Nav from './Nav';
import Animate from 'rc-animate';

function noop() {
}

const Tabs = React.createClass({
  propTypes: {
    onTabClick: React.PropTypes.func,
    onChange: React.PropTypes.func,
    children: React.PropTypes.any,
    animation: React.PropTypes.string,
  },

  getInitialState() {
    const props = this.props;
    let activeKey;
    if ('activeKey' in props) {
      activeKey = props.activeKey;
    } else if ('defaultActiveKey' in props) {
      activeKey = props.defaultActiveKey;
    } else {
      React.Children.forEach(props.children, (child) => {
        if (!activeKey && !child.props.disabled) {
          activeKey = child.key;
        }
      });
    }
    // cache panels
    this.renderPanels = {};
    return {activeKey};
  },

  getDefaultProps() {
    return {
      prefixCls: 'rc-tabs',
      onChange: noop,
      tabPosition: 'top',
      style: {},
      contentStyle: {},
      navStyle: {},
      onTabClick: noop,
    };
  },

  componentWillReceiveProps(nextProps) {
    if ('activeKey' in nextProps) {
      this.setActiveKey(nextProps.activeKey);
    }
  },

  onTabDestroy(key) {
    delete this.renderPanels[key];
  },

  onTabClick(key) {
    this.props.onTabClick(key);
    if (this.state.activeKey !== key) {
      this.setActiveKey(key);
      this.props.onChange(key);
    }
  },

  onKeyDown(e) {
    if (e.target !== React.findDOMNode(this)) {
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

  render() {
    const props = this.props;
    const prefixCls = props.prefixCls;
    const tabPosition = props.tabPosition;
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
    if (transitionName) {
      tabPanes = (<Animate showProp="active"
                          exclusive={true}
                          transitionName={transitionName}>
        {tabPanes}
      </Animate>);
    }
    const contents = [
      (<Nav prefixCls={prefixCls}
            key="nav"
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

  setActiveKey(activeKey) {
    const currentActiveKey = this.state.activeKey;
    if (!currentActiveKey) {
      this.setState({
        activeKey: activeKey,
      });
    } else {
      const keys = [];
      React.Children.forEach(this.props.children, c=> {
        keys.push(c.key);
      });
      const tabMovingDirection = keys.indexOf(currentActiveKey) > keys.indexOf(activeKey) ? 'backward' : 'forward';
      this.setState({
        activeKey: activeKey,
        tabMovingDirection: tabMovingDirection,
      });
    }
  },
});

Tabs.TabPane = TabPane;

export default Tabs;
