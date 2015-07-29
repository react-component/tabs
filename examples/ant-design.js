webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(22);


/***/ },

/***/ 22:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	__webpack_require__(23);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _rcTabs = __webpack_require__(7);
	
	var _rcTabs2 = _interopRequireDefault(_rcTabs);
	
	var PanelContent = (function (_React$Component) {
	  _inherits(PanelContent, _React$Component);
	
	  function PanelContent(props) {
	    _classCallCheck(this, PanelContent);
	
	    _get(Object.getPrototypeOf(PanelContent.prototype), 'constructor', this).call(this, props);
	    //console.log(this.props.id, 'constructor');
	  }
	
	  _createClass(PanelContent, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps() {
	      //console.log(this.props.id, 'componentWillReceiveProps');
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var length = parseInt(10 * Math.random() + 4);
	      var count = new Array(length); // new Array(4) skip forEach ....
	      for (var i = 0; i < length; i++) {
	        count[i] = 1;
	      }
	      var content = new Array(parseInt(100 * Math.random()) + 4).join(' ' + this.props.id);
	      var els = count.map(function (c, i) {
	        return _react2['default'].createElement(
	          'p',
	          { key: i },
	          content
	        );
	      });
	      return _react2['default'].createElement(
	        'div',
	        null,
	        els
	      );
	    }
	  }]);
	
	  return PanelContent;
	})(_react2['default'].Component);
	
	function construct(start, num) {
	  var ends = [];
	  var index = 1;
	  for (var i = start; i < start + num; i++) {
	    ends.push(_react2['default'].createElement(
	      _rcTabs.TabPane,
	      { tab: 'tab ' + i,
	        disabled: !!(i % 2),
	        key: index + "" },
	      _react2['default'].createElement(PanelContent, { id: i })
	    ));
	    index++;
	  }
	  return ends;
	}
	
	var Component = _react2['default'].createClass({
	  displayName: 'Component',
	
	  getInitialState: function getInitialState() {
	    return {
	      tabPosition: 'top',
	      start: 0
	    };
	  },
	
	  onChange: function onChange(key) {
	    //console.log(`onChange ${key}`);
	  },
	
	  onTabClick: function onTabClick(key) {
	    //console.log(`onTabClick ${key}`);
	  },
	
	  tick: function tick() {
	    this.setState({
	      start: this.state.start + 10
	    });
	  },
	
	  changeTabPosition: function changeTabPosition(e) {
	    this.setState({
	      tabPosition: e.target.value
	    });
	  },
	
	  render: function render() {
	    var start = this.state.start;
	    var ends = construct(start, 9);
	    var ends2 = construct(start, 3);
	    var tabPosition = this.state.tabPosition;
	    var navStyle = {};
	    var animation = "slide-horizontal";
	
	    var tabStyle = {
	      width: 500
	    };
	
	    if (tabPosition === 'left' || tabPosition === 'right') {
	      navStyle = {
	        height: 400
	      };
	      animation = "slide-vertical";
	      tabStyle = {
	        height: 500
	      };
	    }
	
	    return _react2['default'].createElement(
	      'div',
	      { style: { margin: 20 } },
	      _react2['default'].createElement(
	        'h2',
	        null,
	        'Simple Tabs'
	      ),
	      _react2['default'].createElement(
	        'p',
	        null,
	        'tabPosition:',
	        _react2['default'].createElement(
	          'select',
	          { value: this.state.tabPosition, onChange: this.changeTabPosition },
	          _react2['default'].createElement(
	            'option',
	            { value: "top" },
	            'top'
	          ),
	          _react2['default'].createElement(
	            'option',
	            { value: "bottom" },
	            'bottom'
	          ),
	          _react2['default'].createElement(
	            'option',
	            { value: "left" },
	            'left'
	          ),
	          _react2['default'].createElement(
	            'option',
	            { value: "right" },
	            'right'
	          )
	        )
	      ),
	      _react2['default'].createElement(
	        'div',
	        { style: tabStyle },
	        _react2['default'].createElement(
	          _rcTabs2['default'],
	          { defaultActiveKey: '3',
	            navStyle: navStyle,
	            tabPosition: this.state.tabPosition,
	            animation: animation,
	            onTabClick: this.onTabClick,
	            onChange: this.onChange },
	          ends2
	        )
	      ),
	      _react2['default'].createElement(
	        'h2',
	        null,
	        'Scroll Tabs'
	      ),
	      _react2['default'].createElement(
	        'div',
	        { style: tabStyle },
	        _react2['default'].createElement(
	          _rcTabs2['default'],
	          { defaultActiveKey: '3',
	            navStyle: navStyle,
	            tabPosition: this.state.tabPosition,
	            animation: animation,
	            onTabClick: this.onTabClick,
	            onChange: this.onChange },
	          ends
	        )
	      ),
	      _react2['default'].createElement(
	        'button',
	        { onClick: this.tick },
	        'rerender'
	      )
	    );
	  }
	});
	
	_react2['default'].render(_react2['default'].createElement(Component, null), document.getElementById('__react-content'));

