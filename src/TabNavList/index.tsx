import { clsx } from 'clsx';
import ResizeObserver from '@rc-component/resize-observer';
import { useComposeRef, useEvent } from '@rc-component/util';
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
  ScrollPosition,
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
  scrollPosition?: ScrollPosition;
  classNames?: Partial<Record<SemanticName, string>>;
  styles?: Partial<Record<SemanticName, React.CSSProperties>>;
}

// How to measure one pass:
// - legacy: no scaling detected, keep the per-element gBCR/offset choice
// - rect: an ancestor applies zoom/transform; normalize rect values back to
//   local CSS units with the given per-axis factors
// - offset: rotation or skew makes rect values a transformed bounding box
//   that cannot be divided back per axis; the whole pass uses offset*
// - null: degenerate scale (e.g. scale(0)) — skip this round and keep the
//   last valid sizes, since a transform change does not fire ResizeObserver
type MeasureMode =
  { type: 'legacy' } | { type: 'rect'; sx: number; sy: number } | { type: 'offset' } | null;

// CSS zoom and transform on ancestors make getBoundingClientRect report
// scaled values while offset* stay in local CSS units. Collect the exact
// per-axis scale factors from computed styles instead of guessing them from
// rounded measurements, so scaleX(2) does not divide vertical sizes and
// fractional widths are not mistaken for scaling.
const getAncestorScale = (el: HTMLElement): MeasureMode => {
  let scaleX = 1;
  let scaleY = 1;
  let current: HTMLElement | null = el;
  while (current) {
    const style = getComputedStyle(current);

    // Independent transforms: `scale` contributes on top of `transform`,
    // `rotate` breaks the per-axis mapping the same way transform rotation does.
    const scaleProp = style.scale;
    if (scaleProp && scaleProp !== 'none') {
      const parts = scaleProp.split(' ').map(part => parseFloat(part) || 0);
      scaleX *= parts[0];
      scaleY *= parts[1] ?? parts[0];
    }
    const rotateProp = style.rotate;
    if (rotateProp && rotateProp !== 'none' && (parseFloat(rotateProp) || 0) % 360 !== 0) {
      return { type: 'offset' };
    }

    const zoom = parseFloat(style.zoom);
    if (!Number.isNaN(zoom) && zoom > 0) {
      scaleX *= zoom;
      scaleY *= zoom;
    }
    const { transform } = style;
    if (transform && transform !== 'none') {
      const matrix = transform.match(/^matrix(?:3d)?\(([^)]+)\)$/);
      if (matrix) {
        const values = matrix[1].split(',').map(part => parseFloat(part.trim()));
        // matrix(a,b,c,d,e,f): scale x = |a|, y = |d| when axis aligned;
        // non-zero b or c means rotation/skew, which swaps the bounding box
        // and cannot be divided back per axis.
        if (values.length === 6) {
          const [a, b, c, d] = values;
          if (b !== 0 || c !== 0) {
            return { type: 'offset' };
          }
          scaleX *= Math.abs(a);
          scaleY *= Math.abs(d);
        } else if (values.length === 16) {
          // matrix3d(m11..m44): bail on any rotation/skew/perspective part
          const hasRotation =
            values[1] !== 0 ||
            values[2] !== 0 ||
            values[4] !== 0 ||
            values[6] !== 0 ||
            values[8] !== 0 ||
            values[9] !== 0 ||
            values[3] !== 0 ||
            values[7] !== 0 ||
            values[11] !== 0 ||
            values[15] !== 1;
          if (hasRotation) {
            return { type: 'offset' };
          }
          scaleX *= Math.abs(values[0]);
          scaleY *= Math.abs(values[5]);
        }
      }
    }
    current = current.parentElement;
  }
  if (!Number.isFinite(scaleX) || !Number.isFinite(scaleY) || scaleX <= 0 || scaleY <= 0) {
    // Degenerate scale (e.g. scale(0)): dividing would produce NaN, and the
    // values would stick until the next valid measurement.
    return null;
  }
  if (scaleX !== 1 || scaleY !== 1) {
    return { type: 'rect', sx: scaleX, sy: scaleY };
  }
  return { type: 'legacy' };
};

const getTabSize = (
  tab: HTMLElement,
  containerRect: { left: number; top: number },
  mode: MeasureMode,
): [number, number, number, number] => {
  // tabListRef
  const { offsetWidth, offsetHeight, offsetTop, offsetLeft } = tab;
  const { width, height, left, top } = tab.getBoundingClientRect();

  // Use getBoundingClientRect to avoid decimal inaccuracy. When an ancestor
  // applies CSS zoom or transform, normalize the scaled rect back to local
  // CSS units per axis: the scroll consumers work in local units.
  if (mode.type === 'rect') {
    return [
      width / mode.sx,
      height / mode.sy,
      (left - containerRect.left) / mode.sx,
      (top - containerRect.top) / mode.sy,
    ];
  }

  if (mode.type === 'offset') {
    // Rotation/skew ancestor: rect values are a transformed bounding box and
    // cannot be divided back, so this whole pass falls back to offset*.
    return [offsetWidth, offsetHeight, offsetLeft, offsetTop];
  }

  if (Math.abs(width - offsetWidth) < 1) {
    return [width, height, left - containerRect.left, top - containerRect.top];
  }

  return [offsetWidth, offsetHeight, offsetLeft, offsetTop];
};

