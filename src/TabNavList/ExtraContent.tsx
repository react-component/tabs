import * as React from 'react';
import type { TabBarExtraPosition, TabBarExtraContent, TabBarExtraMap } from '../interface';

interface ExtraContentProps {
  position: TabBarExtraPosition;
  prefixCls: string;
  extra?: TabBarExtraContent;
}

const ExtraContent = React.forwardRef<HTMLDivElement, ExtraContentProps>(
  ({ position, prefixCls, extra }, ref) => {
    if (!extra) return null;

    let content: React.ReactNode;

    // Parse extra
    let assertExtra: TabBarExtraMap = {};
    if (extra && typeof extra === 'object' && !React.isValidElement(extra)) {
      assertExtra = extra as TabBarExtraMap;
    } else {
      assertExtra.right = extra;
    }

    if (position === 'right') {
      content = assertExtra.right;
    }

    if (position === 'left') {
      content = assertExtra.left;
    }

    return content ? (
      <div className={`${prefixCls}-extra-content`} ref={ref}>
        {content}
      </div>
    ) : null;
  },
);

if (process.env.NODE_ENV !== 'production') {
  ExtraContent.displayName = 'ExtraContent';
}

export default ExtraContent;
