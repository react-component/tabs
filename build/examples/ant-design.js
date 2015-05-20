webpackJsonp([2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	
	__webpack_require__(7);
	var React = __webpack_require__(5);
	var Tabs = __webpack_require__(6);
	var TabPane = Tabs.TabPane;
	
	var ____Class0=React.Component;for(var ____Class0____Key in ____Class0){if(____Class0.hasOwnProperty(____Class0____Key)){PanelContent[____Class0____Key]=____Class0[____Class0____Key];}}var ____SuperProtoOf____Class0=____Class0===null?null:____Class0.prototype;PanelContent.prototype=Object.create(____SuperProtoOf____Class0);PanelContent.prototype.constructor=PanelContent;PanelContent.__superConstructor__=____Class0;
	  function PanelContent(props) {"use strict";
	    ____Class0.call(this,props);
	    //console.log(this.props.id, 'constructor');
	  }
	
	  Object.defineProperty(PanelContent.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function() {"use strict";
	    //console.log(this.props.id, 'componentWillReceiveProps');
	  }});
	
	  Object.defineProperty(PanelContent.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
	    var count = [1, 1, 1, 1];// new Array(4) skip forEach ....
	    var content = new Array(200).join(' ' + this.props.id);
	    var els = count.map(function(c, i) {
	      return React.createElement("p", {key: i}, content)
	    });
	    return React.createElement("div", null, els);
	  }});
	
	
	function construct(start, num) {
	  var ends = [];
	  var index = 1;
	  for (var i = start; i < start + num; i++) {
	    ends.push(React.createElement(TabPane, {tab: ("tab " + i), 
	      disabled: !!(i % 2), 
	      key: index + ""}, 
	      React.createElement(PanelContent, {id: i})
	    ));
	    index++;
	  }
	  return ends;
	}
	
	
	var Component = React.createClass({displayName: "Component",
	  getInitialState:function() {
	    return {
	      start: 0
	    }
	  },
	
	  onChange:function(key) {
	    //console.log(`onChange ${key}`);
	  },
	
	  onTabClick:function(key) {
	    //console.log(`onTabClick ${key}`);
	  },
	
	  tick:function() {
	    this.setState({
	      start: this.state.start + 10
	    })
	  },
	
	  render:function() {
	    var start = this.state.start;
	    var ends = construct(start, 9);
	    var ends2 = construct(start, 3);
	    return React.createElement("div", null, 
	      React.createElement("h2", null, "Simple Tabs"), 
	      React.createElement("div", {style: {width: 500, margin: 20}}, 
	        React.createElement(Tabs, {defaultActiveKey: "3", 
	          effect: true, 
	          onTabClick: this.onTabClick, 
	          onChange: this.onChange}, 
	        ends2
	        )
	      ), 
	      React.createElement("h2", null, "Scroll Tabs"), 
	      React.createElement("div", {style: {width: 500, margin: 20}}, 
	        React.createElement(Tabs, {defaultActiveKey: "3", 
	          effect: true, 
	          onTabClick: this.onTabClick, 
	          onChange: this.onChange}, 
	        ends
	        )
	      ), 
	      React.createElement("button", {onClick: this.tick}, "rerender")
	    )
	  }
	});
	
	React.render(React.createElement(Component, null), document.getElementById('__react-content'));


