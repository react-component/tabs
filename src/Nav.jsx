import React, {PropTypes} from 'react';
import {cx} from './utils';

function noop() {
}

const Nav = React.createClass({
  propTypes: {
    tabPosition: PropTypes.string,
    tabBarExtraContent: PropTypes.any,
    onTabClick: PropTypes.func,
  },

  mixins: [require('./InkBarMixin')],

  getInitialState() {
    return {
      next: false,
      offset: 0,
      prev: false,
    };
  },

  componentDidMount() {
    this.componentDidUpdate();
  },

  componentDidUpdate(prevProps) {
    if (prevProps && prevProps.tabPosition !== this.props.tabPosition) {
      this.setOffset(0);
      return;
    }
    const navNode = this.refs.nav;
    const navNodeWH = this.getOffsetWH(navNode);
    const navWrapNode = this.refs.navWrap;
    const navWrapNodeWH = this.getOffsetWH(navWrapNode);
    const state = this.state;
    let offset = state.offset;
    if (navWrapNodeWH - offset < navNodeWH) {
      if (!state.next) {
        this.setNext(true);
      }
    } else {
      const minOffset = navWrapNodeWH - navNodeWH;
      if (minOffset < 0 && minOffset > offset) {
        if (state.next) {
          this.setNext(false);
        }
        this.setOffset(minOffset);
        offset = minOffset;
      }
    }
    if (offset < 0) {
      if (!state.prev) {
        this.setPrev(true);
      }
    } else if (state.prev) {
      this.setPrev(false);
    }
  },

  onTabClick(key) {
    this.props.onTabClick(key);
  },

  getTabs() {
    const props = this.props;
    const children = props.panels;
    const activeKey = props.activeKey;
    const rst = [];
    const prefixCls = props.prefixCls;

    React.Children.forEach(children, (child)=> {
      const key = child.key;
      let cls = activeKey === key ? `${prefixCls}-tab-active` : '';
      cls += ` ${prefixCls}-tab`;
      let events = {};
      if (child.props.disabled) {
        cls += ` ${prefixCls}-tab-disabled`;
      } else {
        events = {
          onClick: this.onTabClick.bind(this, key),
        };
      }
      const ref = {};
      if (activeKey === key) {
        ref.ref = 'activeTab';
      }
      rst.push(<div {...events}
        className={cls}
        key={key}
        {...ref}>
        <div className={`${prefixCls}-tab-inner`}>{child.props.tab}</div>
      </div>);
    });

    return rst;
  },

  getOffsetWH(node) {
    const tabPosition = this.props.tabPosition;
    let prop = 'offsetWidth';
    if (tabPosition === 'left' || tabPosition === 'right') {
      prop = 'offsetHeight';
    }
    return node[prop];
  },

  render() {
    const props = this.props;
    const state = this.state;
    const prefixCls = props.prefixCls;
    const tabs = this.getTabs();
    const tabMovingDirection = props.tabMovingDirection;
    const tabPosition = props.tabPosition;
    let inkBarClass = `${prefixCls}-ink-bar`;
    if (tabMovingDirection) {
      inkBarClass += ` ${prefixCls}-ink-bar-transition-${tabMovingDirection}`;
    }
    let nextButton;
    let prevButton;

    const showNextPrev = state.prev || state.next;

    if (showNextPrev) {
      prevButton = (<span
        onClick={state.prev ? this.prev : noop}
        unselectable="unselectable"
        className={cx({
          [`${prefixCls}-tab-prev`]: 1,
          [`${prefixCls}-tab-btn-disabled`]: !state.prev,
        })}>
        <span className={`${prefixCls}-tab-prev-icon`}></span>
      </span>);

      nextButton = (<span
        onClick={state.next ? this.next : noop}
        unselectable="unselectable"
        className={cx({
          [`${prefixCls}-tab-next`]: 1,
          [`${prefixCls}-tab-btn-disabled`]: !state.next,
        })}>
        <span className={`${prefixCls}-tab-next-icon`}></span>
      </span>);
    }

    let navOffset = {};
    if (tabPosition === 'left' || tabPosition === 'right') {
      navOffset = {
        top: state.offset,
      };
    } else {
      navOffset = {
        left: state.offset,
      };
    }

    return (<div className={`${prefixCls}-tabs-bar`}>
      {this.props.tabBarExtraContent}
      <div className={`${prefixCls}-nav-container ${showNextPrev ? `${prefixCls}-nav-container-scrolling` : ''}`}
           style={props.style}
           ref="container">
        {prevButton}
        {nextButton}
        <div className={`${prefixCls}-nav-wrap`} ref="navWrap">
          <div className={`${prefixCls}-nav-scroll`}>
            <div className={`${prefixCls}-nav`} ref="nav" style={navOffset}>
              <div className={inkBarClass} ref="inkBar"/>
              {tabs}
            </div>
          </div>
        </div>
      </div>
    </div>);
  },

  setOffset(offset) {
    this.setState({
      offset: Math.min(0, offset),
    });
  },

  prev() {
    const navWrapNode = this.refs.navWrap;
    const navWrapNodeWH = this.getOffsetWH(navWrapNode);
    const state = this.state;
    const offset = state.offset;
    this.setOffset(offset + navWrapNodeWH);
  },

  next() {
    const navWrapNode = this.refs.navWrap;
    const navWrapNodeWH = this.getOffsetWH(navWrapNode);
    const state = this.state;
    const offset = state.offset;
    this.setOffset(offset - navWrapNodeWH);
  },

  setPrev(v) {
    this.setState({
      prev: v,
    });
  },

  setNext(v) {
    this.setState({
      next: v,
    });
  },
});

export default Nav;
