import React from 'react';
import Tabs, { TabPane } from 'rc-tabs';
import '../../assets/index.less';

export default () => {
  const [position, setPosition] = React.useState<any>('left');
  const [gutter, setGutter] = React.useState(false);
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
      <label>
        <input type="checkbox" checked={gutter} onChange={() => setGutter(!gutter)} />
        Set Gutter
      </label>
      <Tabs
        tabBarExtraContent={233}
        tabPosition={position}
        style={{ height: fixedHeight ? 180 : undefined }}
        tabBarGutter={gutter ? 16 : null}
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
        <TabPane key="333" tab="333">
          3333
        </TabPane>
        <TabPane key="4444" tab="4444">
          4444
        </TabPane>
      </Tabs>
    </React.StrictMode>
  );
};
