import * as React from 'react';
import { useRef, useState } from 'react';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import { TabPaneProps } from '../sugar/TabPane';
import useRaf from '../hooks/useRaf';
import TabNode from './TabNode';

type TabSizeMap = Map<React.Key, { width: number; height: number; left: number; right: number }>;

export interface TabNavListProps {
  prefixCls: string;
  id: string;
  tabs: TabPaneProps[];
  activeKey: React.Key;
  animated?: boolean;
  extra?: React.ReactNode;
  onTabClick: (activeKey: React.Key) => void;
}

function useMeasureTabs({
  prefixCls,
  tabs,
  activeKey,
  id,
  onTabClick,
}: TabNavListProps): [TabSizeMap, React.ReactNode] {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [tabSizes, setTabSizes] = useState<TabSizeMap>(new Map());
  const tabNodesRef = useRef(new Map<React.Key, HTMLButtonElement>());

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

  const holder = (
    <ResizeObserver onResize={onResize}>
      <div
        ref={wrapperRef}
        className={`${prefixCls}-nav-measure`}
        style={{ position: 'absolute', height: 0, visibility: 'hidden' }}
      >
        {tabs.map(entity => {
          const { key } = entity;
          const active = key === activeKey;

          return (
            <TabNode
              id={id}
              prefixCls={prefixCls}
              ref={node => {
                if (node) {
                  tabNodesRef.current.set(key, node);
                } else {
                  tabNodesRef.current.delete(key);
                }
              }}
              key={key}
              tab={entity}
              active={active}
              onClick={() => {
                onTabClick(key);
              }}
            />
          );
        })}
      </div>
    </ResizeObserver>
  );

  return [tabSizes, holder];
}

function useVisibleTabs(
  tabSizes: TabSizeMap,
  containerWidth: number,
  { tabs, activeKey, id, prefixCls, onTabClick }: TabNavListProps,
) {
  const activeIndex = tabs.findIndex(tab => tab.key === activeKey) || 0;

  function getWidth(index: number) {
    const tab = tabs[index];
    return tabSizes.get(tab.key)?.width || 0;
  }

  // Find start index
  let restWidth = containerWidth;
  let startIndex = 0;
  for (let i = activeIndex; i >= 0; i -= 1) {
    const tab = tabs[i];
    const width = tabSizes.get(tab.key)?.width || 0;
    if (restWidth < width) {
      break;
    }
    restWidth -= width;
    startIndex = i;
  }

  // Find end index
  restWidth = containerWidth;
  const nodes: React.ReactElement[] = [];
  for (let i = startIndex; i < tabs.length; i += 1) {
    const tab = tabs[i];
    const { key } = tab;
    const width = tabSizes.get(tab.key)?.width || 0;
    if (restWidth < width) {
      break;
    }
    restWidth -= width;

    // Push nodes
    nodes.push(
      <TabNode
        id={id}
        prefixCls={prefixCls}
        key={key}
        tab={tab}
        active={key === activeKey}
        onClick={() => {
          onTabClick(key);
        }}
      />,
    );
  }

  return nodes;
}

export default function TabNavList(props: TabNavListProps) {
  const { prefixCls, animated, id, activeKey, tabs, extra, onTabClick } = props;
  const [tabSizes, measureNode] = useMeasureTabs(props);
  const [wrapperWidth, setWrapperWidth] = useState<number>(null);

  // ========================== Tab ==========================
  const onWrapperResize = useRaf(({ offsetWidth }: { offsetWidth: number }) => {
    setWrapperWidth(offsetWidth);
  });

  const visibleTabNodes = useVisibleTabs(tabSizes, wrapperWidth, props);

  // ========================== Ink ==========================
  const inkStyle: React.CSSProperties = {};
  const activeTabSize = tabSizes.get(activeKey);
  if (activeTabSize) {
    inkStyle.left = activeTabSize.left;
    inkStyle.width = activeTabSize.width;
  }

  return (
    <div role="tablist" className={`${prefixCls}-nav`}>
      {measureNode}
      <ResizeObserver onResize={onWrapperResize}>
        <div className={`${prefixCls}-nav-wrap`}>
          {visibleTabNodes}

          <div
            className={classNames(
              `${prefixCls}-ink-bar`,
              animated && `${prefixCls}-ink-bar-animated`,
            )}
            style={inkStyle}
          />
        </div>
      </ResizeObserver>

      {extra && <div className={`${prefixCls}-extra-content`}>{extra}</div>}
    </div>
  );
}
