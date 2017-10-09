import createReactClass from 'create-react-class';
import TabBarMixin from './TabBarMixin';
import RefMixin from './RefMixin';

const TabBar = createReactClass({
  displayName: 'TabBar',
  mixins: [RefMixin, TabBarMixin],
  render() {
    const tabs = this.getTabs();
    return this.getRootNode(tabs);
  },
});

export default TabBar;
