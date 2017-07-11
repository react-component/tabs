import createReactClass from 'create-react-class';
import ScrollableTabBarMixin from './ScrollableTabBarMixin';
import TabBarMixin from './TabBarMixin';

const ScrollableTabBar = createReactClass({
  displayName: 'ScrollableTabBar',
  mixins: [TabBarMixin, ScrollableTabBarMixin],
  activeTab: '',
  render() {
    const inkBarNode = this.getInkBarNode();
    const tabs = this.getTabs();
    const scrollbarNode = this.getScrollBarNode([inkBarNode, tabs]);
    return this.getRootNode(scrollbarNode);
  },
});

export default ScrollableTabBar;
