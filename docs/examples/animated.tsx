import React from 'react';
import Tabs from 'rc-tabs';
import '../../assets/index.less';

export default () => (
  <React.StrictMode>
    <Tabs
      animated
      items={[
        {
          label: 'Light',
          key: 'light',
          children: 'Light!',
          style: {
            height: 200,
          },
        },
        {
          label: 'Bamboo',
          key: 'bamboo',
          children: 'Bamboo!',
          style: {
            height: 100,
          },
        },
        {
          label: 'Cute',
          key: 'cute',
          children: 'Cute!',
          disabled: true,
        },
      ]}
    />
  </React.StrictMode>
);
