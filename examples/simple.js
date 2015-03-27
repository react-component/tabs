/** @jsx React.DOM */
function onChange(key) {
  console.log(key + ' changed!');
}
require('rc-tabs/assets/bootstrap.css');
var React = require('react');
var Tabs = require('rc-tabs');
var TabPane = Tabs.TabPane;

class PanelContent extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.id, 'constructor');
  }

  componentWillReceiveProps() {
    console.log(this.props.id, 'componentWillReceiveProps');
  }

  render() {
    var count = [1,1,1,1];// new Array(4) skip forEach ....
    var els = count.map((c,i)=> {
      return <p key={i}>{this.props.id}</p>
    });
    return <div>{els}</div>;
  }
}

React.render(<div>
  <h1>Simple Tabs</h1>
  <Tabs activeKey="2"
    onChange={onChange}>
    <TabPane tab='tab 1' key="1">
      <PanelContent id='1'/>
    </TabPane>
    <TabPane tab='tab 2' key="2">
      <PanelContent id='2'/>
    </TabPane>
    <TabPane tab='tab 3' key="3">
      <PanelContent id='3'/>
    </TabPane>
  </Tabs>
</div>, document.getElementById('__react-content'));
