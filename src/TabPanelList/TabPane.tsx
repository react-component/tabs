import * as React from 'react';
import classNames from 'classnames';
import { Tab } from '../interface';

export interface TabPaneProps {
  prefixCls: string;
  id: string;
  tab: Tab;
  active: boolean;
}

export default function TabPane({
  prefixCls,
  id,
  active,
  tab: { key, children, forceRender, className, style },
}: TabPaneProps) {
  const [visited, setVisited] = React.useState(forceRender);

  React.useEffect(() => {
    if (active) {
      setVisited(true);
    }
  }, [active]);

  return (
    <div
      id={id && `${id}-panel-${key}`}
      role="tabpanel"
      tabIndex={active ? 0 : -1}
      aria-labelledby={id && `${id}-tab-${key}`}
      aria-hidden={!active}
      style={{ visibility: active ? 'visible' : 'hidden', ...style }}
      className={classNames(
        `${prefixCls}-tabpane`,
        active && `${prefixCls}-tabpane-active`,
        className,
      )}
    >
      {(visited || forceRender) && children}
    </div>
  );
}
