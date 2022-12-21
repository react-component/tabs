import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import raf from 'rc-util/lib/raf';
import { useComposeRef } from 'rc-util/lib/ref';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import useOffsets from '../hooks/useOffsets';
import useRaf, { useRafState } from '../hooks/useRaf';
import useSyncState from '../hooks/useSyncState';
import useTouchMove from '../hooks/useTouchMove';
import useVisibleRange from '../hooks/useVisibleRange';
import type {
  AnimatedConfig,
  EditableConfig,
  OnTabScroll,
  RenderTabBar,
  SizeInfo,
  TabBarExtraContent,
  TabPosition,
  TabSizeMap,
  TabsLocale,
} from '../interface';
import TabContext from '../TabContext';
import { stringify } from '../util';
import AddButton from './AddButton';
import ExtraContent from './ExtraContent';
import OperationNode from './OperationNode';
import TabNode from './TabNode';

export interface TabNavListProps {
  id: string;
  tabPosition: TabPosition;
  activeKey: string;
  rtl: boolean;
  animated?: AnimatedConfig;
  extra?: TabBarExtraContent;
  editable?: EditableConfig;
  moreIcon?: React.ReactNode;
  moreTransitionName?: string;
  mobile: boolean;
  tabBarGutter?: number;
  renderTabBar?: RenderTabBar;
  className?: string;
  style?: React.CSSProperties;
  locale?: TabsLocale;
  onTabClick: (activeKey: string, e: React.MouseEvent | React.KeyboardEvent) => void;
  onTabScroll?: OnTabScroll;
  children?: (node: React.ReactElement) => React.ReactElement;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  popupClassName?: string;
}

const getSize = (refObj: React.RefObject<HTMLElement>): SizeInfo => {
  const { offsetWidth = 0, offsetHeight = 0 } = refObj.current || {};
  return [offsetWidth, offsetHeight];
};

/**
 * Convert `SizeInfo` to unit value. Such as [123, 456] with `top` position get `123`
 */
