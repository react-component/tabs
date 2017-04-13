import { setTransform, isTransformSupported } from './utils';
import React from 'react';
import classnames from 'classnames';

export function getScroll(w, top) {
  let ret = w[`page${top ? 'Y' : 'X'}Offset`];
  const method = `scroll${top ? 'Top' : 'Left'}`;
  if (typeof ret !== 'number') {
    const d = w.document;
    // ie6,7,8 standard mode
    ret = d.documentElement[method];
    if (typeof ret !== 'number') {
      // quirks mode
      ret = d.body[method];
    }
  }
  return ret;
}

function offset(elem) {
  let box;
  let x;
  let y;
  const doc = elem.ownerDocument;
  const body = doc.body;
  const docElem = doc && doc.documentElement;
  box = elem.getBoundingClientRect();
  x = box.left;
  y = box.top;
  x -= docElem.clientLeft || body.clientLeft || 0;
  y -= docElem.clientTop || body.clientTop || 0;
  const w = doc.defaultView || doc.parentWindow;
  x += getScroll(w);
  y += getScroll(w, true);
  return {
    left: x, top: y,
  };
}

function componentDidUpdate(component, init) {
  const refs = component.refs;
  const wrapNode = refs.nav || refs.root;
  const containerOffset = offset(wrapNode);
  const inkBarNode = refs.inkBar;
  const activeTab = refs.activeTab;
  const inkBarNodeStyle = inkBarNode.style;
  const tabBarPosition = component.props.tabBarPosition;
  if (init) {
    // prevent mount animation
    inkBarNodeStyle.display = 'none';
  }
  if (activeTab) {
    const tabNode = activeTab;
    const tabOffset = offset(tabNode);
    const transformSupported = isTransformSupported(inkBarNodeStyle);
    if (tabBarPosition === 'top' || tabBarPosition === 'bottom') {
      const left = tabOffset.left - containerOffset.left;
      // use 3d gpu to optimize render
      if (transformSupported) {
        setTransform(inkBarNodeStyle, `translate3d(${left}px,0,0)`);
        inkBarNodeStyle.width = `${tabNode.offsetWidth}px`;
        inkBarNodeStyle.height = '';
      } else {
        inkBarNodeStyle.left = `${left}px`;
        inkBarNodeStyle.top = '';
        inkBarNodeStyle.bottom = '';
        inkBarNodeStyle.right = `${wrapNode.offsetWidth - left - tabNode.offsetWidth}px`;
      }
    } else {
      const top = tabOffset.top - containerOffset.top;
      if (transformSupported) {
        setTransform(inkBarNodeStyle, `translate3d(0,${top}px,0)`);
        inkBarNodeStyle.height = `${tabNode.offsetHeight}px`;
        inkBarNodeStyle.width = '';
      } else {
        inkBarNodeStyle.left = '';
        inkBarNodeStyle.right = '';
        inkBarNodeStyle.top = `${top}px`;
        inkBarNodeStyle.bottom = `${wrapNode.offsetHeight - top - tabNode.offsetHeight}px`;
      }
    }
  }
  inkBarNodeStyle.display = activeTab ? 'block' : 'none';
}

export default {

  getDefaultProps() {
    return {
      inkBarAnimated: true,
    };
  },

  componentDidUpdate() {
    componentDidUpdate(this);
  },

  componentDidMount() {
    componentDidUpdate(this, true);
  },

  getInkBarNode() {
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
        ref="inkBar"
      />
    );
  },
};
