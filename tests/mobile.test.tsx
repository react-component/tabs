import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
import { act } from 'react-dom/test-utils';
import Tabs, { TabPane } from '../src';
import { TabsProps } from '../src/Tabs';
import { getTransformX } from './common/util';

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
    const children: React.ReactElement[] = [];
    for (let i = 0; i < tabCount; i += 1) {
      children.push(
        <TabPane tab={i} key={i}>
          {i}
        </TabPane>,
      );
    }

    return <Tabs {...props}>{children}</Tabs>;
  }

  describe('mobile is scrollable', () => {
    let domSpy: ReturnType<typeof spyElementPrototypes>;
    let btnSpy: ReturnType<typeof spyElementPrototypes>;
    let dateSpy: ReturnType<typeof jest.spyOn>;
    let timestamp: number = 0;
    let rtl = false;

    beforeAll(() => {
      dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => timestamp);

      btnSpy = spyElementPrototypes(HTMLButtonElement, {
        offsetWidth: {
          get: () => 20,
        },
        offsetLeft: {
          get() {
            // Mock button offset
            const btn = this as HTMLButtonElement;
            const btnList = [...btn.parentNode.childNodes].filter(ele =>
              (ele as HTMLElement).className.includes('rc-tabs-tab'),
            );
            const index = btnList.indexOf(btn);
            if (rtl) {
              return 20 * (btnList.length - index - 1);
            }
            return 20 * index;
          },
        },
      });

      domSpy = spyElementPrototypes(HTMLDivElement, {
        offsetWidth: {
          get() {
            if (this.className.includes('rc-tabs-tab')) {
              return 20;
            }
            if (this.className.includes('rc-tabs-nav-list')) {
              return tabCount * 20;
            }
            if (this.className.includes('rc-tabs-nav-wrap')) {
              return 40;
            }
            if (this.className.includes('rc-tabs-nav-operations')) {
              return 5;
            }
            throw new Error(`className not match ${this.className}`);
          },
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
      const node = (wrapper.find('.rc-tabs-nav-wrap').instance() as unknown) as HTMLElement;

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
      beforeAll(() => {
        rtl = false;
      });

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
      beforeAll(() => {
        rtl = true;
      });

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
