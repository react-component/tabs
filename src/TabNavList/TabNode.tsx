import classNames from 'classnames';
import KeyCode from 'rc-util/lib/KeyCode';
import * as React from 'react';
import type { EditableConfig, Tab } from '../interface';
import { genDataNodeKey } from '../util';

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
  onFocus: React.FocusEventHandler;
  style?: React.CSSProperties;
}

function TabNode({
  prefixCls,
  id,
  active,
  tab: { key, label, disabled, closeIcon },
  closable,
  renderWrapper,
  removeAriaLabel,
  editable,
  onClick,
  onFocus,
  style,
}: TabNodeProps) {
  const tabPrefix = `${prefixCls}-tab`;

  const removable = React.useMemo(() => {
    // If closable is not explicitly set to true, the remove button should be hidden when closeIcon is null or false
    if (closable !== true && (closeIcon === false || closeIcon === null)) {
      return false;
    }
    return (editable && closable !== false && !disabled);
  }, [closable, closeIcon, editable, disabled]);

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
      // ref={ref}
      data-node-key={genDataNodeKey(key)}
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
        onClick={e => {
          e.stopPropagation();
          onInternalClick(e);
        }}
        onKeyDown={e => {
          if ([KeyCode.SPACE, KeyCode.ENTER].includes(e.which)) {
            e.preventDefault();
            onInternalClick(e);
          }
        }}
        onFocus={onFocus}
      >
        {label}
      </div>

      {/* Remove Button */}
      {removable && (
        <button
          type="button"
          aria-label={removeAriaLabel || 'remove'}
          tabIndex={0}
          className={`${tabPrefix}-remove`}
          onClick={e => {
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

export default TabNode;
