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

export function offset(elem) {
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

let transformPropertyName;

export function getTransformPropertyName() {
  if (!window.getComputedStyle) {
    return false;
  }
  if (transformPropertyName !== undefined) {
    return transformPropertyName;
  }
  const el = document.createElement('p');
  let has3d;
  const transforms = {
    webkitTransform: '-webkit-transform',
    OTransform: '-o-transform',
    msTransform: '-ms-transform',
    MozTransform: '-moz-transform',
    transform: 'transform',
  };
  // Add it to the body to get the computed style.
  document.body.insertBefore(el, null);
  for (const t in transforms) {
    if (el.style[t] !== undefined) {
      el.style[t] = 'translate3d(1px,1px,1px)';
      has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
      if (has3d !== undefined && has3d.length > 0 && has3d !== 'none') {
        transformPropertyName = t;
      }
    }
  }
  document.body.removeChild(el);
  return transformPropertyName;
}
