import * as React from 'react';
import classNames from 'classnames';
import KeyCode from 'rc-util/lib/KeyCode';
import type { Tab, EditableConfig } from '../interface';

export interface TabNodeProps {
  id: string;
  prefixCls: string;
  tab: Tab;
  active: boolean;
  closable?: boolean;
  editable?: EditableConfig;
  onClick?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  onResize?: (width: number, height: number, left: number, top: number) => void;
  renderWrapper?: (node: React.ReactElement) => React.ReactElement;
  removeAriaLabel?: string;
  removeIcon?: React.ReactNode;
  onRemove: () => void;
  onFocus: React.FocusEventHandler;
  style?: React.CSSProperties;
}

function TabNode(
  {
    prefixCls,
    id,
    active,
    tab: { key, tab, disabled, closeIcon },
    closable,
    renderWrapper,
    removeAriaLabel,
    editable,
    onClick,
    onRemove,
    onFocus,
    style,
  }: TabNodeProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const tabPrefix = `${prefixCls}-tab`;

  React.useEffect(() => onRemove, []);

  const removable = editable && closable !== false && !disabled;

  function onInternalClick(e: React.MouseEvent | React.KeyboardEvent) {
    if (disabled) {
      return;
    }
    onClick(e);
  }

  function onRemoveTab(event: React.MouseEvent | React.KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
    editable.onEdit('remove', {
      key,
      event,
    });
  }

  const node: React.ReactElement = (
    <div
      key={key}
      ref={ref}
      className={classNames(tabPrefix, {
        [`${tabPrefix}-with-remove`]: removable,
        [`${tabPrefix}-active`]: active,
        [`${tabPrefix}-disabled`]: disabled,
      })}
      style={style}
      onClick={onInternalClick}
    >
      {/* Primary Tab Button */}
      <div
        role="tab"
        aria-selected={active}
        id={id && `${id}-tab-${key}`}
        className={`${tabPrefix}-btn`}
        aria-controls={id && `${id}-panel-${key}`}
        aria-disabled={disabled}
        tabIndex={disabled ? null : 0}
        onClick={(e) => {
          e.stopPropagation();
          onInternalClick(e);
        }}
        onKeyDown={(e) => {
          if ([KeyCode.SPACE, KeyCode.ENTER].includes(e.which)) {
            e.preventDefault();
            onInternalClick(e);
          }
        }}
        onFocus={onFocus}
      >
        {tab}
      </div>

      {/* Remove Button */}
      {removable && (
        <button
          type="button"
          aria-label={removeAriaLabel || 'remove'}
          tabIndex={0}
          className={`${tabPrefix}-remove`}
          onClick={(e) => {
            e.stopPropagation();
            onRemoveTab(e);
          }}
        >
          {closeIcon || editable.removeIcon || '×'}
        </button>
      )}
    </div>
  );

  return renderWrapper ? renderWrapper(node) : node;
}

export default React.forwardRef(TabNode);
