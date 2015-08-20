import React from 'react';

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
    let cls = props.active ? '' : `${prefixCls}-hidden`;
    cls += ' ' + prefixCls;
    return (
      <div className={cls}>
        {props.children}
      </div>
    );
  },
});

export default TabPane;
