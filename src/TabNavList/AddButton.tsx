import * as React from 'react';
import { EditableConfig, TabsLocale } from '../interface';

export interface AddButtonProps {
  prefixCls: string;
  editable?: EditableConfig;
  locale?: TabsLocale;
}

export default function AddButton({ prefixCls, editable, locale }: AddButtonProps) {
  if (!editable || editable.showAdd === false) return null;
  return (
    <button
      type="button"
      className={`${prefixCls}-nav-add`}
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
