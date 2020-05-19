import * as React from 'react';

export interface TabPaneProps {
  tab?: React.ReactNode;
  children?: React.ReactNode;
  key: React.Key;
  forceRender?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function TabPane(_: TabPaneProps) {
  return null;
}
