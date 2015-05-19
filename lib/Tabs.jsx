/** @jsx React.DOM */

var React = require('react');
var KeyCode = require('./KeyCode');
var TabPane = require('./TabPane');
var CSSTransitionGroup = require('rc-css-transition-group');
function noop() {
}
var utils = require('./utils');
var prefixClsFn = utils.prefixClsFn;

var Tabs = React.createClass({
  mixins: [require('./InkBarMixin')],

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
      var left;
      React.Children.forEach(this.props.children, (c) => {
        if (left !== undefined) {
          return;
        }
        var key = c.key;
        if (currentActiveKey === key) {
          left = false;
        } else if (activeKey === key) {
          left = true;
        }
      });
      var tabMovingDirection = left === true ? 'left' : (left === false ? 'right' : '');
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

  _getTabs() {
    var children = this.props.children;
    var activeKey = this.state.activeKey;
    var rst = [];
    var prefixCls = this.props.prefixCls;

    React.Children.forEach(children, (child)=> {
      var key = child.key;
      var cls = activeKey === key ? prefixClsFn(prefixCls, 'tab-active') : '';
      cls += ' ' + prefixClsFn(prefixCls, 'tab');
      var events = {};
      if (child.props.disabled) {
        cls += ' ' + prefixClsFn(prefixCls, 'tab-disabled');
      } else {
        events = {
          onClick: this.handleTabClick.bind(this, key)
        };
      }
      rst.push(<div {...events} className={cls} key={key} ref={`tab${key}`} data-active={activeKey === key}>
        <a>{child.props.tab}</a>
      </div>);
    });

    return rst;
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
    }
  },

  render() {
    var props = this.props;
    var effect = this.props.effect;
    var prefixCls = props.prefixCls;
    var tabs = this._getTabs();
    var tabPanes = this._getTabPanes();
    var tabMovingDirection = this.state.tabMovingDirection;
    if (effect) {
      tabPanes = <CSSTransitionGroup showProp="active" transitionName= {prefixClsFn(prefixCls, 'effect-' + (tabMovingDirection || 'left'))}>
      {tabPanes}
      </CSSTransitionGroup>;
    }
    var cls = prefixCls;
    if (props.className) {
      cls += ' ' + props.className;
    }
    var inkBarClass = prefixClsFn(prefixCls, 'ink-bar');
    if (tabMovingDirection) {
      inkBarClass += ' ' + prefixClsFn(prefixCls, 'ink-bar-transition-' + tabMovingDirection);
    }
    return (
      <div className={cls} tabIndex="0" onKeyDown={this.handleKeyDown}>
        <div className={prefixClsFn(prefixCls, 'nav-container')} ref="container">
          <div className={inkBarClass} ref='inkBar'/>
          <div className={prefixClsFn(prefixCls, 'nav')}>
          {tabs}
          </div>
        </div>
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
