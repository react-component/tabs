import * as React from 'react';
import type { EditableConfig, TabsLocale } from '../interface';

export interface AddButtonProps {
  prefixCls: string;
  editable?: EditableConfig;
  locale?: TabsLocale;
  style?: React.CSSProperties;
}

const AddButton = React.forwardRef<HTMLButtonElement, AddButtonProps>((props, ref) => {
  const { prefixCls, editable, locale, style } = props;
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
        editable.onEdit('add', { event });
      }}
    >
      {editable.addIcon || '+'}
    </button>
  );
});

export default AddButton;
