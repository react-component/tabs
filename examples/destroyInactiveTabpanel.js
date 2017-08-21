/* eslint react/no-multi-comp:0, no-console:0, react/prop-types:0 */
import 'rc-tabs/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

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

class Demo extends React.Component {
  state = {
    start: 0,
  };

  onChange = (key) => {
    console.log(`onChange ${key}`);
  }

  onTabClick = (key) => {
    console.log(`onTabClick ${key}`);
  }

  tick = () => {
    this.setState({
      start: this.state.start + 10,
    });
  }

  render() {
    const start = this.state.start;
    const disabled = true;
    return (
      <div>
        <h1>Simple Tabs</h1>
        <Tabs
          defaultActiveKey="2"
          destroyInactiveTabPane
          renderTabBar={() => <ScrollableInkTabBar onTabClick={this.onTabClick}/>}
          renderTabContent={() => <TabContent/>}
          onChange={this.onChange}
        >
          <TabPane tab={`tab ${start}`} key="1" placeholder="loading 1">
            <PanelContent id={start}/>
          </TabPane>
          <TabPane tab={`tab ${start + 1}`} key="2" placeholder="loading 2">
            <PanelContent id={start + 1}/>
          </TabPane>
          <TabPane tab={`tab ${start + 2}`} key="3" disabled={disabled}>
            <PanelContent id={start + 2}/>
          </TabPane>
          <TabPane tab={`tab ${start + 3}`} key="4" placeholder="loading 4">
            <PanelContent id={start + 3}/>
          </TabPane>
        </Tabs>
        <button onClick={this.tick}>rerender</button>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
