webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	
	__webpack_require__(9);
	var React = __webpack_require__(5);
	var Tabs = __webpack_require__(6);
	var TabPane = Tabs.TabPane;
	
	var ____Class2=React.Component;for(var ____Class2____Key in ____Class2){if(____Class2.hasOwnProperty(____Class2____Key)){PanelContent[____Class2____Key]=____Class2[____Class2____Key];}}var ____SuperProtoOf____Class2=____Class2===null?null:____Class2.prototype;PanelContent.prototype=Object.create(____SuperProtoOf____Class2);PanelContent.prototype.constructor=PanelContent;PanelContent.__superConstructor__=____Class2;
	  function PanelContent(props) {"use strict";
	    ____Class2.call(this,props);
	    console.log(this.props.id, 'constructor');
	  }
	
	  Object.defineProperty(PanelContent.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function() {"use strict";
	    console.log(this.props.id, 'componentWillReceiveProps');
	  }});
	
	  Object.defineProperty(PanelContent.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
	    var count = [1, 1, 1, 1];// new Array(4) skip forEach ....
	    var els = count.map(function(c, i) {
	      return React.createElement("p", {key: i}, this.props.id)
	    }.bind(this));
	    return React.createElement("div", null, els);
	  }});
	
	
	
	var Component = React.createClass({displayName: "Component",
	  getInitialState:function() {
	    return {
	      start: 0
	    }
	  },
	
	  onChange:function(key) {
	    console.log(("onChange " + key));
	  },
	
	  onTabClick:function(key) {
	    console.log(("onTabClick " + key));
	  },
	
	  tick:function() {
	    this.setState({
	      start: this.state.start + 10
	    })
	  },
	
	  render:function() {
	    var start = this.state.start;
	    return React.createElement("div", null, 
	      React.createElement("h1", null, "Simple Tabs"), 
	      React.createElement(Tabs, {defaultActiveKey: "2", 
	        onTabClick: this.onTabClick, 
	        onChange: this.onChange}, 
	        React.createElement(TabPane, {tab: ("tab " + start), key: "1"}, 
	          React.createElement(PanelContent, {id: start})
	        ), 
	        React.createElement(TabPane, {tab: ("tab " + (start + 1)), key: "2"}, 
	          React.createElement(PanelContent, {id: start + 1})
	        ), 
	        React.createElement(TabPane, {tab: ("tab " + (start + 2)), key: "3", disabled: true}, 
	          React.createElement(PanelContent, {id: start + 2})
	        ), 
	        React.createElement(TabPane, {tab: ("tab " + (start + 3)), key: "4"}, 
	          React.createElement(PanelContent, {id: start + 3})
	        )
	      ), 
	      React.createElement("button", {onClick: this.tick}, "rerender")
	    )
	  }
	});
	
	React.render(React.createElement(Component, null), document.getElementById('__react-content'));


/***/ },
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(10);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(1)(content, {});
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	exports.push([module.id, ".rc-tabs {\n  outline: none;\n}\n.rc-tabs-nav-container {\n  white-space: nowrap;\n  border-bottom: 1px solid #ddd;\n  margin-bottom: 10px;\n}\n.rc-tabs-tab-prev,\n.rc-tabs-tab-next {\n  display: none;\n}\n.rc-tabs-nav {\n  box-sizing: border-box;\n  padding-left: 0;\n  list-style: none;\n  margin-top: 0;\n  display: inline-block;\n}\n.rc-tabs-nav:before,\n.rc-tabs-nav:after {\n  display: table;\n  content: \" \";\n}\n.rc-tabs-nav:after {\n  clear: both;\n}\n.rc-tabs-nav div.rc-tabs-tab-active > a,\n.rc-tabs-nav div.rc-tabs-tab-active > a:hover,\n.rc-tabs-nav div.rc-tabs-tab-active > a:focus {\n  color: #555;\n  cursor: default;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-bottom-color: transparent;\n  text-decoration: none;\n}\n.rc-tabs-nav div.rc-tabs-tab-disabled {\n  pointer-events: none;\n  cursor: default;\n  color: #ccc;\n}\n.rc-tabs-nav .rc-tabs-tab {\n  float: left;\n  margin-bottom: -4px;\n  position: relative;\n  display: block;\n}\n.rc-tabs-nav .rc-tabs-tab > a {\n  margin-right: 2px;\n  line-height: 1.42857143;\n  border: 1px solid transparent;\n  border-radius: 4px 4px 0 0;\n  text-decoration: none;\n  position: relative;\n  display: block;\n  padding: 10px 15px;\n}\n.rc-tabs-nav .rc-tabs-tab > a:hover {\n  border-color: #eee #eee #ddd;\n  cursor: pointer;\n}\n.rc-tabs-nav .rc-tabs-tab > a:hover,\n.rc-tabs-nav .rc-tabs-tab > a:focus {\n  text-decoration: none;\n  background-color: #eee;\n}\n.rc-tabs-tabpane-hidden {\n  display: none;\n}\n.rc-tabs-ink-bar {\n  display: none;\n}\n", ""]);

/***/ }
]);
//# sourceMappingURL=defaultActiveKey.js.map