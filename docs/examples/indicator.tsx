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
    <Tabs items={items} indicatorSize={origin => origin - 20} indicatorPosition="start" />
    <Tabs items={items} indicatorSize={origin => origin - 20} indicatorPosition="center" />
    <Tabs items={items} indicatorSize={origin => origin - 20} indicatorPosition="end" />
  </>
);
