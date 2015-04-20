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
    var count = [1, 1, 1, 1];// new Array(4) skip forEach ....
    var els = count.map((c, i)=> {
      return <p key={i}>{this.props.id}</p>
    });
    return <div>{els}</div>;
  }
}
var start = 0;
function render() {
  start += 10;
  React.render(<div>
    <h1>Simple Tabs</h1>
    <Tabs activeKey="2"
      onChange={onChange}>
      <TabPane tab={`tab ${start}`} key="1">
        <PanelContent id={start}/>
      </TabPane>
      <TabPane tab={`tab ${start + 1}`} key="2">
        <PanelContent id={start + 1}/>
      </TabPane>
      <TabPane tab={`tab ${start + 1}`} key="3">
        <PanelContent id={start + 2}/>
      </TabPane>
    </Tabs>
    <button onClick={render}>rerender</button>
  </div>, document.getElementById('__react-content'));
}


render();
