import * as React from 'react';
import { EditableConfig, TabsLocale } from '../interface';

export interface AddButtonProps {
  prefixCls: string;
  editable?: EditableConfig;
  locale?: TabsLocale;
  style?: React.CSSProperties;
}

export default function AddButton({ prefixCls, editable, locale, style }: AddButtonProps) {
  if (!editable || editable.showAdd === false) {
    return null;
  }

  return (
    <button
      type="button"
      className={`${prefixCls}-nav-add`}
      style={style}
      aria-label={locale?.addAriaLabel || 'Add tab'}
      onClick={event => {
        editable.onEdit('add', {
          event,
        });
      }}
    >
      {editable.addIcon || 'Add'}
    </button>
  );
}
