/** @jsx React.DOM */

var React = require('react');

var Tab = React.createClass({
  render: function () {
    var cls = this.props.active ? '' : 'hidden';
    return (
      <div className={cls}>
        {this.props.children}
      </div>
    );
  }
});

var Tabs = React.createClass({
  getInitialState: function () {
    return {
      activedIndex: this.props.activedIndex|| 0
    };
  },
  _getTabs: function () {
    var self = this,
      activedIndex = self.state.activedIndex,
      children = self.props.children,
      rst = [];

    React.Children.forEach(children,function (child,i) {
      var active = activedIndex === i,
        refId = 'tab' + i;
      var tmp = <Tab ref={refId} active={active}>{child}</Tab>;
      rst.push(tmp);
    });

    return rst;
  },
  _onCancel: function (ev) {
    ev.preventDefault();
  },
  _getNavs: function () {
    var self = this,
      items = self.props.items,
      activedIndex = this.state.activedIndex,
      rst = [];

    for (var i = 0; i < items.length; i++){
      var item = items[i],
        cls = activedIndex === i ? 'active' : '',
        tmp = <li onClick={this.handleNavClick.bind(this, i)} className={cls}><a onClick={this._onCancel} href="#">{item.title}</a></li>;
      rst.push(tmp);
    }
    return rst;
  },
  handleNavClick: function (index) {
    var self = this;
    this.setState({
      activedIndex: index
    });
    if (this.props.onNavChange){
      this.props.onNavChange(index,self.props.items[index]);
    }
  },
  render: function () {
    var self = this,
      navs = self._getNavs(),
      tabs = self._getTabs();
    return (
      <div className="tabs rc-tabs">
        <ul className="nav nav-tabs">
          {navs}
        </ul>
        <div className="tab-contents">
          {tabs}
        </div>
      </div>
    );
  }
});

module.exports = Tabs;