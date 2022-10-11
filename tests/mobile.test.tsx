import React from 'react';
import { mount } from 'enzyme';
import type { ReactWrapper } from 'enzyme';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
import { act } from 'react-dom/test-utils';
import Tabs from '../src';
import type { TabsProps } from '../src';
import { btnOffsetPosition, getOffsetSizeFunc, getTransformX } from './common/util';

describe('Tabs.Mobile', () => {
  const originAgent = navigator.userAgent;

  beforeAll(() => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Mobile Safari/537.36',
    });
  });

  afterAll(() => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: originAgent,
    });
  });

  const tabCount = 100;

  function getTabs(props: TabsProps = null) {
    const items: TabsProps['items'] = [];
    for (let i = 0; i < tabCount; i += 1) {
      items.push({
        label: i,
        key: String(i),
        children: i,
      });
    }

    return <Tabs {...props} items={items} />;
  }

  describe('mobile is scrollable', () => {
    let domSpy: ReturnType<typeof spyElementPrototypes>;
    let btnSpy: ReturnType<typeof spyElementPrototypes>;
    let dateSpy: ReturnType<typeof jest.spyOn>;
    let timestamp: number = 0;

    beforeAll(() => {
      dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => timestamp);

      domSpy = spyElementPrototypes(HTMLElement, {
        scrollIntoView: () => {},
        offsetWidth: {
          get: getOffsetSizeFunc(),
        },
        offsetHeight: {
          get: getOffsetSizeFunc(),
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
      btnSpy.mockRestore();
      domSpy.mockRestore();
      dateSpy.mockRestore();
    });

    function touchMove(wrapper: ReactWrapper, jest: any, offsetX: number[] | number) {
      act(() => {
        jest.runAllTimers();
        wrapper.update();
      });

      // Touch to move
      const node = wrapper.find('.rc-tabs-nav-wrap').instance() as unknown as HTMLElement;

      act(() => {
        const touchStart = new TouchEvent('touchstart', {
          touches: [{ screenX: 0, screenY: 0 } as any],
        });
        node.dispatchEvent(touchStart);
      });

      let screenX: number = 0;
      let screenY: number = 0;
      const offsetXs = Array.isArray(offsetX) ? offsetX : [offsetX];

      function trigger(x = 0, y = 0) {
        screenX += x;
        screenY += y;

        act(() => {
          const moveEvent1 = new TouchEvent('touchmove', {
            touches: [{ screenX, screenY } as any],
          });
          document.dispatchEvent(moveEvent1);
        });

        timestamp += 10;
      }

      // Init
      timestamp = 0;

      // First move
      trigger();

      offsetXs.forEach(x => {
        trigger(x);
      });

      // Release
      act(() => {
        const endEvent = new TouchEvent('touchend', {});
        document.dispatchEvent(endEvent);
      });

      // Execution swipe
      act(() => {
        jest.runAllTimers();
        wrapper.update();
      });
    }

    describe('LTR', () => {
      it('slow move', () => {
        jest.useFakeTimers();
        const wrapper = mount(getTabs({ tabPosition: 'top' }));

        // Last touch is slow move
        touchMove(wrapper, jest, [-100, 0.05]);

        expect(getTransformX(wrapper)).toEqual(-99.95);

        jest.useRealTimers();
      });

      it('swipe', () => {
        jest.useFakeTimers();
        const wrapper = mount(getTabs({ tabPosition: 'top' }));

        act(() => {
          jest.runAllTimers();
          wrapper.update();
        });
        expect(wrapper.find('.rc-tabs-nav-more')).toHaveLength(0);

        touchMove(wrapper, jest, -200);

        wrapper.update();
        expect(getTransformX(wrapper) < -200).toBeTruthy();

        jest.useRealTimers();
      });

      it('not out of the edge', () => {
        jest.useFakeTimers();
        const wrapper = mount(getTabs({ tabPosition: 'top' }));

        touchMove(wrapper, jest, 100);

        wrapper.update();
        expect(getTransformX(wrapper)).toEqual(0);

        jest.useRealTimers();
      });
    });

    describe('RTL', () => {
      it('not out of the edge', () => {
        jest.useFakeTimers();
        const wrapper = mount(getTabs({ direction: 'rtl' }));

        touchMove(wrapper, jest, -100);

        wrapper.update();
        expect(getTransformX(wrapper)).toEqual(0);

        jest.useRealTimers();
      });
    });
  });
});
