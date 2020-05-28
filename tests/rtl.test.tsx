import { mount } from 'enzyme';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
import { act } from 'react-dom/test-utils';
import { getOffsetSize, getTabs, triggerResize } from './common/util';

// Same as `overflow.test.tsx` but use in RTL

describe('Tabs.RTL', () => {
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
          const btnList = [...btn.parentNode.childNodes].filter(ele =>
            (ele as HTMLElement).className.includes('rc-tabs-tab'),
          );
          const index = btnList.indexOf(btn);
          return 20 * (btnList.length - index - 1);
        },
      },
    });

    domSpy = spyElementPrototypes(HTMLElement, {
      scrollIntoView: () => {},
      offsetWidth: {
        get: getOffsetSize,
      },
      offsetHeight: {
        get: getOffsetSize,
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

    const { transform } = wrapper.find('.rc-tabs-nav-list').props().style;
    const match = transform.match(/\(([-\d]+)px/);
    expect(Number(match[1])).toEqual(20);
    jest.useRealTimers();
  });
});
