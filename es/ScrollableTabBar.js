import createReactClass from 'create-react-class';
import ScrollableTabBarMixin from './ScrollableTabBarMixin';
import TabBarMixin from './TabBarMixin';
import RefMixin from './RefMixin';

var ScrollableTabBar = createReactClass({
  displayName: 'ScrollableTabBar',
  mixins: [RefMixin, TabBarMixin, ScrollableTabBarMixin],
  render: function render() {
    var inkBarNode = this.getInkBarNode();
    var tabs = this.getTabs();
    var scrollbarNode = this.getScrollBarNode([inkBarNode, tabs]);
    return this.getRootNode(scrollbarNode);
  }
});

export default ScrollableTabBar;