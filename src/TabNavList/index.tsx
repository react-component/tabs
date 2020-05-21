import * as React from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import useRaf, { useRafState } from '../hooks/useRaf';
import TabNode from './TabNode';
import { TabSizeMap, Tab, TabPosition } from '../interface';
import useOffsets from '../hooks/useOffsets';
import useVisibleRange from '../hooks/useVisibleRange';
import MoreList from '../MoreList';

export interface TabNavListProps {
  prefixCls: string;
  id: string;
  tabs: Tab[];
  tabPosition: TabPosition;
  activeKey: string;
  animated?: boolean;
  extra?: React.ReactNode;
  moreIcon?: React.ReactNode;
  onTabClick: (activeKey: React.Key) => void;
}

export default function TabNavList(props: TabNavListProps) {
  const { id, prefixCls, animated, activeKey, extra, tabs, onTabClick } = props;

  // ========================== Tab ==========================
  const [wrapperWidth, setWrapperWidth] = useState<number>(null);
  const [wrapperHeight, setWrapperHeight] = useState<number>(null);

  const onWrapperResize = useRaf(
    ({ offsetWidth, offsetHeight }: { offsetWidth: number; offsetHeight: number }) => {
      setWrapperWidth(offsetWidth);
      setWrapperHeight(offsetHeight);
    },
  );

  // Render tab node & collect tab offset
  const [tabSizes, setTabSizes] = useRafState<TabSizeMap>(new Map());
  const [visibleStart, visibleEnd] = useVisibleRange(
    tabSizes,
    { width: wrapperWidth, height: wrapperHeight },
    props,
  );
  const tabOffsets = useOffsets(tabs.slice(visibleStart, visibleEnd + 1), tabSizes);

  const tabNodes: React.ReactElement[] = tabs.map((tab, index) => {
    const { key } = tab;
    return (
      <TabNode
        id={id}
        prefixCls={prefixCls}
        key={key}
        tab={tab}
        active={key === activeKey}
        visible={visibleStart <= index && index <= visibleEnd}
        onClick={() => {
          onTabClick(key);
        }}
        onResize={({ offsetWidth, offsetHeight }) => {
          setTabSizes(oriTabSizes => {
            const clone = new Map(oriTabSizes);
            clone.set(key, { width: offsetWidth, height: offsetHeight });
            return clone;
          });
        }}
        onRemove={() => {
          setTabSizes(oriTabSizes => {
            const clone = new Map(oriTabSizes);
            clone.delete(key);
            return clone;
          });
        }}
      />
    );
  });

  // ======================== Dropdown =======================
  const startHiddenTabs = tabs.slice(0, visibleStart);
  const endHiddenTabs = tabs.slice(visibleEnd + 1);
  const hiddenTabs = [...startHiddenTabs, ...endHiddenTabs];

  // ========================== Ink ==========================
  const inkStyle: React.CSSProperties = {};
  const activeTabOffset = tabOffsets.get(activeKey);
  if (activeTabOffset) {
    inkStyle.left = activeTabOffset.left;
    inkStyle.width = activeTabOffset.width;
  }

  // ========================= Render ========================

  return (
    <div role="tablist" className={`${prefixCls}-nav`}>
      {/* {measureNode} */}
      <ResizeObserver onResize={onWrapperResize}>
        <div className={`${prefixCls}-nav-wrap`}>
          {tabNodes}

          <div
            className={classNames(
              `${prefixCls}-ink-bar`,
              animated && `${prefixCls}-ink-bar-animated`,
            )}
            style={inkStyle}
          />
        </div>
      </ResizeObserver>

      <MoreList {...props} tabs={hiddenTabs} />

      {extra && <div className={`${prefixCls}-extra-content`}>{extra}</div>}
    </div>
  );
}
