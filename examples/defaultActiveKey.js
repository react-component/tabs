/* eslint react/no-multi-comp:0, no-console:0 */

import 'rc-tabs/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from '../src/TabContent';
import ScrollableInkTabBar from '../src/ScrollableInkTabBar';

class PanelContent extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.id, 'constructor');
  }

  componentWillReceiveProps() {
    console.log(this.props.id, 'componentWillReceiveProps');
  }

  render() {
    const count = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];// new Array(4) skip forEach ....
    const els = count.map((c, i) => {
      return (<p key={i}>
        <button>{this.props.id}</button>
      </p>);
    });
    return <div style={{ height: 200, overflow: 'auto' }}>{els}</div>;
  }
}
PanelContent.propTypes = {
  id: React.PropTypes.number,
};

const defaultTabKey = '2';

const Component = React.createClass({
  getInitialState() {
    return {
      start: 0,
      tabKey: defaultTabKey,
    };
  },

  onChange(key) {
    console.log(`onChange ${key}`);
  },

  onTabClick(key) {
    console.log(`onTabClick ${key}`);
    this.setState({
      tabKey: key,
    });
  },

  tick() {
    this.setState({
      start: this.state.start + 10,
    });
  },

  render() {
    const start = this.state.start;
    const disabled = true;
    return (<div>
      <h1>Simple Tabs</h1>
      <p>current: {this.state.tabKey}</p>
      <Tabs
        defaultActiveKey={defaultTabKey}
        renderTabBar={() => <ScrollableInkTabBar onTabClick={this.onTabClick}/>}
        renderTabContent={() => <TabContent/>}
        onChange={this.onChange}
      >
        <TabPane tab={`tab ${start}`} key="1">
          <PanelContent id={start}/>
        </TabPane>
        <TabPane tab={`tab ${start + 1}`} key="2">
          <PanelContent id={start + 1}/>
        </TabPane>
        <TabPane tab={`tab ${start + 2}`} key="3" disabled={disabled}>
          <PanelContent id={start + 2}/>
        </TabPane>
        <TabPane tab={`tab ${start + 3}`} key="4">
          <PanelContent id={start + 3}/>
        </TabPane>
      </Tabs>
      <button onClick={this.tick}>rerender</button>
    </div>);
  },
});

ReactDOM.render(<Component />, document.getElementById('__react-content'));
