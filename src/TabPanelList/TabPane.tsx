import * as React from 'react';
import classNames from 'classnames';
import { Tab } from '../interface';

export interface TabPaneProps {
  prefixCls: string;
  id: string;
  tab: Tab;
  animated: boolean;
  active: boolean;
  destroyInactiveTabPane?: boolean;
}

export default function TabPane({
  prefixCls,
  id,
  active,
  animated,
  destroyInactiveTabPane,
  tab: { key, children, forceRender, className, style },
}: TabPaneProps) {
  const [visited, setVisited] = React.useState(forceRender);

  React.useEffect(() => {
    if (active) {
      setVisited(true);
    } else if (destroyInactiveTabPane) {
      setVisited(false);
    }
  }, [active, destroyInactiveTabPane]);

  const mergedStyle: React.CSSProperties = {};
  if (!active) {
    if (animated) {
      mergedStyle.visibility = 'hidden';
    } else {
      mergedStyle.display = 'none';
    }
  }

  return (
    <div
      id={id && `${id}-panel-${key}`}
      role="tabpanel"
      tabIndex={active ? 0 : -1}
      aria-labelledby={id && `${id}-tab-${key}`}
      aria-hidden={!active}
      style={{ ...mergedStyle, ...style }}
      className={classNames(
        `${prefixCls}-tabpane`,
        active && `${prefixCls}-tabpane-active`,
        className,
      )}
    >
      {(active || visited || forceRender) && children}
    </div>
  );
}
