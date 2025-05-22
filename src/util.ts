import type React from 'react';
import type { ReactNode } from 'react';
import type { EditableConfig } from './interface';
import warning from 'rc-util/lib/warning';

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

/**
 * Returns a boolean indicating if the event's target has :focus-visible
 */
export function isFocusVisible(element: Element): boolean {
  try {
    return element.matches(':focus-visible');
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      const isJsdom = /jsdom/.test(window.navigator.userAgent);
      warning(
        // Do not warn on jsdom tests, otherwise all tests that rely on focus have to be skipped
        // Tests that rely on `:focus-visible` will still have to be skipped in jsdom
        isJsdom,
        [
          'rc-tabs: The `:focus-visible` pseudo class is not supported in this browser.',
          'Some components rely on this feature to work properly.',
        ].join('\n'),
      );

      // In jsdom, in order to pass the previous a11y unit tests.
      return isJsdom;
    }
  }

  return false;
}
