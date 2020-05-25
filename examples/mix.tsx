/* eslint-disable jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */
import React from 'react';
import Tabs, { TabPane } from '../src';
import '../assets/index.less';

function getTabPanes(count = 50) {
  const tabs: React.ReactElement[] = [];
  for (let i = 0; i < count; i += 1) {
    tabs.push(
      <TabPane key={i} tab={`Tab ${i}`} disabled={i === 3} closable={i === 5 ? false : undefined}>
        Content of {i}
      </TabPane>,
    );
  }
  return tabs;
}

export default () => {
  const [position, setPosition] = React.useState<any>('top');
  const [gutter, setGutter] = React.useState(false);
  const [fixHeight, setFixHeight] = React.useState(false);
  const [rtl, setRTL] = React.useState(false);
  const [editable, setEditable] = React.useState(true);
  const [destroy, setDestroy] = React.useState(false);
  const [animated, setAnimated] = React.useState(true);
  const [tabPanes, setTabPanes] = React.useState(getTabPanes(50));

  const editableConfig = editable
    ? {
        onEdit: (
          type: string,
          info: { key?: string; event: React.MouseEvent | React.KeyboardEvent },
        ) => {
          if (type === 'remove') {
            setTabPanes(tabs => tabs.filter(tab => tab.key !== info.key));
          }
          console.log(type, info);
        },
      }
    : null;

  return (
    <div style={{ minHeight: 2000 }}>
      <div>
        {/* tabBarGutter */}
        <label>
          <input type="checkbox" checked={gutter} onChange={() => setGutter(val => !val)} />
          Set `tabBarGutter`
        </label>

        {/* animated */}
        <label>
          <input type="checkbox" checked={animated} onChange={() => setAnimated(val => !val)} />
          Set `animated`
        </label>

        {/* fixHeight */}
        <label>
          <input type="checkbox" checked={fixHeight} onChange={() => setFixHeight(val => !val)} />
          Set fixed height
        </label>

        {/* editable */}
        <label>
          <input type="checkbox" checked={editable} onChange={() => setEditable(val => !val)} />
          Set Editable
        </label>

        {/* direction */}
        <label>
          <input type="checkbox" checked={rtl} onChange={() => setRTL(val => !val)} />
          Set `direction=rtl`
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
            animated={animated}
            editable={editableConfig}
            direction={rtl ? 'rtl' : null}
            tabPosition={position}
            tabBarGutter={gutter ? 32 : null}
            tabBarExtraContent="extra"
            defaultActiveKey="16"
            moreIcon="..."
            style={{ height: fixHeight ? 300 : null }}
          >
            {tabPanes}
          </Tabs>
        </React.StrictMode>
      )}
    </div>
  );
};
