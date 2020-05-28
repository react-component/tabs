import { TabPaneProps } from './sugar/TabPane';

export type TabSizeMap = Map<
  React.Key,
  { width: number; height: number; left: number; top: number }
>;

export interface TabOffset {
  width: number;
  height: number;
  left: number;
  right: number;
  top: number;
}
export type TabOffsetMap = Map<React.Key, TabOffset>;

export type TabPosition = 'left' | 'right' | 'top' | 'bottom';

export interface Tab extends TabPaneProps {
  tab?: React.ReactNode;
  children?: React.ReactNode;
  forceRender?: boolean;
  key: string;
}

export type RenderTabBar = (props: any, DefaultTabBar: React.ComponentType) => React.ReactElement;

export interface TabsLocale {
  dropdownAriaLabel?: string;
  removeAriaLabel?: string;
  addAriaLabel?: string;
}

export interface EditableConfig {
  onEdit: (
    type: 'add' | 'remove',
    info: { key?: string; event: React.MouseEvent | React.KeyboardEvent },
  ) => void;
  showAdd?: boolean;
  removeIcon?: React.ReactNode;
  addIcon?: React.ReactNode;
}

export interface AnimatedConfig {
  inkBar?: boolean;
  tabPane?: boolean;
}
