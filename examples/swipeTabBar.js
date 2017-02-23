/* eslint react/no-multi-comp:0, no-console:0 */

import 'rc-tabs/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from '../src/SwipeableTabContent';
import SwipeableTabBar from '../src/SwipeableTabBar';

class PanelContent extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.id, 'constructor');
  }

  componentWillReceiveProps() {
    console.log(this.props.id, 'componentWillReceiveProps');
  }

  render() {
    const count = [1, 1, 1, 1];// new Array(4) skip forEach ....
    const els = count.map((c, i) => {
      return <p key={i}>{this.props.id}</p>;
    });
    return <div>{els}</div>;
  }
}
PanelContent.propTypes = {
  id: React.PropTypes.number,
};

const Component = React.createClass({
  getInitialState() {
    return {
      activeKey: '',
      start: 0,
    };
  },

  onChange(activeKey) {
    console.log(`onChange ${activeKey}`);
    this.setState({
      activeKey,
    });
  },

  onTabClick(key) {
    console.log(`onTabClick ${key}`);
    if (key === this.state.activeKey) {
      this.setState({
        activeKey: '',
      });
    }
  },


  render() {
    const start = this.state.start;
    return (
      <div style={{ margin: '20 0', width: '100%' }}>
        <h1>Swipe Tabs, please visit this demo at mobile, or chrome simulator</h1>
        <Tabs
          renderTabBar={() => <SwipeableTabBar onTabClick={this.onTabClick}/>}
          renderTabContent={() => <TabContent animatedWithMargin />}
          activeKey={this.state.activeKey}
          onChange={this.onChange}
        >
          <TabPane tab={`tab ${start}`} key="0">
            <PanelContent id={start}/>
          </TabPane>
          <TabPane tab={`tab ${start + 1}`} key="1">
            <PanelContent id={start + 1}/>
          </TabPane>
          <TabPane tab={`tab ${start + 2}`} key="2">
            <PanelContent id={start + 2}/>
          </TabPane>
          <TabPane tab={`tab ${start + 3}`} key="3">
            <PanelContent id={start + 3}/>
          </TabPane>
          <TabPane tab={`tab ${start + 4}`} key="4">
            <PanelContent id={start + 4}/>
          </TabPane>
          <TabPane tab={`tab ${start + 5}`} key="5">
            <PanelContent id={start + 5}/>
          </TabPane>
          <TabPane tab={`tab ${start + 6}`} key="6">
            <PanelContent id={start + 6}/>
          </TabPane>
          <TabPane tab={`tab ${start + 7}`} key="7">
            <PanelContent id={start + 7}/>
          </TabPane>
        </Tabs>
      </div>
    );
  },
});

ReactDOM.render(<Component />, document.getElementById('__react-content'));
