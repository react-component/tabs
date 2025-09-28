import { clsx } from 'clsx';
import * as React from 'react';

export interface TabPaneProps {
  tab?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  children?: React.ReactNode;
  forceRender?: boolean;
  closable?: boolean;
  closeIcon?: React.ReactNode;
  icon?: React.ReactNode;

  // Pass by TabPaneList
  prefixCls?: string;
  tabKey?: string;
  id?: string;
  animated?: boolean;
  active?: boolean;
  destroyOnHidden?: boolean;
}

const TabPane = React.forwardRef<HTMLDivElement, TabPaneProps>((props, ref) => {
  const { prefixCls, className, style, id, active, tabKey, children } = props;
  const hasContent = React.Children.count(children) > 0;

  return (
    <div
      id={id && `${id}-panel-${tabKey}`}
      role="tabpanel"
      tabIndex={active && hasContent ? 0 : -1}
      aria-labelledby={id && `${id}-tab-${tabKey}`}
      aria-hidden={!active}
      style={style}
      className={clsx(prefixCls, active && `${prefixCls}-active`, className)}
      ref={ref}
    >
      {children}
    </div>
  );
});

if (process.env.NODE_ENV !== 'production') {
  TabPane.displayName = 'TabPane';
}

export default TabPane;
