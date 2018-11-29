/* eslint-disable no-undef, jsx-a11y/no-autofocus */
import React from 'react';
import { mount } from 'enzyme';
import KeyCode from 'rc-util/lib/KeyCode';
import Tabs, { TabPane } from '../src/';
import TabContent from '../src/TabContent';
import ScrollableInkTabBar from '../src/ScrollableInkTabBar';

const makeTabPane = key => (
  <TabPane tab={`选项${key}`} key={key}>
    <div>
      <input autoFocus />
      <input />
    </div>
  </TabPane>
);

const makeMultiTabPane = (count) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(makeTabPane(i));
  }
  return result;
};


const NormalTabs = () => (
  <div style={{ width: 500, height: 500 }}>
    <Tabs
      renderTabBar={() => <ScrollableInkTabBar />}
      renderTabContent={() => <TabContent />}
    >
      {makeMultiTabPane(2)}
    </Tabs>
  </div>
);

describe('tabs with tab key', () => {
  function testTab(name, from, to, shiftKey) {
    it(name, (done) => {
      const wrapper = mount(<NormalTabs />);

      setTimeout(() => {
        const src = wrapper.find('div[role="presentation"]').at(from);
        src.instance().focus();
        src.simulate('keyDown', {
          shiftKey,
          which: KeyCode.TAB,
        });

        const tgt = wrapper.find('div[role="presentation"]').at(to);
        expect(document.activeElement).toBe(tgt.getDOMNode());

        done();
      }, 50);
    });
  }

  testTab('up tab to up panel', 0, 1, false);
  testTab('down panel to down tab', 2, 3, false);
  testTab('up panel to up tab', 1, 0, true);
  testTab('down tab to down panel', 3, 2, true);
});
