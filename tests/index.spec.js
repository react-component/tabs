/** @jsx React.DOM */

var expect = require('expect.js');
var Tabs = require('../index');
var TabPane = Tabs.TabPane;
var React = require('react/addons');
// var sinon = require('sinon');
var TestUtils = React.addons.TestUtils;
var Simulate = TestUtils.Simulate;

var node = document.createElement('div');
document.body.appendChild(node);

describe('tabs', function () {
  var tabs;
  var changeHook;
  var onTabClickHook;

  function onChange() {
    if (changeHook) {
      changeHook.apply(this, arguments);
    }
  }

  function onTabClick() {
    if (onTabClickHook) {
      onTabClickHook.apply(this, arguments);
    }
  }

  beforeEach(function (done) {
    React.render(<Tabs defaultActiveKey="2"
      onTabClick={onTabClick}
      onChange={onChange}>
      <TabPane tab='tab 1' key="1">first</TabPane>
      <TabPane tab='tab 2' key="2">second</TabPane>
      <TabPane tab='tab 3' key="3">third</TabPane>
    </Tabs>, node, function () {
      tabs = this;
      done();
    });
  });

  afterEach(function () {
    React.unmountComponentAtNode(node);
    changeHook = null;
    onTabClickHook = null;
  });

  it('create works', function () {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(tabs, 'rc-tabs').length).to.be(1);
  });

  it('nav works', function () {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(tabs, 'rc-tabs-tab').length).to.be(3);
  });

  it('default active works', function () {
    expect(tabs.state.activeKey).to.be('2');
    expect(React.findDOMNode(TestUtils.scryRenderedDOMComponentsWithClass(tabs,
      'rc-tabs-tab')[1]).className.indexOf('rc-tabs-tab-active ') !== -1).to.be(true);
  });

  it('onChange works', function (done) {
    changeHook = function (d) {
      expect(d).to.be('1');
      done();
    };
    var tab = TestUtils.scryRenderedDOMComponentsWithClass(tabs, 'rc-tabs-tab')[0];
    Simulate.click(tab);
  });


  it('onTabClick works', function (done) {
    var called = 0;

    function check() {
      called++;
      if (called == 3) {
        done();
      }
    }

    changeHook = function (d) {
      expect(d).to.be('1');
      check();
    };

    onTabClickHook = function (d) {
      expect(d).to.be('1');
      check();
    };

    var tab = TestUtils.scryRenderedDOMComponentsWithClass(tabs, 'rc-tabs-tab')[0];
    Simulate.click(tab);

    setTimeout(function () {
     Simulate.click(tab);
    }, 100);
  });

});
