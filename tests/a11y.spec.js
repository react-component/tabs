import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { mount, render } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import KeyCode from '../src/KeyCode';
import Tabs, { TabPane } from '../src';
import TabContent from '../src/TabContent';
import ScrollableInkTabBar from '../src/ScrollableInkTabBar';

const customId = 'CUSTOM_ID';

const makeTabPane = (key, withTabKey) => (
  <TabPane tab={`Tab ${key}`} key={key} tabKey={withTabKey && key}>
    <div>
      <input id={`input-${key}`} />
      <button type="button">Button {key}</button>
    </div>
  </TabPane>
);

const makeMultiTabPane = (count, withTabKey) => {
  const result = [];
  for (let i = 1; i <= count; i++) {
    result.push(makeTabPane(i, withTabKey));
  }
  return result;
};

const TabsComponent = ({ withCustomId, withTabKey }) => (
  <div style={{ width: 500, height: 500 }}>
    <Tabs
      renderTabBar={() => <ScrollableInkTabBar />}
      renderTabContent={() => <TabContent />}
      id={withCustomId && customId}
    >
      {makeMultiTabPane(5, withTabKey)}
    </Tabs>
  </div>
);

TabsComponent.defaults = {
  withCustomId: false,
  withTabKey: false,
};

const simulateKeyDown = (DOMNode, keyCode) => {
  TestUtils.Simulate.keyDown(DOMNode, {
    keyCode,
    which: keyCode,
  });
};

describe('<TabsComponent />', () => {
  const component = <TabsComponent />;
  const wrapper = mount(component);
  const tabList = wrapper.find('[role="tablist"]').first();
  const tabs = wrapper.find('[role="tab"]');

  it('should render correctly', () => {
    expect(renderToJson(render(component))).toMatchSnapshot();
  });

  it('first tab should be selected by default', () => {
    const firstTab = tabs.first();
    const selectedTab = tabs.find('[aria-selected="true"]');
    expect(selectedTab.getDOMNode()).toBe(firstTab.getDOMNode());
  });

  it('switching tab via keyboard arrow navigation should move focus to new active tab', () => {
    simulateKeyDown(tabList.getDOMNode(), KeyCode.RIGHT);
    const secondTab = tabs.at(1);
    expect(document.activeElement).toBe(secondTab.getDOMNode());
  });

  it('clicking a tab should move focus to this tab', () => {
    const thirdTab = tabs.at(2);
    thirdTab.simulate('click');
    expect(document.activeElement).toBe(thirdTab.getDOMNode());
  });
});

describe('<TabsComponent withTabKey />', () => {
  const component = <TabsComponent withTabKey />;

  it('should render correctly', () => {
    expect(renderToJson(render(component))).toMatchSnapshot();
  });
});

describe('<TabsComponent withTabKey withCustomId />', () => {
  const component = <TabsComponent withTabKey withCustomId id="MY_ID" />;

  it('should render correctly', () => {
    expect(renderToJson(render(component))).toMatchSnapshot();
  });
});
