let transformPropertyName;

export default function getTransformPropertyName() {
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
