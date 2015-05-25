var React = require('react');
var prefixClsFn = require('./utils').prefixClsFn;

class TabPane extends React.Component {
  render() {
    var props = this.props;
    var prefixCls = props.rootPrefixCls + '-tabpane';
    var cls = props.active ? '' : prefixClsFn(prefixCls, 'hidden');
    cls += ' ' + prefixCls;
    return (
      <div className={cls}>
        {this.props.children}
      </div>
    );
  }

  componentWillUnmount() {
    if (this.props.onDestroy) {
      this.props.onDestroy();
    }
  }
}

module.exports = TabPane;
