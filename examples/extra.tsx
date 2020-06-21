/* eslint-disable jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */
import React from 'react';
import Tabs, { TabPane } from '../src';
import '../assets/index.less';

const tabs: React.ReactElement[] = [];

for (let i = 0; i < 50; i += 1) {
  tabs.push(
    <TabPane key={i} tab={`Tab ${i}`}>
      Content of {i}
    </TabPane>,
  );
}

const extraSlotObject = {
  left: <div>left</div>,
  right: <div>right</div>,
};

export default () => {
  const [toggleExtra, setToggleExtra] = React.useState(false);

  const [extraSlot, setExtraSlot] = React.useState(false);

  const str = toggleExtra ? 'left' : 'right';

  return (
    <div style={{ height: 2000 }}>
      <React.StrictMode>
        <div style={{ maxWidth: 550 }}>
          <Tabs
            tabBarExtraContent="extra"
            tabBarExtraSlot={extraSlot ? extraSlotObject : str}
            defaultActiveKey="8"
            moreIcon="..."
          >
            {tabs}
          </Tabs>
        </div>
      </React.StrictMode>

      <label>
        <input
          type="checkbox"
          checked={toggleExtra}
          onChange={() => setToggleExtra(!toggleExtra)}
        />
        Set `toggleExtra`
      </label>

      <label>
        <input type="checkbox" checked={extraSlot} onChange={() => setExtraSlot(!extraSlot)} />
        Set `extraSlot`
      </label>
      <div>* 设置了 extraSlot 后, toggleExtra将没有作用</div>
    </div>
  );
};
