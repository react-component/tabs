import * as React from 'react';
import classNames from 'classnames';
import ResizeObserver, { ResizeObserverProps } from 'rc-resize-observer';
import { Tab } from '../interface';

export interface TabNodeProps {
  id: string;
  prefixCls: string;
  tab: Tab;
  active: boolean;
  visible?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onResize?: ResizeObserverProps['onResize'];
  onRemove: () => void;
}

function TabNode(
  {
    prefixCls,
    visible,
    id,
    active,
    tab: { key, tab, disabled },
    onClick,
    onResize,
    onRemove,
  }: TabNodeProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  const tabPrefix = `${prefixCls}-tab`;

  let node = (
    <button
      key={key}
      ref={ref}
      type="button"
      role="tab"
      aria-selected={active}
      id={id && `${id}-tab-${key}`}
      aria-controls={id && `${id}-panel-${key}`}
      tabIndex={0}
      disabled={disabled}
      className={classNames(tabPrefix, {
        [`${tabPrefix}-active`]: active,
        [`${tabPrefix}-disabled`]: disabled,
      })}
      onClick={onClick}
      style={{ visibility: visible ? null : 'hidden' }}
    >
      {tab}
    </button>
  );

  React.useEffect(
    () => () => {
      onRemove();
    },
    [],
  );

  if (onResize) {
    node = <ResizeObserver onResize={onResize}>{node}</ResizeObserver>;
  }

  return node;
}

export default React.forwardRef(TabNode);
