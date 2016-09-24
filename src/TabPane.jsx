import React, { PropTypes } from 'react';
import classnames from 'classnames';

const TabPane = React.createClass({
  propTypes: {
    className: PropTypes.string,
    active: PropTypes.bool,
    destroyInactiveTabPane: PropTypes.bool,
    placeholder: PropTypes.node,
    forceRender: PropTypes.bool,
  },
  getDefaultProps() {
    return { placeholder: null };
  },
  render() {
    const props = this.props;
    const { className, destroyInactiveTabPane, active, forceRender } = props;
    this._isActived = this._isActived || active || forceRender;
    const prefixCls = `${props.rootPrefixCls}-tabpane`;
    const cls = classnames({
      [prefixCls]: 1,
      [`${prefixCls}-inactive`]: !active,
      [`${prefixCls}-active`]: active,
      [className]: className,
    });
    const isRender = destroyInactiveTabPane ? active : this._isActived;
    return (
      <div
        role="tabpanel"
        aria-hidden={props.active ? 'false' : 'true'}
        className={cls}
      >
        {isRender ? props.children : props.placeholder}
      </div>
    );
  },
});

export default TabPane;
