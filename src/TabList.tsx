import * as React from 'react';
import { useRef, useState } from 'react';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import { TabPaneProps } from './sugar/TabPane';
import useRaf from './hooks/useRaf';

type TabSizeMap = Map<React.Key, { width: number; height: number; left: number; right: number }>;

export interface TabListProps {
  prefixCls: string;
  id: string;
  tabs: TabPaneProps[];
  activeKey: React.Key;
  animated?: boolean;
  onTabClick: (activeKey: React.Key) => void;
}

export default function TabList({
  prefixCls,
  animated,
  id,
  activeKey,
  tabs,
  onTabClick,
}: TabListProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // ========================== Tab ==========================
  const tabNodesRef = useRef(new Map<React.Key, HTMLButtonElement>());
  const [tabSizes, setTabSizes] = useState<TabSizeMap>(new Map());

  const onResize = useRaf(() => {
    const newTabSizes: TabSizeMap = new Map();

    const tabNodes = tabs
      .map(({ key }) => {
        const node = tabNodesRef.current.get(key);
        if (node) {
          return { key, node };
        }
        return null;
      })
      .filter(node => node);

    let left = 0;
    let top = 0;
    tabNodes.forEach(({ key, node }) => {
      const { offsetWidth, offsetHeight } = node;

      newTabSizes.set(key, {
        width: offsetWidth,
        height: offsetHeight,
        left,
        top,
      } as any);

      left += offsetWidth;
      top += offsetHeight;
    });

    let right = 0;
    for (let i = tabNodes.length - 1; i >= 0; i -= 1) {
      const {
        key,
        node: { offsetWidth },
      } = tabNodes[i];

      newTabSizes.set(key, {
        ...newTabSizes.get(key),
        right,
      });

      right += offsetWidth;
    }

    setTabSizes(newTabSizes);
  });

  // ========================== Ink ==========================
  const inkStyle: React.CSSProperties = {};
  const activeTabSize = tabSizes.get(activeKey);
  if (activeTabSize) {
    inkStyle.left = activeTabSize.left;
    inkStyle.width = activeTabSize.width;
  }

  return (
    <div role="tablist" className={`${prefixCls}-nav`}>
      <ResizeObserver onResize={onResize}>
        <div ref={wrapperRef} className={`${prefixCls}-nav-wrap`}>
          {tabs.map(({ key, tab }) => {
            const active = key === activeKey;

            return (
              <button
                key={key}
                ref={node => {
                  if (node) {
                    tabNodesRef.current.set(key, node);
                  } else {
                    tabNodesRef.current.delete(key);
                  }
                }}
                type="button"
                role="tab"
                aria-selected={active}
                id={id && `${id}-tab-${key}`}
                aria-controls={id && `${id}-panel-${key}`}
                tabIndex={0}
                className={classNames(`${prefixCls}-tab`, active && `${prefixCls}-tab`)}
                onClick={() => {
                  onTabClick(key);
                }}
              >
                {tab}
              </button>
            );
          })}

          <div
            className={classNames(
              `${prefixCls}-ink-bar`,
              animated && `${prefixCls}-ink-bar-animated`,
            )}
            style={inkStyle}
          />
        </div>
      </ResizeObserver>
    </div>
  );
}
