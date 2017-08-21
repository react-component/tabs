/* eslint react/no-multi-comp:0, no-console:0, react/prop-types:0 */
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import Tabs, { TabPane } from 'rc-tabs';
import 'rc-tabs/assets/index.less';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

const Tab1 = () => <div>tab1</div>;
const Tab2 = () => <div>tab2</div>;

class App extends React.Component {
  componentWillMount() {
    this.data = [{
      key: 'tab1',
      component: <Tab1 />,
    }, {
      key: 'tab2',
      component: <Tab2 />,
    }];
  }
  onChange = (key) => {
    // for demo, better use router api
    window.location.hash = key;
  }
  render() {
    let activeKey = 'tab1';
    const { children } = this.props;
    if (children) {
      this.data.forEach((d) => {
        if (d.component.type === children.type) {
          // for demo, better immutable
          d.component = children;
          activeKey = d.key;
        }
      });
    }
    const tabs = this.data.map(d => <TabPane key={d.key} tab={d.key}>{d.component}</TabPane>);
    return (
      <Tabs
        activeKey={activeKey}
        onChange={this.onChange}
        renderTabBar={() => <ScrollableInkTabBar/>}
        renderTabContent={() => <TabContent/>}
      >
        {tabs}
      </Tabs>
    );
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Tab1}/>
      <Route path="tab1" component={Tab1}/>
      <Route path="tab2" component={Tab2}/>
    </Route>
  </Router>
, document.getElementById('__react-content'));
