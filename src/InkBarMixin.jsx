'use strict';

import {offset} from './utils';
import React from 'react';

function componentDidUpdate(component) {
  var refs = component.refs;
  var containerNode = React.findDOMNode(refs.nav);
  var containerOffset = offset(containerNode);
  var inkBarNode = React.findDOMNode(refs.inkBar);
  var activeTab = refs.activeTab;
  var tabPosition = component.props.tabPosition;
  if (activeTab) {
    var tabNode = React.findDOMNode(activeTab);
    var tabOffset = offset(tabNode);
    if (tabPosition === 'top' || tabPosition === 'bottom') {
      var left = tabOffset.left - containerOffset.left;
      inkBarNode.style.left = left + 'px';
      inkBarNode.style.top = '';
      inkBarNode.style.bottom = '';
      inkBarNode.style.right = (containerNode.offsetWidth - left - tabNode.offsetWidth) + 'px';
    } else {
      var top = tabOffset.top - containerOffset.top;
      inkBarNode.style.left = '';
      inkBarNode.style.right = '';
      inkBarNode.style.top = top + 'px';
      inkBarNode.style.bottom = (containerNode.offsetHeight - top - tabNode.offsetHeight) + 'px';
    }

  }
  inkBarNode.style.display = activeTab ? 'block' : 'none';
}

export default {
  componentDidUpdate() {
    componentDidUpdate(this);
  },

  componentDidMount() {
    componentDidUpdate(this);
  }
};
