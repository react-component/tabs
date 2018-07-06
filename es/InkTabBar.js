import createReactClass from 'create-react-class';
import InkTabBarMixin from './InkTabBarMixin';
import TabBarMixin from './TabBarMixin';
import RefMixin from './RefMixin';

var InkTabBar = createReactClass({
  displayName: 'InkTabBar',
  mixins: [RefMixin, TabBarMixin, InkTabBarMixin],
  render: function render() {
    var inkBarNode = this.getInkBarNode();
    var tabs = this.getTabs();
    return this.getRootNode([inkBarNode, tabs]);
  }
});

export default InkTabBar;