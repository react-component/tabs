import { clsx } from 'clsx';
import ResizeObserver from '@rc-component/resize-observer';
import useEvent from '@rc-component/util/lib/hooks/useEvent';
import { useComposeRef } from '@rc-component/util/lib/ref';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import TabContext from '../TabContext';
import type { GetIndicatorSize } from '../hooks/useIndicator';
import useIndicator from '../hooks/useIndicator';
import useOffsets from '../hooks/useOffsets';
import useSyncState from '../hooks/useSyncState';
import useTouchMove from '../hooks/useTouchMove';
import useUpdate, { useUpdateState } from '../hooks/useUpdate';
import useVisibleRange from '../hooks/useVisibleRange';
import type {
  AnimatedConfig,
  EditableConfig,
  MoreProps,
  OnTabScroll,
  RenderTabBar,
  SizeInfo,
  TabBarExtraContent,
  TabPosition,
  TabSizeMap,
  TabsLocale,
} from '../interface';
import { genDataNodeKey, getRemovable, stringify } from '../util';
import AddButton from './AddButton';
import ExtraContent from './ExtraContent';
import OperationNode from './OperationNode';
import TabNode from './TabNode';
import type { SemanticName } from '../Tabs';

export interface TabNavListProps {
  id: string;
  tabPosition: TabPosition;
  activeKey: string;
  rtl: boolean;
  animated?: AnimatedConfig;
  extra?: TabBarExtraContent;
  editable?: EditableConfig;
  more?: MoreProps;
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
  indicator?: {
    size?: GetIndicatorSize;
    align?: 'start' | 'center' | 'end';
  };
  classNames?: Partial<Record<SemanticName, string>>;
  styles?: Partial<Record<SemanticName, React.CSSProperties>>;
}

const getTabSize = (tab: HTMLElement, containerRect: { left: number; top: number }) => {
  // tabListRef
  const { offsetWidth, offsetHeight, offsetTop, offsetLeft } = tab;
  const { width, height, left, top } = tab.getBoundingClientRect();

  // Use getBoundingClientRect to avoid decimal inaccuracy
  if (Math.abs(width - offsetWidth) < 1) {
    return [width, height, left - containerRect.left, top - containerRect.top];
  }

  return [offsetWidth, offsetHeight, offsetLeft, offsetTop];
};

const getSize = (refObj: React.RefObject<HTMLElement>): SizeInfo => {
  const { offsetWidth = 0, offsetHeight = 0 } = refObj.current || {};

  // Use getBoundingClientRect to avoid decimal inaccuracy
  if (refObj.current) {
    const { width, height } = refObj.current.getBoundingClientRect();

    if (Math.abs(width - offsetWidth) < 1) {
      return [width, height];
    }
  }

  return [offsetWidth, offsetHeight];
};

/**
 * Convert `SizeInfo` to unit value. Such as [123, 456] with `top` position get `123`
 */
const getUnitValue = (size: SizeInfo, tabPositionTopOrBottom: boolean) => {
  return size[tabPositionTopOrBottom ? 0 : 1];
};

