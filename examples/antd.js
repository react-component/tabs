/* eslint react/no-multi-comp:0, no-console:0, react/prop-types:0 */
import 'rc-tabs/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import ScrollableTabBar from 'rc-tabs/lib/ScrollableTabBar';
import InkTabBar from 'rc-tabs/lib/InkTabBar';
import TabBar from 'rc-tabs/lib/TabBar';

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

function construct(start, num) {
  const ends = [];
  let index = 1;
  for (let i = start; i < start + num; i++) {
    ends.push(<TabPane
      placeholder={`loading ${i}`}
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

class Demo extends React.Component {
  state = {
    tabBarPosition: 'top',
    activeKey: '3',
    start: 0,
  };

  onChange = (key) => {
    console.log(`onChange ${key}`);
  }

  onChange2 = (activeKey) => {
    this.setState({ activeKey });
  }

  onTabClick = (key) => {
    console.log(`onTabClick ${key}`);
  }

  tick = () => {
    this.setState({
      start: this.state.start + 10,
    });
  }

  changeTabPosition = (e) => {
    this.setState({
      tabBarPosition: e.target.value,
    });
  }

  scrollToActive = () => {
    this.bar.scrollToActiveTab();
  }

  switchToLast = (ends) => {
    if (this.state.activeKey !== ends[ends.length - 1].key) {
      this.setState({ activeKey: ends[ends.length - 1].key }, this.scrollToActive);
    } else {
      this.scrollToActive();
    }
  }

  saveBar = (bar) => {
    this.bar = bar;
  }

  render() {
    const start = this.state.start;
    const ends = construct(start, 9);
    const ends2 = construct(start, 3);
    const tabBarPosition = this.state.tabBarPosition;
    let style;
    let contentStyle;
    contentStyle = {
      height: 400,
    };
    if (tabBarPosition === 'left' || tabBarPosition === 'right') {
      style = contentStyle;
    } else {
      style = {
        width: 500,
      };
    }

    return (
      <div style={{ margin: 20 }}>
        <h2>Basic Tabs</h2>
        <p>
          tabBarPosition:
          <select value={this.state.tabBarPosition} onChange={this.changeTabPosition}>
            <option value="top">top</option>
            <option value="bottom">bottom</option>
            <option value="left">left</option>
            <option value="right">right</option>
          </select>
        </p>
        <div>
          <Tabs
            defaultActiveKey="3"
            style={style}
            tabBarPosition={this.state.tabBarPosition}
            renderTabBar={() => <TabBar onTabClick={this.onTabClick}/>}
            renderTabContent={() => <TabContent style={contentStyle}/>}
            onChange={this.onChange}
          >
            {ends2}
          </Tabs>
        </div>
        <h2>Basic Tabs With Ink Bar</h2>
        <p>
          tabBarPosition:
          <select value={this.state.tabBarPosition} onChange={this.changeTabPosition}>
            <option value="top">top</option>
            <option value="bottom">bottom</option>
            <option value="left">left</option>
            <option value="right">right</option>
          </select>
        </p>
        <div>
          <Tabs
            defaultActiveKey="3"
            style={style}
            tabBarPosition={this.state.tabBarPosition}
            renderTabBar={() => <InkTabBar onTabClick={this.onTabClick}/>}
            renderTabContent={() => <TabContent style={contentStyle}/>}
            onChange={this.onChange}
          >
            {ends2}
          </Tabs>
        </div>
        <h2>Scroll Tabs</h2>
        <div>
          <button onClick={() => this.switchToLast(ends)}>
            switch to last tab
          </button>
          <Tabs
            activeKey={this.state.activeKey}
            style={style}
            tabBarPosition={this.state.tabBarPosition}
            renderTabBar={() => <ScrollableTabBar
              ref={this.saveBar}
              onTabClick={this.onTabClick}
            />}
            renderTabContent={() => <TabContent style={contentStyle}/>}
            onChange={this.onChange2}
          >
            {ends}
          </Tabs>
        </div>
        <button onClick={this.tick}>rerender</button>
        <h2>Scroll Tabs with inkBar</h2>
        <div>
          <button onClick={() => this.switchToLast(ends)}>
            switch to last tab
          </button>
          <Tabs
            activeKey={this.state.activeKey}
            style={style}
            tabBarPosition={this.state.tabBarPosition}
            renderTabBar={() => <ScrollableInkTabBar
              ref={this.saveBar}
              onTabClick={this.onTabClick}
            />}
            renderTabContent={() => <TabContent style={contentStyle}/>}
            onChange={this.onChange2}
          >
            {ends}
          </Tabs>
        </div>
        <button onClick={this.tick}>rerender</button>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
