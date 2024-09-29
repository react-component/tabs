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
      indicator={{ size: origin => origin - 20, align: 'start' }}
    />
    <Tabs
      tabPosition="top"
      items={items}
      indicator={{ size: origin => origin - 20, align: 'center' }}
    />
    <Tabs
      tabPosition="top"
      items={items}
      indicator={{ size: origin => origin - 20, align: 'end' }}
    />
    <Tabs
      tabPosition="left"
      items={items}
      indicator={{ size: origin => origin - 20, align: 'start' }}
    />
    <Tabs
      tabPosition="left"
      items={items}
      indicator={{ size: origin => origin - 20, align: 'center' }}
    />
    <Tabs
      tabPosition="left"
      items={items}
      indicator={{ size: origin => origin - 20, align: 'end' }}
    />
  </>
);
