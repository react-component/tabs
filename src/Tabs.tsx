// Accessibility https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Tab_Role
import * as React from 'react';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import TabNavList from './TabNavList';
import TabPanelList from './TabPanelList';
import TabPane, { TabPaneProps } from './TabPanelList/TabPane';
import {
  TabPosition,
  RenderTabBar,
  TabsLocale,
  EditableConfig,
  AnimatedConfig,
  OnTabScroll,
  Tab,
} from './interface';
import TabContext from './TabContext';
import { isMobile } from './hooks/useTouchMove';

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

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  id?: string;

  activeKey?: string;
  defaultActiveKey?: string;
  direction?: 'ltr' | 'rtl';
  animated?: boolean | AnimatedConfig;
  renderTabBar?: RenderTabBar;
  tabBarExtraContent?: React.ReactNode;
  tabBarGutter?: number;
  tabBarStyle?: React.CSSProperties;
  tabPosition?: TabPosition;
  destroyInactiveTabPane?: boolean;

  onChange?: (activeKey: string) => void;
  onTabClick?: (activeKey: string, e: React.KeyboardEvent | React.MouseEvent) => void;
  onTabScroll?: OnTabScroll;

  editable?: EditableConfig;

  // Accessibility
  locale?: TabsLocale;

  // Icons
  moreIcon?: React.ReactNode;
  /** @private Internal usage. Not promise will rename in future */
  moreTransitionName?: string;
}

function parseTabList(children: React.ReactNode): Tab[] {
  return toArray(children)
    .map((node: React.ReactElement<TabPaneProps>) => {
      if (React.isValidElement(node)) {
        const key = node.key !== undefined ? String(node.key) : undefined;
        return {
          key,
          ...node.props,
          node,
        };
      }

      return null;
    })
    .filter(tab => tab);
}

function Tabs(
  {
    id,
    prefixCls = 'rc-tabs',
    className,
    children,
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
    ...restProps
  }: TabsProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const tabs = parseTabList(children);
  const rtl = direction === 'rtl';

  let mergedAnimated: AnimatedConfig | false;
  if (animated === false) {
    mergedAnimated = {
      inkBar: false,
      tabPane: false,
    };
  } else {
    mergedAnimated = {
      inkBar: true,
      tabPane: false,
      ...(animated !== true ? animated : null),
    };
  }

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

  const mergedTabPosition = mobile ? 'top' : tabPosition;

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

    setMergedActiveKey(key);
    onChange?.(key);
  }

  // ======================== Render ========================
  const sharedProps = {
    id: mergedId,
    activeKey: mergedActiveKey,
    animated: mergedAnimated,
    tabPosition: mergedTabPosition,
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
  };

  if (renderTabBar) {
    tabNavBar = renderTabBar(tabNavBarProps, TabNavList);
  } else {
    tabNavBar = <TabNavList {...tabNavBarProps} />;
  }

  return (
    <TabContext.Provider value={{ tabs, prefixCls }}>
      <div
        ref={ref}
        id={id}
        className={classNames(
          prefixCls,
          `${prefixCls}-${mergedTabPosition}`,
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

export type ForwardTabsType = typeof ForwardTabs & { TabPane: typeof TabPane };

(ForwardTabs as ForwardTabsType).TabPane = TabPane;

export default ForwardTabs as ForwardTabsType;
