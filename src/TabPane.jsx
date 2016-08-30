import React, { PropTypes } from 'react';
import classnames from 'classnames';

const TabPane = React.createClass({
  propTypes: {
    active: PropTypes.bool,
    destroyInactiveTabPane: PropTypes.bool,
    placeholder: PropTypes.node,
  },
  getDefaultProps() {
    return { placeholder: null };
  },
  render() {
    const props = this.props;
    const { destroyInactiveTabPane, active } = props;
    this._isActived = this._isActived || active;
    const prefixCls = `${props.rootPrefixCls}-tabpane`;
    const cls = classnames({
      [`${prefixCls}-inactive`]: !active,
      [`${prefixCls}-active`]: active,
      [prefixCls]: 1,
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
