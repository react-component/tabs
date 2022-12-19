import { render } from '@testing-library/react';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
import { act } from 'react-dom/test-utils';
import { getOffsetSizeFunc, getTabs, triggerResize } from './common/util';

describe('Tabs.Operation-Overflow', () => {
  let domSpy: ReturnType<typeof spyElementPrototypes>;
  let holder: HTMLDivElement;

  const hackOffsetInfo = { wrapper: 105, list: 110, add: 10, operation: 20 };

  beforeAll(() => {
    holder = document.createElement('div');
    document.body.appendChild(holder);

    function btnOffsetPosition() {
      const btn = this as HTMLButtonElement;
      const btnList = Array.from(btn.parentNode.childNodes).filter(ele =>
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
    const onEdit = jest.fn();
    const { container, unmount } = render(getTabs({ editable: { onEdit } }));

    triggerResize(container);
    act(() => {
      jest.runAllTimers();
    });
    expect(
      container.querySelector('.rc-tabs-nav-operations'),
    ).not.toHaveClass('rc-tabs-nav-operations-hidden');

    unmount();

    jest.useRealTimers();
  });
});
