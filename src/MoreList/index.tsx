import * as React from 'react';
import { useState, useEffect } from 'react';
import KeyCode from 'rc-util/lib/KeyCode';
import Menu, { MenuItem } from 'rc-menu';
import Dropdown from 'rc-dropdown';
import { Tab } from '../interface';

export interface MoreListProps {
  prefixCls: string;
  id: string;
  tabs: Tab[];
  activeKey: string;
  moreIcon?: React.ReactNode;
  onTabClick: (key: React.Key, e: React.MouseEvent | React.KeyboardEvent) => void;
}

export default function MoreList({
  prefixCls,
  id,
  tabs,
  moreIcon = 'More',
  onTabClick,
}: MoreListProps) {
  const [open, setOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>(null);

  const popupId = `${id}-more-popup`;
  const dropdownPrefix = `${prefixCls}-dropdown`;
  const selectedItemId = selectedKey !== null ? `${popupId}-${selectedKey}` : null;

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
    >
      {tabs.map(tab => (
        <MenuItem
          key={tab.key}
          id={`${popupId}-${tab.key}`}
          role="option"
          aria-controls={id && `${id}-panel-${tab.key}`}
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

    if (len > 1) {
      selectedIndex = (selectedIndex + offset + len) % len;
      setSelectedKey(enabledTabs[selectedIndex].key);
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const { which } = e;

    if (!open) {
      if (which === KeyCode.DOWN) {
        setOpen(true);
      }
      return;
    }

    switch (which) {
      case KeyCode.UP:
        selectOffset(-1);
        break;
      case KeyCode.DOWN:
        selectOffset(1);
        break;
      case KeyCode.ESC:
        setOpen(false);
        break;
      case KeyCode.SPACE:
      case KeyCode.ENTER:
        if (selectedKey !== null) onTabClick(selectedKey, e);
        break;

      default:
      // Do nothing
    }
  }

  // We use query element here to avoid React strict warning
  useEffect(() => {
    const ele = document.getElementById(selectedItemId);
    if (ele) {
      ele.scrollIntoView(false);
    }
  }, [selectedKey]);

  useEffect(() => {
    if (!open) {
      setSelectedKey(null);
    }
  }, [open]);

  return (
    <Dropdown
      prefixCls={dropdownPrefix}
      overlay={menu}
      trigger={['click']}
      visible={open}
      onVisibleChange={setOpen}
    >
      <button
        type="button"
        className={`${prefixCls}-nav-more`}
        style={{ visibility: tabs.length ? null : 'hidden' }}
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
}
