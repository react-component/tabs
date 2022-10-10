import React from 'react';
import Tabs from '../../src';
import '../../assets/index.less';

export default () => {
  const [position, setPosition] = React.useState<any>('left');
  const [gutter, setGutter] = React.useState(false);
  const [fixedHeight, setFixedHeight] = React.useState(false);

  return (
    <React.StrictMode>
      <select value={position} onChange={e => setPosition(e.target.value)}>
        <option>left</option>
        <option>right</option>
        <option>top</option>
        <option>bottom</option>
      </select>
      <label>
        <input
          type="checkbox"
          checked={fixedHeight}
          onChange={() => setFixedHeight(!fixedHeight)}
        />
        Fixed Height
      </label>
      <label>
        <input type="checkbox" checked={gutter} onChange={() => setGutter(!gutter)} />
        Set Gutter
      </label>
      <Tabs
        tabBarExtraContent={233}
        tabPosition={position}
        style={{ height: fixedHeight ? 180 : undefined }}
        tabBarGutter={gutter ? 16 : null}
        items={[
          {
            key: 'light',
            label: 'Light',
            children: 'Light!',
          },
          {
            key: 'bamboo',
            label: 'Bamboo',
            children: 'Bamboo!',
          },
          {
            key: 'cat',
            label: 'Cat',
            children: 'Cat!',
          },
          {
            key: 'miu',
            label: 'Miu',
            children: 'Miu!',
          },
          {
            key: '333',
            label: '333',
            children: '333!',
          },
          {
            key: '444',
            label: '444',
            children: '444!',
          },
        ]}
      />
    </React.StrictMode>
  );
};
