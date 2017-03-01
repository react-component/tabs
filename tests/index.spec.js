/* eslint-disable no-undef */
import React, { Component } from 'react';
import { mount, render } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import Tabs, { TabPane } from '../index';
import TabContent from '../src/TabContent';
import ScrollableInkTabBar from '../src/ScrollableInkTabBar';

class NormoalTabs extends Component {
  getRoot() {
    return this.refs.root;
  }
  render() {
    return (
      <Tabs
        ref="root"
        defaultActiveKey="2"
        renderTabBar={() => <ScrollableInkTabBar/>}
        renderTabContent={() => <TabContent/>}
      >
        <TabPane tab="tab 1" key="1">first</TabPane>
        <TabPane tab="tab 2" key="2">second</TabPane>
        <TabPane tab="tab 3" key="3">third</TabPane>
      </Tabs>
    );
  }
}

describe('rc-tabs', () => {
  it('should render Slider with correct DOM structure', () => {
    const wrapper = render(<NormoalTabs/>);
    expect(renderToJson(wrapper)).toMatchSnapshot();
  });

  it('create and nav should works', () => {
    const wrapper = render(<NormoalTabs/>);
    expect(wrapper.find('.rc-tabs').length).toBe(1);
    expect(wrapper.find('.rc-tabs-tab').length).toBe(3);
  });

  it('default active should works', () => {
    const wrapper = mount(<NormoalTabs/>);
    expect(wrapper.find('.rc-tabs-tab').length).toBe(3);
    expect(wrapper.instance().getRoot().state.activeKey).toBe('2');
    expect(wrapper.find('.rc-tabs-tab').at(1).hasClass('rc-tabs-tab-active')).toBe(true);
  });

  it('onChange and onTabClick should works', () => {
    const handleChange = jest.fn();
    const handleTabClick = jest.fn();
    const wrapper = mount(
      <Tabs
        defaultActiveKey="1"
        renderTabBar={() => <ScrollableInkTabBar onTabClick={handleTabClick} />}
        renderTabContent={() => <TabContent/>}
        onChange={handleChange}
      >
        <TabPane tab="tab 1" key="1">first</TabPane>
        <TabPane tab="tab 2" key="2">second</TabPane>
        <TabPane tab="tab 3" key="3">third</TabPane>
      </Tabs>
    );
    const targetTab = wrapper.find('.rc-tabs-tab').at(2);
    targetTab.simulate('click');
    expect(handleTabClick).toHaveBeenCalledWith('3');
    expect(handleChange).toHaveBeenCalledWith('3');
  });
});
