import * as React from 'react';
import classNames from 'classnames';
import { TabPaneProps } from '../sugar/TabPane';

export interface TabNodeProps {
  id: string;
  prefixCls: string;
  tab: TabPaneProps;
  active: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function TabNode(
  { prefixCls, id, active, tab: { key, tab }, onClick }: TabNodeProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  return (
    <button
      key={key}
      ref={ref}
      type="button"
      role="tab"
      aria-selected={active}
      id={id && `${id}-tab-${key}`}
      aria-controls={id && `${id}-panel-${key}`}
      tabIndex={0}
      className={classNames(`${prefixCls}-tab`, active && `${prefixCls}-tab`)}
      onClick={onClick}
    >
      {tab}
    </button>
  );
}

export default React.forwardRef(TabNode);
