// Accessibility https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Tab_Role
import { clsx } from 'clsx';
import useControlledState from '@rc-component/util/lib/hooks/useControlledState';
import isMobile from '@rc-component/util/lib/isMobile';
import * as React from 'react';
import { useEffect, useState } from 'react';
import TabContext from './TabContext';
import type { TabContextProps } from './TabContext';
import TabNavListWrapper from './TabNavList/Wrapper';
import TabPanelList from './TabPanelList';
import useAnimateConfig from './hooks/useAnimateConfig';
import type { GetIndicatorSize } from './hooks/useIndicator';
import type {
  AnimatedConfig,
  EditableConfig,
  MoreProps,
  OnTabScroll,
  RenderTabBar,
  Tab,
  TabBarExtraContent,
  TabPosition,
  TabsLocale,
} from './interface';

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

export type SemanticName = 'popup' | 'item' | 'indicator' | 'content' | 'header';

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'children'> {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  classNames?: Partial<Record<SemanticName, string>>;
  styles?: Partial<Record<SemanticName, React.CSSProperties>>;
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
  destroyOnHidden?: boolean;

  onChange?: (activeKey: string) => void;
  onTabClick?: (activeKey: string, e: React.KeyboardEvent | React.MouseEvent) => void;
  onTabScroll?: OnTabScroll;

  editable?: EditableConfig;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;

  // Accessibility
  locale?: TabsLocale;

  // Icons
  more?: MoreProps;
  /** @private Internal usage. Not promise will rename in future */
  popupClassName?: string;
  indicator?: {
    size?: GetIndicatorSize;
    align?: 'start' | 'center' | 'end';
  };
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const {
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
    more,
    destroyOnHidden,
    renderTabBar,
    onChange,
    onTabClick,
    onTabScroll,
    getPopupContainer,
    popupClassName,
    indicator,
    classNames: tabsClassNames,
    styles,
    ...restProps
  } = props;
  const tabs = React.useMemo<Tab[]>(
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
  const [mergedActiveKey, setMergedActiveKey] = useControlledState<string>(
    defaultActiveKey ?? tabs[0]?.key,
    activeKey,
  );
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
  const [mergedId, setMergedId] = useControlledState(null, id);

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

  const tabNavBarProps = {
    ...sharedProps,
    editable,
    locale,
    more,
    tabBarGutter,
    onTabClick: onInternalTabClick,
    onTabScroll,
    extra: tabBarExtraContent,
    style: tabBarStyle,
    getPopupContainer,
    popupClassName: clsx(popupClassName, tabsClassNames?.popup),
    indicator,
    styles,
    classNames: tabsClassNames,
  };

  const memoizedValue = React.useMemo<TabContextProps>(() => {
    return { tabs, prefixCls };
  }, [tabs, prefixCls]);

  return (
    <TabContext.Provider value={memoizedValue}>
      <div
        ref={ref}
        id={id}
        className={clsx(
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
        <TabNavListWrapper {...tabNavBarProps} renderTabBar={renderTabBar} />
        <TabPanelList
          destroyOnHidden={destroyOnHidden}
          {...sharedProps}
          contentStyle={styles?.content}
          contentClassName={tabsClassNames?.content}
          animated={mergedAnimated}
        />
      </div>
    </TabContext.Provider>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Tabs.displayName = 'Tabs';
}

export default Tabs;
