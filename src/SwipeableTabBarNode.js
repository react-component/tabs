import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Hammer from 'rc-hammerjs';
import ReactDOM from 'react-dom';
import {
  isVertical,
  getStyle,
  setPxStyle,
} from './utils';

export default class SwipeableTabBarNode extends React.Component {
  constructor(props) {
    super(props);

    const { hasPrevPage, hasNextPage } = this.checkPaginationByKey(this.props.activeKey);
    this.state = {
      hasPrevPage,
      hasNextPage,
    };
  }

  componentDidMount() {
    const swipe = this.props.getRef('swipe');
    const nav = this.props.getRef('nav');
    const { activeKey } = this.props;
    this.swipeNode = ReactDOM.findDOMNode(swipe); // dom which scroll (9999px)
    this.realNode = ReactDOM.findDOMNode(nav); // dom which visiable in screen (viewport)
    this.setCache();
    this.setSwipePositionByKey(activeKey);
  }

  componentDidUpdate(prevProps) {
    this.setCache();
    if (this.props.activeKey && this.props.activeKey !== prevProps.activeKey) {
      this.setSwipePositionByKey(this.props.activeKey);
    }
  }

  onPan = (e) => {
    const { vertical, totalAvaliableDelta, totalDelta } = this.cache;
    const { speed } = this.props;
    // calculate touch distance
    let nowDelta = vertical ? e.deltaY : e.deltaX;
    nowDelta = nowDelta * (speed / 10);

    // calculate distance dom need transform
    let _nextDelta = nowDelta + totalDelta;
    if (_nextDelta >= 0) {
      _nextDelta = 0;
    } else if (_nextDelta <= -totalAvaliableDelta) {
      _nextDelta = -totalAvaliableDelta;
    }

    this.cache.totalDelta = _nextDelta;
    this.setSwipePosition();

    // calculate pagination display
    const { hasPrevPage, hasNextPage } = this.checkPaginationByDelta(this.cache.totalDelta);
    if (hasPrevPage !== this.state.hasPrevPage || hasNextPage !== this.state.hasNextPage) {
      this.setState({
        hasPrevPage,
        hasNextPage,
      });
    }
  }

  setCache() {
    const { tabBarPosition, pageSize, panels } = this.props;
    const _isVertical = isVertical(tabBarPosition);
    const _viewSize = getStyle(this.realNode, _isVertical ? 'height' : 'width');
    const _tabWidth = _viewSize / pageSize;
    this.cache = {
      vertical: _isVertical,
      totalAvaliableDelta: _tabWidth * panels.length - _viewSize,
      tabWidth: _tabWidth,
    };
  }

  /**
   * used for props.activeKey setting, not for swipe callback
   */
  getDeltaByKey(activeKey) {
    const { pageSize } = this.props;
    const index = this.getIndexByKey(activeKey);
    const centerTabCount = Math.floor(pageSize / 2);
    const { tabWidth } = this.cache;
    const delta = (index - centerTabCount) * tabWidth * -1;
    return delta;
  }

  getIndexByKey(activeKey) {
    const { panels } = this.props;
    const length = panels.length;
    for (let i = 0; i < length; i++) {
      if (panels[i].key === activeKey) {
        return i;
      }
    }
    return -1;
  }

  setSwipePositionByKey(activeKey) {
    const { hasPrevPage, hasNextPage } = this.checkPaginationByKey(activeKey);
    const { totalAvaliableDelta } = this.cache;
    this.setState({
      hasPrevPage,
      hasNextPage,
    });
    let delta;
    if (!hasPrevPage) {
      // the first page
      delta = 0;
    } else if (!hasNextPage) {
      // the last page
      delta = -totalAvaliableDelta;
    } else if (hasNextPage) {
      // the middle page
      delta = this.getDeltaByKey(activeKey);
    }
    this.cache.totalDelta = delta;
    this.setSwipePosition();
  }

  setSwipePosition() {
    const { totalDelta, vertical } = this.cache;
    setPxStyle(this.swipeNode, totalDelta, vertical);
  }

  checkPaginationByKey(activeKey) {
    const { panels, pageSize } = this.props;
    const index = this.getIndexByKey(activeKey);
    const centerTabCount = Math.floor(pageSize / 2);
    // the basic rule is to make activeTab be shown in the center of TabBar viewport
    return {
      hasPrevPage: index - centerTabCount > 0,
      hasNextPage: index + centerTabCount < panels.length,
    };
  }

  checkPaginationByDelta(delta) {
    const { totalAvaliableDelta } = this.cache;
    return {
      hasPrevPage: delta < 0,
      hasNextPage: -delta < totalAvaliableDelta,
    };
  }

  render() {
    const { prefixCls, hammerOptions, tabBarPosition } = this.props;
    const { hasPrevPage, hasNextPage } = this.state;
    const navClassName = `${prefixCls}-nav`;
    const navClasses = classnames({
      [navClassName]: true,
    });
    const events = {
      onPan: this.onPan,
    };
    return (
      <div
        className={classnames({
          [`${prefixCls}-nav-container`]: 1,
          [`${prefixCls}-nav-swipe-container`]: 1,
          // page classname can be used to render special style when there has a prev/next page
          [`${prefixCls}-prevpage`]: hasPrevPage,
          [`${prefixCls}-nextpage`]: hasNextPage,
        })}
        key="container"
        ref={this.props.saveRef('container')}
      >
        <div className={`${prefixCls}-nav-wrap`} ref={this.props.saveRef('navWrap')}>
          <Hammer
            {...events}
            direction={isVertical(tabBarPosition) ? 'DIRECTION_ALL' : 'DIRECTION_HORIZONTAL'}
            options={hammerOptions}
          >
            <div className={`${prefixCls}-nav-swipe`} ref={this.props.saveRef('swipe')}>
              <div className={navClasses} ref={this.props.saveRef('nav')}>
                {this.props.children}
              </div>
            </div>
          </Hammer>
        </div>
      </div>
    );
  }
}

SwipeableTabBarNode.propTypes = {
  activeKey: PropTypes.string,
  panels: PropTypes.node,
  pageSize: PropTypes.number,
  tabBarPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  prefixCls: PropTypes.string,
  children: PropTypes.node,
  hammerOptions: PropTypes.object,
  speed: PropTypes.number,
  saveRef: PropTypes.func,
  getRef: PropTypes.func,
};

SwipeableTabBarNode.defaultProps = {
  panels: null,
  tabBarPosition: 'top',
  prefixCls: '',
  children: null,
  hammerOptions: {},
  pageSize: 5, // per page show how many tabs
  speed: 7, // swipe speed, 1 to 10, more bigger more faster
  saveRef: () => {},
  getRef: () => {},
};
