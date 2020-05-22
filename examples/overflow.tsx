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
    <div style={{ height: 2000 }}>
      <React.StrictMode>
        <div style={{ maxWidth: 550 }}>
          <Tabs tabBarExtraContent={233} defaultActiveKey="8" moreIcon="...">
            {tabs}
          </Tabs>
        </div>
      </React.StrictMode>
    </div>
  );
};
