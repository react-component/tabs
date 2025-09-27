import { clsx } from 'clsx';
import * as React from 'react';
import type { EditableConfig, Tab } from '../interface';
import { genDataNodeKey, getRemovable } from '../util';

export interface TabNodeProps {
  id: string;
  prefixCls: string;
  tab: Tab;
  active: boolean;
  focus: boolean;
  closable?: boolean;
  editable?: EditableConfig;
  onClick?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  onResize?: (width: number, height: number, left: number, top: number) => void;
  renderWrapper?: (node: React.ReactElement) => React.ReactElement;
  removeAriaLabel?: string;
  tabCount: number;
  currentPosition: number;
  removeIcon?: React.ReactNode;
  onKeyDown: React.KeyboardEventHandler;
  onMouseDown: React.MouseEventHandler;
  onMouseUp: React.MouseEventHandler;
  onFocus: React.FocusEventHandler;
  onBlur: React.FocusEventHandler;
  style?: React.CSSProperties;
  className?: string;
}

const TabNode: React.FC<TabNodeProps> = props => {
  const {
    prefixCls,
    id,
    active,
    focus,
    tab: { key, label, disabled, closeIcon, icon },
    closable,
    renderWrapper,
    removeAriaLabel,
    editable,
    onClick,
    onFocus,
    onBlur,
    onKeyDown,
    onMouseDown,
    onMouseUp,
    style,
    className,
    tabCount,
    currentPosition,
  } = props;
  const tabPrefix = `${prefixCls}-tab`;

  const removable = getRemovable(closable, closeIcon, editable, disabled);

  function onInternalClick(e: React.MouseEvent | React.KeyboardEvent) {
    if (disabled) {
      return;
    }
    onClick(e);
  }

  function onRemoveTab(event: React.MouseEvent | React.KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
    editable.onEdit('remove', { key, event });
  }

  const labelNode = React.useMemo<React.ReactNode>(
    () => (icon && typeof label === 'string' ? <span>{label}</span> : label),
    [label, icon],
  );

  const btnRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (focus && btnRef.current) {
      btnRef.current.focus();
    }
  }, [focus]);

  const node: React.ReactElement = (
    <div
      key={key}
      data-node-key={genDataNodeKey(key)}
      className={clsx(tabPrefix, className, {
        [`${tabPrefix}-with-remove`]: removable,
        [`${tabPrefix}-active`]: active,
        [`${tabPrefix}-disabled`]: disabled,
        [`${tabPrefix}-focus`]: focus,
      })}
      style={style}
      onClick={onInternalClick}
    >
      {/* Primary Tab Button */}
      <div
        ref={btnRef}
        role="tab"
        aria-selected={active}
        id={id && `${id}-tab-${key}`}
        className={`${tabPrefix}-btn`}
        aria-controls={id && `${id}-panel-${key}`}
        aria-disabled={disabled}
        tabIndex={disabled ? null : active ? 0 : -1}
        onClick={e => {
          e.stopPropagation();
          onInternalClick(e);
        }}
        onKeyDown={onKeyDown}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {focus && (
          <div
            aria-live="polite"
            style={{ width: 0, height: 0, position: 'absolute', overflow: 'hidden', opacity: 0 }}
          >
            {`Tab ${currentPosition} of ${tabCount}`}
          </div>
        )}
        {icon && <span className={`${tabPrefix}-icon`}>{icon}</span>}
        {label && labelNode}
      </div>

      {/* Remove Button */}
      {removable && (
        <button
          type="button"
          aria-label={removeAriaLabel || 'remove'}
          tabIndex={active ? 0 : -1}
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
};

export default TabNode;
