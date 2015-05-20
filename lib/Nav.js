/** @jsx React.DOM */

var React = require('react');
var prefixClsFn = require('./utils').prefixClsFn;

var Nav = React.createClass({
  mixins: [require('./InkBarMixin')],

  _getTabs() {
    var props = this.props;
    var children = props.panels;
    var activeKey = props.activeKey;
    var rst = [];
    var prefixCls = props.prefixCls;

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
      rst.push(<div {...events} className={cls} key={key}
        ref={`tab${key}`} data-active={activeKey === key}>
        <a>{child.props.tab}</a>
      </div>);
    });

    return rst;
  },

  handleTabClick(key) {
    this.props.handleTabClick(key);
  },

  render() {
    var props = this.props;
    var prefixCls = props.prefixCls;
    var tabs = this._getTabs();
    var tabMovingDirection = props.tabMovingDirection;
    var inkBarClass = prefixClsFn(prefixCls, 'ink-bar');
    if (tabMovingDirection) {
      inkBarClass += ' ' + prefixClsFn(prefixCls, 'ink-bar-transition-' + tabMovingDirection);
    }
    return <div className={prefixClsFn(prefixCls, 'nav-container')} ref="container">
      <div className={inkBarClass} ref='inkBar'/>
      <div className={prefixClsFn(prefixCls, 'nav')}>
          {tabs}
      </div>
    </div>;
  }
});

module.exports = Nav;
