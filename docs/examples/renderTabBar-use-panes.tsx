import React from 'react';
import Tabs, { TabPane } from 'rc-tabs';
import '../../assets/index.less';

const renderTabBar = props => {
  return (
    <div>
      {props.panes.map(pane => {
        const { key } = pane;
        return <span key={key}>{key}</span>;
      })}
    </div>
  );
};

export default () => {
  return (
    <div style={{ height: 2000 }}>
      <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
        <TabPane tab="Tab 1" key="1" style={{ height: 200 }}>
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  );
};
