/* eslint-disable jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */
import React from 'react';
import Tabs, { TabPane } from '../src';
import '../assets/index.less';

export default () => {
  const [position, setPosition] = React.useState<any>('left');
  const [fixedHeight, setFixedHeight] = React.useState(false);

  return (
    <React.StrictMode>
      <select value={position} onChange={e => setPosition(e.target.value)}>
        <option>left</option>
        <option>right</option>
        <option>top</option>
        <option>bottom</option>
      </select>
      <label>
        <input
          type="checkbox"
          checked={fixedHeight}
          onChange={() => setFixedHeight(!fixedHeight)}
        />
        Fixed Height
      </label>
      <Tabs
        tabBarExtraContent={233}
        tabPosition={position}
        style={{ height: fixedHeight ? 100 : undefined }}
      >
        <TabPane key="light" tab="light">
          Light
        </TabPane>
        <TabPane key="bamboo" tab="bamboo">
          Bamboo
        </TabPane>
        <TabPane key="cat" tab="cat">
          Cat
        </TabPane>
        <TabPane key="miu" tab="miu">
          Miu
        </TabPane>
      </Tabs>
    </React.StrictMode>
  );
};
