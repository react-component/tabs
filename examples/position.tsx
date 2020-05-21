import React from 'react';
import Tabs, { TabPane } from '../src';
import '../assets/index.less';

export default () => {
  const [position, setPosition] = React.useState<any>('top');

  return (
    <React.StrictMode>
      <select value={position} onChange={e => setPosition(e.target.value)}>
        <option>left</option>
        <option>right</option>
        <option>top</option>
        <option>bottom</option>
      </select>
      <Tabs tabBarExtraContent={233} tabPosition={position}>
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
