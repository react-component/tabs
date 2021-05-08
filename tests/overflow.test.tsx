import React from 'react';
import { mount } from 'enzyme';
import KeyCode from 'rc-util/lib/KeyCode';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
import { act } from 'react-dom/test-utils';
import {
  getOffsetSizeFunc,
  getTabs,
  triggerResize,
  getTransformX,
  getTransformY,
} from './common/util';
import { TabPane } from '../src';

describe('Tabs.Overflow', () => {
  let domSpy: ReturnType<typeof spyElementPrototypes>;
  let holder: HTMLDivElement;

  const hackOffsetInfo: { list?: number } = {};

  beforeAll(() => {
    holder = document.createElement('div');
    document.body.appendChild(holder);

    function btnOffsetPosition() {
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      const btn = this as HTMLButtonElement;
      const btnList = Array.from(btn.parentNode.childNodes).filter((ele) =>
        (ele as HTMLElement).className.includes('rc-tabs-tab'),
      );
      const index = btnList.indexOf(btn);
      return 20 * index;
    }

    domSpy = spyElementPrototypes(HTMLElement, {
      scrollIntoView: () => {},
      offsetWidth: {
        get: getOffsetSizeFunc(hackOffsetInfo),
      },
      offsetHeight: {
        get: getOffsetSizeFunc(hackOffsetInfo),
      },
      offsetLeft: {
        get: btnOffsetPosition,
      },
      offsetTop: {
        get: btnOffsetPosition,
      },
    });
  });

  afterAll(() => {
    domSpy.mockRestore();
    document.body.removeChild(holder);
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
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('.rc-tabs-dropdown li').first().text()).toEqual('cute');

    // Click to select
    wrapper.find('.rc-tabs-dropdown-menu-item').first().simulate('click');
    expect(onChange).toHaveBeenCalledWith('cute');

    wrapper.unmount();

    jest.useRealTimers();
  });

  [KeyCode.SPACE, KeyCode.ENTER].forEach((code) => {
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
        expect(wrapper.find('li.rc-tabs-dropdown-menu-item-selected').text()).toEqual(match);
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
        wrapper.find('.rc-tabs-dropdown').last().hasClass('rc-tabs-dropdown-hidden'),
      ).toBeFalsy();

      // ESC
      wrapper.find('.rc-tabs-nav-more').simulate('keydown', {
        which: KeyCode.ESC,
      });
      wrapper.update();
      expect(
        wrapper.find('.rc-tabs-dropdown').last().hasClass('rc-tabs-dropdown-hidden'),
      ).toBeTruthy();

      wrapper.unmount();

      jest.useRealTimers();
    });
  });

  describe('wheel', () => {
    const list: { name: string; x1: number; y1: number; x2: number; y2: number }[] = [
      {
        name: 'deltaX',
        x1: 20,
        y1: 5,
        x2: 3,
        y2: -3,
      },
      {
        name: 'deltaY',
        y1: 20,
        x1: 5,
        y2: 3,
        x2: -3,
      },
    ];

    ['top', 'left'].forEach((tabPosition: any) => {
      list.forEach(({ name, x1, y1, x2, y2 }) => {
        it(`should ${tabPosition} work for ${name}`, () => {
          jest.useFakeTimers();
          const wrapper = mount(getTabs({ tabPosition }), { attachTo: holder });

          triggerResize(wrapper);
          act(() => {
            jest.runAllTimers();
            wrapper.update();
          });

          // Wheel to move
          const node = (wrapper.find('.rc-tabs-nav-wrap').instance() as unknown) as HTMLElement;

          act(() => {
            const touchStart = new WheelEvent('wheel', {
              deltaX: x1,
              deltaY: y1,
            });
            node.dispatchEvent(touchStart);
            jest.runAllTimers();
          });

          act(() => {
            const touchStart = new WheelEvent('wheel', {
              deltaX: x2,
              deltaY: y2,
            });
            node.dispatchEvent(touchStart);
            jest.runAllTimers();
          });

          wrapper.update();
          if (tabPosition === 'top') {
            expect(getTransformX(wrapper)).toEqual(-23);
          } else {
            expect(getTransformY(wrapper)).toEqual(-23);
          }

          wrapper.unmount();
          jest.useRealTimers();
        });
      });
    });

    ['top', 'left'].forEach((tabPosition: any) => {
      it(`no need if place is enough: ${tabPosition}`, () => {
        hackOffsetInfo.list = 20;

        jest.useFakeTimers();
        const wrapper = mount(getTabs({ children: [<TabPane key="yo">Yo</TabPane>], tabPosition }));

        triggerResize(wrapper);
        act(() => {
          jest.runAllTimers();
          wrapper.update();
        });

        // Wheel to move
        const node = (wrapper.find('.rc-tabs-nav-wrap').instance() as unknown) as HTMLElement;
        const touchStart = new WheelEvent('wheel', {
          deltaX: 20,
          deltaY: 20,
        });
        touchStart.preventDefault = jest.fn();

        act(() => {
          node.dispatchEvent(touchStart);
          jest.runAllTimers();
        });

        expect(touchStart.preventDefault).not.toHaveBeenCalled();
        expect(getTransformX(wrapper)).toEqual(0);

        jest.useRealTimers();
        hackOffsetInfo.list = undefined;
      });
    });
  });

  describe('overflow to scroll', () => {
    it('top', () => {
      jest.useFakeTimers();
      const onTabScroll = jest.fn();
      // light bamboo [cute disabled] miu
      const wrapper = mount(getTabs({ activeKey: 'disabled', onTabScroll }));

      triggerResize(wrapper);
      act(() => {
        jest.runAllTimers();
        wrapper.update();
      });
      expect(getTransformX(wrapper)).toEqual(-40);

      // light [bamboo cute] disabled miu
      onTabScroll.mockReset();
      wrapper.setProps({ activeKey: 'bamboo' });
      act(() => {
        jest.runAllTimers();
        wrapper.update();
      });
      expect(getTransformX(wrapper)).toEqual(-20);
      expect(onTabScroll).toHaveBeenCalledWith({ direction: 'left' });

      // scroll to 0 when activeKey is null
      onTabScroll.mockReset();
      wrapper.setProps({ activeKey: null });
      act(() => {
        jest.runAllTimers();
        wrapper.update();
      });
      expect(getTransformX(wrapper)).toEqual(0);

      jest.useRealTimers();
    });

    it('left', () => {
      jest.useFakeTimers();
      const onTabScroll = jest.fn();
      /**
       *    light        light
       *    bamboo      --------
       *   --------      bamboo
       *     cute         cute
       *   disabled     --------
       *   --------     disabled
       *     miu          miu
       */
      const wrapper = mount(getTabs({ activeKey: 'disabled', tabPosition: 'left', onTabScroll }));

      triggerResize(wrapper);
      act(() => {
        jest.runAllTimers();
        wrapper.update();
      });
      expect(getTransformY(wrapper)).toEqual(-40);

      // light [bamboo cute] disabled miu
      onTabScroll.mockReset();
      wrapper.setProps({ activeKey: 'bamboo' });
      act(() => {
        jest.runAllTimers();
        wrapper.update();
      });
      expect(getTransformY(wrapper)).toEqual(-20);
      expect(onTabScroll).toHaveBeenCalledWith({ direction: 'top' });

      jest.useRealTimers();
    });
  });
});
