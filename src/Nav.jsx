'use strict';

import React from 'react';
import {cx} from './utils';

function noop() {
}

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
      var cls = activeKey === key ? `${prefixCls}-tab-active` : '';
      cls += ` ${prefixCls}-tab`;
      var events = {};
      if (child.props.disabled) {
        cls += ` ${prefixCls}-tab-disabled`;
      } else {
        events = {
          onClick: this.handleTabClick.bind(this, key)
        };
      }
      var ref = {};
      if (activeKey === key) {
        ref.ref = 'activeTab';
      }
      rst.push(<div {...events}
        className={cls}
        key={key}
      {...ref}>
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

  componentDidUpdate(prevProps) {
    if (prevProps && prevProps.tabPosition !== this.props.tabPosition) {
      this.setOffset(0);
      return;
    }
    var navNode = React.findDOMNode(this.refs.nav);
    var navNodeWH = this.getOffsetWH(navNode);
    var navWrapNode = React.findDOMNode(this.refs.navWrap);
    var navWrapNodeWH = this.getOffsetWH(navWrapNode);
    var state = this.state;
    var offset = state.offset;
    if (navWrapNodeWH - offset < navNodeWH) {
      if (!state.next) {
        this.setState({
          next: true
        });
      }
    } else {
      var minOffset = navWrapNodeWH - navNodeWH;
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

  getOffsetWH(node) {
    var tabPosition = this.props.tabPosition;
    var prop = 'offsetWidth';
    if (tabPosition === 'left' || tabPosition === 'right') {
      prop = 'offsetHeight';
    }
    return node[prop];
  },

  prev() {
    var navWrapNode = React.findDOMNode(this.refs.navWrap);
    var navWrapNodeWH = this.getOffsetWH(navWrapNode);
    var state = this.state;
    var offset = state.offset;
    this.setOffset(offset + navWrapNodeWH);
  },

  next() {
    var navWrapNode = React.findDOMNode(this.refs.navWrap);
    var navWrapNodeWH = this.getOffsetWH(navWrapNode);
    var state = this.state;
    var offset = state.offset;
    this.setOffset(offset - navWrapNodeWH);
  },

  render() {
    var props = this.props;
    var state = this.state;
    var prefixCls = props.prefixCls;
    var tabs = this._getTabs();
    var tabMovingDirection = props.tabMovingDirection;
    var tabPosition = props.tabPosition;
    var inkBarClass = `${prefixCls}-ink-bar`;
    if (tabMovingDirection) {
      inkBarClass += ` ${prefixCls}-ink-bar-transition-${tabMovingDirection}`;
    }
    var nextButton, prevButton;

    var showNextPrev = state.prev || state.next;

    if (showNextPrev) {
      prevButton = <span
        onClick={state.prev ? this.prev : noop}
        unselectable="unselectable"
        className={cx({
          [`${prefixCls}-tab-prev`]: 1,
          [`${prefixCls}-tab-btn-disabled`]: !state.prev
        })}>
        <span className={`${prefixCls}-tab-prev-icon`}></span>
      </span>;

      nextButton = <span
        onClick={state.next ? this.next : noop}
        unselectable="unselectable"
        className={cx({
          [`${prefixCls}-tab-next`]: 1,
          [`${prefixCls}-tab-btn-disabled`]: !state.next
        })}>
        <span className={`${prefixCls}-tab-next-icon`}></span>
      </span>;
    }

    var navOffset = {};
    if (tabPosition === 'left' || tabPosition === 'right') {
      navOffset = {
        top: state.offset
      };
    } else {
      navOffset = {
        left: state.offset
      };
    }

    return <div className={`${prefixCls}-nav-container`}
      style={props.style}
      ref="container">
    {prevButton}
    {nextButton}
      <div className={`${prefixCls}-nav-wrap`} ref="navWrap">
        <div className={`${prefixCls}-nav-scroll`}>
          <div className={`${prefixCls}-nav`} ref="nav" style={navOffset}>
            <div className={inkBarClass} ref='inkBar'/>
          {tabs}
          </div>
        </div>
      </div>
    </div>;
  }
});

export default Nav;
