import React from 'react';
import Tabs from 'rc-tabs';
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
      <Tabs tabBarExtraContent="extra" items={items} />
      <button
        type="button"
        onClick={() => {
          setItems([
            {
              key: 'yo',
              label: 'Yo',
              children: 'Yo!',
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
