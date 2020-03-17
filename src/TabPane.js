import React from 'react';
import classnames from 'classnames';
import { getDataAttr } from './utils';

export default class TabPane extends React.Component {
  render() {
    const {
      id,
      className,
      destroyInactiveTabPane,
      active,
      forceRender,
      rootPrefixCls,
      style,
      children,
      placeholder,
      tabKey,
      ...restProps
    } = this.props;
    this._isActived = this._isActived || active;
    const prefixCls = `${rootPrefixCls}-tabpane`;
    const cls = classnames({
      [prefixCls]: 1,
      [`${prefixCls}-inactive`]: !active,
      [`${prefixCls}-active`]: active,
      [className]: className,
    });
    const isRender = destroyInactiveTabPane ? active : this._isActived;
    const shouldRender = isRender || forceRender;

    const tabKeyExists = tabKey && String(tabKey).length > 0;
    const uuid = tabKeyExists && (id ? `${tabKey}-${id}` : `${tabKey}`);
    return (
      <div
        style={{ ...style, visibility: active ? 'visible' : 'hidden' }}
        role="tabpanel"
        aria-hidden={active ? 'false' : 'true'}
        tabIndex={active ? 0 : -1}
        className={cls}
        id={uuid && `tabpane-${uuid}`}
        aria-labelledby={uuid && `tab-${uuid}`}
        {...getDataAttr(restProps)}
      >
        {shouldRender ? children : placeholder}
      </div>
    );
  }
}

TabPane.defaultProps = {
  placeholder: null,
};
