/** @jsx React.DOM */

var React = require('react');
var keyCode = require('./keyCode');

var TabPane = React.createClass({
  prefixClsFn: prefixClsFn,

  getInitialState: function () {
    return {
      prefixCls: this.props.rootPrefixCls + '-tabpane'
    };
  },

  render: function () {
    var props = this.props;
    var cls = props.active ? '' : this.prefixClsFn('hidden');
    cls += ' ' + this.state.prefixCls;
    return (
      <div className={cls}>
        {this.props.children}
      </div>
    );
  }
});

function prefixClsFn() {
  var prefixCls = this.state.prefixCls;
  var args = Array.prototype.slice.call(arguments, 0);
  return args.map(function (s) {
    return prefixCls + '-' + s;
  }).join(' ');
}

var Tabs = React.createClass({
  prefixClsFn: prefixClsFn,

  getDefaultProps: function () {
    return {
      prefixCls: 'rc-tabs',
      activeTabClassName: '',
      navClassName: '',
      contentClassName: ''
    };
  },

  getInitialState: function () {
    var activeKey;
    if (typeof this.props.activeKey !== 'undefined') {
      activeKey = this.props.activeKey;
    } else {
      React.Children.forEach(this.props.children, function (child) {
        if (!activeKey){
          activeKey = child.key;
        }
      });
    }
    return {
      prefixCls: this.props.prefixCls,
      activeKey: activeKey
    };
  },

  _getNextActiveKey: function () {
    var activeKey = this.state.activeKey;
    var children = [];
    React.Children.forEach(this.props.children, function (c) {
      children.push(c);
    });
    var length = children.length;
    var ret;
    children.forEach(function (child, i) {
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

  _getPreviousActiveKey: function () {
    var activeKey = this.state.activeKey;
    var children = [];
    React.Children.forEach(this.props.children, function (c) {
      children.unshift(c);
    });
    var length = children.length;
    var ret;
    children.forEach(function (child, i) {
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

  _getTabPanes: function () {
    var self = this;
    var activeKey = self.state.activeKey;
    var children = self.props.children;

    React.Children.forEach(children, function (child) {
      child.props.active = activeKey === child.key;
      child.props.rootPrefixCls = self.state.prefixCls;
    });

    return children;
  },

  _getTabs: function () {
    var self = this;
    var children = self.props.children;
    var activeKey = this.state.activeKey;
    var rst = [];
    var prefixClsFn = this.prefixClsFn;
    var activeTabClassName = this.props.activeTabClassName;

    React.Children.forEach(children, function (child) {
      var key = child.key;
      var cls = activeKey === key ? prefixClsFn('tab-active') + ' ' + activeTabClassName : '';
      cls += ' ' + prefixClsFn('tab');
      rst.push(<li onClick={self.handleTabClick.bind(self, key)} className={cls} key={key}>
        <a>{child.props.tab}</a>
      </li>);
    });

    return rst;
  },

  handleTabClick: function (key) {
    if (this.state.activeKey !== key) {
      this.setState({
        activeKey: key
      });
      if (this.props.onChange) {
        this.props.onChange(key);
      }
    }
  },

  handleKeyDown: function (e) {
    if (e.target !== this.getDOMNode()) {
      return;
    }
    var eventKeyCode = e.keyCode;
    switch (eventKeyCode) {
      case keyCode.RIGHT:
      case keyCode.DOWN:
        e.preventDefault();
        var nextKey = this._getNextActiveKey();
        this.handleTabClick(nextKey);
        break;
      case keyCode.LEFT:
      case keyCode.UP:
        e.preventDefault();
        var previousKey = this._getPreviousActiveKey();
        this.handleTabClick(previousKey);
        break;
    }
  },

  render: function () {
    var self = this;
    var tabs = self._getTabs();
    var tabPanes = self._getTabPanes();
    var cls = this.state.prefixCls;
    var prefixClsFn = this.prefixClsFn;
    return (
      <div className={cls} tabIndex="0" onKeyDown={this.handleKeyDown}>
        <ul className={this.props.navClassName + ' ' + prefixClsFn('nav')}>
          {tabs}
        </ul>
        <div className={this.props.contentClassName + ' ' + prefixClsFn('content')}>
          {tabPanes}
        </div>
      </div>
    );
  }
});

Tabs.TabPane = TabPane;

module.exports = Tabs;
