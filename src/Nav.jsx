import React, { PropTypes } from 'react';
import classnames from 'classnames';
import InkBarMixin from './InkBarMixin';
import { getTransformPropertyName } from './utils';

const tabBarExtraContentStyle = {
  float: 'right',
};

function noop() {
}

const Nav = React.createClass({
  propTypes: {
    tabPosition: PropTypes.string,
    prefixCls: PropTypes.string,
    allowInkBar: PropTypes.bool,
    allowScrollBar: PropTypes.bool,
    tabBarExtraContent: PropTypes.any,
    onTabClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    style: PropTypes.object,
    inkBarStyle: PropTypes.object,
    barStyle: PropTypes.object,
  },

  mixins: [InkBarMixin],

  getInitialState() {
    this.offset = 0;
    return {
      next: false,
      prev: false,
    };
  },

  componentDidMount() {
    this.componentDidUpdate();
  },

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (!props.allowScrollBar) {
      return;
    }
    if (prevProps && prevProps.tabPosition !== props.tabPosition) {
      this.setOffset(0);
      return;
    }
    const nextPrev = this.setNextPrev();
    // wait next, prev show hide
    /* eslint react/no-did-update-set-state:0 */
    if (this.isNextPrevShown(this.state) !== this.isNextPrevShown(nextPrev)) {
      this.setState({}, this.scrollToActiveTab);
    } else {
      // can not use props.activeKey
      if (!prevProps || props.activeKey !== prevProps.activeKey) {
        this.scrollToActiveTab();
      }
    }
  },

  onTabClick(key) {
    this.props.onTabClick(key);
  },

  setNextPrev() {
    const navNode = this.refs.nav;
    const navNodeWH = this.getOffsetWH(navNode);
    const navWrapNode = this.refs.navWrap;
    const navWrapNodeWH = this.getOffsetWH(navWrapNode);
    let { offset } = this;
    const minOffset = navWrapNodeWH - navNodeWH;
    let { next, prev } = this.state;
    if (minOffset >= 0) {
      next = false;
      this.setOffset(0, false);
      offset = 0;
    } else if (minOffset < offset) {
      next = (true);
    } else {
      next = (false);
      this.setOffset(minOffset, false);
      offset = minOffset;
    }

    if (offset < 0) {
      prev = (true);
    } else {
      prev = (false);
    }

    this.setNext(next);
    this.setPrev(prev);
    return {
      next,
      prev,
    };
  },

  getTabs() {
    const props = this.props;
    const children = props.panels;
    const activeKey = props.activeKey;
    const rst = [];
    const prefixCls = props.prefixCls;

    React.Children.forEach(children, (child) => {
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
      rst.push(<div
        role="tab"
        aria-disabled={child.props.disabled ? 'true' : 'false'}
        aria-selected={activeKey === key ? 'true' : 'false'}
        {...events}
        className={cls}
        key={key}
        {...ref}
      >
        {child.props.tab}
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

  getOffsetLT(node) {
    const tabPosition = this.props.tabPosition;
    let prop = 'left';
    if (tabPosition === 'left' || tabPosition === 'right') {
      prop = 'top';
    }
    return node.getBoundingClientRect()[prop];
  },

  setOffset(offset, checkNextPrev = true) {
    const target = Math.min(0, offset);
    if (this.offset !== target) {
      this.offset = target;
      let navOffset = {};
      const tabPosition = this.props.tabPosition;
      const transformProperty = getTransformPropertyName();
      if (tabPosition === 'left' || tabPosition === 'right') {
        if (transformProperty) {
          navOffset = {
            name: transformProperty,
            value: `translate3d(0,${target}px,0)`,
          };
        } else {
          navOffset = {
            name: 'top',
            value: `${target}px`,
          };
        }
      } else {
        if (transformProperty) {
          navOffset = {
            name: transformProperty,
            value: `translate3d(${target}px,0,0)`,
          };
        } else {
          navOffset = {
            name: 'left',
            value: `${target}px`,
          };
        }
      }
      this.refs.nav.style[navOffset.name] = navOffset.value;
      if (checkNextPrev) {
        this.setNextPrev();
      }
    }
  },

  setPrev(v) {
    if (this.state.prev !== v) {
      this.setState({
        prev: v,
      });
    }
  },

  setNext(v) {
    if (this.state.next !== v) {
      this.setState({
        next: v,
      });
    }
  },

  isNextPrevShown(state) {
    return state.next || state.prev;
  },

  scrollToActiveTab() {
    const { activeTab, navWrap } = this.refs;
    if (activeTab) {
      const activeTabWH = this.getOffsetWH(activeTab);
      const navWrapNodeWH = this.getOffsetWH(navWrap);
      let { offset } = this;
      const wrapOffset = this.getOffsetLT(navWrap);
      const activeTabOffset = this.getOffsetLT(activeTab);
      if (wrapOffset > activeTabOffset) {
        offset += (wrapOffset - activeTabOffset);
        this.setOffset(offset);
      } else if ((wrapOffset + navWrapNodeWH) < (activeTabOffset + activeTabWH)) {
        offset -= (activeTabOffset + activeTabWH) - (wrapOffset + navWrapNodeWH);
        this.setOffset(offset);
      }
    }
  },

  prev() {
    const navWrapNode = this.refs.navWrap;
    const navWrapNodeWH = this.getOffsetWH(navWrapNode);
    const { offset } = this;
    this.setOffset(offset + navWrapNodeWH);
  },

  next() {
    const navWrapNode = this.refs.navWrap;
    const navWrapNodeWH = this.getOffsetWH(navWrapNode);
    const { offset } = this;
    this.setOffset(offset - navWrapNodeWH);
  },

  render() {
    const props = this.props;
    const state = this.state;
    const { prefixCls, tabBarExtraContent, inkBarStyle, barStyle } = props;
    const tabs = this.getTabs();

    let inkBarNode;

    if (props.allowInkBar) {
      let inkBarClass;
      const tabMovingDirection = props.tabMovingDirection;
      inkBarClass = `${prefixCls}-ink-bar`;
      if (tabMovingDirection) {
        inkBarClass += ` ${prefixCls}-ink-bar-transition-${tabMovingDirection}`;
      }
      inkBarNode = <div style={inkBarStyle} className={inkBarClass} key="inkBar" ref="inkBar"/>;
    }

    const contents = [
      tabBarExtraContent ?
        <div style={tabBarExtraContentStyle} key="extra">{tabBarExtraContent}</div> :
        null,
    ];

    if (props.allowScrollBar) {
      let nextButton;
      let prevButton;
      const showNextPrev = state.prev || state.next;

      if (showNextPrev) {
        prevButton = (
          <span
            onClick={state.prev ? this.prev : noop}
            unselectable="unselectable"
            className={classnames({
              [`${prefixCls}-tab-prev`]: 1,
              [`${prefixCls}-tab-btn-disabled`]: !state.prev,
            })}
          >
        <span className={`${prefixCls}-tab-prev-icon`}/>
      </span>
        );

        nextButton = (
          <span
            onClick={state.next ? this.next : noop}
            unselectable="unselectable"
            className={classnames({
              [`${prefixCls}-tab-next`]: 1,
              [`${prefixCls}-tab-btn-disabled`]: !state.next,
            })}
          >
        <span className={`${prefixCls}-tab-next-icon`}/>
      </span>
        );
      }

      contents.push(
        <div
          className={`${prefixCls}-nav-container ${showNextPrev ?
            `${prefixCls}-nav-container-scrolling` :
            ''}`}
          style={props.style}
          key="container"
          ref="container"
        >
          {prevButton}
          {nextButton}
          <div className={`${prefixCls}-nav-wrap`} ref="navWrap">
            <div className={`${prefixCls}-nav-scroll`}>
              <div className={`${prefixCls}-nav`} ref="nav">
                {inkBarNode}
                {tabs}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      contents.push(inkBarNode);
      contents.push.apply(contents, tabs);
    }

    return (
      <div
        role="tablist"
        className={`${prefixCls}-bar`}
        tabIndex="0"
        ref="root"
        onKeyDown={props.onKeyDown}
        style={barStyle}
      >
        {contents}
      </div>);
  },
});

export default Nav;
