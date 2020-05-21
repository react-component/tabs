import { TabPaneProps } from './sugar/TabPane';

export type TabSizeMap = Map<React.Key, { width: number; height: number }>;
export type TabOffsetMap = Map<
  React.Key,
  { width: number; height: number; left: number; right: number; top: number; bottom: number }
>;

export type TabPosition = 'left' | 'right' | 'top' | 'bottom';

export interface Tab extends TabPaneProps {
  tab?: React.ReactNode;
  children?: React.ReactNode;
  forceRender?: boolean;
  key: string;
}

export type RenderTabBar = (props: any, DefaultTabBar: React.ComponentType) => React.ReactElement;
