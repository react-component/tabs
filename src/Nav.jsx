'use strict';

var React = require('react');
var prefixClsFn = require('./utils').prefixClsFn;

var Nav = React.createClass({
  mixins: [require('./InkBarMixin')],

  getInitialState() {
    return {
      next: false,
      offset: 0,
      prev: false
    };
  },

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

  componentDidMount() {
    this.componentDidUpdate();
  },

  componentDidUpdate() {
    var navNode = React.findDOMNode(this.refs.nav);
    var navNodeWidth = navNode.offsetWidth;
    var navWrapNode = React.findDOMNode(this.refs.navWrap);
    var navWrapNodeWidth = navWrapNode.offsetWidth;
    var state = this.state;
    var offset = state.offset;
    if (navWrapNodeWidth - offset < navNodeWidth) {
      if (!state.next) {
        this.setState({
          next: true
        });
      }
    } else {
      var minOffset = navWrapNodeWidth - navNodeWidth;
      if (minOffset < 0 && minOffset > offset) {
        if (state.next) {
          this.setState({
            next: false
          });
        }
        this.setOffset(minOffset);
        offset = minOffset;
      }
    }
    if (offset < 0) {
      if (!state.prev) {
        this.setState({
          prev: true
        });
      }
    } else if (state.prev) {
      this.setState({
        prev: false
      });
    }
  },

  setOffset(offset) {
    offset = Math.min(0, offset);
    this.setState({
      offset: offset
    });
  },

  prev() {
    var navWrapNode = React.findDOMNode(this.refs.navWrap);
    var navWrapNodeWidth = navWrapNode.offsetWidth;
    var state = this.state;
    var offset = state.offset;
    this.setOffset(offset + navWrapNodeWidth);
  },

  next() {
    var navWrapNode = React.findDOMNode(this.refs.navWrap);
    var navWrapNodeWidth = navWrapNode.offsetWidth;
    var state = this.state;
    var offset = state.offset;
    this.setOffset(offset - navWrapNodeWidth);
  },

  render() {
    var props = this.props;
    var state = this.state;
    var prefixCls = props.prefixCls;
    var tabs = this._getTabs();
    var tabMovingDirection = props.tabMovingDirection;
    var inkBarClass = prefixClsFn(prefixCls, 'ink-bar');
    if (tabMovingDirection) {
      inkBarClass += ' ' + prefixClsFn(prefixCls, 'ink-bar-transition-' + tabMovingDirection);
    }
    var nextButton, prevButton;

    if (state.prev) {
      prevButton = <span
        onClick={this.prev}
        unselectable="unselectable"
        className={prefixClsFn(prefixCls, 'tab-prev')}>
        <span className={prefixClsFn(prefixCls, 'tab-prev-icon')}></span>
      </span>;
    }

    if (state.next) {
      nextButton = <span
        onClick={this.next}
        unselectable="unselectable"
        className={prefixClsFn(prefixCls, 'tab-next')}>
        <span className={prefixClsFn(prefixCls, 'tab-next-icon')}></span>
      </span>;
    }

    return <div className={prefixClsFn(prefixCls, 'nav-container')} ref="container">
    {prevButton}
    {nextButton}
      <div className={prefixClsFn(prefixCls, 'nav-wrap')} ref="navWrap">
        <div className={prefixClsFn(prefixCls, 'nav-scroll')}>
          <div className={prefixClsFn(prefixCls, 'nav')} ref="nav" style={{left: state.offset}}>
            <div className={inkBarClass} ref='inkBar'/>
          {tabs}
          </div>
        </div>
      </div>
    </div>;
  }
});

module.exports = Nav;
