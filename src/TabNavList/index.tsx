import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import useRaf, { useRafState } from '../hooks/useRaf';
import TabNode from './TabNode';
import { TabSizeMap, TabPosition, RenderTabBar } from '../interface';
import useOffsets from '../hooks/useOffsets';
import useVisibleRange from '../hooks/useVisibleRange';
import MoreList from '../MoreList';
import TabContext from '../TabContext';
import useTouchMove from '../hooks/useTouchMove';

export interface TabNavListProps {
  id: string;
  tabPosition: TabPosition;
  activeKey: string;
  animated?: boolean;
  extra?: React.ReactNode;
  moreIcon?: React.ReactNode;
  renderTabBar?: RenderTabBar;
  className?: string;
  style?: React.CSSProperties;
  onTabClick: (activeKey: React.Key) => void;
  children?: (node: React.ReactElement) => React.ReactElement;
}

function TabNavList(props: TabNavListProps, ref: React.Ref<HTMLDivElement>) {
  const { prefixCls, tabs } = React.useContext(TabContext);
  const {
    className,
    style,
    id,
    animated,
    activeKey,
    extra,
    tabPosition,
    children,
    onTabClick,
  } = props;
  const tabsWrapperRef = useRef<HTMLDivElement>();
  const tabPositionTopOrBottom = tabPosition === 'top' || tabPosition === 'bottom';

  // ========================= Mobile ========================
  const [touched, onTouchStart] = useTouchMove((offsetX, offsetY) => {
    tabsWrapperRef.current.scrollLeft -= offsetX;
  });

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
    { ...props, tabs },
  );
  const tabOffsets = useOffsets(tabs, tabSizes);

  const tabNodes: React.ReactElement[] = tabs.map((tab, index) => {
    const { key } = tab;
    return (
      <TabNode
        id={id}
        prefixCls={prefixCls}
        key={key}
        tab={tab}
        active={key === activeKey}
        visible={touched || (visibleStart <= index && index <= visibleEnd)}
        renderWrapper={children}
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

  useEffect(() => {
    const startTab = tabs[visibleStart];
    const startTabOffset = tabOffsets.get(startTab?.key);

    if (startTabOffset) {
      if (tabPositionTopOrBottom) {
        tabsWrapperRef.current.scrollLeft = startTabOffset.left;
      } else {
        tabsWrapperRef.current.scrollTop = startTabOffset.top;
      }
    }
  }, [visibleStart, tabOffsets]);

  // ======================== Dropdown =======================
  const startHiddenTabs = tabs.slice(0, visibleStart);
  const endHiddenTabs = tabs.slice(visibleEnd + 1);
  const hiddenTabs = [...startHiddenTabs, ...endHiddenTabs];

  // ========================== Ink ==========================
  const inkStyle: React.CSSProperties = {};
  const activeTabOffset = tabOffsets.get(activeKey);
  if (activeTabOffset) {
    if (tabPositionTopOrBottom) {
      inkStyle.left = activeTabOffset.left;
      inkStyle.width = activeTabOffset.width;
    } else {
      inkStyle.top = activeTabOffset.top;
      inkStyle.height = activeTabOffset.height;
    }
  }

  // ========================= Render ========================
  return (
    <div
      ref={ref}
      role="tablist"
      className={classNames(`${prefixCls}-nav`, className)}
      style={style}
    >
      <ResizeObserver onResize={onWrapperResize}>
        <div className={`${prefixCls}-nav-wrap`} ref={tabsWrapperRef} onTouchStart={onTouchStart}>
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

      <MoreList {...props} prefixCls={prefixCls} tabs={hiddenTabs} />

      {extra && <div className={`${prefixCls}-extra-content`}>{extra}</div>}
    </div>
  );
}

export default React.forwardRef(TabNavList);
