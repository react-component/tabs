import createReactClass from 'create-react-class';
import TabBarMixin from './TabBarMixin';

const TabBar = createReactClass({
  displayName: 'TabBar',
  mixins: [TabBarMixin],
  activeTab: null,
  render() {
    const tabs = this.getTabs();
    return this.getRootNode(tabs);
  },
});

export default TabBar;
