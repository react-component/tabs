webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(177);


/***/ },

/***/ 177:
/***/ function(module, exports, __webpack_require__) {

	/* eslint react/no-multi-comp:0, no-console:0, no-alert:0 */
	
	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	__webpack_require__(2);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(160);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rcTabs = __webpack_require__(161);
	
	var _rcTabs2 = _interopRequireDefault(_rcTabs);
	
	var index = 1;
	
	var Test = _react2['default'].createClass({
	  displayName: 'Test',
	
	  getInitialState: function getInitialState() {
	    return {
	      tabs: [{
	        title: '初始',
	        content: '初始内容'
	      }],
	
	      activeKey: '初始'
	    };
	  },
	
	  onTabChange: function onTabChange(activeKey) {
	    this.setState({ activeKey: activeKey });
	  },
	
	  construct: function construct() {
	    var _this = this;
	
	    var disabled = true;
	    return this.state.tabs.map(function (t) {
	      return _react2['default'].createElement(
	        _rcTabs.TabPane,
	        { tab: _react2['default'].createElement(
	            'span',
	            null,
	            t.title,
	            _react2['default'].createElement(
	              'a',
	              { style: {
	                  position: 'absolute',
	                  cursor: 'pointer',
	                  color: 'red',
	                  right: 5,
	                  top: 0
	                }, onClick: _this.remove.bind(_this, t.title) },
	              'x'
	            )
	          ),
	          key: t.title },
	        _react2['default'].createElement(
	          'div',
	          { style: { padding: 100 } },
	          t.content
	        )
	      );
	    }).concat([_react2['default'].createElement(_rcTabs.TabPane, { tab: _react2['default'].createElement(
	        'a',
	        { style: { color: 'black', cursor: 'pointer' }, onClick: this.add },
	        ' + 添加'
	      ),
	      disabled: disabled,
	      key: '__add' })]);
	  },
	
	  remove: function remove(title, e) {
	    e.stopPropagation();
	    if (this.state.tabs.length === 1) {
	      alert('只剩一个，不能删');
	      return;
	    }
	    var foundIndex = 0;
	    var after = this.state.tabs.filter(function (t, i) {
	      if (t.title !== title) {
	        return true;
	      }
	      foundIndex = i;
	      return false;
	    });
	    var activeKey = this.state.activeKey;
	    if (activeKey === title) {
	      if (foundIndex) {
	        foundIndex--;
	      }
	      activeKey = after[foundIndex].title;
	    }
	    this.setState({
	      tabs: after,
	      activeKey: activeKey
	    });
	  },
	
	  add: function add(e) {
	    e.stopPropagation();
	    index++;
	    var newTab = {
	      title: '名称: ' + index,
	      content: '内容: ' + index
	    };
	    this.setState({
	      tabs: this.state.tabs.concat(newTab),
	      activeKey: '名称: ' + index
	    });
	  },
	
	  render: function render() {
	    var animation = 'slide-horizontal';
	
	    var tabStyle = {
	      width: 500
	    };
	
	    return _react2['default'].createElement(
	      'div',
	      { style: { margin: 20 } },
	      _react2['default'].createElement(
	        'h2',
	        null,
	        'Addable Tabs'
	      ),
	      _react2['default'].createElement(
	        'div',
	        { style: tabStyle },
	        _react2['default'].createElement(
	          _rcTabs2['default'],
	          { animation: animation,
	            activeKey: this.state.activeKey,
	            onChange: this.onTabChange,
	            tabBarExtraContent: _react2['default'].createElement(
	              'button',
	              { onClick: this.add },
	              '+添加'
	            ) },
	          this.construct()
	        )
	      )
	    );
	  }
	});
	
	_reactDom2['default'].render(_react2['default'].createElement(Test, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=add.js.map