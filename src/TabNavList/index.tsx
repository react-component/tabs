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
  const [wrapperWidth, setWrapperWidth] = useState<number>(null);
  const [wrapperHeight, setWrapperHeight] = useState<number>(null);
  const [operationsWidth, setOperationsWidth] = useState<number>(0);
  const [operationsHeight, setOperationsHeight] = useState<number>(0);

  const tabPositionTopOrBottom = tabPosition === 'top' || tabPosition === 'bottom';

  // ========================= Mobile ========================
  const onTouchStart = useTouchMove(mobile, offsetX => {
    if (tabPositionTopOrBottom) {
      setTransformLeft(left => {
        const newLeft = left + offsetX;
        let min: number;
        let max: number;
        if (rtl) {
          min = 0;
          max = wrapperScrollWidth - wrapperWidth;
        } else {
          min = wrapperWidth - wrapperScrollWidth;
          max = 0;
        }

        if (newLeft < min) {
          return min;
        }
        if (newLeft > max) {
          return max;
        }
        return newLeft;
      });
    }
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

  const tabNodes: React.ReactElement[] = tabs.map((tab, index) => {
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
        visible={mobile || (visibleStart <= index && index <= visibleEnd)}
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

  // Scroll to visible region
  const initRef = useRef(false);
  useEffect(() => {
    const startTab = tabs[visibleStart];
    const startTabOffset = tabOffsets.get(startTab?.key);

    if (startTabOffset) {
      if (!initRef.current || !mobile) {
        if (tabPositionTopOrBottom) {
          setTransformTop(0);
          if (rtl) {
            setTransformLeft(startTabOffset.right);
          } else {
            setTransformLeft(-startTabOffset.left);
          }

          if (startTabOffset.left) initRef.current = true;
        } else {
          setTransformLeft(0);
          setTransformTop(-startTabOffset.top);
          if (startTabOffset.top) initRef.current = true;
        }
      }
    }
  }, [wrapperScrollWidth, visibleStart, tabOffsets, mobile, tabPositionTopOrBottom]);

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
        <div className={`${prefixCls}-nav-wrap`} ref={tabsWrapperRef} onTouchStart={onTouchStart}>
          <ResizeObserver onResize={onListHolderResize}>
            <div
              ref={tabListRef}
              className={`${prefixCls}-nav-list`}
              style={{ transform: `translate(${transformLeft}px, ${transformTop}px)` }}
            >
              {tabNodes}

              <div
                className={classNames(
                  `${prefixCls}-ink-bar`,
                  animated && `${prefixCls}-ink-bar-animated`,
                )}
                style={inkStyle}
              />

              {!mobile && (
                <OperationNode
                  {...props}
                  style={operationsStyle}
                  ref={operationsRef}
                  prefixCls={prefixCls}
                  tabs={hiddenTabs}
                />
              )}
            </div>
          </ResizeObserver>
        </div>
      </ResizeObserver>

      {mobile && <AddButton prefixCls={prefixCls} locale={locale} editable={editable} />}

      {extra && <div className={`${prefixCls}-extra-content`}>{extra}</div>}
    </div>
  );
}

export default React.forwardRef(TabNavList);
