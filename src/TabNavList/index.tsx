import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import useRaf, { useRafState } from '../hooks/useRaf';
import TabNode from './TabNode';
import { TabSizeMap, TabPosition, RenderTabBar, TabsLocale, EditableConfig } from '../interface';
import useOffsets from '../hooks/useOffsets';
import useVisibleRange from '../hooks/useVisibleRange';
import OperationNode from './OperationNode';
import TabContext from '../TabContext';
import useTouchMove from '../hooks/useTouchMove';
import useRefs from '../hooks/useRefs';
import AddButton from './AddButton';

export interface TabNavListProps {
  id: string;
  tabPosition: TabPosition;
  activeKey: string;
  rtl: boolean;
  mobile: boolean;
  animated?: boolean;
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
    mobile,
    locale,
    tabPosition,
    tabBarGutter,
    children,
    onTabClick,
  } = props;
  const tabsWrapperRef = useRef<HTMLDivElement>();
  const tabListRef = useRef<HTMLDivElement>();
  const operationsRef = useRef<HTMLDivElement>();
  const [getBtnRef, removeBtnRef] = useRefs<HTMLButtonElement>();

  const [transformLeft, setTransformLeft] = useState(0);
  const [transformTop, setTransformTop] = useState(0);

  const [wrapperScrollWidth, setWrapperScrollWidth] = useState<number>(0);
  const [wrapperScrollHeight, setWrapperScrollHeight] = useState<number>(0);
  const [wrapperWidth, setWrapperWidth] = useState<number>(null);
  const [wrapperHeight, setWrapperHeight] = useState<number>(null);
  const [operationsWidth, setOperationsWidth] = useState<number>(0);
  const [operationsHeight, setOperationsHeight] = useState<number>(0);

  const tabPositionTopOrBottom = tabPosition === 'top' || tabPosition === 'bottom';

  // ========================= Mobile ========================
  useTouchMove(tabsWrapperRef, (offsetX, offsetY) => {
    let preventDefault = true;

    function doMove(
      setState: React.Dispatch<React.SetStateAction<number>>,
      min: number,
      max: number,
      offset: number,
    ) {
      setState(value => {
        const newValue = value + offset;

        if (newValue < min) {
          preventDefault = false;
          return min;
        }
        if (newValue > max) {
          preventDefault = false;
          return max;
        }
        return newValue;
      });
    }

    if (tabPositionTopOrBottom) {
      let min: number;
      let max: number;
      if (rtl) {
        min = 0;
        max = wrapperScrollWidth - wrapperWidth;
      } else {
        min = wrapperWidth - wrapperScrollWidth;
        max = 0;
      }

      doMove(setTransformLeft, min, max, offsetX);
    } else {
      doMove(setTransformTop, wrapperHeight - wrapperScrollHeight, 0, offsetY);
    }

    return preventDefault;
  });

  // ========================== Tab ==========================

  // Render tab node & collect tab offset
  const [tabSizes, setTabSizes] = useRafState<TabSizeMap>(new Map());
  const tabOffsets = useOffsets(tabs, tabSizes, wrapperScrollWidth);
  const [visibleStart, visibleEnd] = useVisibleRange(
    tabOffsets,
    {
      width: wrapperWidth,
      height: wrapperHeight,
      optWidth: operationsWidth,
      optHeight: operationsHeight,
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
    setWrapperScrollWidth(tabListRef.current.offsetWidth);
    setWrapperScrollHeight(tabListRef.current.offsetHeight);
    setOperationsWidth(operationsRef.current?.offsetWidth || 0);
    setOperationsHeight(operationsRef.current?.offsetHeight || 0);

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
  const inkStyle: React.CSSProperties = {};
  const operationsStyle: React.CSSProperties = {};

  const activeTabOffset = tabOffsets.get(activeKey);
  const lastVisibleTabOffset = tabOffsets.get(tabs[visibleEnd]?.key);

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

  // ========================= Effect ========================
  // Scroll
  useEffect(() => {
    if (!activeTabOffset) return;

    // RTL
    if (rtl) {
      if (activeTabOffset.right < transformLeft) {
        setTransformLeft(activeTabOffset.right);
      } else if (activeTabOffset.right + activeTabOffset.width > transformLeft + wrapperWidth) {
        setTransformLeft(activeTabOffset.right + activeTabOffset.width - wrapperWidth);
      }
    }
    // LTR
    else if (activeTabOffset.left < -transformLeft) {
      setTransformLeft(-activeTabOffset.left);
    } else if (activeTabOffset.left + activeTabOffset.width > -transformLeft + wrapperWidth) {
      setTransformLeft(-(activeTabOffset.left + activeTabOffset.width - wrapperWidth));
    }
  }, [activeKey, activeTabOffset, tabOffsets]);

  // Should recalculate when rtl changed
  useEffect(() => {
    onListHolderResize();
  }, [rtl, tabBarGutter]);

  // ========================= Render ========================
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
              style={{ transform: `translate(${transformLeft}px, ${transformTop}px)` }}
            >
              {tabNodes}
              {editable && <AddButton prefixCls={prefixCls} locale={locale} editable={editable} />}

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
      </ResizeObserver>

      <OperationNode {...props} ref={operationsRef} prefixCls={prefixCls} tabs={hiddenTabs} />

      {extra && <div className={`${prefixCls}-extra-content`}>{extra}</div>}
    </div>
  );
}

export default React.forwardRef(TabNavList);
