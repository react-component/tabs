import { clsx } from 'clsx';
import Dropdown from '@rc-component/dropdown';
import Menu, { MenuItem } from '@rc-component/menu';
import { KeyCode } from '@rc-component/util';
import * as React from 'react';
import { useEffect, useState } from 'react';
import type { EditableConfig, Tab, TabsLocale, MoreProps } from '../interface';
import { getRemovable } from '../util';
import AddButton from './AddButton';
import type { SemanticName } from '../Tabs';

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
  more?: MoreProps;
  editable?: EditableConfig;
  locale?: TabsLocale;
  removeAriaLabel?: string;
  onTabClick: (key: string, e: React.MouseEvent | React.KeyboardEvent) => void;
  tabMoving?: boolean;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  popupClassName?: string;
  popupStyle?: React.CSSProperties;
  styles?: Pick<Partial<Record<SemanticName, React.CSSProperties>>, 'remove'>;
  classNames?: Pick<Partial<Record<SemanticName, string>>, 'remove'>;
}

const OperationNode = React.forwardRef<HTMLDivElement, OperationNodeProps>((props, ref) => {
  const {
    prefixCls,
    id,
    tabs,
    locale,
    mobile,
    activeKey,
    more: moreProps = {},
    style,
    className,
    editable,
    tabBarGutter,
    rtl,
    removeAriaLabel,
    onTabClick,
    getPopupContainer,
    popupClassName,
    popupStyle,
    classNames,
    styles,
  } = props;
  // ======================== Dropdown ========================
  const [open, setOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>(null);
  const [searchValue, setSearchValue] = useState('');

  const { icon: moreIcon = 'More', showSearch } = moreProps;

  // 是否启用搜索
  const isSearchable = !!showSearch;
  const showSearchConfig = typeof showSearch === 'object' ? showSearch : {};
  const {
    placeholder = 'Search',
    onSearch,
    searchValue: controlledSearchValue,
    autoClearSearchValue = true,
  } = showSearchConfig;

  // 支持受控和非受控 searchValue
  const mergedSearchValue =
    controlledSearchValue !== undefined ? controlledSearchValue : searchValue;
  const setSearchValueFn = controlledSearchValue !== undefined ? () => {} : setSearchValue;

  // 根据搜索值过滤 tabs
  const filteredTabs = mergedSearchValue
    ? tabs.filter(tab => String(tab.label).toLowerCase().includes(mergedSearchValue.toLowerCase()))
    : tabs;

  const popupId = `${id}-more-popup`;
  const dropdownPrefix = `${prefixCls}-dropdown`;
  const selectedItemId = selectedKey !== null ? `${popupId}-${selectedKey}` : null;

  const dropdownAriaLabel = locale?.dropdownAriaLabel;

  function onRemoveTab(event: React.MouseEvent | React.KeyboardEvent, key: string) {
    event.preventDefault();
    event.stopPropagation();
    editable.onEdit('remove', { key, event });
  }

  const menu = (
    <Menu
      onClick={({ key, domEvent }) => {
        onTabClick(key, domEvent);
        setOpen(false);
      }}
      prefixCls={`${dropdownPrefix}-menu`}
      id={popupId}
      tabIndex={-1}
      role="listbox"
      aria-activedescendant={selectedItemId}
      selectedKeys={[selectedKey]}
      aria-label={dropdownAriaLabel !== undefined ? dropdownAriaLabel : 'expanded dropdown'}
    >
      {filteredTabs.map<React.ReactNode>(tab => {
        const { closable, disabled, closeIcon, key, label } = tab;
        const removable = getRemovable(closable, closeIcon, editable, disabled);
        return (
          <MenuItem
            key={key}
            id={`${popupId}-${key}`}
            role="option"
            aria-controls={id && `${id}-panel-${key}`}
            disabled={disabled}
          >
            {/* {tab.tab} */}
            <span>{label}</span>
            {removable && (
              <button
                type="button"
                aria-label={removeAriaLabel || 'remove'}
                tabIndex={0}
                className={clsx(`${dropdownPrefix}-menu-item-remove`, classNames?.remove)}
                style={styles?.remove}
                onClick={e => {
                  e.stopPropagation();
                  onRemoveTab(e, key);
                }}
              >
                {closeIcon || editable.removeIcon || '×'}
              </button>
            )}
          </MenuItem>
        );
      })}
    </Menu>
  );

  function selectOffset(offset: -1 | 1) {
    // 键盘导航只在过滤后的 tabs 上生效
    const enabledTabs = filteredTabs.filter(tab => !tab.disabled);
    let selectedIndex = enabledTabs.findIndex(tab => tab.key === selectedKey) || 0;
    const len = enabledTabs.length;

    if (len === 0) return;

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
        if (selectedKey !== null) {
          onTabClick(selectedKey, e);
        }
        break;
    }
  }

  // 搜索框
  const searchInput = isSearchable ? (
    <div className={`${dropdownPrefix}-search`}>
      <input
        type="text"
        placeholder={placeholder}
        value={mergedSearchValue}
        onChange={e => {
          const value = e.target.value;
          setSearchValueFn(value);
          onSearch?.(value);
        }}
        onKeyDown={e => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectOffset(1);
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectOffset(-1);
          } else if (e.key === 'Enter' && selectedKey) {
            e.preventDefault();
            onTabClick(selectedKey, e);
            setOpen(false);
          }
        }}
        onClick={e => e.stopPropagation()}
      />
    </div>
  ) : null;

  // ========================= Effect =========================
  useEffect(() => {
    // We use query element here to avoid React strict warning
    const ele = document.getElementById(selectedItemId);
    if (ele?.scrollIntoView) {
      ele.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [selectedItemId, selectedKey]);

  useEffect(() => {
    if (open) {
      // 打开时，默认选中当前 activeKey 对应的 tab
      if (!selectedKey && activeKey) {
        setSelectedKey(activeKey);
      }
    } else {
      setSelectedKey(null);
      if (autoClearSearchValue && controlledSearchValue === undefined) {
        setSearchValue('');
      }
    }
  }, [open, activeKey]);

  // ========================= Render =========================
  const moreStyle: React.CSSProperties = {
    marginInlineStart: tabBarGutter,
  };

  if (!tabs.length) {
    moreStyle.visibility = 'hidden';
    moreStyle.order = 1;
  }

  const overlayClassName = clsx(popupClassName, { [`${dropdownPrefix}-rtl`]: rtl });

  // 搜索框包裹 menu
  const dropdownContent = isSearchable ? (
    <div className={`${dropdownPrefix}-container`}>
      {searchInput}
      {menu}
    </div>
  ) : (
    menu
  );

  // 过滤 showSearch 属性，避免传给 Dropdown
  const { showSearch: _s, ...dropdownProps } = moreProps;

  const moreNode: React.ReactNode = mobile ? null : (
    <Dropdown
      prefixCls={dropdownPrefix}
      overlay={dropdownContent}
      visible={tabs.length ? open : false}
      onVisibleChange={setOpen}
      overlayClassName={overlayClassName}
      overlayStyle={popupStyle}
      mouseEnterDelay={0.1}
      mouseLeaveDelay={0.1}
      getPopupContainer={getPopupContainer}
      {...dropdownProps}
    >
      <button
        type="button"
        className={`${prefixCls}-nav-more`}
        style={moreStyle}
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
    <div className={clsx(`${prefixCls}-nav-operations`, className)} style={style} ref={ref}>
      {moreNode}
      <AddButton prefixCls={prefixCls} locale={locale} editable={editable} />
    </div>
  );
});

export default React.memo(
  OperationNode,
  (_, next) =>
    // https://github.com/ant-design/ant-design/issues/32544
    // We'd better remove syntactic sugar in `rc-menu` since this has perf issue
    next.tabMoving,
);
