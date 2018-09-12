import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { setTransform, isTransformSupported, getLeft, getTop } from './utils';

function componentDidUpdate(component, init) {
  const { styles } = component.props;
  const rootNode = component.props.getRef('root');
  const wrapNode = component.props.getRef('nav') || rootNode;
  const inkBarNode = component.props.getRef('inkBar');
  const activeTab = component.props.getRef('activeTab');
  const inkBarNodeStyle = inkBarNode.style;
  const tabBarPosition = component.props.tabBarPosition;
  if (init) {
    // prevent mount animation
    inkBarNodeStyle.display = 'none';
  }
  if (activeTab) {
    const tabNode = activeTab;
    const transformSupported = isTransformSupported(inkBarNodeStyle);
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
          left = left + (tabNode.offsetWidth - width) / 2;
        }
      }

      // use 3d gpu to optimize render
      if (transformSupported) {
        setTransform(inkBarNodeStyle, `translate3d(${left}px,0,0)`);
        inkBarNodeStyle.width = `${width}px`;
        inkBarNodeStyle.height = '';
      } else {
        inkBarNodeStyle.left = `${left}px`;
        inkBarNodeStyle.top = '';
        inkBarNodeStyle.bottom = '';
        inkBarNodeStyle.right = `${wrapNode.offsetWidth - left - width}px`;
      }
    } else {
      let top = getTop(tabNode, wrapNode);
      let height = tabNode.offsetHeight;
      if (styles.inkBar && styles.inkBar.height !== undefined) {
        height = parseFloat(styles.inkBar.height, 10);
        if (height) {
          top = top + (tabNode.offsetHeight - height) / 2;
        }
      }
      if (transformSupported) {
        setTransform(inkBarNodeStyle, `translate3d(0,${top}px,0)`);
        inkBarNodeStyle.height = `${height}px`;
        inkBarNodeStyle.width = '';
      } else {
        inkBarNodeStyle.left = '';
        inkBarNodeStyle.right = '';
        inkBarNodeStyle.top = `${top}px`;
        inkBarNodeStyle.bottom = `${wrapNode.offsetHeight - top - height}px`;
      }
    }
  }
  inkBarNodeStyle.display = activeTab ? 'block' : 'none';
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
};

InkTabBarNode.defaultProps = {
  prefixCls: '',
  inkBarAnimated: true,
  styles: {},
  saveRef: () => {},
};
