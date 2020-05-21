import React from 'react';
import Tabs, { TabPane } from '../src';
import '../assets/index.less';

export default () => {
  return (
    <React.StrictMode>
      <Tabs
        tabBarExtraContent={233}
        renderTabBar={(props, Component) => (
          <div data-test="233">
            <Component {...props}>{node => <span>{node}</span>}</Component>
          </div>
        )}
      >
        <TabPane key="light" tab="light">
          Light
        </TabPane>
        <TabPane key="bamboo" tab="bamboo">
          Bamboo
        </TabPane>
        <TabPane key="cute" tab="cute" disabled>
          Cute
        </TabPane>
      </Tabs>
    </React.StrictMode>
  );
};
