/* eslint-disable no-undef */
import React, { Component } from 'react';
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


class NormoalTabs extends Component {
  render() {
    return (
      <div style={{ width: 500, height: 500 }}>
        <Tabs
          renderTabBar={() => <ScrollableInkTabBar />}
          renderTabContent={() => <TabContent />}
        >
          {makeMultiTabPane(2)}
        </Tabs>
      </div>
    );
  }
}

describe('tabs with tab key', () => {
  it('press at first input', () => {
    const wrapper = mount(<NormoalTabs />);

    const src = wrapper.find('div[role="tabpanel"] > div').at(0);
    src.instance().focus();
    src.simulate('keyDown', {
      shiftKey: true,
      which: KeyCode.TAB,
    });

    const tgt = wrapper.find('div[role="tabpanel"] > div').at(2);
    expect(document.activeElement).toBe(tgt.instance());
  });

  it('press at last input', () => {
    const wrapper = mount(<NormoalTabs />);

    const src = wrapper.find('div[role="tabpanel"] > div').at(2);
    src.instance().focus();
    src.simulate('keyDown', {
      shiftKey: false,
      which: KeyCode.TAB,
    });

    const tgt = wrapper.find('div[role="tabpanel"] > div').at(0);
    expect(document.activeElement).toBe(tgt.instance());
  });
});
