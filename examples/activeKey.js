webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	__webpack_require__(2);
	var React = __webpack_require__(6);
	var Tabs = __webpack_require__(7);
	var TabPane = Tabs.TabPane;
	
	var PanelContent = (function (_React$Component) {
	  function PanelContent(props) {
	    _classCallCheck(this, PanelContent);
	
	    _get(Object.getPrototypeOf(PanelContent.prototype), 'constructor', this).call(this, props);
	    console.log(this.props.id, 'constructor');
	  }
	
	  _inherits(PanelContent, _React$Component);
	
	  _createClass(PanelContent, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps() {
	      console.log(this.props.id, 'componentWillReceiveProps');
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	
	      var count = [1, 1, 1, 1]; // new Array(4) skip forEach ....
	      var els = count.map(function (c, i) {
	        return React.createElement(
	          'p',
	          { key: i },
	          _this.props.id
	        );
	      });
	      return React.createElement(
	        'div',
	        null,
	        els
	      );
	    }
	  }]);
	
	  return PanelContent;
	})(React.Component);
	
	var Component = React.createClass({
	  displayName: 'Component',
	
	  getInitialState: function getInitialState() {
	    return {
	      activeKey: '',
	      start: 0
	    };
	  },
	
	  onChange: function onChange(key) {
	    console.log('onChange ' + key);
	    this.setState({
	      activeKey: key
	    });
	  },
	
	  onTabClick: function onTabClick(key) {
	    console.log('onTabClick ' + key);
	    if (key === this.state.activeKey) {
	      this.setState({
	        activeKey: ''
	      });
	    }
	  },
	
	  tick: function tick() {
	    this.setState({
	      start: this.state.start + 10
	    });
	  },
	
	  render: function render() {
	    var start = this.state.start;
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h1',
	        null,
	        'Simple Tabs'
	      ),
	      React.createElement(
	        Tabs,
	        { activeKey: this.state.activeKey,
	          onTabClick: this.onTabClick,
	          onChange: this.onChange },
	        React.createElement(
	          TabPane,
	          { tab: 'tab ' + start, key: '1' },
	          React.createElement(PanelContent, { id: start })
	        ),
	        React.createElement(
	          TabPane,
	          { tab: 'tab ' + (start + 1), key: '2' },
	          React.createElement(PanelContent, { id: start + 1 })
	        ),
	        React.createElement(
	          TabPane,
	          { tab: 'tab ' + (start + 2), key: '3', disabled: true },
	          React.createElement(PanelContent, { id: start + 2 })
	        ),
	        React.createElement(
	          TabPane,
	          { tab: 'tab ' + (start + 3), key: '4' },
	          React.createElement(PanelContent, { id: start + 3 })
	        )
	      ),
	      React.createElement(
	        'button',
	        { onClick: this.tick },
	        'rerender'
	      )
	    );
	  }
	});
	
	React.render(React.createElement(Component, null), document.getElementById('__react-content'));

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/yiminghe/code/react-components/tabs/node_modules/rc-tools/node_modules/css-loader/index.js!/Users/yiminghe/code/react-components/tabs/assets/bootstrap.css", function() {
			var newContent = require("!!/Users/yiminghe/code/react-components/tabs/node_modules/rc-tools/node_modules/css-loader/index.js!/Users/yiminghe/code/react-components/tabs/assets/bootstrap.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	exports.push([module.id, ".rc-tabs {\n  outline: none;\n}\n.rc-tabs-nav-container {\n  line-height: 1.42857143;\n  font-size: 14px;\n  white-space: nowrap;\n}\n.rc-tabs-tab-prev,\n.rc-tabs-tab-next {\n  display: none;\n}\n.rc-tabs-nav {\n  box-sizing: border-box;\n  padding-left: 0;\n  list-style: none;\n  margin-top: 0;\n  display: inline-block;\n}\n.rc-tabs-nav:before,\n.rc-tabs-nav:after {\n  display: table;\n  content: \" \";\n}\n.rc-tabs-nav:after {\n  clear: both;\n}\n.rc-tabs-nav div.rc-tabs-tab-active > a,\n.rc-tabs-nav div.rc-tabs-tab-active > a:hover,\n.rc-tabs-nav div.rc-tabs-tab-active > a:focus {\n  color: #555;\n  cursor: default;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  text-decoration: none;\n}\n.rc-tabs-nav div.rc-tabs-tab-disabled {\n  pointer-events: none;\n  cursor: default;\n  color: #ccc;\n}\n.rc-tabs-nav .rc-tabs-tab {\n  float: left;\n  position: relative;\n  display: block;\n}\n.rc-tabs-nav .rc-tabs-tab > a {\n  margin-right: 2px;\n  border: 1px solid transparent;\n  text-decoration: none;\n  position: relative;\n  display: block;\n  padding: 10px 15px;\n}\n.rc-tabs-nav .rc-tabs-tab > a:hover {\n  border-color: #eee #eee #ddd;\n  cursor: pointer;\n}\n.rc-tabs-nav .rc-tabs-tab > a:hover,\n.rc-tabs-nav .rc-tabs-tab > a:focus {\n  text-decoration: none;\n  background-color: #eee;\n}\n.rc-tabs-tabpane-hidden {\n  display: none;\n}\n.rc-tabs-ink-bar {\n  display: none;\n}\n.rc-tabs-top .rc-tabs-nav-container {\n  border-bottom: 1px solid #ddd;\n  margin-bottom: 10px;\n}\n.rc-tabs-top .rc-tabs-nav .rc-tabs-tab {\n  margin-bottom: -6px;\n}\n.rc-tabs-top .rc-tabs-nav div.rc-tabs-tab-active > a,\n.rc-tabs-top .rc-tabs-nav div.rc-tabs-tab-active > a:hover,\n.rc-tabs-top .rc-tabs-nav div.rc-tabs-tab-active > a:focus {\n  border-bottom-color: transparent;\n  border-radius: 4px 4px 0 0;\n}\n.rc-tabs-bottom .rc-tabs-nav-container {\n  border-top: 1px solid #ddd;\n  margin-top: 10px;\n}\n.rc-tabs-bottom .rc-tabs-nav .rc-tabs-tab {\n  margin-top: -1px;\n}\n.rc-tabs-bottom .rc-tabs-nav div.rc-tabs-tab-active > a,\n.rc-tabs-bottom .rc-tabs-nav div.rc-tabs-tab-active > a:hover,\n.rc-tabs-bottom .rc-tabs-nav div.rc-tabs-tab-active > a:focus {\n  border-top-color: transparent;\n  border-radius: 0 0 4px 4px;\n}\n.rc-tabs-left .rc-tabs-nav-container {\n  border-right: 1px solid #ddd;\n  margin-right: 10px;\n  float: left;\n}\n.rc-tabs-left .rc-tabs-nav .rc-tabs-tab {\n  margin-right: -3px;\n  float: none;\n}\n.rc-tabs-left .rc-tabs-nav {\n  display: block;\n}\n.rc-tabs-left .rc-tabs-nav div.rc-tabs-tab-active > a,\n.rc-tabs-left .rc-tabs-nav div.rc-tabs-tab-active > a:hover,\n.rc-tabs-left .rc-tabs-nav div.rc-tabs-tab-active > a:focus {\n  border-right-color: transparent;\n  border-radius: 4px 0 0 4px;\n}\n.rc-tabs-right .rc-tabs-nav-container {\n  border-left: 1px solid #ddd;\n  margin-left: 10px;\n  float: right;\n}\n.rc-tabs-right .rc-tabs-nav .rc-tabs-tab {\n  margin-left: -3px;\n  float: none;\n}\n.rc-tabs-right .rc-tabs-nav {\n  display: block;\n}\n.rc-tabs-right .rc-tabs-nav div.rc-tabs-tab-active > a,\n.rc-tabs-right .rc-tabs-nav div.rc-tabs-tab-active > a:hover,\n.rc-tabs-right .rc-tabs-nav div.rc-tabs-tab-active > a:focus {\n  border-left-color: transparent;\n  border-radius: 0 4px 4px 0;\n}\n", ""]);

/***/ }
]);
//# sourceMappingURL=activeKey.js.map