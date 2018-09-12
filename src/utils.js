import React from 'react';

export function toArray(children) {
  // allow [c,[a,b]]
  const c = [];
  React.Children.forEach(children, child => {
    if (child) {
      c.push(child);
    }
  });
  return c;
}

export function getActiveIndex(children, activeKey) {
  const c = toArray(children);
  for (let i = 0; i < c.length; i++) {
    if (c[i].key === activeKey) {
      return i;
    }
  }
  return -1;
}

export function getActiveKey(children, index) {
  const c = toArray(children);
  return c[index].key;
}

export function setTransform(style, v) {
  style.transform = v;
  style.webkitTransform = v;
  style.mozTransform = v;
}

export function isTransformSupported(style) {
  return 'transform' in style ||
    'webkitTransform' in style ||
    'MozTransform' in style;
}

export function setTransition(style, v) {
  style.transition = v;
  style.webkitTransition = v;
  style.MozTransition = v;
}
export function getTransformPropValue(v) {
  return {
    transform: v,
    WebkitTransform: v,
    MozTransform: v,
  };
}

export function isVertical(tabBarPosition) {
  return tabBarPosition === 'left' || tabBarPosition === 'right';
}

export function getTransformByIndex(index, tabBarPosition) {
  const translate = isVertical(tabBarPosition) ? 'translateY' : 'translateX';
  return `${translate}(${-index * 100}%) translateZ(0)`;
}

export function getMarginStyle(index, tabBarPosition) {
  const marginDirection = isVertical(tabBarPosition) ? 'marginTop' : 'marginLeft';
  return {
    [marginDirection]: `${-index * 100}%`,
  };
}

export function getStyle(el, property) {
  return +getComputedStyle(el).getPropertyValue(property).replace('px', '');
}

export function setPxStyle(el, value, vertical) {
  value = vertical ? `0px, ${value}px, 0px` : `${value}px, 0px, 0px`;
  setTransform(el.style, `translate3d(${value})`);
}

export function getDataAttr(props) {
  return Object.keys(props).reduce((prev, key) => {
    if (key.substr(0, 5) === 'aria-' || key.substr(0, 5) === 'data-' || key === 'role') {
      prev[key] = props[key];
    }
    return prev;
  }, {});
}

function toNum(style, property) {
  return +style.getPropertyValue(property).replace('px', '');
}

function getTypeValue(start, current, end, tabNode, wrapperNode) {
  let total = getStyle(wrapperNode, `padding-${start}`);
  const { childNodes } = tabNode.parentNode;
  Array.prototype.some.call(childNodes, (node) => {
    if (node !== tabNode) {
      const style = getComputedStyle(node);
      total += toNum(style, `margin-${start}`);
      total += toNum(style, `margin-${end}`);
      total += toNum(style, current);

      if (style.boxSizing === 'content-box') {
        total += toNum(style, `border-${start}-width`) + toNum(style, `padding-${start}`) +
          toNum(style, `border-${end}-width`) + toNum(style, `padding-${end}`);
      }
      return false;
    }
    return true;
  });

  return total;
}

export function getLeft(tabNode, wrapperNode) {
  return getTypeValue('left', 'width', 'right', tabNode, wrapperNode);
}

export function getTop(tabNode, wrapperNode) {
  const top = getTypeValue('top', 'height', 'bottom', tabNode, wrapperNode);
  const height = getStyle(tabNode.parentNode, 'height');
  return top - height;
}
