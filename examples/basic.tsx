import React from 'react';
import Tabs, { TabPane } from '../src';
import '../assets/index.less';

export default () => {
  const [children, setChildren] = React.useState([
    <TabPane key="light" tab="light">
      Light
    </TabPane>,
    <TabPane key="bamboo" tab="bamboo">
      Bamboo
    </TabPane>,
    <TabPane key="cute" tab="cute" disabled>
      Cute
    </TabPane>,
  ]);

  return (
    <React.StrictMode>
      <Tabs tabBarExtraContent="extra">{children}</Tabs>
      <button
        type="button"
        onClick={() => {
          setChildren([
            <TabPane key="Yo" tab="yo">
              Yo!
            </TabPane>,
          ]);
        }}
      >
        Change children
      </button>
    </React.StrictMode>
  );
};
