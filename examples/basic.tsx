import React from 'react';
import Tabs, { TabPane } from '../src';
import '../assets/index.less';

export default () => {
  return (
    <React.StrictMode>
      <Tabs tabBarExtraContent={233}>
        <TabPane key="light" tab="light">
          Light
        </TabPane>
        <TabPane key="bamboo" tab="bamboo">
          Bamboo
        </TabPane>
      </Tabs>
    </React.StrictMode>
  );
};
