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
        },
        {
          label: 'Bamboo',
          key: 'bamboo',
          children: 'Bamboo!',
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
