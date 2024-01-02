import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import * as React from 'react';
import type { AnimatedConfig, TabPosition } from '../interface';
import TabContext from '../TabContext';
import TabPane from './TabPane';

export interface TabPanelListProps {
  activeKey: string;
  id: string;
  animated?: AnimatedConfig;
  tabPosition?: TabPosition;
  destroyInactiveTabPane?: boolean;
}

const TabPanelList: React.FC<TabPanelListProps> = props => {
  const { id, activeKey, animated, tabPosition, destroyInactiveTabPane } = props;
  const { prefixCls, tabs } = React.useContext(TabContext);
  const tabPaneAnimated = animated.tabPane;

  const tabPanePrefixCls = `${prefixCls}-tabpane`;

  return (
    <div className={classNames(`${prefixCls}-content-holder`)}>
      <div
        className={classNames(`${prefixCls}-content`, `${prefixCls}-content-${tabPosition}`, {
          [`${prefixCls}-content-animated`]: tabPaneAnimated,
        })}
      >
        {tabs.map(item => {
          const {
            key,
            forceRender,
            style: paneStyle,
            className: paneClassName,
            destroyInactiveTabPane: itemDestroyInactiveTabPane,
            ...restTabProps
          } = item;
          const active = key === activeKey;
          return (
            <CSSMotion
              key={key}
              visible={active}
              forceRender={forceRender}
              removeOnLeave={!!(destroyInactiveTabPane || itemDestroyInactiveTabPane)}
              leavedClassName={`${tabPanePrefixCls}-hidden`}
              {...animated.tabPaneMotion}
            >
              {({ style: motionStyle, className: motionClassName }, ref) => (
                <TabPane
                  {...restTabProps}
                  prefixCls={tabPanePrefixCls}
                  id={id}
                  tabKey={key}
                  animated={tabPaneAnimated}
                  active={active}
                  style={{ ...paneStyle, ...motionStyle }}
                  className={classNames(paneClassName, motionClassName)}
                  ref={ref}
                />
              )}
            </CSSMotion>
          );
        })}
      </div>
    </div>
  );
};

export default TabPanelList;
