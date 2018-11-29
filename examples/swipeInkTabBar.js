/* eslint react/no-multi-comp:0, no-console:0, react/no-unescaped-entities: 0, global-require: 0, react/no-unescaped-entities: 0 */
import 'rc-tabs/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import SwipeableInkTabBar from 'rc-tabs/lib/SwipeableInkTabBar';

if (process.env.DEMO_ENV === 'preact') {
  require('preact/devtools');
}

const contentStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100px',
  backgroundColor: '#fff',
};

const tabTitle = (key) => (<div data-extra="tab-bar-title">{`选项${key}`}</div>);
const makeTabPane = key => (
  <TabPane tab={tabTitle(key)} data-extra="tabpane" key={`${key}`}>
    <div style={contentStyle}>
      {`选项${key}内容`}
    </div>
  </TabPane>
);

const makeMultiTabPane = (count) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(makeTabPane(i));
  }
  return result;
};

const Component = () => (
  <div>
    <h4>pageSize = 5, speed = 5</h4>
    <div>
      <Tabs
        data-extra="tabs"
        renderTabBar={() =>
          <SwipeableInkTabBar
            pageSize={5}
            speed={5}
            data-extra="tabbar"
          />
        }
        renderTabContent={() => <TabContent />}
        defaultActiveKey="8"
      >
        {makeMultiTabPane(11)}
      </Tabs>
    </div>
    <h4>pageSize = 3, speed = 10</h4>
    <div>
      <Tabs
        renderTabBar={() =>
          <SwipeableInkTabBar
            pageSize={3}
            speed={10}
          />
        }
        renderTabContent={() => <TabContent/>}
        defaultActiveKey="2"
      >
        {makeMultiTabPane(7)}
      </Tabs>
    </div>
    <h4>pageSize = 3, speed = 10, tabBarPosition='bottom'</h4>
    <div>
      <Tabs
        tabBarPosition="bottom"
        renderTabBar={() =>
          <SwipeableInkTabBar
            pageSize={3}
            speed={10}
          />
        }
        renderTabContent={() => <TabContent/>}
        defaultActiveKey="2"
      >
        {makeMultiTabPane(7)}
      </Tabs>
    </div>
    <h4>tabBarPosition='left'</h4>
    <div>
      <Tabs
        tabBarPosition="left"
        renderTabBar={() =>
          <SwipeableInkTabBar
            pageSize={3}
          />
        }
        renderTabContent={() => <TabContent/>}
        defaultActiveKey="2"
      >
        {makeMultiTabPane(11)}
      </Tabs>
    </div>
    <h4>tabBarPosition='right'</h4>
    <div>
      <Tabs
        tabBarPosition="right"
        renderTabBar={() =>
          <SwipeableInkTabBar
            pageSize={3}
          />
        }
        renderTabContent={() => <TabContent/>}
        defaultActiveKey="2"
      >
        {makeMultiTabPane(11)}
      </Tabs>
    </div>
    <h4>custom inkBar style</h4>
    <div>
      <Tabs
        renderTabBar={() =>
          <SwipeableInkTabBar
            pageSize={5}
            speed={5}
            styles={{
              inkBar: {
                width: '20px',
                backgroundColor: 'red',
              },
            }}
          />
        }
        renderTabContent={() => <TabContent />}
        defaultActiveKey="8"
      >
        {makeMultiTabPane(11)}
      </Tabs>
    </div>
    <h4>custom inkBar style, tabBarPosition='left'</h4>
    <div>
      <Tabs
        tabBarPosition="left"
        renderTabBar={() =>
          <SwipeableInkTabBar
            pageSize={3}
            styles={{
              inkBar: {
                backgroundColor: 'red',
                height: '20px',
              },
            }}
          />
        }
        renderTabContent={() => <TabContent/>}
        defaultActiveKey="2"
      >
        {makeMultiTabPane(11)}
      </Tabs>
    </div>
  </div>
);

ReactDOM.render(<Component />, document.getElementById('__react-content'));
