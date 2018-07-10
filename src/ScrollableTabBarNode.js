import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { setTransform, isTransformSupported } from './utils';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import debounce from 'lodash/debounce';

export default class ScrollableTabBarNode extends React.Component {
  constructor(props) {
    super(props);
    this.offset = 0;

    this.state = {
      next: false,
      prev: false,
    };
  }

  componentDidMount() {
    this.componentDidUpdate();
    this.debouncedResize = debounce(() => {
      this.setNextPrev();
      this.scrollToActiveTab();
    }, 200);
    this.resizeEvent = addEventListener(window, 'resize', this.debouncedResize);
  }

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
    } else if (!prevProps || props.activeKey !== prevProps.activeKey) {
      // can not use props.activeKey
      this.scrollToActiveTab();
    }
  }

  componentWillUnmount() {
    if (this.resizeEvent) {
      this.resizeEvent.remove();
    }
    if (this.debouncedResize && this.debouncedResize.cancel) {
      this.debouncedResize.cancel();
    }
  }

  setNextPrev() {
    const navNode = this.props.getRef('nav');
    const navNodeWH = this.getScrollWH(navNode);
    const containerWH = this.getOffsetWH(this.props.getRef('container'));
    const navWrapNodeWH = this.getOffsetWH(this.props.getRef('navWrap'));
    let { offset } = this;
    const minOffset = containerWH - navNodeWH;
    let { next, prev } = this.state;
    if (minOffset >= 0) {
      next = false;
      this.setOffset(0, false);
      offset = 0;
    } else if (minOffset < offset) {
      next = true;
    } else {
      next = false;
      // Fix https://github.com/ant-design/ant-design/issues/8861
      // Test with container offset which is stable
      // and set the offset of the nav wrap node
      const realOffset = navWrapNodeWH - navNodeWH;
      this.setOffset(realOffset, false);
      offset = realOffset;
    }

    if (offset < 0) {
      prev = true;
    } else {
      prev = false;
    }

    this.setNext(next);
    this.setPrev(prev);
    return {
      next,
      prev,
    };
  }

  getOffsetWH(node) {
    const tabBarPosition = this.props.tabBarPosition;
    let prop = 'offsetWidth';
    if (tabBarPosition === 'left' || tabBarPosition === 'right') {
      prop = 'offsetHeight';
    }
    return node[prop];
  }

  getScrollWH(node) {
    const tabBarPosition = this.props.tabBarPosition;
    let prop = 'scrollWidth';
    if (tabBarPosition === 'left' || tabBarPosition === 'right') {
      prop = 'scrollHeight';
    }
    return node[prop];
  }


  getOffsetLT(node) {
    const tabBarPosition = this.props.tabBarPosition;
    let prop = 'left';
    if (tabBarPosition === 'left' || tabBarPosition === 'right') {
      prop = 'top';
    }
    return node.getBoundingClientRect()[prop];
  }

  setOffset(offset, checkNextPrev = true) {
    const target = Math.min(0, offset);
    if (this.offset !== target) {
      this.offset = target;
      let navOffset = {};
      const tabBarPosition = this.props.tabBarPosition;
      const navStyle = this.props.getRef('nav').style;
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
  }

  setPrev(v) {
    if (this.state.prev !== v) {
      this.setState({
        prev: v,
      });
    }
  }

  setNext(v) {
    if (this.state.next !== v) {
      this.setState({
        next: v,
      });
    }
  }

  isNextPrevShown(state) {
    if (state) {
      return state.next || state.prev;
    }
    return this.state.next || this.state.prev;
  }

  prevTransitionEnd = (e) => {
    if (e.propertyName !== 'opacity') {
      return;
    }
    const container = this.props.getRef('container');
    this.scrollToActiveTab({
      target: container,
      currentTarget: container,
    });
  }

  scrollToActiveTab = (e) => {
    const activeTab = this.props.getRef('activeTab');
    const navWrap = this.props.getRef('navWrap');
    if (e && e.target !== e.currentTarget || !activeTab) {
      return;
    }

    // when not scrollable or enter scrollable first time, don't emit scrolling
    const needToSroll = this.isNextPrevShown() && this.lastNextPrevShown;
    this.lastNextPrevShown = this.isNextPrevShown();
    if (!needToSroll) {
      return;
    }

    const activeTabWH = this.getScrollWH(activeTab);
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

  prev = (e) => {
    this.props.onPrevClick(e);
    const navWrapNode = this.props.getRef('navWrap');
    const navWrapNodeWH = this.getOffsetWH(navWrapNode);
    const { offset } = this;
    this.setOffset(offset + navWrapNodeWH);
  }

  next = (e) => {
    this.props.onNextClick(e);
    const navWrapNode = this.props.getRef('navWrap');
    const navWrapNodeWH = this.getOffsetWH(navWrapNode);
    const { offset } = this;
    this.setOffset(offset - navWrapNodeWH);
  }

  render() {
    const { next, prev } = this.state;
    const { prefixCls, scrollAnimated, navWrapper } = this.props;
    const showNextPrev = prev || next;

    const prevButton = (
      <span
        onClick={prev ? this.prev : null}
        unselectable="unselectable"
        className={classnames({
          [`${prefixCls}-tab-prev`]: 1,
          [`${prefixCls}-tab-btn-disabled`]: !prev,
          [`${prefixCls}-tab-arrow-show`]: showNextPrev,
        })}
        onTransitionEnd={this.prevTransitionEnd}
      >
        <span className={`${prefixCls}-tab-prev-icon`} />
      </span>
    );

    const nextButton = (
      <span
        onClick={next ? this.next : null}
        unselectable="unselectable"
        className={classnames({
          [`${prefixCls}-tab-next`]: 1,
          [`${prefixCls}-tab-btn-disabled`]: !next,
          [`${prefixCls}-tab-arrow-show`]: showNextPrev,
        })}
      >
        <span className={`${prefixCls}-tab-next-icon`} />
      </span>
    );

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
        ref={this.props.saveRef('container')}
      >
        {prevButton}
        {nextButton}
        <div className={`${prefixCls}-nav-wrap`} ref={this.props.saveRef('navWrap')}>
          <div className={`${prefixCls}-nav-scroll`}>
            <div className={navClasses} ref={this.props.saveRef('nav')}>
              {navWrapper(this.props.children)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ScrollableTabBarNode.propTypes = {
  getRef: PropTypes.func.isRequired,
  saveRef: PropTypes.func.isRequired,
  tabBarPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  prefixCls: PropTypes.string,
  scrollAnimated: PropTypes.bool,
  onPrevClick: PropTypes.func,
  onNextClick: PropTypes.func,
  navWrapper: PropTypes.func,
  children: PropTypes.node,
};

ScrollableTabBarNode.defaultProps = {
  tabBarPosition: 'left',
  prefixCls: '',
  scrollAnimated: true,
  onPrevClick: () => {},
  onNextClick: () => {},
  navWrapper: (ele) => ele,
};
