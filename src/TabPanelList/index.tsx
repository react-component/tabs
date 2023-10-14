import * as React from 'react';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import TabContext from '../TabContext';
import type { TabPosition, AnimatedConfig } from '../interface';
import TabPane from './TabPane';

export interface TabPanelListProps {
  activeKey: string;
  id: string;
  animated?: AnimatedConfig;
  tabPosition?: TabPosition;
  destroyInactiveTabPane?: boolean;
}

export default function TabPanelList({
  id,
  activeKey,
  animated,
  tabPosition,
  destroyInactiveTabPane,
}: TabPanelListProps) {
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
        {tabs.map(
          ({ key, forceRender, style: paneStyle, className: paneClassName, destroyInactiveTabPane: itemDestroyInactiveTabPane ...restTabProps }) => {
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
                {({ style: motionStyle, className: motionClassName }, ref) => {
                  return (
                    <TabPane
                      {...restTabProps}
                      prefixCls={tabPanePrefixCls}
                      id={id}
                      tabKey={key}
                      animated={tabPaneAnimated}
                      active={active}
                      style={{
                        ...paneStyle,
                        ...motionStyle,
                      }}
                      className={classNames(paneClassName, motionClassName)}
                      ref={ref}
                    />
                  );
                }}
              </CSSMotion>
            );
          },
        )}
      </div>
    </div>
  );
}
