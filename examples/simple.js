/** @jsx React.DOM */
function onChange(key) {
  console.log(key + ' changed!');
}
require('rc-tabs/assets/bootstrap.css');
var React = require('react');
var Tabs = require('rc-tabs');
var TabPane = Tabs.TabPane;
React.render(<div>
  <h1>Simple Tabs</h1>
  <Tabs activeKey="2"
    onChange={onChange}>
    <TabPane tab='tab 1' key="1">
      tabpane 1
      <br/>
      tabpane 1
      <br/>
      tabpane 1
      <br/>
      tabpane 1
      <br/>
    </TabPane>
    <TabPane tab='tab 2' key="2">
      tabpane 2
      <br/>
      tabpane 2
      <br/>
      tabpane 2
      <br/>
      tabpane 2
      <br/>
    </TabPane>
    <TabPane tab='tab 3' key="3">
      tabpane 3
      <br/>
      tabpane 3
      <br/>
      tabpane 3
      <br/>
      tabpane 3
      <br/>
    </TabPane>
  </Tabs>
</div>, document.getElementById('__react-content'));
