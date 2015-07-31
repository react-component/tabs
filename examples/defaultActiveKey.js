'use strict';

import 'rc-tabs/assets/bootstrap.less';
import React from 'react';
import Tabs, {TabPane} from 'rc-tabs';

class PanelContent extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.id, 'constructor');
  }

  componentWillReceiveProps() {
    console.log(this.props.id, 'componentWillReceiveProps');
  }

  render() {
    var count = [1, 1, 1, 1];// new Array(4) skip forEach ....
    var els = count.map((c, i)=> {
      return <p key={i}>{this.props.id}</p>
    });
    return <div>{els}</div>;
  }
}


var Component = React.createClass({
  getInitialState() {
    return {
      start: 0
    }
  },

  onChange(key) {
    console.log(`onChange ${key}`);
  },

  onTabClick(key) {
    console.log(`onTabClick ${key}`);
  },

  tick() {
    this.setState({
      start: this.state.start + 10
    })
  },

  render() {
    var start = this.state.start;
    return <div>
      <h1>Simple Tabs</h1>
      <Tabs defaultActiveKey='2'
        onTabClick={this.onTabClick}
        onChange={this.onChange}>
        <TabPane tab={`tab ${start}`} key="1">
          <PanelContent id={start}/>
        </TabPane>
        <TabPane tab={`tab ${start + 1}`} key="2">
          <PanelContent id={start + 1}/>
        </TabPane>
        <TabPane tab={`tab ${start + 2}`} key="3" disabled={true}>
          <PanelContent id={start + 2}/>
        </TabPane>
        <TabPane tab={`tab ${start + 3}`} key="4">
          <PanelContent id={start + 3}/>
        </TabPane>
      </Tabs>
      <button onClick={this.tick}>rerender</button>
    </div>
  }
});

React.render(<Component />, document.getElementById('__react-content'));
