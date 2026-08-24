import { render } from '@testing-library/react';
import { spyElementPrototypes } from '@rc-component/util';
import { act } from 'react-dom/test-utils';
import { getOffsetSizeFunc, getTabs, getTransformX, triggerResize } from './common/util';

// Same as `overflow.test.tsx` but use in RTL

describe('Tabs.RTL', () => {
  let domSpy: ReturnType<typeof spyElementPrototypes>;
  let holder: HTMLDivElement;

  beforeAll(() => {
    holder = document.createElement('div');
    document.body.appendChild(holder);

    domSpy = spyElementPrototypes(HTMLElement, {
      scrollIntoView: () => {},
      offsetWidth: {
        get: getOffsetSizeFunc(),
      },
      offsetHeight: {
        get: getOffsetSizeFunc(),
      },
      scrollWidth: {
        get: () => 5 * 20,
      },
      offsetLeft: {
        get() {
          // Mock button offset
          const btn = this as HTMLButtonElement;
          const btnList = Array.from(btn.parentNode.childNodes).filter(ele =>
            (ele as HTMLElement).className.includes('rc-tabs-tab'),
          );
          const index = btnList.indexOf(btn);
          return 20 * (btnList.length - index - 1);
        },
      },
    });
  });

  afterAll(() => {
    domSpy.mockRestore();
    document.body.removeChild(holder);
  });

  it('overflow to scroll', () => {
    // Miu [Disabled Cute] Bamboo Light
    jest.useFakeTimers();
    const { container, rerender } = render(
      getTabs({ direction: 'rtl', defaultActiveKey: 'disabled' }),
    );

    triggerResize(container);
    act(() => {
      jest.runAllTimers();
    });
    expect(getTransformX(container)).toEqual(40);

    // Miu Disabled [Cute Bamboo] Light
    rerender(getTabs({ direction: 'rtl', defaultActiveKey: 'disabled', activeKey: 'bamboo' }));
    act(() => {
      jest.runAllTimers();
    });

    expect(getTransformX(container)).toEqual(20);

    jest.useRealTimers();
  });

  // RTL mirrors LTR: `disabled` sits at right=60/width=20 with a 40px viewport,
  // so start=60 / center=50 / end=40. Ratios clamp to [0,1]: 1.5 → end, -0.5 → start.
  describe('scrollPosition', () => {
    const layouts: { position: any; expected: number }[] = [
      { position: 'auto' as const, expected: 40 },
      { position: 'start' as const, expected: 60 },
      { position: 'center' as const, expected: 50 },
      { position: 'end' as const, expected: 40 },
      { position: 0.25 as const, expected: 55 },
      { position: 0.5 as const, expected: 50 },
      { position: 1 as const, expected: 40 },
      { position: 1.5 as const, expected: 40 },
      { position: -0.5 as const, expected: 60 },
    ];

    it.each(layouts)('rtl: $position', ({ position, expected }) => {
      jest.useFakeTimers();
      const { container } = render(
        getTabs({ direction: 'rtl', defaultActiveKey: 'disabled', scrollPosition: position }),
      );
      triggerResize(container);
      act(() => {
        jest.runAllTimers();
      });
      expect(getTransformX(container)).toEqual(expected);
      jest.useRealTimers();
    });
  });
});
