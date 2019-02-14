/* eslint react/no-multi-comp:0, no-console:0, no-alert:0, no-undef: 0 */
import 'rc-tabs/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

let index = 1;

class Demo extends React.Component {
  state = {
    tabs: [{
      title: '初始',
      content: '初始内容',
    }],
    activeKey: '初始',
  };

  onTabChange = (activeKey) => {
    this.setState({
      activeKey,
    });
  }

  construct() {
    const disabled = true;
    return this.state.tabs.map((t) => {
      return (<TabPane
        tab={<span>{t.title}
          <a
            style={{
              position: 'absolute',
              cursor: 'pointer',
              color: 'red',
              right: 5,
              top: 0,
            }}
            onClick={(e) => {
              this.remove(t.title, e)
            }}
          >x</a>
      </span>}
        key={t.title}
      >
        <div style={{ padding: 100 }}>
          {t.content}
        </div>
      </TabPane>);
    }).concat([
      <TabPane
        tab={<a style={{ color: 'black', cursor: 'pointer' }} onClick={this.add}> + 添加</a>}
        disabled={disabled}
        key="__add"
      />,
    ]);
  }

  remove = (title, e) => {
    e.stopPropagation();
    if (this.state.tabs.length === 1) {
      alert('只剩一个，不能删');
      return;
    }
    let foundIndex = 0;
    const after = this.state.tabs.filter((t, i) => {
      if (t.title !== title) {
        return true;
      }
      foundIndex = i;
      return false;
    });
    let activeKey = this.state.activeKey;
    if (activeKey === title) {
      if (foundIndex) {
        foundIndex--;
      }
      activeKey = after[foundIndex].title;
    }
    this.setState({
      tabs: after,
      activeKey,
    });
  }

  add = (e) => {
    e.stopPropagation();
    index++;
    const newTab = {
      title: `名称: ${index}`,
      content: `内容: ${index}`,
    };
    this.setState({
      tabs: this.state.tabs.concat(newTab),
      activeKey: `名称: ${index}`,
    });
  }

  render() {
    const tabStyle = {
      width: 500,
    };

    return (
      <div style={{ margin: 20 }}>
        <h2>Addable Tabs</h2>
        <div style={tabStyle}>
          <Tabs
            renderTabBar={() => (
              <ScrollableInkTabBar
                extraContent={
                  <button onClick={this.add}>+添加</button>
                }
              />
            )}
            renderTabContent={() => <TabContent/>}
            activeKey={this.state.activeKey}
            onChange={this.onTabChange}
          >
            {this.construct()}
          </Tabs>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
