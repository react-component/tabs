import type { ReactNode, default as React } from 'react';
import type { EditableConfig } from './interface';

/**
 * We trade Map as deps which may change with same value but different ref object.
 * We should make it as hash for deps
 * */
export function stringify<K extends PropertyKey, V>(obj: Record<K, V> | Map<K, V>) {
  let tgt: Record<K, V>;

  if (obj instanceof Map) {
    tgt = {} as any;
    obj.forEach((v, k) => {
      tgt[k] = v;
    });
  } else {
    tgt = obj;
  }

  return JSON.stringify(tgt);
}

const RC_TABS_DOUBLE_QUOTE = 'TABS_DQ';

export function genDataNodeKey(key: React.Key): string {
  return String(key).replace(/"/g, RC_TABS_DOUBLE_QUOTE);
}

export function isLineMode(event: WheelEvent) {
  return event.deltaMode === WheelEvent.DOM_DELTA_LINE
}

export function getWheelDeltaOfPx(event: WheelEvent) {
  const { deltaX, deltaY } = event
  const deltaXOfPx = isLineMode(event)
    ? deltaX * 100 / 3
    : deltaX;
  const deltaYOfPx = isLineMode(event)
    ? deltaY * 100 / 3
    : deltaY;
  return [deltaXOfPx, deltaYOfPx]
}

export function getRemovable(
  closable?: boolean,
  closeIcon?: ReactNode,
  editable?: EditableConfig,
  disabled?: boolean,
) {
  if (
    // Only editable tabs can be removed
    !editable ||
    // Tabs cannot be removed when disabled
    disabled ||
    // closable is false
    closable === false ||
    // If closable is undefined, the remove button should be hidden when closeIcon is null or false
    (closable === undefined && (closeIcon === false || closeIcon === null))
  ) {
    return false;
  }
  return true;
}
