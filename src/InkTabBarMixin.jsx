import { getTransformPropertyName } from './utils';
import React from 'react';

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
  const tabBarPosition = component.props.tabBarPosition;
  if (init) {
    // prevent mount animation
    inkBarNode.style.display = 'none';
  }
  if (activeTab) {
    const tabNode = activeTab;
    const tabOffset = offset(tabNode);
    const transformPropertyName = getTransformPropertyName();
    if (tabBarPosition === 'top' || tabBarPosition === 'bottom') {
      const left = tabOffset.left - containerOffset.left;
      // use 3d gpu to optimize render
      if (transformPropertyName) {
        inkBarNode.style[transformPropertyName] = `translate3d(${left}px,0,0)`;
        inkBarNode.style.width = `${tabNode.offsetWidth}px`;
        inkBarNode.style.height = '';
      } else {
        inkBarNode.style.left = `${left}px`;
        inkBarNode.style.top = '';
        inkBarNode.style.bottom = '';
        inkBarNode.style.right = `${wrapNode.offsetWidth - left - tabNode.offsetWidth}px`;
      }
    } else {
      const top = tabOffset.top - containerOffset.top;
      if (transformPropertyName) {
        inkBarNode.style[transformPropertyName] = `translate3d(0,${top}px,0)`;
        inkBarNode.style.height = `${tabNode.offsetHeight}px`;
        inkBarNode.style.width = '';
      } else {
        inkBarNode.style.left = '';
        inkBarNode.style.right = '';
        inkBarNode.style.top = `${top}px`;
        inkBarNode.style.bottom = `${wrapNode.offsetHeight - top - tabNode.offsetHeight}px`;
      }
    }
  }
  inkBarNode.style.display = activeTab ? 'block' : 'none';
}

export default {
  componentDidUpdate() {
    componentDidUpdate(this);
  },

  componentDidMount() {
    componentDidUpdate(this, true);
  },

  getInkBarNode() {
    const { prefixCls, styles } = this.props;
    return (
      <div
        style={styles.inkBar}
        className={`${prefixCls}-ink-bar`}
        key="inkBar"
        ref="inkBar"
      />
    );
  },
};
