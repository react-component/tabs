import React from 'react';
import { ReactWrapper } from 'enzyme';
import Tabs, { TabPane } from '../../src';
import { TabsProps } from '../../src/Tabs';

export function getOffsetSizeFunc(
  info: {
    list?: number;
    wrapper?: number;
    add?: number;
    operation?: number;
    more?: number;
    dropdown?: number;
  } = {},
) {
  return function getOffsetSize() {
    if (this.className.includes('rc-tabs-tab')) {
      return 20;
    }
    if (this.className.includes('rc-tabs-nav-list')) {
      return info.list || 5 * 20;
    }
    if (this.className.includes('rc-tabs-nav-wrap')) {
      return info.wrapper || 40;
    }
    if (this.className.includes('rc-tabs-nav-add')) {
      return info.add || 10;
    }
    if (this.className.includes('rc-tabs-nav-operations')) {
      return info.operation || 10;
    }
    if (this.className.includes('rc-tabs-nav-more')) {
      return info.more || 10;
    }
    if (this.className.includes('rc-tabs-dropdown')) {
      return info.dropdown || 10;
    }

    throw new Error(`className not match ${this.className}`);
  };
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
    <Tabs {...props}>
      <TabPane tab="light" key="light">
        Light
      </TabPane>
      <TabPane tab="bamboo" key="bamboo">
        Bamboo
      </TabPane>
      <TabPane tab="cute" key="cute">
        Cute
      </TabPane>
      <TabPane tab="disabled" key="disabled" disabled>
        Disabled
      </TabPane>
      <TabPane tab="miu" key="miu">
        Miu
      </TabPane>
    </Tabs>
  );
}

export function triggerResize(wrapper: ReactWrapper) {
  (wrapper
    .find('.rc-tabs-nav')
    .find('ResizeObserver')
    .first()
    .props() as any).onResize();
}
