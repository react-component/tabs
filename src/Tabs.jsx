'use strict';

var React = require('react');
var KeyCode = require('./KeyCode');
var TabPane = require('./TabPane');
var Nav = require('./Nav');
var CSSTransitionGroup = require('rc-css-transition-group');
function noop() {
}
var utils = require('./utils');
var prefixClsFn = utils.prefixClsFn;

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
        if (!activeKey) {
          activeKey = child.key;
        }
      });
    }
    //this.handleKeyDown = this.handleKeyDown.bind(this);
    //this.handleTabDestroy = this.handleTabDestroy.bind(this);
    // cache panels
    this.renderPanels = {};
    return {activeKey};
  },

  setActiveKey(activeKey) {
    var currentActiveKey = this.state.activeKey;
    if (!currentActiveKey) {
      this.setState({
        activeKey: activeKey
      });
    } else {
      var backward;
      React.Children.forEach(this.props.children, (c) => {
        if (backward !== undefined) {
          return;
        }
        var key = c.key;
        if (currentActiveKey === key) {
          backward = false;
        } else if (activeKey === key) {
          backward = true;
        }
      });
      var tabMovingDirection = backward === true ? 'backward' : (backward === false ? 'forward' : '');
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

  _getNextActiveKey() {
    var activeKey = this.state.activeKey;
    var children = [];
    React.Children.forEach(this.props.children, (c) => {
      if (!c.props.disabled) {
        children.push(c);
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

  _getPreviousActiveKey() {
    var activeKey = this.state.activeKey;
    var children = [];
    React.Children.forEach(this.props.children, (c)=> {
      if (!c.props.disabled) {
        children.unshift(c);
      }
    });
    var length = children.length;
    var ret = length && children[length - 1].key;
    children.forEach((child, i)=> {
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
    var activeKey = this.state.activeKey;
    var children = this.props.children;
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
          rootPrefixCls: this.props.prefixCls
        });
        newChildren.push(renderPanels[key]);
      } else {
        // lazy load
        newChildren.push(<TabPane active={false}
          key={key}
          rootPrefixCls={this.props.prefixCls}></TabPane>);
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
        var nextKey = this._getNextActiveKey();
        this.handleTabClick(nextKey);
        break;
      case KeyCode.LEFT:
      case KeyCode.UP:
        e.preventDefault();
        var previousKey = this._getPreviousActiveKey();
        this.handleTabClick(previousKey);
        break;
      default:
    }
  },

  render() {
    var props = this.props;
    var animation = this.props.animation;
    var prefixCls = props.prefixCls;
    var cls = prefixCls;
    var tabMovingDirection = this.state.tabMovingDirection;
    if (props.className) {
      cls += ' ' + props.className;
    }
    var tabPanes = this._getTabPanes();
    if (animation) {
      tabPanes = <CSSTransitionGroup showProp="active"
        exclusive={true}
        transitionName= {prefixClsFn(prefixCls, animation + '-' + (tabMovingDirection || 'backward'))}>
      {tabPanes}
      </CSSTransitionGroup>;
    }
    return (
      <div className={cls} tabIndex="0" onKeyDown={this.handleKeyDown}>
        <Nav prefixCls={prefixCls}
          handleTabClick={this.handleTabClick}
          tabMovingDirection={tabMovingDirection}
          panels={this.props.children}
          activeKey={this.state.activeKey}/>
        <div className={prefixClsFn(prefixCls, 'content')}>
          {tabPanes}
        </div>
      </div>
    );
  }
});

Tabs.defaultProps = {
  prefixCls: 'rc-tabs',
  onChange: noop,
  onTabClick: noop
};

Tabs.TabPane = TabPane;

module.exports = Tabs;
