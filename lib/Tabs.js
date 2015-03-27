/** @jsx React.DOM */

var React = require('react');

var keyCode = {
  /**
   * LEFT
   */
  LEFT: 37, // also NUM_WEST
  /**
   * UP
   */
  UP: 38, // also NUM_NORTH
  /**
   * RIGHT
   */
  RIGHT: 39, // also NUM_EAST
  /**
   * DOWN
   */
  DOWN: 40 // also NUM_SOUTH
};

class TabPane extends React.Component {
  constructor(props) {
    super(props);
    this.prefixClsFn = prefixClsFn.bind(this);
    this.state = {
      prefixCls: props.rootPrefixCls + '-tabpane'
    };
  }

  render() {
    var props = this.props;
    var cls = props.active ? '' : this.prefixClsFn('hidden');
    cls += ' ' + this.state.prefixCls;
    return (
      <div className={cls}>
        {this.props.children}
      </div>
    );
  }

  componentWillUnmount() {
    this.props.onDestroy();
  }
}

function prefixClsFn() {
  var prefixCls = this.state.prefixCls;
  var args = Array.prototype.slice.call(arguments, 0);
  return args.map((s)=> {
    return prefixCls + '-' + s;
  }).join(' ');
}

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    var activeKey;
    if (typeof props.activeKey !== 'undefined') {
      activeKey = props.activeKey;
    } else {
      React.Children.forEach(props.children, (child) => {
        if (!activeKey) {
          activeKey = child.key;
        }
      });
    }
    this.state = {
      prefixCls: props.prefixCls,
      activeKey: activeKey
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleTabDestroy = this.handleTabDestroy.bind(this);
    this.prefixClsFn = prefixClsFn.bind(this);
    // cache panels
    this.renderPanels = {};
  }

  handleTabDestroy(key) {
    delete this.renderPanels[key];
  }

  _getNextActiveKey() {
    var activeKey = this.state.activeKey;
    var children = [];
    React.Children.forEach(this.props.children, (c) => {
      children.push(c);
    });
    var length = children.length;
    var ret;
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

  _getPreviousActiveKey() {
    var activeKey = this.state.activeKey;
    var children = [];
    React.Children.forEach(this.props.children, (c)=> {
      children.unshift(c);
    });
    var length = children.length;
    var ret;
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
  }

  _getTabPanes() {
    var activeKey = this.state.activeKey;
    var children = this.props.children;
    var newChildren = [];
    var renderPanels = this.renderPanels;

    React.Children.forEach(children, (child) => {
      var key = child.key;
      var active = activeKey === key;
      if (active || renderPanels[key]) {
        renderPanels[key] = React.cloneElement(child, {
          active: active,
          onDestroy: this.handleTabDestroy.bind(this, key),
          rootPrefixCls: this.state.prefixCls
        });
        newChildren.push(renderPanels[key]);
      } else {
        // lazy load
        newChildren.push(null);
      }
    });

    return newChildren;
  }

  _getTabs() {
    var children = this.props.children;
    var activeKey = this.state.activeKey;
    var rst = [];
    var prefixClsFn = this.prefixClsFn;
    var activeTabClassName = this.props.activeTabClassName;

    React.Children.forEach(children, (child)=> {
      var key = child.key;
      var cls = activeKey === key ? prefixClsFn('tab-active') + ' ' + activeTabClassName : '';
      cls += ' ' + prefixClsFn('tab');
      rst.push(<li onClick={this.handleTabClick.bind(this, key)} className={cls} key={key}>
        <a>{child.props.tab}</a>
      </li>);
    });

    return rst;
  }

  handleTabClick(key) {
    if (this.state.activeKey !== key) {
      this.setState({
        activeKey: key
      });
      if (this.props.onChange) {
        this.props.onChange(key);
      }
    }
  }

  handleKeyDown(e) {
    if (e.target !== React.findDOMNode(this)) {
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
  }

  render() {
    var tabs = this._getTabs();
    var tabPanes = this._getTabPanes();
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
}

Tabs.defaultProps = {
  prefixCls: 'rc-tabs',
  activeTabClassName: '',
  navClassName: '',
  contentClassName: ''
};

Tabs.TabPane = TabPane;

module.exports = Tabs;
