import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import Tabs from '../../src';
import '../../assets/index.less';

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar
        {...props}
        className="site-custom-tab-bar"
        style={{ ...style, zIndex: 1, background: '#fff' }}
      />
    )}
  </Sticky>
);

export default () => {
  return (
    <div style={{ height: 2000 }}>
      <StickyContainer>
        <Tabs
          defaultActiveKey="1"
          renderTabBar={renderTabBar}
          items={[
            {
              key: '1',
              label: 'Tab 1',
              style: { height: 200 },
              children: 'Content of Tab Pane 1',
            },
            {
              key: '2',
              label: 'Tab 2',
              children: 'Content of Tab Pane 2',
            },
            {
              key: '3',
              label: 'Tab 3',
              children: 'Content of Tab Pane 3',
            },
          ]}
        />
      </StickyContainer>
    </div>
  );
};
