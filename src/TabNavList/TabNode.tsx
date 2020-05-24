import * as React from 'react';
import classNames from 'classnames';
import { Tab, TabPosition } from '../interface';

export interface TabNodeProps {
  id: string;
  prefixCls: string;
  tab: Tab;
  active: boolean;
  rtl: boolean;
  visible?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onResize?: (width: number, height: number, left: number, top: number) => void;
  tabBarGutter?: number;
  tabPosition: TabPosition;
  renderWrapper?: (node: React.ReactElement) => React.ReactElement;
  onRemove: () => void;
}

function TabNode(
  {
    prefixCls,
    visible,
    id,
    active,
    rtl,
    tab: { key, tab, disabled },
    tabBarGutter,
    tabPosition,
    renderWrapper,
    onClick,
    onRemove,
  }: TabNodeProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  const tabPrefix = `${prefixCls}-tab`;

  React.useEffect(() => onRemove, []);

  const nodeStyle: React.CSSProperties = {};
  if (!visible) {
    nodeStyle.visibility = 'hidden';
  }
  if (tabPosition === 'top' || tabPosition === 'bottom') {
    nodeStyle[rtl ? 'marginLeft' : 'marginRight'] = tabBarGutter;
  } else {
    nodeStyle.marginBottom = tabBarGutter;
  }

  let node: React.ReactElement = (
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
      style={nodeStyle}
    >
      {tab}
    </button>
  );

  if (renderWrapper) {
    node = renderWrapper(node);
  }

  return node;
}

export default React.forwardRef(TabNode);
