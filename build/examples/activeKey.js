webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	__webpack_require__(5);
	var React = __webpack_require__(3);
	var Tabs = __webpack_require__(4);
	var TabPane = Tabs.TabPane;

	var ____Class0=React.Component;for(var ____Class0____Key in ____Class0){if(____Class0.hasOwnProperty(____Class0____Key)){PanelContent[____Class0____Key]=____Class0[____Class0____Key];}}var ____SuperProtoOf____Class0=____Class0===null?null:____Class0.prototype;PanelContent.prototype=Object.create(____SuperProtoOf____Class0);PanelContent.prototype.constructor=PanelContent;PanelContent.__superConstructor__=____Class0;
	  function PanelContent(props) {"use strict";
	    ____Class0.call(this,props);
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


	var Component=React.createClass({displayName: "Component",
	  getInitialState:function(){
	    return {
	      activeKey:'',
	      start:0
	    }
	  },

	  onChange:function(key){
	    console.log(("onChange " + key));
	    this.setState({
	      activeKey:key
	    });
	  },

	  onTabClick:function(key){
	    console.log(("onTabClick " + key));
	    if(key === this.state.activeKey){
	      this.setState({
	        activeKey:''
	      });
	    }
	  },

	  tick:function(){
	    this.setState({
	      start:this.state.start+10
	    })
	  },

	  render:function(){
	    var start = this.state.start;
	    return React.createElement("div", null, 
	      React.createElement("h1", null, "Simple Tabs"), 
	      React.createElement(Tabs, {activeKey: this.state.activeKey, 
	        onTabClick: this.onTabClick, 
	        onChange: this.onChange}, 
	        React.createElement(TabPane, {tab: ("tab " + start), key: "1"}, 
	          React.createElement(PanelContent, {id: start})
	        ), 
	        React.createElement(TabPane, {tab: ("tab " + (start + 1)), key: "2"}, 
	          React.createElement(PanelContent, {id: start + 1})
	        ), 
	        React.createElement(TabPane, {tab: ("tab " + (start + 1)), key: "3"}, 
	          React.createElement(PanelContent, {id: start + 2})
	        )
	      ), 
	      React.createElement("button", {onClick: this.tick}, "rerender")
	    )
	  }
	});

	React.render(React.createElement(Component, null),document.getElementById('__react-content'));


/***/ }
]);