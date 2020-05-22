import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Tabs, { TabPane } from '../src';
import { TabsProps } from '../src/Tabs';
import TabNode from '../src/TabNavList/TabNode';

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

  describe('overflow to collapse into menu', () => {
    it('should collapse', () => {
      jest.useFakeTimers();
      const onChange = jest.fn();
      const wrapper = mount(getTabs({ onChange }));

      wrapper
        .find(TabNode)
        .find('ResizeObserver')
        .forEach(node => {
          (node.props() as any).onResize({ offsetWidth: 20, offsetHeight: 20 });
        });

      (wrapper
        .find('.rc-tabs-nav')
        .find('ResizeObserver')
        .first()
        .props() as any).onResize({ offsetWidth: 40, offsetHeight: 40 });

      act(() => {
        jest.runAllTimers();
        wrapper.update();
      });
      expect(wrapper.find('.rc-tabs-nav-more').render()).toMatchSnapshot();

      // Click to open
      wrapper.find('.rc-tabs-nav-more').simulate('click');
      expect(wrapper.find('.rc-tabs-dropdown li').text()).toEqual('cute');

      // Click to select
      wrapper.find('.rc-tabs-dropdown-menu-item').simulate('click');
      expect(onChange).toHaveBeenCalledWith('cute');

      jest.useRealTimers();
    });
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
});
