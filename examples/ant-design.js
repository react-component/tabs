/** @jsx React.DOM */

require('rc-tabs/assets/index.css');
var React = require('react');
var Tabs = require('rc-tabs');
var TabPane = Tabs.TabPane;

class PanelContent extends React.Component {
  constructor(props) {
    super(props);
    //console.log(this.props.id, 'constructor');
  }

  componentWillReceiveProps() {
    //console.log(this.props.id, 'componentWillReceiveProps');
  }

  render() {
    var count = [1, 1, 1, 1];// new Array(4) skip forEach ....
    var content = new Array(200).join(' ' + this.props.id);
    var els = count.map((c, i)=> {
      return <p key={i}>{content}</p>
    });
    return <div>{els}</div>;
  }
}

function construct(start, num) {
  var ends = [];
  var index = 1;
  for (var i = start; i < start + num; i++) {
    ends.push(<TabPane tab={`tab ${i}`}
      disabled={!!(i % 2)}
      key={index + ""}>
      <PanelContent id={i}/>
    </TabPane>);
    index++;
  }
  return ends;
}


var Component = React.createClass({
  getInitialState() {
    return {
      start: 0
    }
  },

  onChange(key) {
    //console.log(`onChange ${key}`);
  },

  onTabClick(key) {
    //console.log(`onTabClick ${key}`);
  },

  tick() {
    this.setState({
      start: this.state.start + 10
    })
  },

  render() {
    var start = this.state.start;
    var ends = construct(start, 9);
    var ends2 = construct(start, 3);
    return <div>
      <h2>Simple Tabs</h2>
      <div style={{width: 500, margin: 20}}>
        <Tabs defaultActiveKey='3'
          effect={true}
          onTabClick={this.onTabClick}
          onChange={this.onChange}>
        {ends2}
        </Tabs>
      </div>
      <h2>Scroll Tabs</h2>
      <div style={{width: 500, margin: 20}}>
        <Tabs defaultActiveKey='3'
          effect={true}
          onTabClick={this.onTabClick}
          onChange={this.onChange}>
        {ends}
        </Tabs>
      </div>
      <button onClick={this.tick}>rerender</button>
    </div>
  }
});

React.render(<Component />, document.getElementById('__react-content'));
