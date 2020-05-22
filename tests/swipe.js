/* eslint-disable no-undef */
import React, { Component } from 'react';
import { mount, render } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import Tabs, { TabPane } from '../src';
import SwipeableTabContent from '../src/SwipeableTabContent';
import SwipeableInkTabBar from '../src/SwipeableInkTabBar';

const contentStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '5rem',
  backgroundColor: '#fff',
};

const makeTabPane = key => (
  <TabPane tab={`选项${key}`} key={key}>
    <div style={contentStyle}>{`选项${key}内容`}</div>
  </TabPane>
);

const makeMultiTabPane = count => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(makeTabPane(i));
  }
  return result;
};

class NormalTabs extends Component {
  render() {
    return (
      <div style={{ width: '750px', height: '1334px' }}>
        <Tabs
          ref={root => {
            this.root = root;
          }}
          defaultActiveKey="8"
          renderTabBar={() => (
            <SwipeableInkTabBar
              ref={tabBar => {
                this.tabBar = tabBar;
              }}
            />
          )}
          renderTabContent={() => <SwipeableTabContent />}
        >
          {makeMultiTabPane(11)}
        </Tabs>
      </div>
    );
  }
}
describe('rc-swipeable-tabs', () => {
  it('should render Slider with correct DOM structure', () => {
    const wrapper = render(<NormalTabs />);
    expect(renderToJson(wrapper)).toMatchSnapshot();
  });
  it('create and nav should works', () => {
    const wrapper = render(<NormalTabs />);
    expect(wrapper.find('.rc-tabs').length).toBe(1);
    expect(wrapper.find('.rc-tabs-tab').length).toBe(11);
  });

  it('default active should works', () => {
    const wrapper = mount(<NormalTabs />);
    expect(wrapper.find('.rc-tabs-tab').length).toBe(11);
    expect(wrapper.instance().root.state.activeKey).toBe('8');
    expect(
      wrapper
        .find('.rc-tabs-tab')
        .at(8)
        .hasClass('rc-tabs-tab-active'),
    ).toBe(true);
  });

  it('onChange and onTabClick should works', () => {
    const handleChange = jest.fn();
    const handleTabClick = jest.fn();
    const wrapper = mount(
      <Tabs
        defaultActiveKey="8"
        renderTabBar={() => <SwipeableInkTabBar onTabClick={handleTabClick} />}
        renderTabContent={() => <SwipeableTabContent />}
        onChange={handleChange}
      >
        {makeMultiTabPane(11)}
      </Tabs>,
    );
    const targetTab = wrapper.find('.rc-tabs-tab').at(6);
    targetTab.simulate('click');
    expect(handleTabClick).toHaveBeenCalledWith('6', expect.anything());
    expect(handleChange).toHaveBeenCalledWith('6');
  });
});
