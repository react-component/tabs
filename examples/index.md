# Tabs@2.x demo
---

<link rel="stylesheet" href="https://a.alipayobjects.com/bootstrap/3.3.1/css/bootstrap.css">

<style>
.rc-tabs-tabpane-hidden {
  display:none;
}
</style>


## bootstrap theme

````html
<div id='react-content' style='margin:10px'></div>
````

````js
function onChange(key){
  console.log(key + ' changed!');
}
var React = require('react');
var Tabs = require('../');
var TabPane = Tabs.TabPane;
React.render(<Tabs activeKey="2"
onChange={onChange}
contentClassName="tab-content"
navClassName="nav nav-tabs"
activeTabClassName="active">
<TabPane tab='tab 1' key="1">
tabpane 1<br/>tabpane 1<br/>tabpane 1<br/>tabpane 1<br/>
</TabPane>
<TabPane tab='tab 2' key="2">
tabpane 2<br/>tabpane 2<br/>tabpane 2<br/>tabpane 2<br/>
</TabPane>
<TabPane tab='tab 3' key="3">
tabpane 3<br/>tabpane 3<br/>tabpane 3<br/>tabpane 3<br/>
</TabPane>
</Tabs>, document.getElementById('react-content'));
````