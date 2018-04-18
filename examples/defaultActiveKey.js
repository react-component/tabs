/* eslint react/no-multi-comp:0, no-console:0, react/prop-types:0 */
import 'rc-tabs/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { polyfill } from 'react-lifecycles-compat';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

class PanelContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(this.props.id, 'constructor');
  }

  static getDerivedStateFromProps(nextProps) {
    console.log(nextProps.id, 'getDerivedStateFromProps');
    return null;
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

polyfill(PanelContent);

const defaultTabKey = '2';

class Component extends React.Component {
  state = {
    start: 0,
    tabKey: defaultTabKey,
  };

  onChange(key) {
    console.log(`onChange ${key}`);
  }

  onTabClick = (key) => {
    console.log(`onTabClick ${key}`);
    this.setState({
      tabKey: key,
    });
  }

  tick = () => {
    this.setState({
      start: this.state.start + 10,
    });
  }

  render() {
    const start = this.state.start;
    return (
      <div>
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
          <TabPane tab={`tab ${start + 2}`} key="3">
            <PanelContent id={start + 2}/>
          </TabPane>
          <TabPane tab={`tab ${start + 3}`} key="4">
            <PanelContent id={start + 3}/>
          </TabPane>
          <TabPane tab={`tab ${start + 4}`} key="5">
            <PanelContent id={start + 4}/>
          </TabPane>
          <TabPane tab={`tab ${start + 5}`} key="6">
            <PanelContent id={start + 5}/>
          </TabPane>
          <TabPane tab={`tab ${start + 6}`} key="7">
            <PanelContent id={start + 6}/>
          </TabPane>
          <TabPane tab={`tab ${start + 8}`} key="8">
            <PanelContent id={start + 8}/>
          </TabPane>
          <TabPane tab={`tab ${start + 9}`} key="9">
            <PanelContent id={start + 9}/>
          </TabPane>
        </Tabs>
        <button onClick={this.tick}>rerender</button>
      </div>
    );
  }
}

ReactDOM.render(<Component />, document.getElementById('__react-content'));
