import React from 'react';

export function toArray(children) {
  if (Array.isArray(children)) {
    return children;
  }
  const c = [];
  React.Children.forEach(children, child => c.push(child));
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

const names = {};

export function getPropertyName(name) {
  if (!window.getComputedStyle) {
    return false;
  }
  if (names[name] !== undefined) {
    return names[name];
  }
  const Name = name.charAt(0).toUpperCase() + name.substring(1);
  const el = document.createElement('p');
  const transforms = {
    [`webkit${Name}`]: `-webkit-${name}`,
    [`ms${Name}`]: `-ms-${name}`,
    [`Moz${Name}`]: `-moz-${name}`,
    [`${name}`]: `-webkit-${name}`,
  };
  let transformPropertyName = '';
  // Add it to the body to get the computed style.
  document.body.insertBefore(el, null);
  for (const t in transforms) {
    if (el.style[t] !== undefined) {
      transformPropertyName = t;
    }
  }
  document.body.removeChild(el);
  return transformPropertyName;
}

export function getTransformPropertyName() {
  return getPropertyName('transform');
}

export function getTransitionPropertyName() {
  return getPropertyName('transition');
}

export function isVertical(tabBarPosition) {
  return tabBarPosition === 'left' || tabBarPosition === 'right';
}

export function getTranslateByIndex(index, tabBarPosition,
                                    transformName = getTransformPropertyName()) {
  const translate = isVertical(tabBarPosition) ? 'translateY' : 'translateX';
  return {
    [transformName]: `${translate}(${-index * 100}%) translateZ(0)`,
  };
}
export function assign(o1, o2) {
  for (const i in o2) {
    if (o2.hasOwnProperty(i)) {
      o1[i] = o2[i];
    }
  }
}
