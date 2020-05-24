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
import useRefs from '../hooks/useRefs';

export interface TabNavListProps {
  id: string;
  tabPosition: TabPosition;
  activeKey: string;
  rtl: boolean;
  animated?: boolean;
  extra?: React.ReactNode;
  moreIcon?: React.ReactNode;
  tabBarGutter?: number;
  renderTabBar?: RenderTabBar;
  className?: string;
  style?: React.CSSProperties;
  onTabClick: (activeKey: React.Key, e: React.MouseEvent | React.KeyboardEvent) => void;
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
    rtl,
    extra,
    tabPosition,
    tabBarGutter,
    children,
    onTabClick,
  } = props;
  const tabsWrapperRef = useRef<HTMLDivElement>();
  const tabPositionTopOrBottom = tabPosition === 'top' || tabPosition === 'bottom';

  // ========================= Mobile ========================
  const [isMobile, onTouchStart] = useTouchMove((offsetX, offsetY) => {
    if (tabPositionTopOrBottom) {
      tabsWrapperRef.current.scrollLeft -= offsetX;
    } else {
      tabsWrapperRef.current.scrollTop -= offsetY;
    }
  });

  // ========================== Tab ==========================
  const [getBtnRef, removeBtnRef] = useRefs<HTMLButtonElement>();
  const [wrapperScrollWidth, setWrapperScrollWidth] = useState<number>(0);
  const [wrapperWidth, setWrapperWidth] = useState<number>(null);
  const [wrapperHeight, setWrapperHeight] = useState<number>(null);

  // Render tab node & collect tab offset
  const [tabSizes, setTabSizes] = useRafState<TabSizeMap>(new Map());
  const tabOffsets = useOffsets(tabs, tabSizes, wrapperWidth);
  const [visibleStart, visibleEnd] = useVisibleRange(
    tabOffsets,
    { width: wrapperWidth, height: wrapperHeight },
    { ...props, tabs },
  );

  const tabNodes: React.ReactElement[] = tabs.map((tab, index) => {
    const { key } = tab;
    return (
      <TabNode
        id={id}
        prefixCls={prefixCls}
        key={key}
        rtl={rtl}
        tab={tab}
        active={key === activeKey}
        visible={isMobile || (visibleStart <= index && index <= visibleEnd)}
        tabPosition={tabPosition}
        tabBarGutter={tabBarGutter}
        renderWrapper={children}
        ref={getBtnRef(key)}
        onClick={e => {
          onTabClick(key, e);
        }}
        onRemove={() => {
          removeBtnRef(key);
        }}
      />
    );
  });

  const onListHolderResize = useRaf(() => {
    // Update wrapper records
    const { offsetWidth, offsetHeight, scrollWidth } = tabsWrapperRef.current;
    setWrapperWidth(offsetWidth);
    setWrapperHeight(offsetHeight);
    setWrapperScrollWidth(scrollWidth);

    // Update buttons records
    setTabSizes(() => {
      const newSizes: TabSizeMap = new Map();
      tabs.forEach(({ key }) => {
        const btnNode = getBtnRef(key).current;
        newSizes.set(key, {
          width: btnNode.offsetWidth,
          height: btnNode.offsetHeight,
          left: btnNode.offsetLeft,
          top: btnNode.offsetTop,
        });
      });
      return newSizes;
    });
  });

  // Scroll to visible region
  const initRef = useRef(false);
  useEffect(() => {
    const startTab = tabs[visibleStart];
    const startTabOffset = tabOffsets.get(startTab?.key);

    if (startTabOffset) {
      if (!initRef.current || !isMobile) {
        if (tabPositionTopOrBottom) {
          tabsWrapperRef.current.scrollLeft = rtl
            ? wrapperScrollWidth - wrapperWidth - startTabOffset.right
            : startTabOffset.left;
          if (startTabOffset.left) initRef.current = true;
        } else {
          tabsWrapperRef.current.scrollTop = startTabOffset.top;
          if (startTabOffset.top) initRef.current = true;
        }
      }
    }
  }, [wrapperScrollWidth, visibleStart, tabOffsets, isMobile]);

  // ======================== Dropdown =======================
  const startHiddenTabs = tabs.slice(0, visibleStart);
  const endHiddenTabs = tabs.slice(visibleEnd + 1);
  const hiddenTabs = [...startHiddenTabs, ...endHiddenTabs];

  // ========================== Ink ==========================
  const inkStyle: React.CSSProperties = {};
  const activeTabOffset = tabOffsets.get(activeKey);
  if (activeTabOffset) {
    if (tabPositionTopOrBottom) {
      if (rtl) {
        inkStyle.right = activeTabOffset.right;
      } else {
        inkStyle.left = activeTabOffset.left;
      }

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
      <div className={`${prefixCls}-nav-wrap`} ref={tabsWrapperRef} onTouchStart={onTouchStart}>
        <ResizeObserver onResize={onListHolderResize}>
          <div className={`${prefixCls}-nav-list`}>{tabNodes}</div>
        </ResizeObserver>

        <div
          className={classNames(
            `${prefixCls}-ink-bar`,
            animated && `${prefixCls}-ink-bar-animated`,
          )}
          style={inkStyle}
        />
      </div>

      {!isMobile && <MoreList {...props} prefixCls={prefixCls} tabs={hiddenTabs} />}

      {extra && <div className={`${prefixCls}-extra-content`}>{extra}</div>}
    </div>
  );
}

export default React.forwardRef(TabNavList);
