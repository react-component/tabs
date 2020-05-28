import React from 'react';
import { mount } from 'enzyme';
import { TabPane } from '../src';

describe('Tabs.Sugar', () => {
  it('pure render TabPane', () => {
    expect(mount(<TabPane />).render()).toMatchSnapshot();
  });
});
