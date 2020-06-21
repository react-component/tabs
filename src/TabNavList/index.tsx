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
  OnTabScroll,
} from '../interface';
import useOffsets from '../hooks/useOffsets';
import useVisibleRange from '../hooks/useVisibleRange';
import OperationNode from './OperationNode';
import TabContext from '../TabContext';
import useTouchMove from '../hooks/useTouchMove';
import useRefs from '../hooks/useRefs';
import AddButton from './AddButton';
import useSyncState from '../hooks/useSyncState';

export interface TabNavListProps {
  id: string;
  tabPosition: TabPosition;
  activeKey: string;
  rtl: boolean;
  animated?: AnimatedConfig;
  extra?: React.ReactNode;
  extraSlot?: 'left' | 'right';
  editable?: EditableConfig;
  moreIcon?: React.ReactNode;
  moreTransitionName?: string;
  mobile: boolean;
  tabBarGutter?: number;
  renderTabBar?: RenderTabBar;
  className?: string;
  style?: React.CSSProperties;
  locale?: TabsLocale;
  onTabClick: (activeKey: React.Key, e: React.MouseEvent | React.KeyboardEvent) => void;
  onTabScroll?: OnTabScroll;
  children?: (node: React.ReactElement) => React.ReactElement;
}


interface ExtraSlotProps {
  name: 'left' | 'right';
}