/***/ },
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(1)(content, {});
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	exports.push([module.id, ".rc-tabs {\n  outline: none;\n  box-sizing: border-box;\n  border-bottom: 2px solid #f3f3f3;\n  position: relative;\n}\n@font-face {\n  font-family: 'iconfont';\n  src: url('//at.alicdn.com/t/font_1429685559_5814753.eot');\n  /* IE9*/\n  src: url('//at.alicdn.com/t/font_1429685559_5814753.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */ url('//at.alicdn.com/t/font_1429685559_5814753.woff') format('woff'), /* chrome、firefox */ url('//at.alicdn.com/t/font_1429685559_5814753.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/ url('//at.alicdn.com/t/font_1429685559_5814753.svg#iconfont') format('svg');\n  /* iOS 4.1- */\n}\n.rc-tabs-ink-bar {\n  z-index: 1;\n  position: absolute;\n  left: 0;\n  bottom: 0px;\n  box-sizing: border-box;\n  height: 4px;\n  margin-top: -3px;\n  background-color: #3fc7fa;\n  -webkit-transform: scaleX(1);\n      -ms-transform: scaleX(1);\n          transform: scaleX(1);\n  -webkit-transform-origin: 0 0;\n      -ms-transform-origin: 0 0;\n          transform-origin: 0 0;\n}\n.rc-tabs-ink-bar-transition-right {\n  transition: right 0.3s cubic-bezier(0.35, 0, 0.25, 1), left 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s;\n}\n.rc-tabs-ink-bar-transition-left {\n  transition: right 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s, left 0.3s cubic-bezier(0.35, 0, 0.25, 1);\n}\n.rc-tabs-nav-container {\n  font-size: 14px;\n  line-height: 1.5;\n  box-sizing: border-box;\n  width: 100%;\n  overflow: hidden;\n  position: relative;\n  white-space: nowrap;\n  padding-left: 32px;\n  padding-right: 32px;\n  border-bottom: 2px solid #f3f3f3;\n}\n.rc-tabs-tab-prev,\n.rc-tabs-tab-next {\n  -moz-user-select: none;\n   -ms-user-select: none;\n       user-select: none;\n  -webkit-user-select: none;\n  z-index: 1;\n  margin-right: -2px;\n  width: 32px;\n  height: 100%;\n  line-height: 36px;\n  cursor: pointer;\n  border: none;\n  background-color: transparent;\n  position: absolute;\n}\n.rc-tabs-tab-prev-icon,\n.rc-tabs-tab-next-icon {\n  position: relative;\n  display: inline-block;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  line-height: inherit;\n  vertical-align: baseline;\n  text-align: center;\n  text-transform: none;\n  -webkit-font-smoothing: antialiased;\n  -webkit-text-stroke-width: 0px;\n  -moz-osx-font-smoothing: grayscale;\n  font-family: sans-serif;\n}\n.rc-tabs-tab-prev-icon:before,\n.rc-tabs-tab-next-icon:before {\n  display: block;\n  font-family: \"iconfont\" !important;\n}\n.rc-tabs-tab-next {\n  right: 2px;\n}\n.rc-tabs-tab-next-icon:before {\n  content: \"\\e651\";\n}\n.rc-tabs-tab-prev {\n  left: 0;\n  -webkit-transform: rotate(180deg);\n      -ms-transform: rotate(180deg);\n          transform: rotate(180deg);\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);\n}\n.rc-tabs-tab-prev-icon:before {\n  content: \"\\e651\";\n}\n.rc-tabs-nav-wrap {\n  width: 100%;\n  overflow: hidden;\n}\n.rc-tabs-nav-scroll {\n  width: 99999px;\n}\n.rc-tabs-nav {\n  height: 36px;\n  box-sizing: border-box;\n  padding-left: 0;\n  transition: left 0.5s cubic-bezier(0.35, 0, 0.25, 1);\n  position: relative;\n  margin: 0;\n  list-style: none;\n  display: inline-block;\n}\n.rc-tabs-nav:before,\n.rc-tabs-nav:after {\n  display: table;\n  content: \" \";\n}\n.rc-tabs-nav:after {\n  clear: both;\n}\n.rc-tabs-nav div.rc-tabs-tab-active > a,\n.rc-tabs-nav div.rc-tabs-tab-active > a:hover,\n.rc-tabs-nav div.rc-tabs-tab-active > a:focus {\n  color: #3fc7fa;\n  cursor: default;\n  text-decoration: none;\n}\n.rc-tabs-nav div.rc-tabs-tab-disabled {\n  pointer-events: none;\n  cursor: default;\n  color: #ccc;\n}\n.rc-tabs-nav .rc-tabs-tab {\n  float: left;\n  height: 100%;\n  padding: 10px 20px;\n  margin-right: 30px;\n  box-sizing: border-box;\n  position: relative;\n  display: block;\n}\n.rc-tabs-nav .rc-tabs-tab > a {\n  transition: color 0.3s cubic-bezier(0.35, 0, 0.25, 1);\n  margin-bottom: 4px;\n  font-weight: 500;\n  display: inline-block;\n}\n.rc-tabs-nav .rc-tabs-tab > a:hover {\n  color: #23c0fa;\n  cursor: pointer;\n}\n.rc-tabs-nav .rc-tabs-tab > a:hover,\n.rc-tabs-nav .rc-tabs-tab > a:focus {\n  text-decoration: none;\n}\n.rc-tabs-tabpane-hidden {\n  display: none;\n}\n.rc-tabs-content {\n  position: relative;\n  width: 100%;\n  overflow: hidden;\n}\n.rc-tabs-effect-left-enter {\n  -webkit-transform: translateX(-100%);\n      -ms-transform: translateX(-100%);\n          transform: translateX(-100%);\n}\n.rc-tabs-effect-left-enter.rc-tabs-effect-left-enter-active {\n  -webkit-transform: translateX(0);\n      -ms-transform: translateX(0);\n          transform: translateX(0);\n  transition: -webkit-transform 0.5s cubic-bezier(0.35, 0, 0.25, 1);\n  transition: transform 0.5s cubic-bezier(0.35, 0, 0.25, 1);\n}\n.rc-tabs-effect-left-leave {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  -webkit-transform: translateX(0);\n      -ms-transform: translateX(0);\n          transform: translateX(0);\n}\n.rc-tabs-effect-left-leave.rc-tabs-effect-left-leave-active {\n  -webkit-transform: translateX(100%);\n      -ms-transform: translateX(100%);\n          transform: translateX(100%);\n  transition: -webkit-transform 0.5s cubic-bezier(0.35, 0, 0.25, 1);\n  transition: transform 0.5s cubic-bezier(0.35, 0, 0.25, 1);\n}\n.rc-tabs-effect-right-enter {\n  -webkit-transform: translateX(100%);\n      -ms-transform: translateX(100%);\n          transform: translateX(100%);\n}\n.rc-tabs-effect-right-enter.rc-tabs-effect-right-enter-active {\n  -webkit-transform: translateX(0);\n      -ms-transform: translateX(0);\n          transform: translateX(0);\n  transition: -webkit-transform 0.5s cubic-bezier(0.35, 0, 0.25, 1);\n  transition: transform 0.5s cubic-bezier(0.35, 0, 0.25, 1);\n}\n.rc-tabs-effect-right-leave {\n  position: absolute;\n  -webkit-transform: translateX(0);\n      -ms-transform: translateX(0);\n          transform: translateX(0);\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n}\n.rc-tabs-effect-right-leave.rc-tabs-effect-right-leave-active {\n  -webkit-transform: translateX(-100%);\n      -ms-transform: translateX(-100%);\n          transform: translateX(-100%);\n  transition: -webkit-transform 0.5s cubic-bezier(0.35, 0, 0.25, 1);\n  transition: transform 0.5s cubic-bezier(0.35, 0, 0.25, 1);\n}\n", ""]);

/***/ }
]);
//# sourceMappingURL=ant-design.js.map