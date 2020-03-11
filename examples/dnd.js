/* eslint-disable no-console,react/button-has-type */
import '../assets/index.less';
import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragSource, DropTarget, DragDropContextProvider } from 'react-dnd';
import update from 'immutability-helper';
import ScrollableInkTabBar from '../src/ScrollableInkTabBar';
import TabContent from '../src/SwipeableTabContent';
import Tabs, { TabPane } from '../src';

// Drag & Drop node
class TabNode extends React.Component {
  render() {
    const { connectDragSource, connectDropTarget, children } = this.props;

    return connectDragSource(connectDropTarget(children));
  }
}

const cardTarget = {
  drop(props, monitor) {
    const dragKey = monitor.getItem().index;
    const hoverKey = props.index;

    if (dragKey === hoverKey) {
      return;
    }

    props.moveTabNode(dragKey, hoverKey);
    monitor.getItem().index = hoverKey;
  },
};

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const WrapTabNode = DropTarget('DND_NODE', cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(
  DragSource('DND_NODE', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }))(TabNode),
);

// Demo
class Demo extends React.Component {
  state = {
    activeKey: '1',
    tabs: ['1', '2', '3'],
  };

  onChange = activeKey => {
    console.log(`onChange ${activeKey}`);
    this.setState({
      activeKey,
    });
  };

  onTabClick = key => {
    console.log(`onTabClick ${key}`);
    if (key === this.state.activeKey) {
      this.setState({
        activeKey: '',
      });
    }
  };

  moveTabNode = (dragKey, hoverKey) => {
    const { tabs } = this.state;
    const dragIndex = tabs.indexOf(dragKey);
    const hoverIndex = tabs.indexOf(hoverKey);
    const dragTab = this.state.tabs[dragIndex];
    this.setState(
      update(this.state, {
        tabs: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragTab]],
        },
      }),
    );
  };

  renderTabBarNode = node => (
    <WrapTabNode key={node.key} index={node.key} moveTabNode={this.moveTabNode}>
      {node}
    </WrapTabNode>
  );

  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div style={{ margin: 20 }}>
          <h1>Simple Tabs</h1>
          <Tabs
            renderTabBar={() => (
              <ScrollableInkTabBar onTabClick={this.onTabClick}>
                {this.renderTabBarNode}
              </ScrollableInkTabBar>
            )}
            renderTabContent={() => <TabContent animatedWithMargin />}
            activeKey={this.state.activeKey}
            onChange={this.onChange}
          >
            {this.state.tabs.map(id => (
              <TabPane tab={`tab ${id}`} key={id}>
                {id}
              </TabPane>
            ))}
          </Tabs>
        </div>
      </DragDropContextProvider>
    );
  }
}

export default Demo;
