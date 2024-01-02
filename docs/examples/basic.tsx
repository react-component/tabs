import React from 'react';
import '../../assets/index.less';
import Tabs from '../../src';

export default () => {
  const [destroy, setDestroy] = React.useState(false);
  const [items, setItems] = React.useState([
    {
      label: 'Light',
      key: 'light',
      children: 'Light!',
      icon: <span>🌞</span>,
    },
    {
      label: 'Bamboo',
      key: 'bamboo',
      children: 'Bamboo!',
      icon: <span>🎋</span>,
    },
    {
      label: 'Cute',
      key: 'cute',
      children: 'Cute!',
      disabled: true,
      icon: <span>🐼</span>,
    },
  ]);

  if (destroy) {
    return null;
  }

  return (
    <React.StrictMode>
      <Tabs tabBarExtraContent="extra" items={items} />
      <button
        type="button"
        onClick={() => {
          setItems([
            {
              key: 'yo',
              label: 'Yo',
              children: 'Yo!',
              icon: <span>👋</span>,
            },
          ]);
        }}
      >
        Change children
      </button>
      <button
        type="button"
        onClick={() => {
          setDestroy(true);
        }}
      >
        Destroy
      </button>
    </React.StrictMode>
  );
};
