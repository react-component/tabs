// Accessibility https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Tab_Role
import * as React from 'react';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import isMobile from 'rc-util/lib/isMobile';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import TabPanelList from './TabPanelList';
import type {
  TabPosition,
  RenderTabBar,
  TabsLocale,
  EditableConfig,
  AnimatedConfig,
  OnTabScroll,
  Tab,
  TabBarExtraContent,
} from './interface';
import TabContext from './TabContext';
import TabNavListWrapper from './TabNavList/Wrapper';
import useAnimateConfig from './hooks/useAnimateConfig';

/**
 * Should added antd:
 * - type
 *
 * Removed:
 * - onNextClick
 * - onPrevClick
 * - keyboard
 */

// Used for accessibility
let uuid = 0;

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'children'> {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  id?: string;

  items?: Tab[];

  activeKey?: string;
  defaultActiveKey?: string;
  direction?: 'ltr' | 'rtl';
  animated?: boolean | AnimatedConfig;
  renderTabBar?: RenderTabBar;
  tabBarExtraContent?: TabBarExtraContent;
  tabBarGutter?: number;
  tabBarStyle?: React.CSSProperties;
  tabPosition?: TabPosition;
  destroyInactiveTabPane?: boolean;

  onChange?: (activeKey: string) => void;
  onTabClick?: (activeKey: string, e: React.KeyboardEvent | React.MouseEvent) => void;
  onTabScroll?: OnTabScroll;

  editable?: EditableConfig;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;

  // Accessibility
  locale?: TabsLocale;

  // Icons
  moreIcon?: React.ReactNode;
  /** @private Internal usage. Not promise will rename in future */
  moreTransitionName?: string;

  popupClassName?: string;
}

function Tabs(
  {
    id,
    prefixCls = 'rc-tabs',
    className,
    items,
    direction,
    activeKey,
    defaultActiveKey,
    editable,
    animated,
    tabPosition = 'top',
    tabBarGutter,
    tabBarStyle,
    tabBarExtraContent,
    locale,
    moreIcon,
    moreTransitionName,
    destroyInactiveTabPane,
    renderTabBar,
    onChange,
    onTabClick,
    onTabScroll,
    getPopupContainer,
    popupClassName,
    ...restProps
  }: TabsProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const tabs = React.useMemo(
    () => (items || []).filter(item => item && typeof item === 'object' && 'key' in item),
    [items],
  );
  const rtl = direction === 'rtl';

  const mergedAnimated = useAnimateConfig(animated);

  // ======================== Mobile ========================
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    // Only update on the client side
    setMobile(isMobile());
  }, []);

  // ====================== Active Key ======================
  const [mergedActiveKey, setMergedActiveKey] = useMergedState<string>(() => tabs[0]?.key, {
    value: activeKey,
    defaultValue: defaultActiveKey,
  });
  const [activeIndex, setActiveIndex] = useState(() =>
    tabs.findIndex(tab => tab.key === mergedActiveKey),
  );

  // Reset active key if not exist anymore
  useEffect(() => {
    let newActiveIndex = tabs.findIndex(tab => tab.key === mergedActiveKey);
    if (newActiveIndex === -1) {
      newActiveIndex = Math.max(0, Math.min(activeIndex, tabs.length - 1));
      setMergedActiveKey(tabs[newActiveIndex]?.key);
    }
    setActiveIndex(newActiveIndex);
  }, [tabs.map(tab => tab.key).join('_'), mergedActiveKey, activeIndex]);

  // ===================== Accessibility ====================
  const [mergedId, setMergedId] = useMergedState(null, {
    value: id,
  });

  // Async generate id to avoid ssr mapping failed
  useEffect(() => {
    if (!id) {
      setMergedId(`rc-tabs-${process.env.NODE_ENV === 'test' ? 'test' : uuid}`);
      uuid += 1;
    }
  }, []);

  // ======================== Events ========================
  function onInternalTabClick(key: string, e: React.MouseEvent | React.KeyboardEvent) {
    onTabClick?.(key, e);
    const isActiveChanged = key !== mergedActiveKey;
    setMergedActiveKey(key);
    if (isActiveChanged) {
      onChange?.(key);
    }
  }

  // ======================== Render ========================
  const sharedProps = {
    id: mergedId,
    activeKey: mergedActiveKey,
    animated: mergedAnimated,
    tabPosition,
    rtl,
    mobile,
  };

  let tabNavBar: React.ReactElement;

  const tabNavBarProps = {
    ...sharedProps,
    editable,
    locale,
    moreIcon,
    moreTransitionName,
    tabBarGutter,
    onTabClick: onInternalTabClick,
    onTabScroll,
    extra: tabBarExtraContent,
    style: tabBarStyle,
    panes: null,
    getPopupContainer,
    popupClassName,
  };

  return (
    <TabContext.Provider value={{ tabs, prefixCls }}>
      <div
        ref={ref}
        id={id}
        className={classNames(
          prefixCls,
          `${prefixCls}-${tabPosition}`,
          {
            [`${prefixCls}-mobile`]: mobile,
            [`${prefixCls}-editable`]: editable,
            [`${prefixCls}-rtl`]: rtl,
          },
          className,
        )}
        {...restProps}
      >
        {tabNavBar}
        <TabNavListWrapper {...tabNavBarProps} renderTabBar={renderTabBar} />
        <TabPanelList
          destroyInactiveTabPane={destroyInactiveTabPane}
          {...sharedProps}
          animated={mergedAnimated}
        />
      </div>
    </TabContext.Provider>
  );
}

const ForwardTabs = React.forwardRef(Tabs);
if (process.env.NODE_ENV !== 'production') {
  ForwardTabs.displayName = 'Tabs';
}

export default ForwardTabs;
