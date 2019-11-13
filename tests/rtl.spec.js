/* eslint-disable no-undef */
import React, { Component } from 'react';
import { mount, render } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import Tabs, { TabPane } from '../src';
import SwipeableTabContent from '../src/SwipeableTabContent';
import SwipeableInkTabBar from '../src/SwipeableInkTabBar';
import ScrollableInkTabBar from '../src/ScrollableInkTabBar';
import InkTabBar from '../src/InkTabBar';
import TabContent from '../src/TabContent';

const contentStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '5rem',
  backgroundColor: '#fff',
};

const makeTabPane = key => (
  <TabPane tab={`tab-${key}`} key={key}>
    <div style={contentStyle}>
      {`tab-${key}-content`}
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

class RtlTabs extends Component {
  render() {
    return (
      <div style={{ width: '750px', height: '1334px' }}>

        <Tabs
          ref={root => { this.root = root; }}
          defaultActiveKey="8"
          renderTabBar={() => <SwipeableInkTabBar ref={tabBar => { this.tabBar = tabBar; }} />}
          renderTabContent={() => <SwipeableTabContent />}
          direction="rtl"
        >
          {makeMultiTabPane(11)}
        </Tabs>
      </div>
    );
  }
}
describe('rc-swipeable-tabs', () => {
  it('should render Slider with correct DOM structure', () => {
    const wrapper = render(<RtlTabs />);
    expect(renderToJson(wrapper)).toMatchSnapshot();
  });
  it('create and nav should works', () => {
    const wrapper = render(<RtlTabs />);
    expect(wrapper.find('.rc-tabs').length).toBe(1);
    expect(wrapper.find('.rc-tabs-tab').length).toBe(11);
  });

  it('default active should works', () => {
    const wrapper = mount(<RtlTabs />);
    expect(wrapper.find('.rc-tabs-tab').length).toBe(11);
    expect(wrapper.instance().root.state.activeKey).toBe('8');
    expect(wrapper.find('.rc-tabs-tab').at(8).hasClass('rc-tabs-tab-active')).toBe(true);
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
        direction="rtl"
      >
        {makeMultiTabPane(11)}
      </Tabs>
    );
    const targetTab = wrapper.find('.rc-tabs-tab').at(6);
    targetTab.simulate('click');
    expect(handleTabClick).toHaveBeenCalledWith('6', expect.anything());
    expect(handleChange).toHaveBeenCalledWith('6');
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
        direction="rtl"
      >
        {makeMultiTabPane(11)}
      </Tabs>
    );
    const targetTab = wrapper.find('.rc-tabs-tab').at(6);
    targetTab.simulate('click');
    expect(handleTabClick).toHaveBeenCalledWith('6', expect.anything());
    expect(handleChange).toHaveBeenCalledWith('6');
  });

  it('Should render swipeable tabbar with correct DOM structure', () => {
    const wrapper = render(
      <Tabs
        renderTabBar={() => <SwipeableInkTabBar />}
        renderTabContent={() => <TabContent />}
        direction="rtl"
      >
        {makeMultiTabPane(11)}
      </Tabs>
    );
    expect(renderToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render scrollable tabbar with correct DOM structure', () => {
    const wrapper = render(
      <Tabs
        renderTabBar={() => <ScrollableInkTabBar />}
        renderTabContent={() => <TabContent />}
        direction="rtl"
      >
        {makeMultiTabPane(11)}
      </Tabs>
    );
    expect(renderToJson(wrapper)).toMatchSnapshot();
  });
  it('`onPrevClick` and `onNextClick` should work', (done) => {
    const onPrevClick = jest.fn();
    const onNextClick = jest.fn();
    const wrapper = mount(
      <Tabs
        defaultActiveKey="1"
        style={{ width: 100 }}
        renderTabBar={() => (
          <ScrollableInkTabBar onPrevClick={onPrevClick} onNextClick={onNextClick} />
        )}
        renderTabContent={() => <TabContent animatedWithMargin />}
        direction="rtl"
      >
        <TabPane tab="tab 1" key="1">first</TabPane>
        <TabPane tab="tab 2" key="2">second</TabPane>
        <TabPane tab="tab 3" key="3">third</TabPane>
      </Tabs>
    );

    // To force Tabs show prev/next button
    const scrollableTabBarNode = wrapper.find('ScrollableTabBarNode').instance();
    scrollableTabBarNode.offset = -1;
    jest.spyOn(scrollableTabBarNode, 'getScrollWH').mockImplementation(() => {
      return 200;
    });
    jest.spyOn(scrollableTabBarNode, 'getOffsetWH').mockImplementation((node) => {
      if (node.className.indexOf('rc-tabs-nav-container') !== -1) {
        return 100;
      }
      if (node.className.indexOf('rc-tabs-nav-wrap') !== -1) {
        return 100;
      }
      return 0;
    });
    wrapper.update();

    setTimeout(() => {
      wrapper.find('.rc-tabs-tab-next').simulate('click');
      expect(onNextClick).toHaveBeenCalled();

      wrapper.find('.rc-tabs-tab-prev').simulate('click');
      expect(onPrevClick).toHaveBeenCalled();

      done();
    }, 50);
  });
  it('activate tab on click should show inkbar', () => {
    const children = [1, 2]
      .map(number => <TabPane tab={number} key={number.toString()}>{number}</TabPane>);
    const wrapper = mount(
      <Tabs
        renderTabBar={() => <InkTabBar />}
        renderTabContent={() => <TabContent animatedWithMargin />}
        direction="rtl"
      >
        {children}
      </Tabs>
    );

    wrapper.find('TabBarTabsNode').find('.rc-tabs-tab').at(1).simulate('click', {});
    expect(wrapper.find('InkTabBarNode').html().indexOf('display: block;') !== -1).toBe(true);
  });

  it('activate tab on click should show inkbar', () => {
    const children = [1, 2]
      .map(number => <TabPane tab={number} key={number.toString()}>{number}</TabPane>);
    const wrapper = mount(
      <Tabs
        renderTabBar={() => <SwipeableInkTabBar />}
        renderTabContent={() => <TabContent />}
        direction="rtl"
      >
        {children}
      </Tabs>
    );

    wrapper.find('SwipeableTabBarNode').find('.rc-tabs-tab').at(1).simulate('click', {});
    expect(wrapper.find('InkTabBarNode').html().indexOf('display: block;') !== -1).toBe(true);
  });
});