const withExtraSlot = ({ extra, prefixCls, slot }) => {
  return (props: ExtraSlotProps) => {
    const { name } = props;
    
    if(typeof slot === 'object') {
    return <div className={`${prefixCls}-extra-content`}>{slot[name]}</div>;
    }
   
    if (name === slot) {
      return <div className={`${prefixCls}-extra-content`}>{extra}</div>;
    }

    return null;
  };
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
    extraSlot,
    editable,
    locale,
    tabPosition,
    tabBarGutter,
    children,
    onTabClick,
    onTabScroll,
  } = props;
  const tabsWrapperRef = useRef<HTMLDivElement>();
  const tabListRef = useRef<HTMLDivElement>();
  const operationsRef = useRef<HTMLDivElement>();
  const innerAddButtonRef = useRef<HTMLButtonElement>();
  const [getBtnRef, removeBtnRef] = useRefs<HTMLButtonElement>();

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

  const [wrapperScrollWidth, setWrapperScrollWidth] = useState<number>(0);
  const [wrapperScrollHeight, setWrapperScrollHeight] = useState<number>(0);
  const [wrapperWidth, setWrapperWidth] = useState<number>(null);
  const [wrapperHeight, setWrapperHeight] = useState<number>(null);

  const [tabSizes, setTabSizes] = useRafState<TabSizeMap>(new Map());
  const tabOffsets = useOffsets(tabs, tabSizes, wrapperScrollWidth);

  // ========================== Util =========================
  const operationsHiddenClassName = `${prefixCls}-nav-operations-hidden`;

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
  const [lockAnimation, setLockAnimation] = useState<number>();

  function doLockAnimation() {
    setLockAnimation(Date.now());
  }

  function clearTouchMoving() {
    window.clearTimeout(touchMovingRef.current);
  }

  useTouchMove(tabsWrapperRef, (offsetX, offsetY) => {
    let preventDefault = false;

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
    doLockAnimation();

    return preventDefault;
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

  // ========================= Scroll ========================
  function scrollToTab(key = activeKey) {
    const tabOffset = tabOffsets.get(key);

    if (!tabOffset) return;

    if (tabPositionTopOrBottom) {
      // ============ Align with top & bottom ============
      let newTransform = transformLeft;

      // RTL
      if (rtl) {
        if (tabOffset.right < transformLeft) {
          newTransform = tabOffset.right;
        } else if (tabOffset.right + tabOffset.width > transformLeft + wrapperWidth) {
          newTransform = tabOffset.right + tabOffset.width - wrapperWidth;
        }
      }
      // LTR
      else if (tabOffset.left < -transformLeft) {
        newTransform = -tabOffset.left;
      } else if (tabOffset.left + tabOffset.width > -transformLeft + wrapperWidth) {
        newTransform = -(tabOffset.left + tabOffset.width - wrapperWidth);
      }

      setTransformTop(0);
      setTransformLeft(alignInRange(newTransform)[0]);
    } else {
      // ============ Align with left & right ============
      let newTransform = transformTop;

      if (tabOffset.top < -transformTop) {
        newTransform = -tabOffset.top;
      } else if (tabOffset.top + tabOffset.height > -transformTop + wrapperHeight) {
        newTransform = -(tabOffset.top + tabOffset.height - wrapperHeight);
      }

      setTransformLeft(0);
      setTransformTop(alignInRange(newTransform)[0]);
    }
  }

  // ========================== Tab ==========================
  // Render tab node & collect tab offset

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

  function getAdditionalSpaceSize(type: 'offsetWidth' | 'offsetHeight') {
    const addBtnSize = innerAddButtonRef.current?.[type] || 0;
    let optionsSize = 0;
    if (operationsRef.current?.className.includes(operationsHiddenClassName)) {
      optionsSize = operationsRef.current[type];
    }

    return addBtnSize + optionsSize;
  }

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
        onFocus={() => {
          scrollToTab(key);
          doLockAnimation();

          // Focus element will make scrollLeft change which we should reset back
          if (!rtl) {
            tabsWrapperRef.current.scrollLeft = 0;
          }
          tabsWrapperRef.current.scrollTop = 0;
        }}
      />
    );
  });

  const onListHolderResize = useRaf(() => {
    // Update wrapper records
    const offsetWidth = tabsWrapperRef.current?.offsetWidth || 0;
    const offsetHeight = tabsWrapperRef.current?.offsetHeight || 0;
    setWrapperWidth(offsetWidth);
    setWrapperHeight(offsetHeight);
    setWrapperScrollWidth(
      (tabListRef.current?.offsetWidth || 0) - getAdditionalSpaceSize('offsetWidth'),
    );
    setWrapperScrollHeight(
      (tabListRef.current?.offsetHeight || 0) - getAdditionalSpaceSize('offsetHeight'),
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
  }, [activeKey, activeTabOffset, tabOffsets, tabPositionTopOrBottom]);

  // Should recalculate when rtl changed
  useEffect(() => {
    onListHolderResize();
  }, [rtl, tabBarGutter, activeKey]);

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
      pingLeft = transformLeft + wrapperWidth < wrapperScrollWidth;
    } else {
      pingLeft = transformLeft < 0;
      pingRight = -transformLeft + wrapperWidth < wrapperScrollWidth;
    }
  } else {
    pingTop = transformTop < 0;
    pingBottom = -transformTop + wrapperHeight < wrapperScrollHeight;
  }

  const ExtraSlot = extra ? withExtraSlot({ extra, prefixCls, slot:extraSlot }) : () => null;

  /* eslint-disable jsx-a11y/interactive-supports-focus */
  return (
    <div
      ref={ref}
      role="tablist"
      className={classNames(`${prefixCls}-nav`, className)}
      style={style}
      onKeyDown={() => {
        // No need animation when use keyboard
        doLockAnimation();
      }}
    >
      <ExtraSlot name="left"/>

      <ResizeObserver onResize={onListHolderResize}>
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
              {!hasDropdown && (
                <AddButton
                  ref={innerAddButtonRef}
                  prefixCls={prefixCls}
                  locale={locale}
                  editable={editable}
                />
              )}

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
        ref={operationsRef}
        prefixCls={prefixCls}
        tabs={hiddenTabs}
        className={!hasDropdown && operationsHiddenClassName}
      />

      <ExtraSlot name="right"/>
    </div>
  );
  /* eslint-enable */
}

export default React.forwardRef(TabNavList);
