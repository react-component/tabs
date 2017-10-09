import createReactClass from 'create-react-class';
import InkTabBarMixin from './InkTabBarMixin';
import TabBarMixin from './TabBarMixin';
import RefMixin from './RefMixin';

const InkTabBar = createReactClass({
  displayName: 'InkTabBar',
  mixins: [RefMixin, TabBarMixin, InkTabBarMixin],
  render() {
    const inkBarNode = this.getInkBarNode();
    const tabs = this.getTabs();
    return this.getRootNode([inkBarNode, tabs]);
  },
});

export default InkTabBar;
