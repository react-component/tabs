import React from 'react';
import Tabs, { TabPane } from 'rc-tabs';
import '../../assets/index.less';

const tabs: React.ReactElement[] = [];

for (let i = 0; i < 50; i += 1) {
  tabs.push(
    <TabPane key={i} tab={`Tab ${i}`}>
      Content of {i}
    </TabPane>,
  );
}

export default () => {
  const [gutter, setGutter] = React.useState(true);
  const [destroy, setDestroy] = React.useState(false);

  if (destroy) {
    return null;
  }

  return (
    <div style={{ height: 2000 }}>
      <React.StrictMode>
        <div style={{ maxWidth: 550 }}>
          <Tabs
            tabBarGutter={gutter ? 32 : null}
            tabBarExtraContent="extra"
            defaultActiveKey="8"
            moreIcon="..."
          >
            {tabs}
          </Tabs>
        </div>
      </React.StrictMode>

      <label>
        <input type="checkbox" checked={gutter} onChange={() => setGutter(!gutter)} />
        Set `tabBarGutter`
      </label>
      <button
        type="button"
        onClick={() => {
          setDestroy(true);
        }}
      >
        Destroy
      </button>
    </div>
  );
};
