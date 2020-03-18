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
      renderTabBar={() => <ScrollableInkTabBar extraContent={<input id="input" />} />}
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

  it('extraContent not listen keyboard naviagtion', () => {
    wrapper.find('#input').simulate('keyDown', {
      keyCode: KeyCode.RIGHT,
      which: KeyCode.RIGHT,
    });
    expect(tabs.at(0).getDOMNode().className).toContain('rc-tabs-tab-active');
  });

  it('first tab should be selected by default', () => {
    const firstTab = tabs.first();
    const selectedTab = tabs.find('[aria-selected="true"]');
    expect(selectedTab.getDOMNode()).toBe(firstTab.getDOMNode());
  });

  it('switching tab via keyboard arrow navigation should move to new active tab', () => {
    simulateKeyDown(tabList.getDOMNode(), KeyCode.RIGHT);
    expect(tabs.at(1).getDOMNode().className).toContain('rc-tabs-tab-active');
  });

  it('clicking a tab should active this tab', () => {
    tabs.at(2).simulate('click');
    expect(tabs.at(2).getDOMNode().className).toContain('rc-tabs-tab-active');
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