const getSize = (refObj: React.RefObject<HTMLElement>, mode: MeasureMode): SizeInfo => {
  const { offsetWidth = 0, offsetHeight = 0 } = refObj.current || {};

  // Use getBoundingClientRect to avoid decimal inaccuracy
  if (refObj.current) {
    const { width, height } = refObj.current.getBoundingClientRect();

    if (mode.type === 'rect') {
      return [width / mode.sx, height / mode.sy];
    }

    if (mode.type === 'offset') {
      // Rotation/skew ancestor: rect values are a transformed bounding box,
      // the whole pass falls back to offset*.
      return [offsetWidth, offsetHeight];
    }

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
    scrollPosition,
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

    let ratio: number | null = null;
    if (scrollPosition === 'start') {
      ratio = 0;
    } else if (scrollPosition === 'center') {
      ratio = 0.5;
    } else if (scrollPosition === 'end') {
      ratio = 1;
    } else if (typeof scrollPosition === 'number' && !Number.isNaN(scrollPosition)) {
      ratio = Math.min(1, Math.max(0, scrollPosition));
    }

    if (tabPositionTopOrBottom) {
      // ============ Align with top & bottom ============
      let newTransform = transformLeft;

      if (ratio !== null) {
        // Align the `ratio` point of the tab with the same point of the viewport.
        newTransform = rtl
          ? tabOffset.right + tabOffset.width * ratio - visibleTabContentValue * ratio
          : -(tabOffset.left + tabOffset.width * ratio - visibleTabContentValue * ratio);
      }
      // RTL
      else if (rtl) {
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

      if (ratio !== null) {
        newTransform = -(tabOffset.top + tabOffset.height * ratio - visibleTabContentValue * ratio);
      } else if (tabOffset.top < -transformTop) {
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
    tabNodeStyle.marginInlineStart = tabBarGutter;
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
        classNames={{
          item: tabsClassNames?.item,
          remove: tabsClassNames?.remove,
        }}
        styles={{
          /* first node should not have margin left */
          item: i === 0 ? styles?.item : { ...tabNodeStyle, ...styles?.item },
          remove: styles?.remove,
        }}
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
  // CSS zoom or an ancestor transform scale makes getBoundingClientRect and
  // offset* diverge per element by different amounts, which can flip the
  // overflow decision on every measurement (More button shows -> container
  // grows -> tabs fit -> More hides -> container shrinks -> loop). Detect the
  // per-axis scale factors once per pass and measure every element in the
  // same coordinate system, normalized back to local CSS units.
  const getMeasureScale = (): MeasureMode => {
    const container = containerRef.current;
    if (!container) {
      return { type: 'legacy' };
    }
    return getAncestorScale(container);
  };

  const updateTabSizes = () => {
    const mode = getMeasureScale();
    // Degenerate ancestor scale (e.g. scale(0)): skip this round and keep the
    // last valid sizes instead of storing NaN.
    if (!mode) {
      return;
    }
    setTabSizes(() => {
      const newSizes: TabSizeMap = new Map();
      const listRect = tabListRef.current?.getBoundingClientRect();

      tabs.forEach(({ key }) => {
        const btnNode = tabListRef.current?.querySelector<HTMLElement>(
          `[data-node-key="${genDataNodeKey(key)}"]`,
        );
        if (btnNode) {
          const [width, height, left, top] = getTabSize(btnNode, listRect, mode);
          newSizes.set(key, { width, height, left, top });
        }
      });
      return newSizes;
    });
  };

  useEffect(() => {
    updateTabSizes();
  }, [tabs.map(tab => tab.key).join('_')]);

  const onListHolderResize = useUpdate(() => {
    const mode = getMeasureScale();
    // Same skip rule as updateTabSizes: keep last valid measurements.
    if (!mode) {
      return;
    }

    // Update wrapper records
    const containerSize = getSize(containerRef, mode);
    const extraLeftSize = getSize(extraLeftRef, mode);
    const extraRightSize = getSize(extraRightRef, mode);
    setContainerExcludeExtraSize([
      containerSize[0] - extraLeftSize[0] - extraRightSize[0],
      containerSize[1] - extraLeftSize[1] - extraRightSize[1],
    ]);

    const newAddSize = getSize(innerAddButtonRef, mode);
    setAddSize(newAddSize);

    const newOperationSize = getSize(operationsRef, mode);
    setOperationSize(newOperationSize);

    // Which includes add button size
    const tabContentFullSize = getSize(tabListRef, mode);
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
    scrollPosition,
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
