import * as React from 'react';
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import KeyCode from 'rc-util/lib/KeyCode';
import Menu, { MenuItem } from 'rc-menu';
import Dropdown from 'rc-dropdown';
import type { Tab, TabsLocale, EditableConfig } from '../interface';
import AddButton from './AddButton';

export interface OperationNodeProps {
  prefixCls: string;
  className?: string;
  style?: React.CSSProperties;
  id: string;
  tabs: Tab[];
  rtl: boolean;
  tabBarGutter?: number;
  activeKey: string;
  mobile: boolean;
  moreIcon?: React.ReactNode;
  moreTransitionName?: string;
  editable?: EditableConfig;
  locale?: TabsLocale;
  onTabClick: (key: React.Key, e: React.MouseEvent | React.KeyboardEvent) => void;
}

function OperationNode(
  {
    prefixCls,
    id,
    tabs,
    locale,
    mobile,
    moreIcon = 'More',
    moreTransitionName,
    style,
    className,
    editable,
    tabBarGutter,
    rtl,
    onTabClick,
  }: OperationNodeProps,
  ref: React.Ref<HTMLDivElement>,
) {
  // ======================== Dropdown ========================
  const [open, setOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>(null);

  const popupId = `${id}-more-popup`;
  const dropdownPrefix = `${prefixCls}-dropdown`;
  const selectedItemId = selectedKey !== null ? `${popupId}-${selectedKey}` : null;

  const dropdownAriaLabel = locale?.dropdownAriaLabel;

  const menu = (
    <Menu
      onClick={({ key, domEvent }) => {
        onTabClick(key, domEvent);
        setOpen(false);
      }}
      id={popupId}
      tabIndex={-1}
      role="listbox"
      aria-activedescendant={selectedItemId}
      selectedKeys={[selectedKey]}
      aria-label={dropdownAriaLabel !== undefined ? dropdownAriaLabel : 'expanded dropdown'}
    >
      {tabs.map(tab => (
        <MenuItem
          key={tab.key}
          id={`${popupId}-${tab.key}`}
          role="option"
          aria-controls={id && `${id}-panel-${tab.key}`}
          disabled={tab.disabled}
        >
          {tab.tab}
        </MenuItem>
      ))}
    </Menu>
  );

  function selectOffset(offset: -1 | 1) {
    const enabledTabs = tabs.filter(tab => !tab.disabled);
    let selectedIndex = enabledTabs.findIndex(tab => tab.key === selectedKey) || 0;
    const len = enabledTabs.length;

    for (let i = 0; i < len; i += 1) {
      selectedIndex = (selectedIndex + offset + len) % len;
      const tab = enabledTabs[selectedIndex];
      if (!tab.disabled) {
        setSelectedKey(tab.key);
        return;
      }
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const { which } = e;

    if (!open) {
      if ([KeyCode.DOWN, KeyCode.SPACE, KeyCode.ENTER].includes(which)) {
        setOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (which) {
      case KeyCode.UP:
        selectOffset(-1);
        e.preventDefault();
        break;
      case KeyCode.DOWN:
        selectOffset(1);
        e.preventDefault();
        break;
      case KeyCode.ESC:
        setOpen(false);
        break;
      case KeyCode.SPACE:
      case KeyCode.ENTER:
        if (selectedKey !== null) onTabClick(selectedKey, e);
        break;
    }
  }

  // ========================= Effect =========================
  useEffect(() => {
    // We use query element here to avoid React strict warning
    const ele = document.getElementById(selectedItemId);
    if (ele && ele.scrollIntoView) {
      ele.scrollIntoView(false);
    }
  }, [selectedKey]);

  useEffect(() => {
    if (!open) {
      setSelectedKey(null);
    }
  }, [open]);

  // ========================= Render =========================
  const moreStyle: React.CSSProperties = {
    [rtl ? 'marginRight' : 'marginLeft']: tabBarGutter,
  };
  if (!tabs.length) {
    moreStyle.visibility = 'hidden';
    moreStyle.order = 1;
  }

  const overlayClassName = classNames({
    [`${dropdownPrefix}-rtl`]: rtl
  });

  const moreNode: React.ReactElement = mobile ? null : (
    <Dropdown
      prefixCls={dropdownPrefix}
      overlay={menu}
      trigger={['hover']}
      visible={open}
      transitionName={moreTransitionName}
      onVisibleChange={setOpen}
      overlayClassName={overlayClassName}
      mouseEnterDelay={0.1}
      mouseLeaveDelay={0.1}
    >
      <button
        type="button"
        className={`${prefixCls}-nav-more`}
        style={moreStyle}
        tabIndex={-1}
        aria-hidden="true"
        aria-haspopup="listbox"
        aria-controls={popupId}
        id={`${id}-more`}
        aria-expanded={open}
        onKeyDown={onKeyDown}
      >
        {moreIcon}
      </button>
    </Dropdown>
  );

  return (
    <div className={classNames(`${prefixCls}-nav-operations`, className)} style={style} ref={ref}>
      {moreNode}
      <AddButton prefixCls={prefixCls} locale={locale} editable={editable} />
    </div>
  );
}

export default React.forwardRef(OperationNode);
