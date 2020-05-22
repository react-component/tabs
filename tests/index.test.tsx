import React from 'react';
import { mount } from 'enzyme';
import Tabs, { TabPane } from '../src';
import { TabsProps } from '../src/Tabs';

describe('Tabs.Basic', () => {
  function getTabs(props: TabsProps = null) {
    return (
      <Tabs {...props}>
        <TabPane tab="light" key="light">
          Light
        </TabPane>
        <TabPane tab="bamboo" key="bamboo">
          Bamboo
        </TabPane>
        <TabPane tab="cute" key="cute">
          Cute
        </TabPane>
      </Tabs>
    );
  }

  it('Normal', () => {
    const wrapper = mount(getTabs({ defaultActiveKey: 'bamboo' }));

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('onChange and onTabClick should work', () => {
    const onChange = jest.fn();
    const onTabClick = jest.fn();
    const wrapper = mount(getTabs({ onChange, onTabClick }));
    const targetTab = wrapper.find('.rc-tabs-tab').at(2);
    targetTab.simulate('click');
    expect(onTabClick).toHaveBeenCalledWith('cute', expect.anything());
    expect(onChange).toHaveBeenCalledWith('cute');
  });

  it('active first tab when children is changed', () => {
    const wrapper = mount(getTabs());
    wrapper.setProps({
      children: (
        <TabPane tab="Yo" key="2333">
          New
        </TabPane>
      ),
    });

    expect(wrapper.find('.rc-tabs-tab-active').text()).toEqual('Yo');
  });

  it('active first tab when children is not changed at controlled mode', () => {
    const wrapper = mount(getTabs({ activeKey: 'light' }));
    expect(wrapper.find('.rc-tabs-tab-active').text()).toEqual('light');

    wrapper.setProps({
      children: (
        <TabPane tab="Yo" key="2333">
          New
        </TabPane>
      ),
    });
    expect(wrapper.find('.rc-tabs-tab-active')).toHaveLength(0);
  });

  it('tabBarGutter should work', () => {
    const topTabs = mount(getTabs({ tabBarGutter: 23 }));
    expect(
      topTabs
        .find('.rc-tabs-tab')
        .first()
        .props().style.marginRight,
    ).toEqual(23);

    const rightTabs = mount(getTabs({ tabBarGutter: 33, tabPosition: 'right' }));
    expect(
      rightTabs
        .find('.rc-tabs-tab')
        .first()
        .props().style.marginBottom,
    ).toEqual(33);
  });

  it('tabNavBar', () => {
    const renderTabBar = jest.fn((props, Component) => {
      return (
        <div className="my-wrapper">
          <Component {...props}>{node => <span className="my-node">{node}</span>}</Component>
        </div>
      );
    });
    const wrapper = mount(getTabs({ renderTabBar }));
    expect(wrapper.find('.my-wrapper').length).toBeTruthy();
    expect(wrapper.find('.my-node').length).toBeTruthy();
    expect(renderTabBar).toHaveBeenCalled();
  });
});
