/* eslint-disable @typescript-eslint/no-invalid-this */
import React from 'react';
import type { ReactWrapper } from 'enzyme';
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
  add?: number;
  more?: number;
  extra?: number;
}

export function getOffsetSizeFunc(info: HackInfo = {}) {
  return function getOffsetSize() {
    const { container = 50, extra = 10, tabNode = 20, add = 10, more = 10 } = info;

    if (this.classList.contains('rc-tabs-nav')) {
      return container;
    }

    if (this.classList.contains('rc-tabs-extra-content')) {
      return extra;
    }

    if (this.classList.contains('rc-tabs-nav-list')) {
      return this.querySelectorAll('.rc-tabs-tab').length * tabNode + add;
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
    // if (this.className.includes('rc-tabs-dropdown')) {
    //   return info.dropdown || 10;
    // }

    throw new Error(`className not match ${this.className}`);
  };
}

export function btnOffsetPosition() {
  // eslint-disable-next-line @typescript-eslint/no-invalid-this
  const btn = this as HTMLButtonElement;
  const btnList = Array.from(btn.parentNode.childNodes).filter(ele =>
    (ele as HTMLElement).className.includes('rc-tabs-tab'),
  );
  const index = btnList.indexOf(btn);
  return 20 * index;
}

export function getTransformX(wrapper: ReactWrapper) {
  const { transform } = wrapper.find('.rc-tabs-nav-list').props().style;
  const match = transform.match(/\(([-\d.]+)px/);
  if (!match) {
    // eslint-disable-next-line no-console
    console.log(wrapper.find('.rc-tabs-nav-list').html());
    throw new Error(`Not find transformX: ${transform}`);
  }
  return Number(match[1]);
}

export function getTransformY(wrapper: ReactWrapper) {
  const { transform } = wrapper.find('.rc-tabs-nav-list').props().style;
  const match = transform.match(/,\s*([-\d.]+)px/);
  if (!match) {
    // eslint-disable-next-line no-console
    console.log(wrapper.find('.rc-tabs-nav-list').html());
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

export function triggerResize(wrapper: ReactWrapper) {
  (wrapper.find('.rc-tabs-nav').find('ResizeObserver').first().props() as any).onResize();
}
