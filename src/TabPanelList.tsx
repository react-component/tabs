import * as React from 'react';
import classNames from 'classnames';
import { TabPaneProps } from './sugar/TabPane';

export interface TabPanelListProps {
  prefixCls: string;
  tabs: TabPaneProps[];
  activeKey: React.Key;
  id: string;
  animated?: boolean;
}

export default function TabPanelList({
  id,
  prefixCls,
  activeKey,
  tabs,
  animated,
}: TabPanelListProps) {
  return (
    <div
      className={classNames(`${prefixCls}-content`, animated && `${prefixCls}-content-animated`)}
    >
      {tabs.map(({ key, children: content }) => {
        const active = key === activeKey;

        return (
          <div
            key={key}
            id={id && `${id}-panel-${key}`}
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={id && `${id}-tab-${key}`}
            hidden={!active}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}
