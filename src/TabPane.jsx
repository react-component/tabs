'use strict';

import React from 'react';

class TabPane extends React.Component {
  render() {
    var props = this.props;
    var prefixCls = `${props.rootPrefixCls}-tabpane`;
    var cls = props.active ? '' : `${prefixCls}-hidden`;
    cls += ' ' + prefixCls;
    return (
      <div className={cls}>
        {props.children}
      </div>
    );
  }

  componentWillUnmount() {
    if (this.props.onDestroy) {
      this.props.onDestroy();
    }
  }
}

export default TabPane;
