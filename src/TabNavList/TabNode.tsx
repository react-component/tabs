import * as React from 'react';
import classNames from 'classnames';
import KeyCode from 'rc-util/lib/KeyCode';
import { Tab, TabPosition, EditableConfig } from '../interface';

export interface TabNodeProps {
  id: string;
  prefixCls: string;
  tab: Tab;
  active: boolean;
  rtl: boolean;
  closable?: boolean;
  editable?: EditableConfig;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onResize?: (width: number, height: number, left: number, top: number) => void;
  tabBarGutter?: number;
  tabPosition: TabPosition;
  renderWrapper?: (node: React.ReactElement) => React.ReactElement;
  removeAriaLabel?: string;
  removeIcon?: React.ReactNode;
  onRemove: () => void;
  onFocus: React.FocusEventHandler;
}

function TabNode(
  {
    prefixCls,
    id,
    active,
    rtl,
    tab: { key, tab, disabled },
    tabBarGutter,
    tabPosition,
    closable,
    renderWrapper,
    removeAriaLabel,
    editable,
    onClick,
    onRemove,
    onFocus,
  }: TabNodeProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  const tabPrefix = `${prefixCls}-tab`;

  React.useEffect(() => onRemove, []);

  const nodeStyle: React.CSSProperties = {};
  if (tabPosition === 'top' || tabPosition === 'bottom') {
    nodeStyle[rtl ? 'marginLeft' : 'marginRight'] = tabBarGutter;
  } else {
    nodeStyle.marginBottom = tabBarGutter;
  }

  const removable = editable && closable !== false && !disabled;

  function onRemoveTab(event: React.MouseEvent | React.KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
    editable.onEdit('remove', {
      key,
      event,
    });
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
        [`${tabPrefix}-with-remove`]: removable,
        [`${tabPrefix}-active`]: active,
        [`${tabPrefix}-disabled`]: disabled,
      })}
      onClick={onClick}
      onFocus={onFocus}
      style={nodeStyle}
    >
      {tab}
      {removable && (
        <span
          role="button"
          aria-label={removeAriaLabel || 'remove'}
          tabIndex={0}
          className={`${tabPrefix}-remove`}
          onClick={e => {
            onRemoveTab(e);
          }}
          onKeyDown={e => {
            if ([KeyCode.SPACE, KeyCode.ENTER].includes(e.which)) {
              onRemoveTab(e);
            }
          }}
        >
          {editable.removeIcon || '×'}
        </span>
      )}
    </button>
  );

  if (renderWrapper) {
    node = renderWrapper(node);
  }

  return node;
}

export default React.forwardRef(TabNode);
