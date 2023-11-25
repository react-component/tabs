import React from 'react';
import Tabs from'../../src';
import '../../assets/index.less';

export default () => {
  const [destroy, setDestroy] = React.useState(false);
  const [items, setItems] = React.useState([
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
      <Tabs tabBarExtraContent="extra" items={items} indicatorSize={(origin) => origin - 16} />
    </React.StrictMode>
  );
};
