var offset = require('./utils').offset;
var React = require('react');

function componentDidUpdate(component) {
  var refs = component.refs;
  var containerNode = React.findDOMNode(refs.nav);
  var containerOffset = offset(containerNode);
  var inkBarNode = React.findDOMNode(refs.inkBar);
  var active;
  for (var ref in refs) {
    if (ref.slice(0, 3) === 'tab') {
      var tab = refs[ref];
      if (tab.props['data-active']) {
        active = 1;
        var tabNode = React.findDOMNode(tab);
        var tabOffset = offset(tabNode);
        var left = tabOffset.left - containerOffset.left;
        inkBarNode.style.left = left + 'px';
        inkBarNode.style.right = (containerNode.offsetWidth - left - tabNode.offsetWidth) + 'px';
      }
    }
  }
  inkBarNode.style.display = active ? 'block' : 'none';
}

module.exports = {
  componentDidUpdate() {
    componentDidUpdate(this);
  },

  componentDidMount() {
    componentDidUpdate(this);
  }
};
