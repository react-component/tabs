import 'rc-tabs/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Tabs, {TabPane} from 'rc-tabs';

var index = 1;

var Test = React.createClass({
  getInitialState() {
    return {
      tabs: [{
        title: "初始",
        content: "初始内容"
      }]
    };
  },

  add(e) {
    e.stopPropagation();
    index++;
    var newTab = {
      title: '名称: ' + index,
      content: '内容: ' + index
    };
    this.setState({
      tabs: this.state.tabs.concat(newTab)
    });
  },

  remove(title, e) {
    e.stopPropagation();
    if (this.state.tabs.length === 1) {
      alert('只剩一个，不能删');
      return;
    }
    this.setState({
      tabs: this.state.tabs.filter(function (t) {
        return t.title !== title
      })
    });
  },

  construct() {
    return this.state.tabs.map((t) => {
      return <TabPane tab={<span>{t.title} <a style={{
        position:'absolute',
        cursor:'pointer',
        color:'red',
        right:5,
        top:0
      }} onClick={this.remove.bind(this,t.title)}>x</a></span>}
                      key={t.title}>
        <div style={{padding:100}}>
          {t.content}
        </div>
      </TabPane>
    }).concat([
      <TabPane tab={<a style={{color:'black',cursor:'pointer'}} onClick={this.add}> + 添加</a>}
               disabled={true}
               key={"__add"}>
      </TabPane>

    ]);
  },

  render() {
    var animation = "slide-horizontal";

    var tabStyle = {
      width: 500
    };

    return <div style={{margin: 20}}>
      <h2>Addable Tabs</h2>

      <div style={tabStyle}>
        <Tabs animation={animation}
              tabBarExtraContent={
                <div style={{float:'right',lineHeight:1.4}}><button onClick={this.add}>+添加</button></div>
              }>
          {this.construct()}
        </Tabs>
      </div>
    </div>
  }
});

ReactDOM.render(<Test />, document.getElementById('__react-content'));
