import React from 'react';
import Tabs, { TabPane } from '../src';
import '../assets/index.less';

const tabs: React.ReactElement[] = [];

for (let i = 0; i < 50; i += 1) {
  tabs.push(
    <TabPane key={i} tab={`Tab ${i}`}>
      Content of {i}
    </TabPane>,
  );
}

export default () => {
  return (
    <React.StrictMode>
      <div style={{ width: 550 }}>
        <Tabs tabBarExtraContent={233} defaultActiveKey="8">{tabs}</Tabs>
      </div>
    </React.StrictMode>
  );
};
