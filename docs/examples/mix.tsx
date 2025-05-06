import React from 'react';
import Tabs from '../../src';
import type { TabsProps } from '../../src';
import '../../assets/index.less';

function getTabPanes(count = 50) {
  const items: TabsProps['items'] = [];
  for (let i = 0; i < count; i += 1) {
    items.push({
      key: String(i),
      label: `Tab ${i}`,
      disabled: i === 3,
      closable: i === 5 ? false : undefined,
      children: `Content of ${i}`,
    });
  }
  return items;
}

export default () => {
  const [activeKey, setActiveKey] = React.useState<string>(undefined);
  const [position, setPosition] = React.useState<any>('top');
  const [gutter, setGutter] = React.useState(false);
  const [fixHeight, setFixHeight] = React.useState(true);
  const [rtl, setRTL] = React.useState(false);
  const [editable, setEditable] = React.useState(true);
  const [destroyOnHidden, setDestroyOnHidden] = React.useState(false);
  const [destroy, setDestroy] = React.useState(false);
  const [animated, setAnimated] = React.useState(true);
  const [tabPanes, setTabPanes] = React.useState(getTabPanes(10));

  const editableConfig = editable
    ? {
        onEdit: (
          type: string,
          info: { key?: string; event: React.MouseEvent | React.KeyboardEvent },
        ) => {
          if (type === 'remove') {
            setTabPanes(tabs => tabs.filter(tab => tab.key !== info.key));
          } else {
            setTabPanes(tabs => {
              const lastTab = tabs[tabs.length - 1];
              const num = Number(lastTab.key) + 1;
              return [
                ...tabs,
                {
                  key: String(num),
                  label: `Tab ${num}`,
                  children: `Content of ${num}`,
                },
              ];
            });
          }
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
          Set `animated.tabPane`
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

        {/* editable */}
        <label>
          <input
            type="checkbox"
            checked={destroyOnHidden}
            onChange={() => setDestroyOnHidden(val => !val)}
          />
          Destroy Inactive TabPane
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

        {/* Active random */}
        <button
          type="button"
          onClick={() => {
            const { key } = tabPanes[Math.floor(tabPanes.length * Math.random())];
            // setActiveKey('29');
            setActiveKey(String(key));
            console.log('Random Key:', key);
          }}
        >
          Active Random
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
            activeKey={activeKey}
            onChange={key => {
              if (activeKey !== undefined) {
                setActiveKey(key);
              }
            }}
            onTabScroll={info => {
              console.log('Scroll:', info);
            }}
            destroyOnHidden={destroyOnHidden}
            animated={{ tabPane: animated }}
            editable={editableConfig}
            direction={rtl ? 'rtl' : null}
            tabPosition={position}
            tabBarGutter={gutter ? 32 : null}
            tabBarExtraContent="extra"
            defaultActiveKey="30"
            // moreTransitionName="233"
            style={{ height: fixHeight ? 300 : null }}
            items={tabPanes}
          />
        </React.StrictMode>
      )}
    </div>
  );
};
