import React from 'react';
import classnames from 'classnames';

const TabPane = React.createClass({
  propTypes: {
    onDestroy: React.PropTypes.func,
  },

  componentWillUnmount() {
    if (this.props.onDestroy) {
      this.props.onDestroy();
    }
  },

  render() {
    const props = this.props;
    const prefixCls = `${props.rootPrefixCls}-tabpane`;
    const cls = classnames({
      [`${prefixCls}-hidden`]: !props.active,
      [prefixCls]: 1,
    });
    return (
      <div className={cls}>
        {props.children}
      </div>
    );
  },
});

export default TabPane;
