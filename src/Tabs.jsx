'use strict';

var React = require('react');
var KeyCode = require('./KeyCode');
var TabPane = require('./TabPane');
var Nav = require('./Nav');
var Animate = require('rc-animate');

function noop() {
}

var Tabs = React.createClass({
  getInitialState() {
    var props = this.props;
    var activeKey;
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
      onTabClick: noop
    };
  },

  setActiveKey(activeKey) {
    var currentActiveKey = this.state.activeKey;
    if (!currentActiveKey) {
      this.setState({
        activeKey: activeKey
      });
    } else {
      var keys = [];
      React.Children.forEach(this.props.children, c=> {
        keys.push(c.key);
      });
      var tabMovingDirection = keys.indexOf(currentActiveKey) > keys.indexOf(activeKey) ? 'backward' : 'forward';
      this.setState({
        activeKey: activeKey,
        tabMovingDirection: tabMovingDirection
      });
    }
  },

  componentWillReceiveProps(nextProps) {
    if ('activeKey' in nextProps) {
      this.setActiveKey(nextProps.activeKey);
    }
  },

  handleTabDestroy(key) {
    delete this.renderPanels[key];
  },

  _getNextActiveKey(next) {
    var activeKey = this.state.activeKey;
    var children = [];
    React.Children.forEach(this.props.children, (c) => {
      if (!c.props.disabled) {
        if (next) {
          children.push(c);
        } else {
          children.unshift(c);
        }
      }
    });
    var length = children.length;
    var ret = length && children[0].key;
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

  _getTabPanes() {
    var state = this.state;
    var props = this.props;
    var activeKey = state.activeKey;
    var children = props.children;
    var newChildren = [];
    var renderPanels = this.renderPanels;

    React.Children.forEach(children, (child) => {
      var key = child.key;
      var active = activeKey === key;
      if (active || renderPanels[key]) {
        child = active ? child : renderPanels[key];
        renderPanels[key] = React.cloneElement(child, {
          active: active,
          onDestroy: this.handleTabDestroy.bind(this, key),
          //eventKey: key,
          rootPrefixCls: props.prefixCls
        });
        newChildren.push(renderPanels[key]);
      } else {
        // do not change owner ...
        // or else will destroy and reinit
        //newChildren.push(<TabPane active={false}
        //  key={key}
        //  eventKey={key}
        //  rootPrefixCls={this.props.prefixCls}></TabPane>);
        // return
        // lazy load
        newChildren.push(React.cloneElement(child, {
          active: false,
          //eventKey: key,
          rootPrefixCls: props.prefixCls
        }, []));
      }
    });

    return newChildren;
  },

  handleTabClick(key) {
    this.props.onTabClick(key);
    if (this.state.activeKey !== key) {
      this.setActiveKey(key);
      this.props.onChange(key);
    }
  },

  handleKeyDown(e) {
    if (e.target !== React.findDOMNode(this)) {
      return;
    }
    var eventKeyCode = e.keyCode;
    switch (eventKeyCode) {
      case KeyCode.RIGHT:
      case KeyCode.DOWN:
        e.preventDefault();
        var nextKey = this._getNextActiveKey(true);
        this.handleTabClick(nextKey);
        break;
      case KeyCode.LEFT:
      case KeyCode.UP:
        e.preventDefault();
        var previousKey = this._getNextActiveKey(false);
        this.handleTabClick(previousKey);
        break;
      default:
    }
  },

  render() {
    var props = this.props;
    var prefixCls = props.prefixCls;
    var tabPosition = props.tabPosition;
    var cls = `${prefixCls} ${prefixCls}-${tabPosition}`;
    var tabMovingDirection = this.state.tabMovingDirection;
    if (props.className) {
      cls += ' ' + props.className;
    }
    var animation = this.props.animation;
    var tabPanes = this._getTabPanes();
    var transitionName;
    transitionName = props.transitionName && props.transitionName[tabMovingDirection || 'backward'];
    if (!transitionName && animation) {
      transitionName = `${prefixCls}-${animation}-${tabMovingDirection || 'backward'}`;
    }
    if (transitionName) {
      tabPanes = <Animate showProp="active"
        exclusive={true}
        transitionName= {transitionName}>
      {tabPanes}
      </Animate>;
    }
    var contents = [
      <Nav prefixCls={prefixCls}
        key="nav"
        tabPosition={tabPosition}
        style={props.navStyle}
        handleTabClick={this.handleTabClick}
        tabMovingDirection={tabMovingDirection}
        panels={this.props.children}
        activeKey={this.state.activeKey}/>,
      <div className={`${prefixCls}-content`}
        style={props.contentStyle}
        key="content">
          {tabPanes}
      </div>
    ];
    if (tabPosition === 'bottom') {
      contents.reverse();
    }
    return (
      <div className={cls}
        tabIndex="0"
        style={props.style}
        onKeyDown={this.handleKeyDown}>
      {contents}
      </div>
    );
  }
});

Tabs.TabPane = TabPane;

module.exports = Tabs;
