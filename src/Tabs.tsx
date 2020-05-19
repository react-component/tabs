// Accessibility https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Tab_Role
import * as React from 'react';
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import TabPane, { TabPaneProps } from './sugar/TabPane';
import TabNavList from './TabNavList';
import TabPanelList from './TabPanelList';

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

  activeKey?: React.Key;
  defaultActiveKey?: React.Key;
  animated?: boolean;
  renderTabBar?: (props: any, DefaultTabBar: React.ComponentClass) => React.ReactElement;
  tabBarExtraContent?: React.ReactNode;
  tabBarGutter?: number;
  tabBarStyle?: React.CSSProperties;
  tabPosition?: 'top' | 'right' | 'bottom' | 'left';
  tabBarScrollable?: boolean;
  onChange?: (activeKey: React.Key) => void;
  onTabClick?: (activeKey: React.Key) => void;
}

function parseTabList(children: React.ReactNode): TabPaneProps[] {
  return toArray(children).map((node: React.ReactElement<TabPaneProps>) =>
    React.isValidElement(node)
      ? {
          key: node.key,
          ...node.props,
        }
      : null,
  );
}

function Tabs({
  id,
  prefixCls = 'rc-tabs',
  className,
  children,
  activeKey,
  defaultActiveKey,
  animated = true,
  tabBarExtraContent,
  onChange,
  onTabClick,
  ...restProps
}: TabsProps) {
  const tabList = parseTabList(children);

  const [mergedActiveKey, setMergedActiveKey] = useMergedState(undefined, {
    value: activeKey,
    defaultValue: defaultActiveKey,
    postState: key => (key === undefined ? tabList[0]?.key : key),
  });

  const [mergedId, setMergedId] = useMergedState(null, {
    value: id,
  });

  // Async generate id to avoid ssr mapping failed
  React.useEffect(() => {
    if (!id) {
      setMergedId(`rc-tabs-${uuid}`);
      uuid += 1;
    }
  }, []);

  function onInternalTabClick(key: React.Key) {
    onTabClick?.(key);

    setMergedActiveKey(key);
    onChange?.(key);
  }

  const sharedProps = {
    tabs: tabList,
    id: mergedId,
    activeKey: mergedActiveKey,
    prefixCls,
    animated,
  };

  return (
    <div id={id} className={classNames(prefixCls, className)} {...restProps}>
      <TabNavList {...sharedProps} onTabClick={onInternalTabClick} extra={tabBarExtraContent} />
      <TabPanelList {...sharedProps} />
    </div>
  );
}

Tabs.TabPane = TabPane;

export default Tabs;
