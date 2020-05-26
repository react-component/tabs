import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import KeyCode from 'rc-util/lib/KeyCode';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
import { act } from 'react-dom/test-utils';
import Tabs, { TabPane } from '../src';
import { TabsProps } from '../src/Tabs';

describe('Tabs.Overflow', () => {
  let scrollLeft: number = 0;
  let domSpy: ReturnType<typeof spyElementPrototypes>;
  let buttonSpy: ReturnType<typeof spyElementPrototypes>;
  let holder: HTMLDivElement;
  let rtl = false;

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
          const index = btnList.indexOf(btn);
          if (rtl) {
            return 20 * (btnList.length - index - 1);
          }
          return 20 * index;
        },
      },
    });
    domSpy = spyElementPrototypes(HTMLElement, {
      scrollIntoView: () => {},
      scrollLeft: {
        get: () => scrollLeft,
        set: (_: any, val: number) => {
          scrollLeft = val;
        },
      } as any,
      offsetWidth: {
        get: () => 40,
      },
      offsetHeight: {
        get: () => 40,
      },
      scrollWidth: {
        get: () => 5 * 20,
      },
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
    (wrapper
      .find('.rc-tabs-nav')
      .find('ResizeObserver')
      .first()
      .props() as any).onResize();
  }

  describe('LTR', () => {
    beforeAll(() => {
      rtl = false;
    });

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
      wrapper.find('.rc-tabs-nav-more').simulate('mouseenter');
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

  describe('RTL', () => {
    beforeAll(() => {
      rtl = true;
    });

    it('overflow to scroll', () => {
      /**
       * Miu Disabled [Cute Bamboo] Light
       */
      jest.useFakeTimers();
      const wrapper = mount(getTabs({ direction: 'rtl', defaultActiveKey: 'cute' }));
      triggerResize(wrapper);
      act(() => {
        jest.runAllTimers();
        wrapper.update();
      });
      expect(scrollLeft).toEqual(40);
      jest.useRealTimers();
    });
  });
});
