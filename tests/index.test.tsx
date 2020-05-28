import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import KeyCode from 'rc-util/lib/KeyCode';
import Tabs, { TabPane } from '../src';
import { TabsProps } from '../src/Tabs';

describe('Tabs.Basic', () => {
  function getTabs(props: TabsProps = null) {
    const mergedProps = {
      children: [
        <TabPane tab="light" key="light">
          Light
        </TabPane>,
        <TabPane tab="bamboo" key="bamboo">
          Bamboo
        </TabPane>,
        <TabPane tab="cute" key="cute">
          Cute
        </TabPane>,
      ],
      ...props,
    };

    return <Tabs {...mergedProps} />;
  }

  it('Normal', () => {
    const wrapper = mount(getTabs({ defaultActiveKey: 'bamboo' }));

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('nothing for empty tabs', () => {
    mount(getTabs({ children: null }));
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
    wrapper.update();

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

  it('destroyInactiveTabPane', () => {
    const wrapper = mount(
      getTabs({
        activeKey: 'light',
        destroyInactiveTabPane: true,
        children: [<TabPane key="light">Light</TabPane>, <TabPane key="bamboo">Bamboo</TabPane>],
      }),
    );

    function matchText(light: string, bamboo: string) {
      expect(
        wrapper
          .find('.rc-tabs-tabpane')
          .first()
          .text(),
      ).toEqual(light);
      expect(
        wrapper
          .find('.rc-tabs-tabpane')
          .last()
          .text(),
      ).toEqual(bamboo);
    }

    matchText('Light', '');

    wrapper.setProps({ activeKey: 'bamboo' });
    matchText('', 'Bamboo');
  });

  describe('editable', () => {
    it('no and', () => {
      const onEdit = jest.fn();
      const wrapper = mount(getTabs({ editable: { onEdit, showAdd: false } }));
      expect(wrapper.find('.rc-tabs-nav-add')).toHaveLength(0);
    });

    it('add', () => {
      const onEdit = jest.fn();
      const wrapper = mount(getTabs({ editable: { onEdit } }));
      wrapper
        .find('.rc-tabs-nav-add')
        .first()
        .simulate('click');
      expect(onEdit).toHaveBeenCalledWith('add', {
        key: undefined,
        event: expect.anything(),
      });
    });

    const list: { name: string; trigger: (node: ReactWrapper) => void }[] = [
      {
        name: 'click',
        trigger: node => {
          node.simulate('click');
        },
      },
      {
        name: 'key',
        trigger: node => {
          node.simulate('keydown', {
            which: KeyCode.SPACE,
          });
        },
      },
    ];

    list.forEach(({ name, trigger }) => {
      it(`remove by ${name}`, () => {
        const onEdit = jest.fn();
        const wrapper = mount(getTabs({ editable: { onEdit } }));

        const first = wrapper.find('.rc-tabs-tab-remove').first();
        trigger(first);

        expect(onEdit).toHaveBeenCalledWith('remove', {
          key: 'light',
          event: expect.anything(),
        });
      });
    });
  });

  it('extra', () => {
    const wrapper = mount(getTabs({ tabBarExtraContent: 'Bamboo' }));
    expect(wrapper.find('.rc-tabs-extra-content').text()).toEqual('Bamboo');
  });

  describe('animated', () => {
    it('false', () => {
      const wrapper = mount(getTabs({ animated: false }));
      expect(wrapper.find('TabPanelList').prop('animated')).toEqual({
        inkBar: false,
        tabPane: false,
      });
    });

    it('true', () => {
      const wrapper = mount(getTabs({ animated: true }));
      expect(wrapper.find('TabPanelList').prop('animated')).toEqual({
        inkBar: true,
        tabPane: false,
      });
    });

    it('customize', () => {
      const wrapper = mount(getTabs({ animated: { inkBar: false, tabPane: true } }));
      expect(wrapper.find('TabPanelList').prop('animated')).toEqual({
        inkBar: false,
        tabPane: true,
      });
    });
  });

  it('focus to scroll', () => {
    const wrapper = mount(getTabs());
    wrapper
      .find('.rc-tabs-tab')
      .first()
      .simulate('focus');

    wrapper.unmount();
  });
});
