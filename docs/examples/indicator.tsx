import React from 'react';
import '../../assets/index.less';
import type { TabsProps } from '../../src';
import Tabs from '../../src';

const items: TabsProps['items'] = [
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
  },
];

export default () => (
  <>
    <Tabs
      tabPosition="top"
      items={items}
      indicatorSize={origin => origin - 20}
      indicatorAlign="start"
    />
    <Tabs
      tabPosition="top"
      items={items}
      indicatorSize={origin => origin - 20}
      indicatorAlign="center"
    />
    <Tabs
      tabPosition="top"
      items={items}
      indicatorSize={origin => origin - 20}
      indicatorAlign="end"
    />
    <Tabs
      tabPosition="left"
      items={items}
      indicatorSize={origin => origin - 20}
      indicatorAlign="start"
    />
    <Tabs
      tabPosition="left"
      items={items}
      indicatorSize={origin => origin - 20}
      indicatorAlign="center"
    />
    <Tabs
      tabPosition="left"
      items={items}
      indicatorSize={origin => origin - 20}
      indicatorAlign="end"
    />
  </>
);
