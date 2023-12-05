import React from 'react';
import '../../assets/index.less';
import Tabs from '../../src';

export default () => {
  const [destroy] = React.useState(false);
  const [items] = React.useState([
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
  ]);

  if (destroy) {
    return null;
  }

  return (
    <React.StrictMode>
      <Tabs tabBarExtraContent="extra" items={items} indicatorSize={origin => origin - 16} />
    </React.StrictMode>
  );
};
