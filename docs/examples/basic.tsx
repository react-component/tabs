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
    {
      label: 'Yo',
      key: 'yo',
      children: 'Yo!',
      icon: <span>👋</span>,
    },
  ]);
  const [direction, setDirection] = React.useState<'ltr' | 'rtl'>('ltr');

  if (destroy) {
    return null;
  }

  const onTabClick = (key: string) => {
    console.log('onTabClick', key);
  };

  const onTabChange = (key: string) => {
    console.log('onTabChange', key);
  };

  return (
    <React.StrictMode>
      <Tabs
        tabBarExtraContent="extra"
        onTabClick={onTabClick}
        onChange={onTabChange}
        direction={direction}
        items={items}
      />
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
      <button
        type="button"
        onClick={() => {
          setDirection(direction === 'ltr' ? 'rtl' : 'ltr');
        }}
      >
        {direction === 'ltr' ? 'rtl' : 'ltr'}
      </button>
    </React.StrictMode>
  );
};
