import classnames from 'classnames';
import { setTransform, isTransformSupported } from './utils';
import React from 'react';

export default {
  getDefaultProps() {
    return {
      scrollAnimated: true,
      onPrevClick() {},
      onNextClick() {},
    };
  },

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
    if (prevProps && prevProps.tabBarPosition !== props.tabBarPosition) {
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


  getOffsetWH(node) {
    const tabBarPosition = this.props.tabBarPosition;
    let prop = 'offsetWidth';
    if (tabBarPosition === 'left' || tabBarPosition === 'right') {
      prop = 'offsetHeight';
    }
    return node[prop];
  },

  getOffsetLT(node) {
    const tabBarPosition = this.props.tabBarPosition;
    let prop = 'left';
    if (tabBarPosition === 'left' || tabBarPosition === 'right') {
      prop = 'top';
    }
    return node.getBoundingClientRect()[prop];
  },

  setOffset(offset, checkNextPrev = true) {
    const target = Math.min(0, offset);
    if (this.offset !== target) {
      this.offset = target;
      let navOffset = {};
      const tabBarPosition = this.props.tabBarPosition;
      const navStyle = this.refs.nav.style;
      const transformSupported = isTransformSupported(navStyle);
      if (tabBarPosition === 'left' || tabBarPosition === 'right') {
        if (transformSupported) {
          navOffset = {
            value: `translate3d(0,${target}px,0)`,
          };
        } else {
          navOffset = {
            name: 'top',
            value: `${target}px`,
          };
        }
      } else {
        if (transformSupported) {
          navOffset = {
            value: `translate3d(${target}px,0,0)`,
          };
        } else {
          navOffset = {
            name: 'left',
            value: `${target}px`,
          };
        }
      }
      if (transformSupported) {
        setTransform(navStyle, navOffset.value);
      } else {
        navStyle[navOffset.name] = navOffset.value;
      }
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

  prev(e) {
    this.props.onPrevClick(e);
    const navWrapNode = this.refs.navWrap;
    const navWrapNodeWH = this.getOffsetWH(navWrapNode);
    const { offset } = this;
    this.setOffset(offset + navWrapNodeWH);
  },

  next(e) {
    this.props.onNextClick(e);
    const navWrapNode = this.refs.navWrap;
    const navWrapNodeWH = this.getOffsetWH(navWrapNode);
    const { offset } = this;
    this.setOffset(offset - navWrapNodeWH);
  },

  getScrollBarNode(content) {
    const { next, prev } = this.state;
    const { prefixCls, scrollAnimated } = this.props;
    let nextButton;
    let prevButton;
    const showNextPrev = prev || next;

    if (showNextPrev) {
      prevButton = (
        <span
          onClick={prev ? this.prev : null}
          unselectable="unselectable"
          className={classnames({
            [`${prefixCls}-tab-prev`]: 1,
            [`${prefixCls}-tab-btn-disabled`]: !prev,
          })}
        >
          <span className={`${prefixCls}-tab-prev-icon`} />
        </span>
      );

      nextButton = (
        <span
          onClick={next ? this.next : null}
          unselectable="unselectable"
          className={classnames({
            [`${prefixCls}-tab-next`]: 1,
            [`${prefixCls}-tab-btn-disabled`]: !next,
          })}
        >
          <span className={`${prefixCls}-tab-next-icon`} />
        </span>
      );
    }

    const navClassName = `${prefixCls}-nav`;
    const navClasses = classnames({
      [navClassName]: true,
      [
        scrollAnimated ?
          `${navClassName}-animated` :
          `${navClassName}-no-animated`
        ]: true,
    });

    return (
      <div
        className={classnames({
          [`${prefixCls}-nav-container`]: 1,
          [`${prefixCls}-nav-container-scrolling`]: showNextPrev,
        })}
        key="container"
        ref="container"
      >
        {prevButton}
        {nextButton}
        <div className={`${prefixCls}-nav-wrap`} ref="navWrap">
          <div className={`${prefixCls}-nav-scroll`}>
            <div className={navClasses} ref="nav">
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  },
};
