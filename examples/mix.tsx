/* eslint-disable jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */
import React from 'react';
import Tabs, { TabPane } from '../src';
import '../assets/index.less';

function getTabPanes(count = 50) {
  const tabs: React.ReactElement[] = [];
  for (let i = 0; i < count; i += 1) {
    tabs.push(
      <TabPane key={i} tab={`Tab ${i}`}>
        Content of {i}
      </TabPane>,
    );
  }
  return tabs;
}

export default () => {
  const [position, setPosition] = React.useState<any>('top');
  const [gutter, setGutter] = React.useState(false);
  const [destroy, setDestroy] = React.useState(false);
  const [tabPanes, setTabPanes] = React.useState(getTabPanes(10));

  return (
    <div style={{ minHeight: 2000 }}>
      <div>
        {/* tabBarGutter */}
        <label>
          <input type="checkbox" checked={gutter} onChange={() => setGutter(!gutter)} />
          Set `tabBarGutter`
        </label>

        {/* Change children */}
        <button
          type="button"
          onClick={() => {
            const counts = [50, 10, 0];
            const count = counts[(counts.indexOf(tabPanes.length) + 1) % counts.length];
            console.log('>>>', count);
            setTabPanes(getTabPanes(count));
          }}
        >
          Change TabPanes
        </button>

        {/* Position */}
        <select value={position} onChange={e => setPosition(e.target.value)}>
          <option>left</option>
          <option>right</option>
          <option>top</option>
          <option>bottom</option>
        </select>

        {/* destroy */}
        <button
          type="button"
          onClick={() => {
            setDestroy(!destroy);
          }}
        >
          Destroy
        </button>
      </div>

      {!destroy && (
        <React.StrictMode>
          <Tabs
            tabPosition={position}
            tabBarGutter={gutter ? 32 : null}
            tabBarExtraContent="extra"
            defaultActiveKey="8"
            moreIcon="..."
          >
            {tabPanes}
          </Tabs>
        </React.StrictMode>
      )}
    </div>
  );
};
