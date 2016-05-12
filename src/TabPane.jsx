import React, { PropTypes } from 'react';
import classnames from 'classnames';

const TabPane = React.createClass({
  propTypes: {
    active: PropTypes.bool,
  },
  render() {
    const props = this.props;
    this._isActived = this._isActived || props.active;
    if (!this._isActived) {
      return null;
    }
    const prefixCls = `${props.rootPrefixCls}-tabpane`;
    const cls = classnames({
      [`${prefixCls}-hidden`]: !props.active,
      [prefixCls]: 1,
    });
    return (
      <div
        role="tabpanel"
        aria-hidden={props.active ? 'false' : 'true'}
        className={cls}
      >
        {props.children}
      </div>
    );
  },
});

export default TabPane;
