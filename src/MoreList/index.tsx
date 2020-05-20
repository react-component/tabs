import * as React from 'react';

export interface MoreListProps {
  prefixCls: string;
  id: string;
  moreIcon?: React.ReactNode;
}

export default function MoreList({ prefixCls, id, moreIcon = 'More' }: MoreListProps) {
  return (
    <button
      type="button"
      className={`${prefixCls}-nav-more`}
      aria-haspopup="listbox"
      aria-labelledby={id}
      id={`${id}-more`}
      aria-expanded="true"
    >
      {moreIcon}
    </button>
  );
}
