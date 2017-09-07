import createReactClass from 'create-react-class';
import InkTabBarMixin from './InkTabBarMixin';
import ScrollableTabBarMixin from './ScrollableTabBarMixin';
import TabBarMixin from './TabBarMixin';
import RefMixin from './RefMixin';

const ScrollableInkTabBar = createReactClass({
  displayName: 'ScrollableInkTabBar',
  mixins: [RefMixin, TabBarMixin, InkTabBarMixin, ScrollableTabBarMixin],
  render() {
    const inkBarNode = this.getInkBarNode();
    const tabs = this.getTabs();
    const scrollbarNode = this.getScrollBarNode([inkBarNode, tabs]);
    return this.getRootNode(scrollbarNode);
  },
});

export default ScrollableInkTabBar;
