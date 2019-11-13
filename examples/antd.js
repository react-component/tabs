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

const arrowPath = 'M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h' +
  '-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v' +
  '60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91' +
  '.5c1.9 0 3.8-0.7 5.2-2L869 536.2c14.7-12.8 14.7-35.6 0-48.4z';

const getSvg = (path, style = {}, svgStyle = {}) => {
  return (
    <i style={style}>
      <svg
        viewBox="0 0 1024 1024"
        width="1em"
        height="1em"
        fill="currentColor"
        style={{ verticalAlign: '-.125em ', ...svgStyle }}
      >
        <path d={path} p-id="5827" />
      </svg>
    </i>
  );
};

const next = getSvg(arrowPath);
const prev = getSvg(arrowPath, {}, {
  transform: 'scaleX(-1)',
});

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
      <PanelContent id={i} />
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
    useIcon: false,
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

  toggleCustomIcon = () => {
    this.setState({
      useIcon: !this.state.useIcon,
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
    const contentStyle = {
      height: 400,
    };
    if (tabBarPosition === 'left' || tabBarPosition === 'right') {
      style = contentStyle;
    } else {
      style = {
        width: 500,
      };
    }

    const cls = this.state.useIcon && 'rc-tabs-custom-icon' || undefined;

    const iconProps = this.state.useIcon ? {
      nextIcon: next,
      prevIcon: prev,
    } : {};

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
            renderTabBar={() => <TabBar onTabClick={this.onTabClick} />}
            renderTabContent={() => <TabContent style={contentStyle} animatedWithMargin />}
            onChange={this.onChange}
          >
            {ends2}
          </Tabs>
        </div>
        <h2>Basic Tabs With Ink Bar and tabBarGutter</h2>
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
            renderTabBar={() => (
              <InkTabBar
                onTabClick={this.onTabClick}
                tabBarGutter={40}
              />
            )}
            renderTabContent={() => <TabContent style={contentStyle} />}
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
          <br />
          <button onClick={this.toggleCustomIcon}>
            toggle custom icon
          </button>
          <span>is using icon: {this.state.useIcon && 'true' || 'false'}</span>
          <Tabs
            activeKey={this.state.activeKey}
            className={cls}
            style={style}
            tabBarPosition={this.state.tabBarPosition}
            renderTabBar={() => <ScrollableTabBar
              ref={this.saveBar}
              onTabClick={this.onTabClick}
              {...iconProps}
            />}
            renderTabContent={() => <TabContent style={contentStyle} />}
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
            className={cls}
            style={style}
            tabBarPosition={this.state.tabBarPosition}
            renderTabBar={() => <ScrollableInkTabBar
              ref={this.saveBar}
              onTabClick={this.onTabClick}
              {...iconProps}
            />}
            renderTabContent={() => <TabContent style={contentStyle} />}
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
