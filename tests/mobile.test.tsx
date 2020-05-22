import React from 'react';
import { mount } from 'enzyme';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
import { act } from 'react-dom/test-utils';
import Tabs, { TabPane } from '../src';
import { TabsProps } from '../src/Tabs';
import TabNode from '../src/TabNavList/TabNode';
import { TabPosition } from '../src/interface';

describe('Tabs.Mobile', () => {
  function getTabs(props: TabsProps = null) {
    const children: React.ReactElement[] = [];
    for (let i = 0; i < 100; i += 1) {
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
    const originAgent = navigator.userAgent;

    beforeAll(() => {
      Object.defineProperty(window.navigator, 'userAgent', {
        value:
          'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Mobile Safari/537.36',
      });

      domSpy = spyElementPrototypes(HTMLButtonElement, {
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
    });

    afterAll(() => {
      Object.defineProperty(window.navigator, 'userAgent', {
        value: originAgent,
      });
      domSpy.mockRestore();
    });

    const list: { position: TabPosition }[] = [{ position: 'top' }, { position: 'left' }];
    list.forEach(({ position }) => {
      it('touchable', () => {
        jest.useFakeTimers();
        const onChange = jest.fn();
        const wrapper = mount(getTabs({ onChange, tabPosition: position }));

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

        act(() => {
          jest.runAllTimers();
          wrapper.update();
        });
        expect(wrapper.find('.rc-tabs-nav-more')).toHaveLength(0);

        // Touch to move
        wrapper.find('.rc-tabs-nav-wrap').simulate('touchstart', {
          touches: [{ screenX: 0, screenY: 0 }],
        });

        // First move
        act(() => {
          const moveEvent1 = new TouchEvent('touchmove', {
            touches: [{ screenX: 0, screenY: 0 } as any],
          });
          document.dispatchEvent(moveEvent1);
        });

        // Second move
        act(() => {
          const moveEvent2 = new TouchEvent('touchmove', {
            touches: [{ screenX: -200, screenY: -200 } as any],
          });
          document.dispatchEvent(moveEvent2);
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

        if (position === 'top') {
          expect(
            ((wrapper.find('.rc-tabs-nav-wrap').instance() as unknown) as HTMLDivElement)
              .scrollLeft > 200,
          ).toBeTruthy();
        } else {
          expect(
            ((wrapper.find('.rc-tabs-nav-wrap').instance() as unknown) as HTMLDivElement)
              .scrollTop > 200,
          ).toBeTruthy();
        }

        jest.useRealTimers();
      });
    });
  });
});
