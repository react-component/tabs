import React from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Tabs from '@rc-component/tabs';
import type { TabsProps } from '@rc-component/tabs';
import '../../assets/index.less';

// Drag & Drop node
const WrapTabNode: React.FC<any> = ({ children, index, moveTabNode }) => {
  const [, drop] = useDrop({
    accept: 'DND_NODE',
    drop(item: { index: React.Key }) {
      const dragKey = item.index;
      const hoverKey = index;

      if (dragKey === hoverKey) {
        return;
      }

      moveTabNode(dragKey, hoverKey);
      item.index = hoverKey;
    },
  });
  const [, drag] = useDrag({
    type: 'DND_NODE',
    item: { index },
  });

  return drag(drop(children));
};

class DraggableTabs extends React.Component<TabsProps> {
  state = {
    order: [],
  };

  moveTabNode = (dragKey, hoverKey) => {
    const newOrder = this.state.order.slice();
    const { items } = this.props;

    items.forEach(item => {
      if (newOrder.indexOf(item.key) === -1) {
        newOrder.push(item.key);
      }
    });

    const dragIndex = newOrder.indexOf(dragKey);
    const hoverIndex = newOrder.indexOf(hoverKey);

    newOrder.splice(dragIndex, 1);
    newOrder.splice(hoverIndex, 0, dragKey);

    this.setState({
      order: newOrder,
    });
  };

  renderTabBar = (props, DefaultTabBar) => (
    <DefaultTabBar {...props}>
      {node => {
        return (
          <WrapTabNode key={node.key} index={node.key} moveTabNode={this.moveTabNode}>
            {node}
          </WrapTabNode>
        );
      }}
    </DefaultTabBar>
  );

  render() {
    const { order } = this.state;
    const { items } = this.props;

    const tabs = [...items];

    const orderTabs = tabs.slice().sort((a, b) => {
      const orderA = order.indexOf(a.key);
      const orderB = order.indexOf(b.key);

      if (orderA !== -1 && orderB !== -1) {
        return orderA - orderB;
      }
      if (orderA !== -1) {
        return -1;
      }
      if (orderB !== -1) {
        return 1;
      }

      const ia = tabs.indexOf(a);
      const ib = tabs.indexOf(b);

      return ia - ib;
    });

    return (
      <DndProvider backend={HTML5Backend}>
        <Tabs renderTabBar={this.renderTabBar} {...this.props} items={orderTabs} />
      </DndProvider>
    );
  }
}

export default () => (
  <DraggableTabs
    items={[
      {
        key: '1',
        label: 'tab 1',
        children: 'Content of Tab Pane 1',
      },
      {
        key: '2',
        label: 'tab 2',
        children: 'Content of Tab Pane 2',
      },
      {
        key: '3',
        label: 'tab 3',
        children: 'Content of Tab Pane 3',
      },
    ]}
  />
);
