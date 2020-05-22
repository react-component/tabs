import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import KeyCode from 'rc-util/lib/KeyCode';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
import { act } from 'react-dom/test-utils';
import Tabs, { TabPane } from '../src';
import { TabsProps } from '../src/Tabs';
import TabNode from '../src/TabNavList/TabNode';

describe('Tabs.Overflow', () => {
  let domSpy: ReturnType<typeof spyElementPrototypes>;
  let buttonSpy: ReturnType<typeof spyElementPrototypes>;
  let holder: HTMLDivElement;

  beforeAll(() => {
    holder = document.createElement('div');
    document.body.appendChild(holder);
    buttonSpy = spyElementPrototypes(HTMLButtonElement, {
      offsetWidth: {
        get: () => 20,
      },
      offsetLeft: {
        get() {
          // Mock button offset
          const btn = this as HTMLButtonElement;
          const btnList = [...btn.parentNode.childNodes];
          return 20 * btnList.indexOf(btn);
        },
      },
    });
    domSpy = spyElementPrototypes(HTMLElement, {
      scrollIntoView: () => {},
    });
  });

  afterAll(() => {
    buttonSpy.mockRestore();
    domSpy.mockRestore();
    document.body.removeChild(holder);
  });

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
        <TabPane tab="disabled" key="disabled" disabled>
          Disabled
        </TabPane>
        <TabPane tab="miu" key="miu">
          Miu
        </TabPane>
      </Tabs>
    );
  }

  function triggerResize(wrapper: ReactWrapper) {
    wrapper
      .find(TabNode)
      .find('ResizeObserver')
      .forEach(node => {
        (node.props() as any).onResize();
      });

    (wrapper
      .find('.rc-tabs-nav')
      .find('ResizeObserver')
      .first()
      .props() as any).onResize({ offsetWidth: 40, offsetHeight: 40 });
  }

  it('should collapse', () => {
    jest.useFakeTimers();
    const onChange = jest.fn();
    const wrapper = mount(getTabs({ onChange }));

    triggerResize(wrapper);
    act(() => {
      jest.runAllTimers();
      wrapper.update();
    });
    expect(wrapper.find('.rc-tabs-nav-more').render()).toMatchSnapshot();

    // Click to open
    wrapper.find('.rc-tabs-nav-more').simulate('click');
    expect(
      wrapper
        .find('.rc-tabs-dropdown li')
        .first()
        .text(),
    ).toEqual('cute');

    // Click to select
    wrapper
      .find('.rc-tabs-dropdown-menu-item')
      .first()
      .simulate('click');
    expect(onChange).toHaveBeenCalledWith('cute');

    wrapper.unmount();

    jest.useRealTimers();
  });

  [KeyCode.SPACE, KeyCode.ENTER].forEach(code => {
    it(`keyboard with select keycode: ${code}`, () => {
      jest.useFakeTimers();
      const onChange = jest.fn();
      const wrapper = mount(getTabs({ onChange }), { attachTo: holder });

      triggerResize(wrapper);
      act(() => {
        jest.runAllTimers();
        wrapper.update();
      });

      // Open
      wrapper.find('.rc-tabs-nav-more').simulate('keydown', {
        which: KeyCode.DOWN,
      });

      // key selection
      function keyMatch(which: number, match: string) {
        wrapper.find('.rc-tabs-nav-more').simulate('keydown', {
          which,
        });
        expect(wrapper.find('.rc-tabs-dropdown-menu-item-selected').text()).toEqual(match);
      }

      keyMatch(KeyCode.DOWN, 'cute');
      keyMatch(KeyCode.DOWN, 'miu');
      keyMatch(KeyCode.UP, 'cute');

      // Select
      wrapper.find('.rc-tabs-nav-more').simulate('keydown', {
        which: code,
      });
      expect(onChange).toHaveBeenCalledWith('cute');

      // Open
      wrapper.find('.rc-tabs-nav-more').simulate('keydown', {
        which: KeyCode.DOWN,
      });
      wrapper.update();
      expect(
        wrapper
          .find('.rc-tabs-dropdown')
          .last()
          .hasClass('rc-tabs-dropdown-hidden'),
      ).toBeFalsy();

      // ESC
      wrapper.find('.rc-tabs-nav-more').simulate('keydown', {
        which: KeyCode.ESC,
      });
      wrapper.update();
      expect(
        wrapper
          .find('.rc-tabs-dropdown')
          .last()
          .hasClass('rc-tabs-dropdown-hidden'),
      ).toBeTruthy();

      wrapper.unmount();

      jest.useRealTimers();
    });
  });
});
