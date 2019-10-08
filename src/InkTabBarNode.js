import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { setTransform, isTransform3dSupported, getLeft, getStyle, getTop, getActiveIndex } from './utils';

function componentDidUpdate(component, init) {
  const { styles, panels, activeKey, direction } = component.props;
  const rootNode = component.props.getRef('root');
  const wrapNode = component.props.getRef('nav') || rootNode;
  const inkBarNode = component.props.getRef('inkBar');
  const activeTab = component.props.getRef('activeTab');
  const inkBarNodeStyle = inkBarNode.style;
  const tabBarPosition = component.props.tabBarPosition;
  const activeIndex = getActiveIndex(panels, activeKey);
  if (init) {
    // prevent mount animation
    inkBarNodeStyle.display = 'none';
  }
  if (activeTab) {
    const tabNode = activeTab;
    const transformSupported = isTransform3dSupported(inkBarNodeStyle);

    // Reset current style
    setTransform(inkBarNodeStyle, '');
    inkBarNodeStyle.width = '';
    inkBarNodeStyle.height = '';
    inkBarNodeStyle.left = '';
    inkBarNodeStyle.top = '';
    inkBarNodeStyle.bottom = '';
    inkBarNodeStyle.right = '';

    if (tabBarPosition === 'top' || tabBarPosition === 'bottom') {
      let left = getLeft(tabNode, wrapNode);
      let width = tabNode.offsetWidth;

      // If tabNode'width width equal to wrapNode'width when tabBarPosition is top or bottom
      // It means no css working, then ink bar should not have width until css is loaded
      // Fix https://github.com/ant-design/ant-design/issues/7564
      if (width === rootNode.offsetWidth) {
        width = 0;
      } else if (styles.inkBar && styles.inkBar.width !== undefined) {
        width = parseFloat(styles.inkBar.width, 10);
        if (width) {
          left += (tabNode.offsetWidth - width) / 2;
        }
      }
      if (direction === 'rtl') {
        left = getStyle(tabNode, 'margin-left') - left;
      }
      // use 3d gpu to optimize render
      if (transformSupported) {
        setTransform(inkBarNodeStyle, `translate3d(${left}px,0,0)`);
      } else {
        inkBarNodeStyle.left = `${left}px`;
      }
      inkBarNodeStyle.width = `${width}px`;
    } else {
      let top = getTop(tabNode, wrapNode, true);
      let height = tabNode.offsetHeight;
      if (styles.inkBar && styles.inkBar.height !== undefined) {
        height = parseFloat(styles.inkBar.height, 10);
        if (height) {
          top += (tabNode.offsetHeight - height) / 2;
        }
      }
      if (transformSupported) {
        setTransform(inkBarNodeStyle, `translate3d(0,${top}px,0)`);
        inkBarNodeStyle.top = '0';
      } else {
        inkBarNodeStyle.top = `${top}px`;
      }
      inkBarNodeStyle.height = `${height}px`;
    }
  }
  inkBarNodeStyle.display = activeIndex !== -1 ? 'block' : 'none';
}

export default class InkTabBarNode extends React.Component {
  componentDidMount() {
    // ref https://github.com/ant-design/ant-design/issues/8678
    // ref https://github.com/react-component/tabs/issues/135
    // InkTabBarNode need parent/root ref for calculating position
    // since parent componentDidMount triggered after child componentDidMount
    // we're doing a quick fix here to use setTimeout to calculate position
    // after parent/root component mounted
    this.timeout = setTimeout(() => {
      componentDidUpdate(this, true);
    }, 0);
  }

  componentDidUpdate() {
    componentDidUpdate(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { prefixCls, styles, inkBarAnimated } = this.props;
    const className = `${prefixCls}-ink-bar`;
    const classes = classnames({
      [className]: true,
      [
        inkBarAnimated ?
          `${className}-animated` :
          `${className}-no-animated`
      ]: true,
    });
    return (
      <div
        style={styles.inkBar}
        className={classes}
        key="inkBar"
        ref={this.props.saveRef('inkBar')}
      />
    );
  }
}

InkTabBarNode.propTypes = {
  prefixCls: PropTypes.string,
  styles: PropTypes.object,
  inkBarAnimated: PropTypes.bool,
  saveRef: PropTypes.func,
  direction: PropTypes.string,
};

InkTabBarNode.defaultProps = {
  prefixCls: '',
  inkBarAnimated: true,
  styles: {},
  saveRef: () => { },
};