const TabNavList = React.forwardRef<HTMLDivElement, TabNavListProps>((props, ref) => {
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
    indicator,
    classNames: tabsClassNames,
    styles,
  } = props;

  const { prefixCls, tabs } = React.useContext(TabContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const extraLeftRef = useRef<HTMLDivElement>(null);
  const extraRightRef = useRef<HTMLDivElement>(null);
  const tabsWrapperRef = useRef<HTMLDivElement>(null);
  const tabListRef = useRef<HTMLDivElement>(null);
  const operationsRef = useRef<HTMLDivElement>(null);
  const innerAddButtonRef = useRef<HTMLButtonElement>(null);

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

  const [tabSizes, setTabSizes] = useUpdateState<TabSizeMap>(new Map());
  const tabOffsets = useOffsets(tabs, tabSizes, tabContentSize[0]);

  // ========================== Unit =========================
  const containerExcludeExtraSizeValue = getUnitValue(
    containerExcludeExtraSize,
    tabPositionTopOrBottom,
  );
  const tabContentSizeValue = getUnitValue(tabContentSize, tabPositionTopOrBottom);
  const addSizeValue = getUnitValue(addSize, tabPositionTopOrBottom);
  const operationSizeValue = getUnitValue(operationSize, tabPositionTopOrBottom);

  const needScroll =
    Math.floor(containerExcludeExtraSizeValue) < Math.floor(tabContentSizeValue + addSizeValue);
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
  const touchMovingRef = useRef<ReturnType<typeof setTimeout>>(null);

  const [lockAnimation, setLockAnimation] = useState<number>();

  function doLockAnimation() {
    setLockAnimation(Date.now());
  }

  function clearTouchMoving() {
    if (touchMovingRef.current) {
      clearTimeout(touchMovingRef.current);
    }
  }

  useTouchMove(tabsWrapperRef, (offsetX, offsetY) => {
    function doMove(setState: React.Dispatch<React.SetStateAction<number>>, offset: number) {
      setState(value => {
        const newValue = alignInRange(value + offset);
        return newValue;
      });
    }

    // Skip scroll if place is enough
    if (!needScroll) {
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
      touchMovingRef.current = setTimeout(() => {
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
  const scrollToTab = useEvent((key = activeKey) => {
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
  });

  // ========================= Focus =========================
  const [focusKey, setFocusKey] = useState<string>();
  const [isMouse, setIsMouse] = useState(false);

  const enabledTabs = tabs.filter(tab => !tab.disabled).map(tab => tab.key);

  const onOffset = (offset: number) => {
    const currentIndex = enabledTabs.indexOf(focusKey || activeKey);
    const len = enabledTabs.length;
    const nextIndex = (currentIndex + offset + len) % len;
    const newKey = enabledTabs[nextIndex];
    setFocusKey(newKey);
  };

  const handleRemoveTab = (removalTabKey: string, e: React.MouseEvent | React.KeyboardEvent) => {
    const removeIndex = enabledTabs.indexOf(removalTabKey);
    const removeTab = tabs.find(tab => tab.key === removalTabKey);
    const removable = getRemovable(
      removeTab?.closable,
      removeTab?.closeIcon,
      editable,
      removeTab?.disabled,
    );

    if (removable) {
      e.preventDefault();
      e.stopPropagation();
      editable.onEdit('remove', { key: removalTabKey, event: e });

      // when remove last tab, focus previous tab
      if (removeIndex === enabledTabs.length - 1) {
        onOffset(-1);
      } else {
        onOffset(1);
      }
    }
  };

  const handleMouseDown = (key: string, e: React.MouseEvent) => {
    setIsMouse(true);
    // Middle mouse button
    if (e.button === 1) {
      handleRemoveTab(key, e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const { code } = e;

    const isRTL = rtl && tabPositionTopOrBottom;
    const firstEnabledTab = enabledTabs[0];
    const lastEnabledTab = enabledTabs[enabledTabs.length - 1];

    switch (code) {
      // LEFT
      case 'ArrowLeft': {
        if (tabPositionTopOrBottom) {
          onOffset(isRTL ? 1 : -1);
        }
        break;
      }

      // RIGHT
      case 'ArrowRight': {
        if (tabPositionTopOrBottom) {
          onOffset(isRTL ? -1 : 1);
        }
        break;
      }

      // UP
      case 'ArrowUp': {
        e.preventDefault();
        if (!tabPositionTopOrBottom) {
          onOffset(-1);
        }
        break;
      }

      // DOWN
      case 'ArrowDown': {
        e.preventDefault();
        if (!tabPositionTopOrBottom) {
          onOffset(1);
        }
        break;
      }

      // HOME
      case 'Home': {
        e.preventDefault();
        setFocusKey(firstEnabledTab);
        break;
      }

      // END
      case 'End': {
        e.preventDefault();
        setFocusKey(lastEnabledTab);
        break;
      }

      // Enter & Space
      case 'Enter':
      case 'Space': {
        e.preventDefault();
        onTabClick(focusKey ?? activeKey, e);
        break;
      }
      // Backspace
      case 'Backspace':
      case 'Delete': {
        handleRemoveTab(focusKey, e);
        break;
      }
    }
  };

  // ========================== Tab ==========================
  const tabNodeStyle: React.CSSProperties = {};
  if (tabPositionTopOrBottom) {
    tabNodeStyle[rtl ? 'marginRight' : 'marginLeft'] = tabBarGutter;
  } else {
    tabNodeStyle.marginTop = tabBarGutter;
  }

  const tabNodes = tabs.map<React.ReactNode>((tab, i) => {
    const { key } = tab;
    return (
      <TabNode
        id={id}
        prefixCls={prefixCls}
        key={key}
        tab={tab}
        className={tabsClassNames?.item}
        /* first node should not have margin left */
        style={i === 0 ? styles?.item : { ...tabNodeStyle, ...styles?.item }}
        closable={tab.closable}
        editable={editable}
        active={key === activeKey}
        focus={key === focusKey}
        renderWrapper={children}
        removeAriaLabel={locale?.removeAriaLabel}
        tabCount={enabledTabs.length}
        currentPosition={i + 1}
        onClick={e => {
          onTabClick(key, e);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (!isMouse) {
            setFocusKey(key);
          }
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
        onBlur={() => {
          setFocusKey(undefined);
        }}
        onMouseDown={e => handleMouseDown(key, e)}
        onMouseUp={() => {
          setIsMouse(false);
        }}
      />
    );
  });

  // Update buttons records
  const updateTabSizes = () =>
    setTabSizes(() => {
      const newSizes: TabSizeMap = new Map();
      const listRect = tabListRef.current?.getBoundingClientRect();

      tabs.forEach(({ key }) => {
        const btnNode = tabListRef.current?.querySelector<HTMLElement>(
          `[data-node-key="${genDataNodeKey(key)}"]`,
        );
        if (btnNode) {
          const [width, height, left, top] = getTabSize(btnNode, listRect);
          newSizes.set(key, { width, height, left, top });
        }
      });
      return newSizes;
    });

  useEffect(() => {
    updateTabSizes();
  }, [tabs.map(tab => tab.key).join('_')]);

  const onListHolderResize = useUpdate(() => {
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
  const activeTabOffset = tabOffsets.get(activeKey);
  const { style: indicatorStyle } = useIndicator({
    activeTabOffset,
    horizontal: tabPositionTopOrBottom,
    indicator,
    rtl,
  });

  // ========================= Effect ========================
  useEffect(() => {
    scrollToTab();
  }, [
    activeKey,
    transformMin,
    transformMax,
    stringify(activeTabOffset),
    stringify(tabOffsets as any),
    tabPositionTopOrBottom,
  ]);

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
      pingLeft = transformLeft !== transformMax;
    } else {
      pingLeft = transformLeft < 0;
      pingRight = transformLeft !== transformMin;
    }
  } else {
    pingTop = transformTop < 0;
    pingBottom = transformTop !== transformMin;
  }

  return (
    <ResizeObserver onResize={onListHolderResize}>
      <div
        ref={useComposeRef(ref, containerRef)}
        role="tablist"
        aria-orientation={tabPositionTopOrBottom ? 'horizontal' : 'vertical'}
        className={clsx(`${prefixCls}-nav`, className, tabsClassNames?.header)}
        style={{ ...styles?.header, ...style }}
        onKeyDown={() => {
          // No need animation when use keyboard
          doLockAnimation();
        }}
      >
        <ExtraContent ref={extraLeftRef} position="left" extra={extra} prefixCls={prefixCls} />

        <ResizeObserver onResize={onListHolderResize}>
          <div
            className={clsx(wrapPrefix, {
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
                  className={clsx(`${prefixCls}-ink-bar`, tabsClassNames?.indicator, {
                    [`${prefixCls}-ink-bar-animated`]: animated.inkBar,
                  })}
                  style={{ ...indicatorStyle, ...styles?.indicator }}
                />
              </div>
            </ResizeObserver>
          </div>
        </ResizeObserver>

        <OperationNode
          {...props}
          removeAriaLabel={locale?.removeAriaLabel}
          ref={operationsRef}
          prefixCls={prefixCls}
          tabs={hiddenTabs}
          className={!hasDropdown && operationsHiddenClassName}
          popupStyle={styles?.popup}
          tabMoving={!!lockAnimation}
        />

        <ExtraContent ref={extraRightRef} position="right" extra={extra} prefixCls={prefixCls} />
      </div>
    </ResizeObserver>
  );
  /* eslint-enable */
});

export default TabNavList;
