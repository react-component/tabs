webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(282);


/***/ },

/***/ 282:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(80);
	
	var _react = __webpack_require__(81);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(112);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rcTabs = __webpack_require__(258);
	
	var _rcTabs2 = _interopRequireDefault(_rcTabs);
	
	var _TabContent = __webpack_require__(274);
	
	var _TabContent2 = _interopRequireDefault(_TabContent);
	
	var _ScrollableInkTabBar = __webpack_require__(278);
	
	var _ScrollableInkTabBar2 = _interopRequireDefault(_ScrollableInkTabBar);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* eslint react/no-multi-comp:0, no-console:0, no-alert:0 */
	
	var index = 1;
	
	var Test = _react2.default.createClass({
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
	    this.setState({
	      activeKey: activeKey
	    });
	  },
	  construct: function construct() {
	    var _this = this;
	
	    var disabled = true;
	    return this.state.tabs.map(function (t) {
	      return _react2.default.createElement(
	        _rcTabs.TabPane,
	        {
	          tab: _react2.default.createElement(
	            'span',
	            null,
	            t.title,
	            _react2.default.createElement(
	              'a',
	              {
	                style: {
	                  position: 'absolute',
	                  cursor: 'pointer',
	                  color: 'red',
	                  right: 5,
	                  top: 0
	                },
	                onClick: _this.remove.bind(_this, t.title)
	              },
	              'x'
	            )
	          ),
	          key: t.title
	        },
	        _react2.default.createElement(
	          'div',
	          { style: { padding: 100 } },
	          t.content
	        )
	      );
	    }).concat([_react2.default.createElement(_rcTabs.TabPane, {
	      tab: _react2.default.createElement(
	        'a',
	        { style: { color: 'black', cursor: 'pointer' }, onClick: this.add },
	        ' + \u6DFB\u52A0'
	      ),
	      disabled: disabled,
	      key: '__add'
	    })]);
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
	      title: '\u540D\u79F0: ' + index,
	      content: '\u5185\u5BB9: ' + index
	    };
	    this.setState({
	      tabs: this.state.tabs.concat(newTab),
	      activeKey: '\u540D\u79F0: ' + index
	    });
	  },
	  render: function render() {
	    var _this2 = this;
	
	    var tabStyle = {
	      width: 500
	    };
	
	    return _react2.default.createElement(
	      'div',
	      { style: { margin: 20 } },
	      _react2.default.createElement(
	        'h2',
	        null,
	        'Addable Tabs'
	      ),
	      _react2.default.createElement(
	        'div',
	        { style: tabStyle },
	        _react2.default.createElement(
	          _rcTabs2.default,
	          {
	            renderTabBar: function renderTabBar() {
	              return _react2.default.createElement(_ScrollableInkTabBar2.default, {
	                extraContent: _react2.default.createElement(
	                  'button',
	                  { onClick: _this2.add },
	                  '+\u6DFB\u52A0'
	                )
	              });
	            },
	            renderTabContent: function renderTabContent() {
	              return _react2.default.createElement(_TabContent2.default, null);
	            },
	            activeKey: this.state.activeKey,
	            onChange: this.onTabChange
	          },
	          this.construct()
	        )
	      )
	    );
	  }
	});
	
	_reactDom2.default.render(_react2.default.createElement(Test, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=add.js.map