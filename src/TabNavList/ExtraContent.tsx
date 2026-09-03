import * as React from 'react';
import { isReactRenderable } from '@rc-component/util';
import type { TabBarExtraContent, TabBarExtraMap, TabBarExtraPosition } from '../interface';

interface ExtraContentProps {
  position: TabBarExtraPosition;
  prefixCls: string;
  extra?: TabBarExtraContent;
}

const ExtraContent = React.forwardRef<HTMLDivElement, ExtraContentProps>((props, ref) => {
  const { position, prefixCls, extra } = props;
  if (!isReactRenderable(extra)) {
    return null;
  }

  let content: React.ReactNode;

  // Parse extra
  let assertExtra: TabBarExtraMap = {};
  if (typeof extra === 'object' && !React.isValidElement(extra)) {
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

  return isReactRenderable(content) ? (
    <div className={`${prefixCls}-extra-content`} ref={ref}>
      {content}
    </div>
  ) : null;
});

if (process.env.NODE_ENV !== 'production') {
  ExtraContent.displayName = 'ExtraContent';
}

export default ExtraContent;
