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

const extraContent = 'extraContent';

const extraContentMap = {
  left: <div>left</div>,
  right: <div>right</div>,
};

export default () => {
  const [toggleExtraMap, setToggleExtraMap] = React.useState(false);

  return (
    <div style={{ height: 2000 }}>
      <React.StrictMode>
        <div style={{ maxWidth: 550 }}>
          <Tabs
            tabBarExtraContent={toggleExtraMap ? extraContentMap : extraContent}
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
          checked={toggleExtraMap}
          onChange={() => setToggleExtraMap(!toggleExtraMap)}
        />
        Set `extraContentMap`
      </label>
    </div>
  );
};
