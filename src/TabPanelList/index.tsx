import { clsx } from 'clsx';
import CSSMotion from '@rc-component/motion';
import * as React from 'react';
import type { AnimatedConfig, TabPosition } from '../interface';
import TabContext from '../TabContext';
import TabPane from './TabPane';

export interface TabPanelListProps {
  activeKey: string;
  id: string;
  animated: AnimatedConfig;
  tabPosition?: TabPosition;
  destroyOnHidden?: boolean;
  bodyStyle?: React.CSSProperties;
  bodyClassName?: string;
  contentStyle?: React.CSSProperties;
  contentClassName?: string;
}

const TabPanelList: React.FC<TabPanelListProps> = props => {
  const {
    id,
    activeKey,
    animated,
    tabPosition,
    destroyOnHidden,
    bodyStyle,
    bodyClassName,
    contentStyle,
    contentClassName,
  } = props;
  const { prefixCls, tabs } = React.useContext(TabContext);
  const tabPaneAnimated = animated.tabPane;

  const bodyPrefixCls = `${prefixCls}-body`;
  const contentPrefixCls = `${prefixCls}-content`;

  return (
    <div className={clsx(`${bodyPrefixCls}-holder`)}>
      <div
        className={clsx(
          bodyPrefixCls,
          `${bodyPrefixCls}-${tabPosition}`,
          {
            [`${bodyPrefixCls}-animated`]: tabPaneAnimated,
          },
          bodyClassName,
        )}
        style={bodyStyle}
      >
        {tabs.map(item => {
          const {
            key,
            forceRender,
            style: paneStyle,
            className: paneClassName,
            destroyOnHidden: itemDestroyOnHidden,
            ...restTabProps
          } = item;
          const active = key === activeKey;
          return (
            <CSSMotion
              key={key}
              visible={active}
              forceRender={forceRender}
              removeOnLeave={!!(destroyOnHidden ?? itemDestroyOnHidden)}
              leavedClassName={`${contentPrefixCls}-hidden`}
              {...animated.tabPaneMotion}
            >
              {({ style: motionStyle, className: motionClassName }, ref) => (
                <TabPane
                  {...restTabProps}
                  prefixCls={contentPrefixCls}
                  id={id}
                  tabKey={key}
                  animated={tabPaneAnimated}
                  active={active}
                  style={{ ...contentStyle, ...paneStyle, ...motionStyle }}
                  className={clsx(contentClassName, paneClassName, motionClassName)}
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
