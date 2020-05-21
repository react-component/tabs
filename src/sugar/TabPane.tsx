import * as React from 'react';

export interface TabPaneProps {
  tab?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  children?: React.ReactNode;
  forceRender?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function TabPane(_: TabPaneProps) {
  return null;
}
