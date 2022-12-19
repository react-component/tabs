import { render } from '@testing-library/react';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
import React from 'react';
import { act } from 'react-dom/test-utils';
import type { TabsProps } from '../src';
import Tabs from '../src';
import { btnOffsetPosition, getOffsetSizeFunc, getTransformX } from './common/util';

jest.mock('rc-util/lib/isMobile', () => () => true);

describe('Tabs.Mobile', () => {
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

    beforeAll(() => {
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
      domSpy.mockRestore();
    });

    function touchMove(container: HTMLElement, jest: any, offsetX: number[] | number) {
      act(() => {
        jest.runAllTimers();
      });

      // Touch to move
      const node = container.querySelector('.rc-tabs-nav-wrap');

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

        act(() => {
          jest.advanceTimersByTime(10);
        });
      }

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
      });
    }

    describe('LTR', () => {
      it('slow move', () => {
        jest.useFakeTimers();
        const { container } = render(getTabs({ tabPosition: 'top' }));

        // Last touch is slow move
        touchMove(container, jest, [-100, 0.05]);

        expect(getTransformX(container)).toEqual(-99.95);

        jest.useRealTimers();
      });

      it('swipe', () => {
        jest.useFakeTimers();
        const { container } = render(getTabs({ tabPosition: 'top' }));

        act(() => {
          jest.runAllTimers();
        });
        expect(container.querySelector('.rc-tabs-nav-more')).toBeFalsy();

        touchMove(container, jest, -200);

        expect(getTransformX(container) < -200).toBeTruthy();

        jest.useRealTimers();
      });

      it('not out of the edge', () => {
        jest.useFakeTimers();
        const { container } = render(getTabs({ tabPosition: 'top' }));

        touchMove(container, jest, 100);

        expect(getTransformX(container)).toEqual(0);

        jest.useRealTimers();
      });
    });

    describe('RTL', () => {
      it('not out of the edge', () => {
        jest.useFakeTimers();
        const { container } = render(getTabs({ direction: 'rtl' }));

        touchMove(container, jest, -100);

        expect(getTransformX(container)).toEqual(0);

        jest.useRealTimers();
      });
    });
  });
});
