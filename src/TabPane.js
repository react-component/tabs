import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import classnames from 'classnames';

const TabPane = createReactClass({
  propTypes: {
    className: PropTypes.string,
    active: PropTypes.bool,
    style: PropTypes.any,
    destroyInactiveTabPane: PropTypes.bool,
    forceRender: PropTypes.bool,
    placeholder: PropTypes.node,
  },
  getDefaultProps() {
    return { placeholder: null };
  },
  render() {
    const props = this.props;
    const { className, destroyInactiveTabPane, active, forceRender } = props;
    this._isActived = this._isActived || active;
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
        style={props.style}
        role="tabpanel"
        aria-hidden={props.active ? 'false' : 'true'}
        className={cls}
      >
        {isRender || forceRender ? props.children : props.placeholder}
      </div>
    );
  },
});

export default TabPane;
