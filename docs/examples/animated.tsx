import React from 'react';
import Tabs from '../../src';
import type { CSSMotionProps } from '@rc-component/motion';
import '../../assets/index.less';
import './animated.less';

const motion: CSSMotionProps = {
  motionName: 'switch',
  motionAppear: false,
  motionEnter: true,
  motionLeave: true,
};

export default () => (
  <React.StrictMode>
    <Tabs
      animated={{
        tabPaneMotion: motion,
      }}
      items={[
        {
          label: 'Light',
          key: 'light',
          children: 'Light!',
          style: {
            height: 200,
            background: 'rgba(255, 0, 0, 0.05)',
          },
        },
        {
          label: 'Bamboo',
          key: 'bamboo',
          children: 'Bamboo!',
          style: {
            height: 100,
            background: 'rgba(0, 255, 0, 0.05)',
          },
        },
        {
          label: 'Cute',
          key: 'cute',
          children: 'Cute!',
          style: {
            background: 'rgba(0, 0, 255, 0.05)',
          },
        },
      ]}
    />
  </React.StrictMode>
);
