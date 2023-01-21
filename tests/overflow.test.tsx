import { act, fireEvent, render } from '@testing-library/react';
import KeyCode from 'rc-util/lib/KeyCode';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
import React from 'react';
import type { TabsProps } from '../src';
import Tabs from '../src';
import type { HackInfo } from './common/util';
import {
  btnOffsetPosition,
  getOffsetSizeFunc,
  getTabs,
  getTransformX,
  getTransformY,
  triggerResize,
} from './common/util';

describe('Tabs.Overflow', () => {
  let domSpy: ReturnType<typeof spyElementPrototypes>;

  const hackOffsetInfo: HackInfo = {};

  beforeEach(() => {
    Object.keys(hackOffsetInfo).forEach(key => {
      delete hackOffsetInfo[key];
    });
  });

  beforeAll(() => {
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
  });

  it('should collapse', () => {
    jest.useFakeTimers();
    const onChange = jest.fn();
    const { container, unmount } = render(getTabs({ onChange }));

    triggerResize(container);
    act(() => {
      jest.runAllTimers();
    });
    expect(container.querySelector('.rc-tabs-nav-more')).toMatchSnapshot();

    // Click to open
    fireEvent.mouseEnter(container.querySelector('.rc-tabs-nav-more'));

    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelector('.rc-tabs-dropdown li').textContent).toEqual('cute');

    // Click to select
    fireEvent.click(document.querySelector('.rc-tabs-dropdown-menu-item'));
    expect(onChange).toHaveBeenCalledWith('cute');

    unmount();

    jest.useRealTimers();
  });

  [KeyCode.SPACE, KeyCode.ENTER].forEach(code => {
    it(`keyboard with select keycode: ${code}`, () => {
      jest.useFakeTimers();
      const onChange = jest.fn();
      const { container, unmount } = render(getTabs({ onChange }));

      triggerResize(container);
      act(() => {
        jest.runAllTimers();
      });

      // Open
      fireEvent.keyDown(container.querySelector('.rc-tabs-nav-more'), {
        which: KeyCode.DOWN,
        keyCode: KeyCode.DOWN,
        charCode: KeyCode.DOWN,
      });

      // key selection
      function keyMatch(which: number, match: string) {
        fireEvent.keyDown(container.querySelector('.rc-tabs-nav-more'), {
          which,
          keyCode: which,
          charCode: which,
        });

        expect(
          document.querySelector('li.rc-tabs-dropdown-menu-item-selected').textContent,
        ).toEqual(match);
      }

      keyMatch(KeyCode.DOWN, 'cute');
      keyMatch(KeyCode.DOWN, 'miu');
      keyMatch(KeyCode.UP, 'cute');

      // Select
      fireEvent.keyDown(container.querySelector('.rc-tabs-nav-more'), {
        which: code,
        keyCode: code,
        charCode: code,
      });
      expect(onChange).toHaveBeenCalledWith('cute');

      // Open
      fireEvent.keyDown(container.querySelector('.rc-tabs-nav-more'), {
        which: KeyCode.DOWN,
        keyCode: KeyCode.DOWN,
        charCode: KeyCode.DOWN,
      });

      expect(document.querySelector('.rc-tabs-dropdown')).not.toHaveClass(
        'rc-tabs-dropdown-hidden',
      );

      // ESC
      fireEvent.keyDown(container.querySelector('.rc-tabs-nav-more'), {
        which: KeyCode.ESC,
        keyCode: KeyCode.ESC,
        charCode: KeyCode.ESC,
      });

      expect(document.querySelector('.rc-tabs-dropdown')).toHaveClass('rc-tabs-dropdown-hidden');

      unmount();

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
        it(`should tab pos '${tabPosition}' work for ${name}`, () => {
          jest.useFakeTimers();
          const { container, unmount } = render(getTabs({ tabPosition }));

          triggerResize(container);
          act(() => {
            jest.runAllTimers();
          });

          // Wheel to move
          const node = container.querySelector('.rc-tabs-nav-wrap');

          act(() => {
            const wheel = new WheelEvent('wheel', {
              deltaX: x1,
              deltaY: y1,
            });
            node.dispatchEvent(wheel);
            jest.runAllTimers();
          });

          act(() => {
            const wheel = new WheelEvent('wheel', {
              deltaX: x2,
              deltaY: y2,
            });
            node.dispatchEvent(wheel);
            jest.runAllTimers();
          });

          if (tabPosition === 'top') {
            expect(getTransformX(container)).toEqual(-23);
          } else {
            expect(getTransformY(container)).toEqual(-23);
          }

          unmount();
          jest.useRealTimers();
        });
      });
    });

    ['top', 'left'].forEach((tabPosition: any) => {
      it(`no need if place is enough: ${tabPosition}`, () => {
        jest.useFakeTimers();
        const { container } = render(
          getTabs({
            items: [
              {
                key: 'yo',
                children: 'Yo',
              } as any,
            ],
            tabPosition,
          }),
        );

        triggerResize(container);
        act(() => {
          jest.runAllTimers();
        });

        // Wheel to move
        const node = container.querySelector('.rc-tabs-nav-wrap');
        const wheel = new WheelEvent('wheel', {
          deltaX: 20,
          deltaY: 20,
        });
        wheel.preventDefault = jest.fn();

        act(() => {
          node.dispatchEvent(wheel);
          jest.runAllTimers();
        });

        expect(wheel.preventDefault).not.toHaveBeenCalled();
        expect(getTransformX(container)).toEqual(0);

        jest.useRealTimers();
      });
    });
  });

  describe('overflow to scroll', () => {
    it('top', () => {
      jest.useFakeTimers();
      const onTabScroll = jest.fn();
      // light bamboo [cute disabled] miu
      const { container, rerender } = render(getTabs({ activeKey: 'disabled', onTabScroll }));

      triggerResize(container);
      act(() => {
        jest.runAllTimers();
      });
      expect(getTransformX(container)).toEqual(-40);

      // light [bamboo cute] disabled miu
      onTabScroll.mockReset();
      // wrapper.setProps({ activeKey: 'bamboo' });
      rerender(getTabs({ activeKey: 'bamboo', onTabScroll }));
      act(() => {
        jest.runAllTimers();
      });
      expect(getTransformX(container)).toEqual(-20);
      expect(onTabScroll).toHaveBeenCalledWith({ direction: 'left' });

      // scroll to 0 when activeKey is null
      onTabScroll.mockReset();
      // wrapper.setProps({ activeKey: null });
      rerender(getTabs({ activeKey: null, onTabScroll }));
      act(() => {
        jest.runAllTimers();
      });
      expect(getTransformX(container)).toEqual(0);

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
      const { container, rerender } = render(
        getTabs({ activeKey: 'disabled', tabPosition: 'left', onTabScroll }),
      );

      triggerResize(container);
      act(() => {
        jest.runAllTimers();
      });
      expect(getTransformY(container)).toEqual(-40);

      // light [bamboo cute] disabled miu
      onTabScroll.mockReset();
      rerender(getTabs({ activeKey: 'bamboo', tabPosition: 'left', onTabScroll }));
      act(() => {
        jest.runAllTimers();
      });
      expect(getTransformY(container)).toEqual(-20);
      expect(onTabScroll).toHaveBeenCalledWith({ direction: 'top' });

      jest.useRealTimers();
    });
  });

  describe('editable dropdown menu', () => {
    const list: { name: string; trigger: (node: HTMLElement) => void }[] = [
      {
        name: 'click',
        trigger: node => {
          fireEvent.click(node);
        },
      },
    ];

    list.forEach(({ name, trigger }) => {
      it(`remove by ${name} in dropdown menu`, () => {
        jest.useFakeTimers();
        const onEdit = jest.fn();
        const { container, unmount } = render(getTabs({ editable: { onEdit } }));

        triggerResize(container);
        act(() => {
          jest.runAllTimers();
        });

        // Click to open
        fireEvent.mouseEnter(container.querySelector('.rc-tabs-nav-more'));
        act(() => {
          jest.runAllTimers();
        });

        const first = document.querySelector<HTMLElement>('.rc-tabs-dropdown-menu-item-remove');
        trigger(first);

        // Should be button to enable press SPACE key to trigger
        expect(first instanceof HTMLButtonElement).toBeTruthy();

        expect(onEdit).toHaveBeenCalledWith(
          'remove',
          expect.objectContaining({
            key: 'bamboo',
          }),
        );

        unmount();
        jest.useRealTimers();
      });
    });

    it('auto hidden Dropdown', () => {
      jest.useFakeTimers();

      const originItems: TabsProps['items'] = new Array(8).fill(0).map((_, index) => ({
        key: `${index}`,
        label: `Tab ${index + 1}`,
        children: `Tab Content${index + 1}`,
      }));

      const Demo = () => {
        const [items, setItems] = React.useState(originItems);

        return (
          <Tabs
            editable={{
              onEdit(type, { key }) {
                if (type === 'remove') {
                  const nextItems = items.filter(ele => {
                    return ele.key !== key.toString();
                  });
                  setItems(nextItems);
                }
              },
            }}
            items={items}
          />
        );
      };

      const { container, unmount } = render(<Demo />);

      triggerResize(container);

      act(() => {
        jest.runAllTimers();
      });

      // Click to open
      fireEvent.mouseEnter(container.querySelector('.rc-tabs-nav-more'));
      act(() => {
        jest.runAllTimers();
      });

      while (true) {
        const remove = document.querySelector('.rc-tabs-dropdown-menu-item-remove');
        if (!remove) {
          break;
        }

        act(() => {
          fireEvent.click(remove);
        });

        act(() => {
          jest.runAllTimers();
        });
      }

      expect(document.querySelector('.rc-tabs-dropdown-hidden')).toBeTruthy();

      unmount();
    });
  });

  describe('editable', () => {
    it('add tab and setActive immediately', async () => {
      jest.useFakeTimers();

      const onEdit = jest.fn();
      const {container, rerender} = render(getTabs({
        activeKey: '20', editable: { onEdit }, items: Array.from({ length: 20 }).map((_, idx) => {
          return {
            key: String(idx + 1),
            label: String(idx + 1),
            children: String(idx + 1),
          };
        }),
      }));

      await triggerResize(container);
      act(() => {
        jest.runAllTimers();
      });
      expect(getTransformX(container)).toEqual(-370);

      fireEvent.click(container.querySelector('.rc-tabs-nav-operations .rc-tabs-nav-add'));
      expect(onEdit).toHaveBeenCalledWith('add', {
        key: undefined,
        event: expect.anything(),
      });
      rerender(getTabs({
        activeKey: '21', editable: { onEdit }, items: Array.from({ length: 21 }).map((_, idx) => {
          return {
            key: String(idx + 1),
            label: String(idx + 1),
            children: String(idx + 1),
          };
        }),
      }));

      await triggerResize(container);
      act(() => {
        jest.runAllTimers();
      });
      expect(getTransformX(container)).toEqual(-390);

      jest.useRealTimers();
    });
  });

  it('should calculate hidden tabs correctly', () => {
    jest.useFakeTimers();
    const onEdit = jest.fn();
    const { container } = render(getTabs({ editable: { onEdit }, activeKey: 'miu' }));

    triggerResize(container);
    act(() => {
      jest.runAllTimers();
    });

    fireEvent.mouseEnter(container.querySelector('.rc-tabs-nav-more'));
    act(() => {
      jest.runAllTimers();
    });
    expect(document.querySelector('.rc-tabs-dropdown-menu').textContent).not.toContain('miu');
  });

  it('should support getPopupContainer', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    expect(div.childNodes.length).toBeFalsy();

    const getPopupContainer = () => div;
    const { container } = render(getTabs({ getPopupContainer }));
    fireEvent.mouseEnter(container.querySelector('.rc-tabs-nav-more'));
    act(() => {
      jest.runAllTimers();
    });

    expect(div.childNodes.length).toBeTruthy();

    document.body.removeChild(div);
  });

  it('should support popupClassName', () => {
    jest.useFakeTimers();
    const { container } = render(getTabs({ popupClassName: 'custom-popup' }));

    triggerResize(container);
    act(() => {
      jest.runAllTimers();
    });

    fireEvent.mouseEnter(container.querySelector('.rc-tabs-nav-more'));
    act(() => {
      jest.runAllTimers();
    });
    expect(document.querySelector('.rc-tabs-dropdown')).toHaveClass('custom-popup');
  });
});
