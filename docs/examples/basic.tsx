import React from 'react';
import Tabs, { TabPane } from 'rc-tabs';
import '../../assets/index.less';

export default () => {
  const [destroy, setDestroy] = React.useState(false);
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

  if (destroy) {
    return null;
  }

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
      <button
        type="button"
        onClick={() => {
          setDestroy(true);
        }}
      >
        Destroy
      </button>
    </React.StrictMode>
  );
};
