import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import raf from 'raf';
import ResizeObserver from 'rc-resize-observer';
import useRaf, { useRafState } from '../hooks/useRaf';
import TabNode from './TabNode';
import {
  TabSizeMap,
  TabPosition,
  RenderTabBar,
  TabsLocale,
  EditableConfig,
  AnimatedConfig,
} from '../interface';
import useOffsets from '../hooks/useOffsets';
import useVisibleRange from '../hooks/useVisibleRange';
import OperationNode from './OperationNode';
import TabContext from '../TabContext';
import useTouchMove from '../hooks/useTouchMove';
import useRefs from '../hooks/useRefs';
import AddButton from './AddButton';

const HIDDEN_STYLE: React.CSSProperties = { visibility: 'hidden' };

export interface TabNavListProps {
  id: string;
  tabPosition: TabPosition;
  activeKey: string;
  rtl: boolean;
  animated?: AnimatedConfig;
  extra?: React.ReactNode;
  editable?: EditableConfig;
  moreIcon?: React.ReactNode;
  tabBarGutter?: number;
  renderTabBar?: RenderTabBar;
  className?: string;
  style?: React.CSSProperties;
  locale?: TabsLocale;
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
    editable,
    locale,
    tabPosition,
    tabBarGutter,
    children,
    onTabClick,
  } = props;
  const tabsWrapperRef = useRef<HTMLDivElement>();
  const tabListRef = useRef<HTMLDivElement>();
  const innerAddButtonRef = useRef<HTMLButtonElement>();
  const [getBtnRef, removeBtnRef] = useRefs<HTMLButtonElement>();

  const [transformLeft, setTransformLeft] = useState(0);
  const [transformTop, setTransformTop] = useState(0);

  const [wrapperScrollWidth, setWrapperScrollWidth] = useState<number>(0);
  const [wrapperScrollHeight, setWrapperScrollHeight] = useState<number>(0);
  const [wrapperWidth, setWrapperWidth] = useState<number>(null);
  const [wrapperHeight, setWrapperHeight] = useState<number>(null);

  const tabPositionTopOrBottom = tabPosition === 'top' || tabPosition === 'bottom';

  // ========================== Util =========================
  let transformMin = 0;
  let transformMax = 0;

  if (!tabPositionTopOrBottom) {
    transformMin = Math.min(0, wrapperHeight - wrapperScrollHeight);
    transformMax = 0;
  } else if (rtl) {
    transformMin = 0;
    transformMax = Math.max(0, wrapperScrollWidth - wrapperWidth);
  } else {
    transformMin = Math.min(0, wrapperWidth - wrapperScrollWidth);
    transformMax = 0;
  }

  function alignInRange(value: number): [number, boolean] {
    if (value < transformMin) {
      return [transformMin, false];
    }
    if (value > transformMax) {
      return [transformMax, false];
    }
    return [value, true];
  }

  // ========================= Mobile ========================
  const touchMovingRef = useRef<number>();
  const [touchMoving, setTouchMoving] = useState<number>();

  function clearTouchMoving() {
    window.clearTimeout(touchMovingRef.current);
  }

  useTouchMove(tabsWrapperRef, (offsetX, offsetY) => {
    let preventDefault = true;

    function doMove(setState: React.Dispatch<React.SetStateAction<number>>, offset: number) {
      setState(value => {
        const [newValue, needPrevent] = alignInRange(value + offset);

        preventDefault = needPrevent;
        return newValue;
      });
    }

    if (tabPositionTopOrBottom) {
      // Skip scroll if place is enough
      if (wrapperWidth >= wrapperScrollWidth) {
        return preventDefault;
      }

      doMove(setTransformLeft, offsetX);
    } else {
      if (wrapperHeight >= wrapperScrollHeight) {
        return preventDefault;
      }

      doMove(setTransformTop, offsetY);
    }

    clearTouchMoving();
    setTouchMoving(Date.now());

    return preventDefault;
  });

  useEffect(() => {
    clearTouchMoving();
    if (touchMoving) {
      touchMovingRef.current = window.setTimeout(() => {
        setTouchMoving(0);
      }, 100);
    }

    return clearTouchMoving;
  }, [touchMoving]);

  // ========================== Tab ==========================

  // Render tab node & collect tab offset
  const [tabSizes, setTabSizes] = useRafState<TabSizeMap>(new Map());
  const tabOffsets = useOffsets(tabs, tabSizes, wrapperScrollWidth);
  const [visibleStart, visibleEnd] = useVisibleRange(
    tabOffsets,
    {
      width: wrapperWidth,
      height: wrapperHeight,
      left: transformLeft,
      top: transformTop,
    },
    { ...props, tabs },
  );

  const tabNodes: React.ReactElement[] = tabs.map(tab => {
    const { key } = tab;
    return (
      <TabNode
        id={id}
        prefixCls={prefixCls}
        key={key}
        rtl={rtl}
        tab={tab}
        closable={tab.closable}
        editable={editable}
        active={key === activeKey}
        tabPosition={tabPosition}
        tabBarGutter={tabBarGutter}
        renderWrapper={children}
        removeAriaLabel={locale?.removeAriaLabel}
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
    const { offsetWidth, offsetHeight } = tabsWrapperRef.current;
    setWrapperWidth(offsetWidth);
    setWrapperHeight(offsetHeight);
    setWrapperScrollWidth(
      tabListRef.current.offsetWidth - (innerAddButtonRef.current?.offsetWidth || 0),
    );
    setWrapperScrollHeight(
      tabListRef.current.offsetHeight - (innerAddButtonRef.current?.offsetHeight || 0),
    );

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

  // ======================== Dropdown =======================
  const startHiddenTabs = tabs.slice(0, visibleStart);
  const endHiddenTabs = tabs.slice(visibleEnd + 1);
  const hiddenTabs = [...startHiddenTabs, ...endHiddenTabs];

  // =================== Link & Operations ===================
  const [inkStyle, setInkStyle] = useState<React.CSSProperties>();
  // const inkStyle: React.CSSProperties = {};
  const operationsStyle: React.CSSProperties = {};

  const activeTabOffset = tabOffsets.get(activeKey);
  const lastVisibleTabOffset = tabOffsets.get(tabs[visibleEnd]?.key);

  // Delay set ink style to avoid remove tab blink
  const inkBarRafRef = useRef<number>();
  function cleanInkBarRaf() {
    raf.cancel(inkBarRafRef.current);
  }

  useEffect(() => {
    const newInkStyle: React.CSSProperties = {};

    if (activeTabOffset) {
      if (tabPositionTopOrBottom) {
        if (rtl) {
          newInkStyle.right = activeTabOffset.right;
        } else {
          newInkStyle.left = activeTabOffset.left;
        }

        newInkStyle.width = activeTabOffset.width;
      } else {
        newInkStyle.top = activeTabOffset.top;
        newInkStyle.height = activeTabOffset.height;
      }
    }

    cleanInkBarRaf();
    inkBarRafRef.current = raf(() => {
      setInkStyle(newInkStyle);
    });

    return cleanInkBarRaf;
  }, [activeTabOffset, tabPositionTopOrBottom, rtl]);

  if (lastVisibleTabOffset) {
    const optGutter = tabBarGutter || 0;
    if (tabPositionTopOrBottom) {
      if (rtl) {
        operationsStyle.right = lastVisibleTabOffset.right + lastVisibleTabOffset.width + optGutter;
      } else {
        operationsStyle.left = lastVisibleTabOffset.left + lastVisibleTabOffset.width + optGutter;
      }
    } else {
      operationsStyle.top = lastVisibleTabOffset.top + lastVisibleTabOffset.height + optGutter;
    }
  }

  // ========================= Scroll ========================
  useEffect(() => {
    if (!activeTabOffset) return;

    if (tabPositionTopOrBottom) {
      // ============ Align with top & bottom ============
      let newTransform = transformLeft;

      // RTL
      if (rtl) {
        if (activeTabOffset.right < transformLeft) {
          newTransform = activeTabOffset.right;
        } else if (activeTabOffset.right + activeTabOffset.width > transformLeft + wrapperWidth) {
          newTransform = activeTabOffset.right + activeTabOffset.width - wrapperWidth;
        }
      }
      // LTR
      else if (activeTabOffset.left < -transformLeft) {
        newTransform = -activeTabOffset.left;
      } else if (activeTabOffset.left + activeTabOffset.width > -transformLeft + wrapperWidth) {
        newTransform = -(activeTabOffset.left + activeTabOffset.width - wrapperWidth);
      }

      setTransformTop(0);
      setTransformLeft(alignInRange(newTransform)[0]);
    } else {
      // ============ Align with left & right ============
      let newTransform = transformTop;

      if (activeTabOffset.top < -transformTop) {
        newTransform = -activeTabOffset.top;
      } else if (activeTabOffset.top + activeTabOffset.height > -transformTop + wrapperHeight) {
        newTransform = -(activeTabOffset.top + activeTabOffset.height - wrapperHeight);
      }

      setTransformLeft(0);
      setTransformTop(alignInRange(newTransform)[0]);
    }
  }, [activeKey, activeTabOffset, tabOffsets, tabPositionTopOrBottom]);

  // Should recalculate when rtl changed
  useEffect(() => {
    onListHolderResize();
  }, [rtl, tabBarGutter]);

  // ========================= Render ========================
  const hasDropdown = !!hiddenTabs.length;

  return (
    <div
      ref={ref}
      role="tablist"
      className={classNames(`${prefixCls}-nav`, className)}
      style={style}
    >
      <ResizeObserver onResize={onListHolderResize}>
        <div className={`${prefixCls}-nav-wrap`} ref={tabsWrapperRef}>
          <ResizeObserver onResize={onListHolderResize}>
            <div
              ref={tabListRef}
              className={`${prefixCls}-nav-list`}
              style={{
                transform: `translate(${transformLeft}px, ${transformTop}px)`,
                transition: touchMoving ? 'none' : undefined,
              }}
            >
              {tabNodes}
              <AddButton
                ref={innerAddButtonRef}
                prefixCls={prefixCls}
                locale={locale}
                editable={editable}
                style={hasDropdown ? HIDDEN_STYLE : null}
              />

              <div
                className={classNames(`${prefixCls}-ink-bar`, {
                  [`${prefixCls}-ink-bar-animated`]: animated.inkBar,
                })}
                style={inkStyle}
              />
            </div>
          </ResizeObserver>
        </div>
      </ResizeObserver>

      <OperationNode
        {...props}
        prefixCls={prefixCls}
        tabs={hiddenTabs}
        style={hasDropdown ? null : HIDDEN_STYLE}
      />

      {extra && <div className={`${prefixCls}-extra-content`}>{extra}</div>}
    </div>
  );
}

export default React.forwardRef(TabNavList);
