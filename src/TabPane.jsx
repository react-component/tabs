import React, { PropTypes } from 'react';
import classNames from 'classnames';

const TabPane = React.createClass({
  propTypes: {
    rootPrefixCls: PropTypes.string,
    className: PropTypes.string,
    active: PropTypes.bool,
    destroyInactiveTabPane: PropTypes.bool,
    forceRender: PropTypes.bool,
    placeholder: PropTypes.node,
  },
  getDefaultProps() {
    return { placeholder: null };
  },
  render() {
    const props = this.props;
    const {
      rootPrefixCls, className, destroyInactiveTabPane,
      active, forceRender, ...rest,
    } = props;
    this._isActived = this._isActived || active;
    const prefixCls = `${rootPrefixCls}-tabpane`;
    const cls = classNames({
      [prefixCls]: 1,
      [`${prefixCls}-inactive`]: !active,
      [`${prefixCls}-active`]: active,
      [className]: className,
    });
    const isRender = destroyInactiveTabPane ? active : this._isActived;

    delete rest.tab;
    return (
      <div
        {...rest}
        role="tabpanel"
        aria-hidden={active ? 'false' : 'true'}
        className={cls}
      >
        {isRender || forceRender ? props.children : props.placeholder}
      </div>
    );
  },
});

export default TabPane;
