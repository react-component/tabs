webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(189);


/***/ },

/***/ 189:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(40);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rcTabs = __webpack_require__(170);
	
	var _rcTabs2 = _interopRequireDefault(_rcTabs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); } /* eslint react/no-multi-comp:0, no-console:0 */
	
	var PanelContent = function (_React$Component) {
	  _inherits(PanelContent, _React$Component);
	
	  function PanelContent(props) {
	    _classCallCheck(this, PanelContent);
	
	    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));
	
	    console.log(_this.props.id, 'constructor');
	    return _this;
	  }
	
	  PanelContent.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    console.log(nextProps.id, 'componentWillReceiveProps');
	  };
	
	  PanelContent.prototype.render = function render() {
	    var length = Math.round(10 * Math.random() + 4);
	    var count = new Array(length); // new Array(4) skip forEach ....
	    for (var i = 0; i < length; i++) {
	      count[i] = 1;
	    }
	    var content = new Array(Math.round(100 * Math.random()) + 4).join(' ' + this.props.id);
	    var els = count.map(function (c, i) {
	      return _react2.default.createElement(
	        'p',
	        { key: i },
	        content
	      );
	    });
	    return _react2.default.createElement(
	      'div',
	      null,
	      els
	    );
	  };
	
	  return PanelContent;
	}(_react2.default.Component);
	
	PanelContent.propTypes = {
	  id: _react2.default.PropTypes.number
	};
	
	function construct(start, num) {
	  var ends = [];
	  var index = 1;
	  for (var i = start; i < start + num; i++) {
	    ends.push(_react2.default.createElement(
	      _rcTabs.TabPane,
	      {
	        tab: 'tab ' + i,
	        disabled: !!(i % 2),
	        key: index
	      },
	      _react2.default.createElement(PanelContent, { id: i })
	    ));
	    index++;
	  }
	  return ends;
	}
	
	var Component = _react2.default.createClass({
	  displayName: 'Component',
	  getInitialState: function getInitialState() {
	    return {
	      tabPosition: 'top',
	      start: 0
	    };
	  },
	  onChange: function onChange(key) {
	    console.log('onChange ' + key);
	  },
	  onTabClick: function onTabClick(key) {
	    console.log('onTabClick ' + key);
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
	    var animation = 'slide-horizontal';
	
	    var tabStyle = {
	      width: 500
	    };
	
	    if (tabPosition === 'left' || tabPosition === 'right') {
	      navStyle = {
	        height: 400,
	        overflow: 'hidden'
	      };
	      animation = 'slide-vertical';
	      tabStyle = {
	        overflow: 'hidden'
	      };
	    }
	
	    return _react2.default.createElement(
	      'div',
	      { style: { margin: 20 } },
	      _react2.default.createElement(
	        'h2',
	        null,
	        'Simple Tabs'
	      ),
	      _react2.default.createElement(
	        'p',
	        null,
	        'tabPosition:',
	        _react2.default.createElement(
	          'select',
	          { value: this.state.tabPosition, onChange: this.changeTabPosition },
	          _react2.default.createElement(
	            'option',
	            { value: 'top' },
	            'top'
	          ),
	          _react2.default.createElement(
	            'option',
	            { value: 'bottom' },
	            'bottom'
	          ),
	          _react2.default.createElement(
	            'option',
	            { value: 'left' },
	            'left'
	          ),
	          _react2.default.createElement(
	            'option',
	            { value: 'right' },
	            'right'
	          )
	        )
	      ),
	      _react2.default.createElement(
	        'div',
	        { style: tabStyle },
	        _react2.default.createElement(
	          _rcTabs2.default,
	          {
	            defaultActiveKey: '3',
	            navStyle: navStyle,
	            tabPosition: this.state.tabPosition,
	            animation: animation,
	            onTabClick: this.onTabClick,
	            onChange: this.onChange
	          },
	          ends2
	        )
	      ),
	      _react2.default.createElement(
	        'h2',
	        null,
	        'Scroll Tabs'
	      ),
	      _react2.default.createElement(
	        'div',
	        { style: tabStyle },
	        _react2.default.createElement(
	          _rcTabs2.default,
	          {
	            defaultActiveKey: '3',
	            navStyle: navStyle,
	            tabPosition: this.state.tabPosition,
	            animation: animation,
	            onTabClick: this.onTabClick,
	            onChange: this.onChange
	          },
	          ends
	        )
	      ),
	      _react2.default.createElement(
	        'button',
	        { onClick: this.tick },
	        'rerender'
	      )
	    );
	  }
	});
	
	_reactDom2.default.render(_react2.default.createElement(Component, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=antd.js.map