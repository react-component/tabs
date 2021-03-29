import * as React from 'react';
import type { EditableConfig, TabsLocale } from '../interface';

export interface AddButtonProps {
  prefixCls: string;
  editable?: EditableConfig;
  locale?: TabsLocale;
  style?: React.CSSProperties;
}

function AddButton(
  { prefixCls, editable, locale, style }: AddButtonProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  if (!editable || editable.showAdd === false) {
    return null;
  }

  return (
    <button
      ref={ref}
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
      {editable.addIcon || '+'}
    </button>
  );
}

export default React.forwardRef(AddButton);
