import React from 'react';
import Tabs, { TabPane } from '../src';

export default () => {
  return (
    <Tabs>
      <TabPane key="light" tab="light">
        Light
      </TabPane>
      <TabPane key="bamboo" tab="bamboo">
        Bamboo
      </TabPane>
    </Tabs>
  );
};
