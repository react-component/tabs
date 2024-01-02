/* eslint-disable @typescript-eslint/no-invalid-this */
import { act } from '@testing-library/react';
import { _rs as onEsResize } from 'rc-resize-observer/es/utils/observerUtil';
import { _rs as onLibResize } from 'rc-resize-observer/lib/utils/observerUtil';
import React from 'react';
import Tabs from '../../src';
import type { TabsProps } from '../../src/Tabs';

/**
 * |                            container                            |
 * |  extra left  |                      | operation |  extra right  |
 * |              |                             list                              |
 * |              |                       tab content                       | add |
 */

export interface HackInfo {
  container?: number;
  tabNode?: number;
  tabNodeList?: number;
  add?: number;
  more?: number;
  extra?: number;
  dropdown?: number;
}

export function getOffsetSizeFunc(info: HackInfo = {}) {
  return function getOffsetSize() {
    const {
      container = 50,
      extra = 10,
      tabNodeList,
      tabNode = 20,
      add = 10,
      more = 10,
      dropdown = 10,
    } = info;

    if (this.classList.contains('rc-tabs-nav')) {
      return container;
    }

    if (this.classList.contains('rc-tabs-extra-content')) {
      return extra;
    }

    if (this.classList.contains('rc-tabs-nav-list')) {
      return tabNodeList || this.querySelectorAll('.rc-tabs-tab').length * tabNode + add;
    }

    if (this.classList.contains('rc-tabs-tab')) {
      return tabNode;
    }

    if (this.classList.contains('rc-tabs-nav-add')) {
      return more;
    }

    if (this.classList.contains('rc-tabs-nav-more')) {
      return more;
    }

    if (this.classList.contains('rc-tabs-ink-bar')) {
      return container;
    }

    if (this.classList.contains('rc-tabs-nav-operations')) {
      return this.querySelector('.rc-tabs-nav-add') ? more + add : more;
    }

    // if (this.className.includes('rc-tabs-nav-list')) {
    //   return info.list || 5 * 20 + 10;
    // }
    // if (this.className.includes('rc-tabs-nav-add')) {
    //   return info.add || 10;
    // }
    // if (this.className.includes('rc-tabs-nav-operations')) {
    //   return info.operation || 10;
    // }
    // if (this.className.includes('rc-tabs-nav-more')) {
    //   return info.more || 10;
    // }
    if (this.className.includes('rc-tabs-dropdown')) {
      return dropdown;
    }

    throw new Error(`className not match ${this.className}`);
  };
}

export function btnOffsetPosition() {
  // eslint-disable-next-line @typescript-eslint/no-invalid-this
  const btn = this as HTMLButtonElement;
  if (!btn.parentNode) {
    return 0;
  }
  const btnList = Array.from(btn.parentNode.childNodes).filter(ele =>
    (ele as HTMLElement).className.includes('rc-tabs-tab'),
  );
  const index = btnList.indexOf(btn);
  return 20 * index;
}

export function getTransformX(container: Element) {
  const { transform } = container.querySelector<HTMLElement>('.rc-tabs-nav-list').style;
  const match = transform.match(/\(([-\d.]+)px/);
  if (!match) {
    // eslint-disable-next-line no-console
    // console.log(container.querySelector('.rc-tabs-nav-list').innerHTML);
    throw new Error(`Not find transformX: ${transform}`);
  }
  return Number(match[1]);
}

export function getTransformY(container: Element) {
  const { transform } = container.querySelector<HTMLElement>('.rc-tabs-nav-list').style;
  const match = transform.match(/,\s*([-\d.]+)px/);
  if (!match) {
    // eslint-disable-next-line no-console
    // console.log(wrapper.find('.rc-tabs-nav-list').html());
    throw new Error(`Not find transformY: ${transform}`);
  }
  return Number(match[1]);
}

export function getTabs(props: TabsProps = null) {
  return (
    <Tabs
      items={[
        {
          label: 'light',
          key: 'light',
          children: 'Light',
        },
        {
          label: 'bamboo',
          key: 'bamboo',
          children: 'Bamboo',
        },
        {
          label: 'cute',
          key: 'cute',
          children: 'Cute',
        },
        {
          label: 'disabled',
          key: 'disabled',
          children: 'Disabled',
          disabled: true,
        },
        {
          label: 'miu',
          key: 'miu',
          children: 'Miu',
        },
      ]}
      {...props}
    />
  );
}

// export function triggerResize(wrapper: ReactWrapper) {
//   (wrapper.find('.rc-tabs-nav').find('ResizeObserver').first().props() as any).onResize();
// }

export const triggerResize = (container: Element) => {
  const target = container.querySelector('.rc-tabs-nav');

  act(() => {
    onLibResize([{ target } as ResizeObserverEntry]);
    onEsResize([{ target } as ResizeObserverEntry]);
  });
};

/**
 * Wait for a time delay. Will wait `advanceTime * times` ms.
 *
 * @param advanceTime Default 1000
 * @param times Default 20
 */
export async function waitFakeTimer(advanceTime = 1000, times = 20) {
  for (let i = 0; i < times; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await act(async () => {
      await Promise.resolve();

      if (advanceTime > 0) {
        jest.advanceTimersByTime(advanceTime);
      } else {
        jest.runAllTimers();
      }
    });
  }
}
