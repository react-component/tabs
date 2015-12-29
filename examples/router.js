/* eslint react/no-multi-comp:0 */

import {Router, Route, IndexRoute} from 'react-router';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Tabs, {TabPane} from 'rc-tabs';
import 'rc-tabs/assets/index.less';

const Tab1 = React.createClass({
  render() {
    return (<div>
      tab1
    </div>);
  },
});

const Tab2 = React.createClass({
  render() {
    return (<div>
      tab2
    </div>);
  },
});

const App = React.createClass({
  propTypes: {
    children: PropTypes.any,
  },

  componentWillMount() {
    this.data = [{
      key: 'tab1',
      component: <Tab1 />,
    }, {
      key: 'tab2',
      component: <Tab2 />,
    }];
  },
  onChange(key) {
    // for demo, better use router api
    window.location.hash = key;
  },

  render() {
    let activeKey = 'tab1';
    const {children} = this.props;
    if (children) {
      this.data.forEach((d)=> {
        if (d.component.type === children.type) {
          // for demo, better immutable
          d.component = children;
          activeKey = d.key;
        }
      });
    }
    const tabs = this.data.map((d) => {
      return <TabPane key={d.key} tab={d.key}>{d.component}</TabPane>;
    });
    return (<div>
      <Tabs activeKey={activeKey} onChange={this.onChange}>
        {tabs}
      </Tabs>
    </div>);
  },
});

ReactDOM.render(<Router>
  <Route path="/" component={App}>
    <IndexRoute component={Tab1}/>
    <Route path="tab1" component={Tab1}/>
    <Route path="tab2" component={Tab2}/>
  </Route>
</Router>, document.getElementById('__react-content'));
