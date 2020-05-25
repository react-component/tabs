// Accessibility https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Tab_Role
import * as React from 'react';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import TabPane, { TabPaneProps } from './sugar/TabPane';
import TabNavList from './TabNavList';
import TabPanelList from './TabPanelList';
import { Tab, TabPosition, RenderTabBar, TabsLocale, EditableConfig } from './interface';
import TabContext from './TabContext';
import { isMobile } from './hooks/useTouchMove';

/**
 * Should added antd:
 * - hideAdd
 * - type
 * - onEdit
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
  animated?: boolean;
  renderTabBar?: RenderTabBar;
  tabBarExtraContent?: React.ReactNode;
  tabBarGutter?: number;
  tabBarStyle?: React.CSSProperties;
  tabPosition?: TabPosition;

  onChange?: (activeKey: React.Key) => void;
  onTabClick?: (activeKey: React.Key, e: React.KeyboardEvent | React.MouseEvent) => void;

  editable?: EditableConfig;

  // Accessibility
  locale?: TabsLocale;

  // Icons
  moreIcon?: React.ReactNode;
}

function parseTabList(children: React.ReactNode): Tab[] {
  return toArray(children).map((node: React.ReactElement<TabPaneProps>) =>
    React.isValidElement(node)
      ? {
          key: node.key !== undefined ? String(node.key) : undefined,
          ...node.props,
        }
      : null,
  );
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
    animated = true,
    tabPosition = 'top',
    tabBarGutter,
    tabBarExtraContent,
    locale,
    moreIcon,
    renderTabBar,
    onChange,
    onTabClick,
    ...restProps
  }: TabsProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const tabs = parseTabList(children);
  const rtl = direction === 'rtl';

  // ======================== Mobile ========================
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    // Only update on the client side
    setMobile(isMobile());
  }, []);

  // ======================= Animated =======================
  let mergedAnimated = animated;
  if (tabPosition === 'left' || tabPosition === 'right' || editable) {
    mergedAnimated = false;
  }

  // ====================== Active Key ======================
  const [mergedActiveKey, setMergedActiveKey] = useMergedState<string>(undefined, {
    value: activeKey,
    defaultValue: defaultActiveKey,
    // postState: key => (key !== undefined ? key : tabs[0]?.key),
  });
  const [activeIndex, setActiveIndex] = useState(() =>
    tabs.findIndex(tab => tab.key === mergedActiveKey),
  );

  // Reset active key if not exist anymore
  useEffect(() => {
    let newActiveIndex = tabs.findIndex(tab => tab.key === mergedActiveKey);
    if (newActiveIndex === -1) {
      newActiveIndex = Math.max(activeIndex - 1, 0);
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
      setMergedId(`rc-tabs-${uuid}`);
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
  };

  let tabNavBar: React.ReactElement;

  const tabNavBarProps = {
    ...sharedProps,
    editable,
    locale,
    moreIcon,
    tabBarGutter,
    onTabClick: onInternalTabClick,
    extra: tabBarExtraContent,
    mobile,
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
            [`${prefixCls}-rtl`]: rtl,
          },
          className,
        )}
        {...restProps}
      >
        {tabNavBar}
        <TabPanelList {...sharedProps} />
      </div>
    </TabContext.Provider>
  );
}

const ForwardTabs = React.forwardRef(Tabs);

export type ForwardTabsType = typeof ForwardTabs & { TabPane: typeof TabPane };

(ForwardTabs as ForwardTabsType).TabPane = TabPane;

export default ForwardTabs as ForwardTabsType;
