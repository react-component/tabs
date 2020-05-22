import React from 'react';
import { mount } from 'enzyme';
import Tabs, { TabPane } from '../src';

describe('Tabs.Basic', () => {
  it('Normal', () => {
    const wrapper = mount(
      <Tabs defaultActiveKey="2">
        <TabPane tab="tab 1" key="1">
          first
        </TabPane>
        <TabPane tab="tab 2" key="2">
          second
        </TabPane>
        <TabPane tab="tab 3" key="3">
          third
        </TabPane>
      </Tabs>,
    );

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('onChange and onTabClick should work', () => {
    const onChange = jest.fn();
    const onTabClick = jest.fn();
    const wrapper = mount(
      <Tabs defaultActiveKey="1" onChange={onChange} onTabClick={onTabClick}>
        <TabPane tab="tab 1" key="1">
          first
        </TabPane>
        <TabPane tab="tab 2" key="2">
          second
        </TabPane>
        <TabPane tab="tab 3" key="3">
          third
        </TabPane>
      </Tabs>,
    );
    const targetTab = wrapper.find('.rc-tabs-tab').at(2);
    targetTab.simulate('click');
    expect(onTabClick).toHaveBeenCalledWith('3', expect.anything());
    expect(onChange).toHaveBeenCalledWith('3');
  });
});
