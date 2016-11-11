import React from 'react';

export function toArray(children) {
  if (Array.isArray(children)) {
    return children.filter(c => !!c);
  }
  const c = [];
  React.Children.forEach(children, child => {
    if (child) {
      c.push(child);
    }
  });
  return c;
}

export function getActiveIndex(children, activeKey) {
  let activeIndex = -1;
  React.Children.forEach(children, (child, index) => {
    if (child.key === activeKey) {
      activeIndex = index;
    }
  });

  return activeIndex;
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
