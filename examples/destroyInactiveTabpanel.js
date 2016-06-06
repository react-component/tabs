webpackJsonp([4],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(191);


/***/ },

/***/ 191:
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
	
	  PanelContent.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
	    console.log(this.props.id, 'componentWillReceiveProps');
	  };
	
	  PanelContent.prototype.render = function render() {
	    var _this2 = this;
	
	    var count = [1, 1, 1, 1]; // new Array(4) skip forEach ....
	    var els = count.map(function (c, i) {
	      return _react2.default.createElement(
	        'p',
	        { key: i },
	        _this2.props.id
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
	
	var Component = _react2.default.createClass({
	  displayName: 'Component',
	  getInitialState: function getInitialState() {
	    return {
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
	  render: function render() {
	    var start = this.state.start;
	    var disabled = true;
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'h1',
	        null,
	        'Simple Tabs'
	      ),
	      _react2.default.createElement(
	        _rcTabs2.default,
	        {
	          defaultActiveKey: '2',
	          animation: 'slide-horizontal',
	          destroyInactiveTabPane: true,
	          onTabClick: this.onTabClick,
	          onChange: this.onChange
	        },
	        _react2.default.createElement(
	          _rcTabs.TabPane,
	          { tab: 'tab ' + start, key: '1' },
	          _react2.default.createElement(PanelContent, { id: start })
	        ),
	        _react2.default.createElement(
	          _rcTabs.TabPane,
	          { tab: 'tab ' + (start + 1), key: '2' },
	          _react2.default.createElement(PanelContent, { id: start + 1 })
	        ),
	        _react2.default.createElement(
	          _rcTabs.TabPane,
	          { tab: 'tab ' + (start + 2), key: '3', disabled: disabled },
	          _react2.default.createElement(PanelContent, { id: start + 2 })
	        ),
	        _react2.default.createElement(
	          _rcTabs.TabPane,
	          { tab: 'tab ' + (start + 3), key: '4' },
	          _react2.default.createElement(PanelContent, { id: start + 3 })
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
//# sourceMappingURL=destroyInactiveTabpanel.js.map