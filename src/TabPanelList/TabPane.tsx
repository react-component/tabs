import * as React from 'react';
import { Tab } from '../interface';

export interface TabPaneProps {
  id: string;
  tab: Tab;
  active: boolean;
}

export default function TabPane({ id, active, tab: { key, children } }: TabPaneProps) {
  return (
    <div
      id={id && `${id}-panel-${key}`}
      role="tabpanel"
      tabIndex={0}
      aria-labelledby={id && `${id}-tab-${key}`}
      hidden={!active}
    >
      {children}
    </div>
  );
}
