import React from 'react';
import Tabs from '../../src';
import '../../assets/index.less';

const renderTabBar = props => {
  return (
    <div>
      {props.panes.map(pane => {
        const { key } = pane;
        return <span key={key}>{key}</span>;
      })}
    </div>
  );
};

export default () => {
  return (
    <div style={{ height: 2000 }}>
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
    </div>
  );
};
