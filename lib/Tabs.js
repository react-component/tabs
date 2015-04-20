/** @jsx React.DOM */

var React = require('react');
var KeyCode = {
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
  render() {
    var props = this.props;
    var prefixCls = props.rootPrefixCls + '-tabpane';
    var cls = props.active ? '' : prefixClsFn(prefixCls, 'hidden');
    cls += ' ' + prefixCls;
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

function prefixClsFn(prefixCls) {
  var args = Array.prototype.slice.call(arguments, 1);
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
      activeKey: activeKey
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleTabDestroy = this.handleTabDestroy.bind(this);
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
        child = active ? child : renderPanels[key];
        renderPanels[key] = React.cloneElement(child, {
          active: active,
          onDestroy: this.handleTabDestroy.bind(this, key),
          rootPrefixCls: this.props.prefixCls
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
    var prefixCls = this.props.prefixCls;

    React.Children.forEach(children, (child)=> {
      var key = child.key;
      var cls = activeKey === key ? prefixClsFn(prefixCls, 'tab-active') : '';
      cls += ' ' + prefixClsFn(prefixCls, 'tab');
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
  }

  render() {
    var props = this.props;
    var tabs = this._getTabs();
    var tabPanes = this._getTabPanes();
    var prefixCls = props.prefixCls;
    var cls = prefixCls;
    if (props.className) {
      cls += ' ' + props.className;
    }
    return (
      <div className={cls} tabIndex="0" onKeyDown={this.handleKeyDown}>
        <ul className={prefixClsFn(prefixCls, 'nav')}>
          {tabs}
        </ul>
        <div className={prefixClsFn(prefixCls, 'content')}>
          {tabPanes}
        </div>
      </div>
    );
  }
}

Tabs.defaultProps = {
  prefixCls: 'rc-tabs'
};

Tabs.TabPane = TabPane;

module.exports = Tabs;
