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
  { prefixCls, visible, id, active, tab: { key, tab }, onClick, onResize, onRemove }: TabNodeProps,
  ref: React.Ref<HTMLButtonElement>,
) {
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
      className={classNames(`${prefixCls}-tab`, active && `${prefixCls}-tab`)}
      onClick={onClick}
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

  let wrapperStyle: React.CSSProperties;
  if (visible === false) {
    wrapperStyle = {
      visibility: 'hidden',
      width: 0,
      height: 0,
      overflow: 'hidden',
    };
  }

  return <div style={wrapperStyle}>{node}</div>;
}

export default React.forwardRef(TabNode);
