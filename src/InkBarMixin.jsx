import { offset, getTransformPropertyName } from './utils';

function componentDidUpdate(component) {
  const refs = component.refs;
  const containerNode = refs.nav;
  const containerOffset = offset(containerNode);
  const inkBarNode = refs.inkBar;
  const activeTab = refs.activeTab;
  const tabPosition = component.props.tabPosition;
  if (activeTab) {
    const tabNode = activeTab;
    const tabOffset = offset(tabNode);
    const transformPropertyName = getTransformPropertyName();
    if (tabPosition === 'top' || tabPosition === 'bottom') {
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
        inkBarNode.style.right = `${containerNode.offsetWidth - left - tabNode.offsetWidth}px`;
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
        inkBarNode.style.bottom = `${containerNode.offsetHeight - top - tabNode.offsetHeight}px`;
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
    componentDidUpdate(this);
  },
};