const getUnitValue = (size: SizeInfo, tabPositionTopOrBottom: boolean) => {
  return size[tabPositionTopOrBottom ? 0 : 1];
};

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
    onTabScroll,
  } = props;
  const containerRef = useRef<HTMLDivElement>();
  const extraLeftRef = useRef<HTMLDivElement>();
  const extraRightRef = useRef<HTMLDivElement>();
  const tabsWrapperRef = useRef<HTMLDivElement>();
  const tabListRef = useRef<HTMLDivElement>();
  const operationsRef = useRef<HTMLDivElement>();
  const innerAddButtonRef = useRef<HTMLButtonElement>();
  // const [getBtnRef, removeBtnRef] = useRefs<HTMLDivElement>();

  const tabPositionTopOrBottom = tabPosition === 'top' || tabPosition === 'bottom';

  const [transformLeft, setTransformLeft] = useSyncState(0, (next, prev) => {
    if (tabPositionTopOrBottom && onTabScroll) {
      onTabScroll({ direction: next > prev ? 'left' : 'right' });
    }
  });
  const [transformTop, setTransformTop] = useSyncState(0, (next, prev) => {
    if (!tabPositionTopOrBottom && onTabScroll) {
      onTabScroll({ direction: next > prev ? 'top' : 'bottom' });
    }
  });

  const [containerExcludeExtraSize, setContainerExcludeExtraSize] = useState<SizeInfo>([0, 0]);
  const [tabContentSize, setTabContentSize] = useState<SizeInfo>([0, 0]);
  const [addSize, setAddSize] = useState<SizeInfo>([0, 0]);
  const [operationSize, setOperationSize] = useState<SizeInfo>([0, 0]);

  const [tabSizes, setTabSizes] = useRafState<TabSizeMap>(new Map());
  const tabOffsets = useOffsets(tabs, tabSizes, tabContentSize[0]);

  // ========================== Unit =========================
  const containerExcludeExtraSizeValue = getUnitValue(
    containerExcludeExtraSize,
    tabPositionTopOrBottom,
  );
  const tabContentSizeValue = getUnitValue(tabContentSize, tabPositionTopOrBottom);
  const addSizeValue = getUnitValue(addSize, tabPositionTopOrBottom);
  const operationSizeValue = getUnitValue(operationSize, tabPositionTopOrBottom);

  const needScroll = containerExcludeExtraSizeValue < tabContentSizeValue + addSizeValue;
  const visibleTabContentValue = needScroll
    ? containerExcludeExtraSizeValue - operationSizeValue
    : containerExcludeExtraSizeValue - addSizeValue;

  // ========================== Util =========================
  const operationsHiddenClassName = `${prefixCls}-nav-operations-hidden`;

  let transformMin = 0;
  let transformMax = 0;

  if (!tabPositionTopOrBottom) {
    transformMin = Math.min(0, visibleTabContentValue - tabContentSizeValue);
    transformMax = 0;
  } else if (rtl) {
    transformMin = 0;
    transformMax = Math.max(0, tabContentSizeValue - visibleTabContentValue);
  } else {
    transformMin = Math.min(0, visibleTabContentValue - tabContentSizeValue);
    transformMax = 0;
  }

  function alignInRange(value: number): number {
    if (value < transformMin) {
      return transformMin;
    }
    if (value > transformMax) {
      return transformMax;
    }
    return value;
  }

  // ========================= Mobile ========================
  const touchMovingRef = useRef<number>();
  const [lockAnimation, setLockAnimation] = useState<number>();

  function doLockAnimation() {
    setLockAnimation(Date.now());
  }

  function clearTouchMoving() {
    window.clearTimeout(touchMovingRef.current);
  }

  useTouchMove(tabsWrapperRef, (offsetX, offsetY) => {
    function doMove(setState: React.Dispatch<React.SetStateAction<number>>, offset: number) {
      setState(value => {
        const newValue = alignInRange(value + offset);

        return newValue;
      });
    }

    // Skip scroll if place is enough
    if (containerExcludeExtraSizeValue >= tabContentSizeValue) {
      return false;
    }

    if (tabPositionTopOrBottom) {
      doMove(setTransformLeft, offsetX);
    } else {
      doMove(setTransformTop, offsetY);
    }

    clearTouchMoving();
    doLockAnimation();

    return true;
  });

  useEffect(() => {
    clearTouchMoving();
    if (lockAnimation) {
      touchMovingRef.current = window.setTimeout(() => {
        setLockAnimation(0);
      }, 100);
    }

    return clearTouchMoving;
  }, [lockAnimation]);

  // ===================== Visible Range =====================
  // Render tab node & collect tab offset
  const [visibleStart, visibleEnd] = useVisibleRange(
    tabOffsets,
    // Container
    visibleTabContentValue,
    // Transform
    tabPositionTopOrBottom ? transformLeft : transformTop,
    // Tabs
    tabContentSizeValue,
    // Add
    addSizeValue,
    // Operation
    operationSizeValue,
    { ...props, tabs },
  );

  // ========================= Scroll ========================
  const scrollToTab = (key = activeKey) => {
    const tabOffset = tabOffsets.get(key) || {
      width: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
    };

    if (tabPositionTopOrBottom) {
      // ============ Align with top & bottom ============
      let newTransform = transformLeft;

      // RTL
      if (rtl) {
        if (tabOffset.right < transformLeft) {
          newTransform = tabOffset.right;
        } else if (tabOffset.right + tabOffset.width > transformLeft + visibleTabContentValue) {
          newTransform = tabOffset.right + tabOffset.width - visibleTabContentValue;
        }
      }
      // LTR
      else if (tabOffset.left < -transformLeft) {
        newTransform = -tabOffset.left;
      } else if (tabOffset.left + tabOffset.width > -transformLeft + visibleTabContentValue) {
        newTransform = -(tabOffset.left + tabOffset.width - visibleTabContentValue);
      }

      setTransformTop(0);
      setTransformLeft(alignInRange(newTransform));
    } else {
      // ============ Align with left & right ============
      let newTransform = transformTop;

      if (tabOffset.top < -transformTop) {
        newTransform = -tabOffset.top;
      } else if (tabOffset.top + tabOffset.height > -transformTop + visibleTabContentValue) {
        newTransform = -(tabOffset.top + tabOffset.height - visibleTabContentValue);
      }

      setTransformLeft(0);
      setTransformTop(alignInRange(newTransform));
    }
  };

  // ========================== Tab ==========================
  const tabNodeStyle: React.CSSProperties = {};
  if (tabPosition === 'top' || tabPosition === 'bottom') {
    tabNodeStyle[rtl ? 'marginRight' : 'marginLeft'] = tabBarGutter;
  } else {
    tabNodeStyle.marginTop = tabBarGutter;
  }

  const tabNodes: React.ReactElement[] = tabs.map((tab, i) => {
    const { key } = tab;
    return (
      <TabNode
        id={id}
        prefixCls={prefixCls}
        key={key}
        tab={tab}
        /* first node should not have margin left */
        style={i === 0 ? undefined : tabNodeStyle}
        closable={tab.closable}
        editable={editable}
        active={key === activeKey}
        renderWrapper={children}
        removeAriaLabel={locale?.removeAriaLabel}
        onClick={e => {
          onTabClick(key, e);
        }}
        onFocus={() => {
          scrollToTab(key);
          doLockAnimation();
          if (!tabsWrapperRef.current) {
            return;
          }
          // Focus element will make scrollLeft change which we should reset back
          if (!rtl) {
            tabsWrapperRef.current.scrollLeft = 0;
          }
          tabsWrapperRef.current.scrollTop = 0;
        }}
      />
    );
  });

  // Update buttons records
  const updateTabSizes = () =>
    setTabSizes(() => {
      const newSizes: TabSizeMap = new Map();
      tabs.forEach(({ key }) => {
        const btnNode = tabListRef.current.querySelector<HTMLElement>(`[data-node-key="${key}"]`);
        if (btnNode) {
          newSizes.set(key, {
            width: btnNode.offsetWidth,
            height: btnNode.offsetHeight,
            left: btnNode.offsetLeft,
            top: btnNode.offsetTop,
          });
        }
      });
      return newSizes;
    });

  useEffect(() => {
    updateTabSizes();
  }, [tabs.map(tab => tab.key).join('_')]);

  const onListHolderResize = useRaf(() => {
    // Update wrapper records
    const containerSize = getSize(containerRef);
    const extraLeftSize = getSize(extraLeftRef);
    const extraRightSize = getSize(extraRightRef);
    setContainerExcludeExtraSize([
      containerSize[0] - extraLeftSize[0] - extraRightSize[0],
      containerSize[1] - extraLeftSize[1] - extraRightSize[1],
    ]);

    const newAddSize = getSize(innerAddButtonRef);
    setAddSize(newAddSize);

    const newOperationSize = getSize(operationsRef);
    setOperationSize(newOperationSize);

    // Which includes add button size
    const tabContentFullSize = getSize(tabListRef);
    setTabContentSize([
      tabContentFullSize[0] - newAddSize[0],
      tabContentFullSize[1] - newAddSize[1],
    ]);

    // Update buttons records
    updateTabSizes();
  });

  // ======================== Dropdown =======================
  const startHiddenTabs = tabs.slice(0, visibleStart);
  const endHiddenTabs = tabs.slice(visibleEnd + 1);
  const hiddenTabs = [...startHiddenTabs, ...endHiddenTabs];

  // =================== Link & Operations ===================
  const [inkStyle, setInkStyle] = useState<React.CSSProperties>();

  const activeTabOffset = tabOffsets.get(activeKey);

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

  // ========================= Effect ========================
  useEffect(() => {
    scrollToTab();
    // eslint-disable-next-line
  }, [activeKey, stringify(activeTabOffset), stringify(tabOffsets), tabPositionTopOrBottom]);

  // Should recalculate when rtl changed
  useEffect(() => {
    onListHolderResize();
    // eslint-disable-next-line
  }, [rtl]);

  // ========================= Render ========================
  const hasDropdown = !!hiddenTabs.length;
  const wrapPrefix = `${prefixCls}-nav-wrap`;
  let pingLeft: boolean;
  let pingRight: boolean;
  let pingTop: boolean;
  let pingBottom: boolean;

  if (tabPositionTopOrBottom) {
    if (rtl) {
      pingRight = transformLeft > 0;
      pingLeft = transformLeft + containerExcludeExtraSizeValue < tabContentSizeValue;
    } else {
      pingLeft = transformLeft < 0;
      pingRight = -transformLeft + containerExcludeExtraSizeValue < tabContentSizeValue;
    }
  } else {
    pingTop = transformTop < 0;
    pingBottom = -transformTop + containerExcludeExtraSizeValue < tabContentSizeValue;
  }

  return (
    <ResizeObserver onResize={onListHolderResize}>
      <div
        ref={useComposeRef(ref, containerRef)}
        role="tablist"
        className={classNames(`${prefixCls}-nav`, className)}
        style={style}
        onKeyDown={() => {
          // No need animation when use keyboard
          doLockAnimation();
        }}
      >
        <ExtraContent ref={extraLeftRef} position="left" extra={extra} prefixCls={prefixCls} />

        <div
          className={classNames(wrapPrefix, {
            [`${wrapPrefix}-ping-left`]: pingLeft,
            [`${wrapPrefix}-ping-right`]: pingRight,
            [`${wrapPrefix}-ping-top`]: pingTop,
            [`${wrapPrefix}-ping-bottom`]: pingBottom,
          })}
          ref={tabsWrapperRef}
        >
          <ResizeObserver onResize={onListHolderResize}>
            <div
              ref={tabListRef}
              className={`${prefixCls}-nav-list`}
              style={{
                transform: `translate(${transformLeft}px, ${transformTop}px)`,
                transition: lockAnimation ? 'none' : undefined,
              }}
            >
              {tabNodes}
              <AddButton
                ref={innerAddButtonRef}
                prefixCls={prefixCls}
                locale={locale}
                editable={editable}
                style={{
                  ...(tabNodes.length === 0 ? undefined : tabNodeStyle),
                  visibility: hasDropdown ? 'hidden' : null,
                }}
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

        <OperationNode
          {...props}
          removeAriaLabel={locale?.removeAriaLabel}
          ref={operationsRef}
          prefixCls={prefixCls}
          tabs={hiddenTabs}
          className={!hasDropdown && operationsHiddenClassName}
          tabMoving={!!lockAnimation}
        />

        <ExtraContent ref={extraRightRef} position="right" extra={extra} prefixCls={prefixCls} />
      </div>
    </ResizeObserver>
  );
  /* eslint-enable */
}

export default React.forwardRef(TabNavList);
