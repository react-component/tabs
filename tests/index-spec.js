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

  beforeEach(function (done) {
    React.render(<Tabs activeKey="2">
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
  });

  it('create works', function () {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(tabs, 'rc-tabs').length).to.be(1);
  });

  it('nav works', function () {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(tabs, 'rc-tabs-tab').length).to.be(3);
  });

  it('default active works', function () {
    expect(tabs.state.activeKey).to.be('2');
    expect(TestUtils.scryRenderedDOMComponentsWithClass(tabs,
      'rc-tabs-tab')[1].getDOMNode().className.indexOf('rc-tabs-tab-active ') !== -1).to.be(true);
  });

  it('onChange works', function (done) {
    tabs.setProps({
      onChange: function (d) {
        expect(d).to.be('1');
        done();
      }
    }, function () {
      tabs = this;
      var tab = TestUtils.scryRenderedDOMComponentsWithClass(tabs, 'rc-tabs-tab')[0];
      Simulate.click(tab);
    });
  });
});