/***/ },

/***/ 23:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(24);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/yiminghe/code/react-components/tabs/node_modules/rc-tools/node_modules/css-loader/index.js!/Users/yiminghe/code/react-components/tabs/assets/index.css", function() {
			var newContent = require("!!/Users/yiminghe/code/react-components/tabs/node_modules/rc-tools/node_modules/css-loader/index.js!/Users/yiminghe/code/react-components/tabs/assets/index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	exports.push([module.id, ".rc-tabs {\n  outline: none;\n  box-sizing: border-box;\n  position: relative;\n}\n@font-face {\n  font-family: 'iconfont';\n  src: url('//at.alicdn.com/t/font_1429685559_5814753.eot');\n  /* IE9*/\n  src: url('//at.alicdn.com/t/font_1429685559_5814753.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */ url('//at.alicdn.com/t/font_1429685559_5814753.woff') format('woff'), /* chrome、firefox */ url('//at.alicdn.com/t/font_1429685559_5814753.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/ url('//at.alicdn.com/t/font_1429685559_5814753.svg#iconfont') format('svg');\n  /* iOS 4.1- */\n}\n.rc-tabs-ink-bar {\n  z-index: 1;\n  position: absolute;\n  box-sizing: border-box;\n  margin-top: -3px;\n  background-color: #3fc7fa;\n  -webkit-transform: scaleX(1);\n      -ms-transform: scaleX(1);\n          transform: scaleX(1);\n  -webkit-transform-origin: 0 0;\n      -ms-transform-origin: 0 0;\n          transform-origin: 0 0;\n}\n.rc-tabs-nav-container {\n  font-size: 14px;\n  line-height: 1.5;\n  box-sizing: border-box;\n  overflow: hidden;\n  position: relative;\n  white-space: nowrap;\n}\n.rc-tabs-tab-prev,\n.rc-tabs-tab-next {\n  -moz-user-select: none;\n   -ms-user-select: none;\n       user-select: none;\n  -webkit-user-select: none;\n  z-index: 1;\n  line-height: 36px;\n  cursor: pointer;\n  border: none;\n  background-color: transparent;\n  position: absolute;\n}\n.rc-tabs-tab-prev-icon,\n.rc-tabs-tab-next-icon {\n  position: relative;\n  display: inline-block;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  line-height: inherit;\n  vertical-align: baseline;\n  text-align: center;\n  text-transform: none;\n  -webkit-font-smoothing: antialiased;\n  -webkit-text-stroke-width: 0;\n  -moz-osx-font-smoothing: grayscale;\n  font-family: sans-serif;\n}\n.rc-tabs-tab-prev-icon:before,\n.rc-tabs-tab-next-icon:before {\n  display: block;\n  font-family: \"iconfont\" !important;\n}\n.rc-tabs-tab-btn-disabled {\n  cursor: default;\n  color: #ccc;\n}\n.rc-tabs-nav-wrap {\n  overflow: hidden;\n}\n.rc-tabs-nav {\n  box-sizing: border-box;\n  padding-left: 0;\n  position: relative;\n  margin: 0;\n  float: left;\n  list-style: none;\n  display: inline-block;\n}\n.rc-tabs-nav:before,\n.rc-tabs-nav:after {\n  display: table;\n  content: \" \";\n}\n.rc-tabs-nav:after {\n  clear: both;\n}\n.rc-tabs-nav div.rc-tabs-tab-active > a,\n.rc-tabs-nav div.rc-tabs-tab-active > a:hover,\n.rc-tabs-nav div.rc-tabs-tab-active > a:focus {\n  color: #3fc7fa;\n  cursor: default;\n  text-decoration: none;\n}\n.rc-tabs-nav div.rc-tabs-tab-disabled {\n  pointer-events: none;\n  cursor: default;\n  color: #ccc;\n}\n.rc-tabs-nav .rc-tabs-tab {\n  box-sizing: border-box;\n  position: relative;\n  display: block;\n}\n.rc-tabs-nav .rc-tabs-tab > a {\n  transition: color 0.3s cubic-bezier(0.35, 0, 0.25, 1);\n  padding: 8px 20px;\n  font-weight: 500;\n  display: inline-block;\n}\n.rc-tabs-nav .rc-tabs-tab > a:hover {\n  color: #23c0fa;\n  cursor: pointer;\n}\n.rc-tabs-nav .rc-tabs-tab > a:hover,\n.rc-tabs-nav .rc-tabs-tab > a:focus {\n  text-decoration: none;\n}\n.rc-tabs-tabpane-hidden {\n  display: none;\n}\n.rc-tabs-content {\n  position: relative;\n  overflow: hidden;\n}\n.rc-tabs {\n  /*slide*/\n}\n.rc-tabs-slide-horizontal-backward-enter {\n  display: block !important;\n  -webkit-transform: translateX(-100%);\n      -ms-transform: translateX(-100%);\n          transform: translateX(-100%);\n}\n.rc-tabs-slide-horizontal-backward-enter.rc-tabs-slide-horizontal-backward-enter-active {\n  -webkit-transform: translateX(0);\n      -ms-transform: translateX(0);\n          transform: translateX(0);\n  transition: -webkit-transform 0.3s cubic-bezier(0.35, 0, 0.25, 1);\n  transition: transform 0.3s cubic-bezier(0.35, 0, 0.25, 1);\n}\n.rc-tabs-slide-horizontal-backward-leave {\n  display: block !important;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  -webkit-transform: translateX(0);\n      -ms-transform: translateX(0);\n          transform: translateX(0);\n}\n.rc-tabs-slide-horizontal-backward-leave.rc-tabs-slide-horizontal-backward-leave-active {\n  -webkit-transform: translateX(100%);\n      -ms-transform: translateX(100%);\n          transform: translateX(100%);\n  transition: -webkit-transform 0.3s cubic-bezier(0.35, 0, 0.25, 1);\n  transition: transform 0.3s cubic-bezier(0.35, 0, 0.25, 1);\n}\n.rc-tabs-slide-horizontal-forward-enter {\n  display: block !important;\n  -webkit-transform: translateX(100%);\n      -ms-transform: translateX(100%);\n          transform: translateX(100%);\n}\n.rc-tabs-slide-horizontal-forward-enter.rc-tabs-slide-horizontal-forward-enter-active {\n  -webkit-transform: translateX(0);\n      -ms-transform: translateX(0);\n          transform: translateX(0);\n  transition: -webkit-transform 0.3s cubic-bezier(0.35, 0, 0.25, 1);\n  transition: transform 0.3s cubic-bezier(0.35, 0, 0.25, 1);\n}\n.rc-tabs-slide-horizontal-forward-leave {\n  display: block !important;\n  position: absolute;\n  -webkit-transform: translateX(0);\n      -ms-transform: translateX(0);\n          transform: translateX(0);\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n}\n.rc-tabs-slide-horizontal-forward-leave.rc-tabs-slide-horizontal-forward-leave-active {\n  -webkit-transform: translateX(-100%);\n      -ms-transform: translateX(-100%);\n          transform: translateX(-100%);\n  transition: -webkit-transform 0.3s cubic-bezier(0.35, 0, 0.25, 1);\n  transition: transform 0.3s cubic-bezier(0.35, 0, 0.25, 1);\n}\n.rc-tabs-slide-vertical-backward-enter {\n  display: block !important;\n  -webkit-transform: translateY(-100%);\n      -ms-transform: translateY(-100%);\n          transform: translateY(-100%);\n}\n.rc-tabs-slide-vertical-backward-enter.rc-tabs-slide-vertical-backward-enter-active {\n  -webkit-transform: translateY(0);\n      -ms-transform: translateY(0);\n          transform: translateY(0);\n  transition: -webkit-transform 0.3s cubic-bezier(0.35, 0, 0.25, 1);\n  transition: transform 0.3s cubic-bezier(0.35, 0, 0.25, 1);\n}\n.rc-tabs-slide-vertical-backward-leave {\n  display: block !important;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  -webkit-transform: translateY(0);\n      -ms-transform: translateY(0);\n          transform: translateY(0);\n}\n.rc-tabs-slide-vertical-backward-leave.rc-tabs-slide-vertical-backward-leave-active {\n  -webkit-transform: translateY(100%);\n      -ms-transform: translateY(100%);\n          transform: translateY(100%);\n  transition: -webkit-transform 0.3s cubic-bezier(0.35, 0, 0.25, 1);\n  transition: transform 0.3s cubic-bezier(0.35, 0, 0.25, 1);\n}\n.rc-tabs-slide-vertical-forward-enter {\n  display: block !important;\n  -webkit-transform: translateY(100%);\n      -ms-transform: translateY(100%);\n          transform: translateY(100%);\n}\n.rc-tabs-slide-vertical-forward-enter.rc-tabs-slide-vertical-forward-enter-active {\n  -webkit-transform: translateY(0);\n      -ms-transform: translateY(0);\n          transform: translateY(0);\n  transition: -webkit-transform 0.3s cubic-bezier(0.35, 0, 0.25, 1);\n  transition: transform 0.3s cubic-bezier(0.35, 0, 0.25, 1);\n}\n.rc-tabs-slide-vertical-forward-leave {\n  display: block !important;\n  position: absolute;\n  -webkit-transform: translateY(0);\n      -ms-transform: translateY(0);\n          transform: translateY(0);\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n}\n.rc-tabs-slide-vertical-forward-leave.rc-tabs-slide-vertical-forward-leave-active {\n  -webkit-transform: translateY(-100%);\n      -ms-transform: translateY(-100%);\n          transform: translateY(-100%);\n  transition: -webkit-transform 0.3s cubic-bezier(0.35, 0, 0.25, 1);\n  transition: transform 0.3s cubic-bezier(0.35, 0, 0.25, 1);\n}\n.rc-tabs-left {\n  border-right: 2px solid #f3f3f3;\n}\n.rc-tabs-left .rc-tabs-nav-container {\n  float: left;\n  margin-right: 10px;\n  padding-top: 32px;\n  padding-bottom: 32px;\n  border-right: 1px solid #f3f3f3;\n}\n.rc-tabs-left .rc-tabs-nav-wrap {\n  height: 100%;\n}\n.rc-tabs-left .rc-tabs-content {\n  height: 100%;\n}\n.rc-tabs-left .rc-tabs-nav-scroll {\n  height: 99999px;\n}\n.rc-tabs-left .rc-tabs-nav {\n  transition: top 0.5s cubic-bezier(0.35, 0, 0.25, 1);\n}\n.rc-tabs-left .rc-tabs-tab-prev,\n.rc-tabs-left .rc-tabs-tab-next {\n  margin-top: -2px;\n  height: 32px;\n  width: 100%;\n  display: block;\n  text-align: center;\n}\n.rc-tabs-left .rc-tabs-tab-next {\n  bottom: 0;\n  -webkit-transform: rotate(90deg);\n      -ms-transform: rotate(90deg);\n          transform: rotate(90deg);\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);\n}\n.rc-tabs-left .rc-tabs-tab-next-icon:before {\n  content: \"\\e651\";\n}\n.rc-tabs-left .rc-tabs-tab-prev {\n  top: 2px;\n  -webkit-transform: rotate(270deg);\n      -ms-transform: rotate(270deg);\n          transform: rotate(270deg);\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);\n}\n.rc-tabs-left .rc-tabs-tab-prev-icon:before {\n  content: \"\\e651\";\n}\n.rc-tabs-left .rc-tabs-ink-bar {\n  width: 2px;\n  right: 0;\n}\n.rc-tabs-left .rc-tabs-ink-bar-transition-forward {\n  transition: bottom 0.3s cubic-bezier(0.35, 0, 0.25, 1), top 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s;\n}\n.rc-tabs-left .rc-tabs-ink-bar-transition-backward {\n  transition: bottom 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s, top 0.3s cubic-bezier(0.35, 0, 0.25, 1);\n}\n.rc-tabs-left .rc-tabs-nav .rc-tabs-tab {\n  padding: 16px 24px;\n}\n.rc-tabs-right {\n  border-left: 2px solid #f3f3f3;\n}\n.rc-tabs-right .rc-tabs-nav-container {\n  float: right;\n  margin-left: 10px;\n  padding-top: 32px;\n  padding-bottom: 32px;\n  border-left: 1px solid #f3f3f3;\n}\n.rc-tabs-right .rc-tabs-nav-wrap {\n  height: 100%;\n}\n.rc-tabs-right .rc-tabs-nav-scroll {\n  height: 99999px;\n}\n.rc-tabs-right .rc-tabs-nav {\n  transition: top 0.5s cubic-bezier(0.35, 0, 0.25, 1);\n}\n.rc-tabs-right .rc-tabs-tab-prev,\n.rc-tabs-right .rc-tabs-tab-next {\n  margin-top: -2px;\n  height: 32px;\n  width: 100%;\n  display: block;\n  text-align: center;\n}\n.rc-tabs-right .rc-tabs-tab-next {\n  bottom: 0;\n  -webkit-transform: rotate(90deg);\n      -ms-transform: rotate(90deg);\n          transform: rotate(90deg);\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);\n}\n.rc-tabs-right .rc-tabs-tab-next-icon:before {\n  content: \"\\e651\";\n}\n.rc-tabs-right .rc-tabs-tab-prev {\n  top: 2px;\n  -webkit-transform: rotate(270deg);\n      -ms-transform: rotate(270deg);\n          transform: rotate(270deg);\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);\n}\n.rc-tabs-right .rc-tabs-tab-prev-icon:before {\n  content: \"\\e651\";\n}\n.rc-tabs-right .rc-tabs-content {\n  height: 100%;\n}\n.rc-tabs-right .rc-tabs-ink-bar {\n  width: 2px;\n  left: 0;\n}\n.rc-tabs-right .rc-tabs-ink-bar-transition-forward {\n  transition: bottom 0.3s cubic-bezier(0.35, 0, 0.25, 1), top 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s;\n}\n.rc-tabs-right .rc-tabs-ink-bar-transition-backward {\n  transition: bottom 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s, top 0.3s cubic-bezier(0.35, 0, 0.25, 1);\n}\n.rc-tabs-right .rc-tabs-nav .rc-tabs-tab {\n  padding: 16px 24px;\n}\n.rc-tabs-bottom {\n  border-top: 2px solid #f3f3f3;\n}\n.rc-tabs-bottom .rc-tabs-nav-container {\n  width: 100%;\n  padding-left: 32px;\n  padding-right: 32px;\n  border-top: 1px solid #f3f3f3;\n}\n.rc-tabs-bottom .rc-tabs-nav-scroll {\n  width: 99999px;\n}\n.rc-tabs-bottom .rc-tabs-nav-wrap {\n  width: 100%;\n}\n.rc-tabs-bottom .rc-tabs-content {\n  width: 100%;\n}\n.rc-tabs-bottom .rc-tabs-nav {\n  transition: left 0.5s cubic-bezier(0.35, 0, 0.25, 1);\n}\n.rc-tabs-bottom .rc-tabs-tab-next {\n  right: 2px;\n}\n.rc-tabs-bottom .rc-tabs-tab-next-icon:before {\n  content: \"\\e651\";\n}\n.rc-tabs-bottom .rc-tabs-tab-prev {\n  left: 0;\n  -webkit-transform: rotate(180deg);\n      -ms-transform: rotate(180deg);\n          transform: rotate(180deg);\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);\n}\n.rc-tabs-bottom .rc-tabs-tab-prev-icon:before {\n  content: \"\\e651\";\n}\n.rc-tabs-bottom .rc-tabs-tab-prev,\n.rc-tabs-bottom .rc-tabs-tab-next {\n  margin-right: -2px;\n  width: 32px;\n  height: 100%;\n}\n.rc-tabs-bottom .rc-tabs-ink-bar {\n  height: 2px;\n  top: 3px;\n  left: 0;\n}\n.rc-tabs-bottom .rc-tabs-ink-bar-transition-forward {\n  transition: right 0.3s cubic-bezier(0.35, 0, 0.25, 1), left 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s;\n}\n.rc-tabs-bottom .rc-tabs-ink-bar-transition-backward {\n  transition: right 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s, left 0.3s cubic-bezier(0.35, 0, 0.25, 1);\n}\n.rc-tabs-bottom .rc-tabs-nav .rc-tabs-tab {\n  float: left;\n  height: 100%;\n  padding: 16px 20px;\n  margin-right: 30px;\n}\n.rc-tabs-top {\n  border-bottom: 2px solid #f3f3f3;\n}\n.rc-tabs-top .rc-tabs-nav-container {\n  width: 100%;\n  padding-left: 32px;\n  padding-right: 32px;\n  border-bottom: 1px solid #f3f3f3;\n}\n.rc-tabs-top .rc-tabs-nav-scroll {\n  width: 99999px;\n}\n.rc-tabs-top .rc-tabs-nav-wrap {\n  width: 100%;\n}\n.rc-tabs-top .rc-tabs-content {\n  width: 100%;\n}\n.rc-tabs-top .rc-tabs-nav {\n  transition: left 0.5s cubic-bezier(0.35, 0, 0.25, 1);\n}\n.rc-tabs-top .rc-tabs-tab-next {\n  right: 2px;\n}\n.rc-tabs-top .rc-tabs-tab-next-icon:before {\n  content: \"\\e651\";\n}\n.rc-tabs-top .rc-tabs-tab-prev {\n  left: 0;\n  -webkit-transform: rotate(180deg);\n      -ms-transform: rotate(180deg);\n          transform: rotate(180deg);\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);\n}\n.rc-tabs-top .rc-tabs-tab-prev-icon:before {\n  content: \"\\e651\";\n}\n.rc-tabs-top .rc-tabs-tab-prev,\n.rc-tabs-top .rc-tabs-tab-next {\n  margin-right: -2px;\n  width: 32px;\n  height: 100%;\n}\n.rc-tabs-top .rc-tabs-ink-bar {\n  height: 2px;\n  bottom: 0;\n  left: 0;\n}\n.rc-tabs-top .rc-tabs-ink-bar-transition-forward {\n  transition: right 0.3s cubic-bezier(0.35, 0, 0.25, 1), left 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s;\n}\n.rc-tabs-top .rc-tabs-ink-bar-transition-backward {\n  transition: right 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s, left 0.3s cubic-bezier(0.35, 0, 0.25, 1);\n}\n.rc-tabs-top .rc-tabs-nav .rc-tabs-tab {\n  float: left;\n  height: 100%;\n  margin-right: 30px;\n}\n", ""]);

/***/ }

});
//# sourceMappingURL=ant-design.js.map