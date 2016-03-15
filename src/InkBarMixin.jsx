import { offset } from './utils';

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
    if (tabPosition === 'top' || tabPosition === 'bottom') {
      const left = tabOffset.left - containerOffset.left;
      inkBarNode.style.left = `${left}px`;
      inkBarNode.style.top = '';
      inkBarNode.style.bottom = '';
      inkBarNode.style.right = `${containerNode.offsetWidth - left - tabNode.offsetWidth}px`;
    } else {
      const top = tabOffset.top - containerOffset.top;
      inkBarNode.style.left = '';
      inkBarNode.style.right = '';
      inkBarNode.style.top = `${top}px`;
      inkBarNode.style.bottom = `${containerNode.offsetHeight - top - tabNode.offsetHeight}px`;
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
