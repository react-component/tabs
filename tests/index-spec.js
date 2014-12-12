/** @jsx React.DOM */

var expect = require('expect.js');
var Tabs = require('../index');
var React = require('react');
var sinon = require('sinon');
var $ = require('jquery');
var simulateDomEvent = require('simulate-dom-event');

var node = $('<div id="t1"></div>').appendTo('body');

var node1= $('<div id="t2"></div>').appendTo('body');

describe('tabs', function (){
  var items = [
    {title : 'title 1',id:'1'},
    {title : 'title 2',id:'2'},
    {title : 'title 3',id:'3'}
  ];

  var tabs = React.render(
    (
      <Tabs items={items}>
        <p>第一个</p>
        <p>第二个</p>
        <p>第三个</p>
      </Tabs>
    ),
    document.getElementById('t1'));
  
  it('creat',function(){
    expect(node.find('.rc-tabs').length).to.be(1);
  });

  it('items',function(){
    expect(node.find('li').length).to.be(items.length);
  });

  it('default active',function(){
    expect(tabs.state.activedIndex).to.be(0);
    expect(node.find('li').first().hasClass('active')).to.be(true);
  });

  it('change active',function(done){
    setTimeout(function(){
      tabs.setState({
        activedIndex : 1
      });
      done();
    },1000);
    
  });

});


describe('tabs', function (){
  var items = [
    {title : 'title 1',id:'1'},
    {title : 'title 2',id:'2'},
    {title : 'title 3',id:'3'}
  ];

  var callback = sinon.spy();

  var tabs = React.render(
    (
      <Tabs activedIndex={1} onNavChange={callback} items={items}>
        <p>第一个</p>
        <p>第二个</p>
        <p>第三个</p>
      </Tabs>
    ),
    document.getElementById('t2'));

  it('default active',function(){
    expect(tabs.state.activedIndex).to.be(1);
    expect($(node1.find('li')[1]).hasClass('active')).to.be(true);
  });

  it('click',function(){
    var nav = node1.find('li')[0];

    simulateDomEvent(nav,'click');

    expect(tabs.state.activedIndex).to.be(0);
    expect(callback.called).to.be(true);
  });

});
