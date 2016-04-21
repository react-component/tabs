/* eslint react/no-multi-comp:0, no-console:0 */

import 'rc-tabs/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Tabs, { TabPane } from 'rc-tabs';

class PanelContent extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.id, 'constructor');
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.id, 'componentWillReceiveProps');
  }

  render() {
    const length = Math.round(10 * (Math.random()) + 4);
    const count = new Array(length);// new Array(4) skip forEach ....
    for (let i = 0; i < length; i++) {
      count[i] = 1;
    }
    const content = new Array(Math.round(100 * (Math.random())) + 4).join(` ${this.props.id}`);
    const els = count.map((c, i) => {
      return <p key={i}>{content}</p>;
    });
    return <div>{els}</div>;
  }
}
PanelContent.propTypes = {
  id: React.PropTypes.number,
};

function construct(start, num) {
  const ends = [];
  let index = 1;
  for (let i = start; i < start + num; i++) {
    ends.push(<TabPane
      tab={`tab ${i}`}
      disabled={!!(i % 2)}
      key={index}
    >
      <PanelContent id={i}/>
    </TabPane>);
    index++;
  }
  return ends;
}


const Component = React.createClass({
  getInitialState() {
    return {
      tabPosition: 'top',
      start: 0,
    };
  },

  onChange(key) {
    console.log(`onChange ${key}`);
  },

  onTabClick(key) {
    console.log(`onTabClick ${key}`);
  },

  tick() {
    this.setState({
      start: this.state.start + 10,
    });
  },

  changeTabPosition(e) {
    this.setState({
      tabPosition: e.target.value,
    });
  },

  render() {
    const start = this.state.start;
    const ends = construct(start, 9);
    const ends2 = construct(start, 3);
    const tabPosition = this.state.tabPosition;
    let navStyle = {};
    let animation = 'slide-horizontal';

    let tabStyle = {
      width: 500,
    };

    if (tabPosition === 'left' || tabPosition === 'right') {
      navStyle = {
        height: 400,
        overflow: 'hidden',
      };
      animation = 'slide-vertical';
      tabStyle = {
        overflow: 'hidden',
      };
    }

    return (<div style={{ margin: 20 }}>
      <h2>Simple Tabs</h2>

      <p>
        tabPosition:
        <select value={this.state.tabPosition} onChange={this.changeTabPosition}>
          <option value="top">top</option>
          <option value="bottom">bottom</option>
          <option value="left">left</option>
          <option value="right">right</option>
        </select>
      </p>
      <div style={tabStyle}>
        <Tabs
          defaultActiveKey="3"
          navStyle={navStyle}
          tabPosition={this.state.tabPosition}
          animation={animation}
          onTabClick={this.onTabClick}
          onChange={this.onChange}
        >
          {ends2}
        </Tabs>
      </div>
      <h2>Scroll Tabs</h2>

      <div style={tabStyle}>
        <Tabs
          defaultActiveKey="3"
          navStyle={navStyle}
          tabPosition={this.state.tabPosition}
          animation={animation}
          onTabClick={this.onTabClick}
          onChange={this.onChange}
        >
          {ends}
        </Tabs>
      </div>
      <button onClick={this.tick}>rerender</button>
    </div>);
  },
});

ReactDOM.render(<Component />, document.getElementById('__react-content'));
