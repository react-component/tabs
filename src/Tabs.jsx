import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import KeyCode from './KeyCode';
import TabPane from './TabPane';
import Nav from './Nav';
import Animate from 'rc-animate';

function noop() {
}

function getDefaultActiveKey(props) {
  let activeKey;
  React.Children.forEach(props.children, (child) => {
    if (!activeKey && !child.props.disabled) {
      activeKey = child.key;
    }
  });
  return activeKey;
}

const Tabs = React.createClass({
  propTypes: {
    destroyInactiveTabPane: PropTypes.bool,
    onTabClick: PropTypes.func,
    onChange: PropTypes.func,
    children: PropTypes.any,
    tabBarExtraContent: PropTypes.any,
    animation: PropTypes.string,
  },

  getDefaultProps() {
    return {
      prefixCls: 'rc-tabs',
      destroyInactiveTabPane: false,
      tabBarExtraContent: null,
      onChange: noop,
      tabPosition: 'top',
      style: {},
      contentStyle: {},
      navStyle: {},
      onTabClick: noop,
    };
  },

  getInitialState() {
    const props = this.props;
    let activeKey;
    if ('activeKey' in props) {
      activeKey = props.activeKey;
    } else if ('defaultActiveKey' in props) {
      activeKey = props.defaultActiveKey;
    } else {
      activeKey = getDefaultActiveKey(props);
    }
    // cache panels
    this.renderPanels = {};
    return {activeKey};
  },

  componentDidMount() {
    this.componentDidUpdate();
  },

  componentWillReceiveProps(nextProps) {
    let newActiveKey = this.state.activeKey;
    if ('activeKey' in nextProps) {
      newActiveKey = nextProps.activeKey;
    }
    let found;
    React.Children.forEach(nextProps.children, (child) => {
      if (child.key === newActiveKey) {
        found = true;
      }
    });
    if (found) {
      this.setActiveKey(newActiveKey);
    } else {
      this.setActiveKey(getDefaultActiveKey(nextProps));
    }
  },

  componentDidUpdate() {
    if (this.props.animation) {
      const navDom = ReactDOM.findDOMNode(this.refs.nav);
      const contentDom = ReactDOM.findDOMNode(this.refs.content);
      const childDom = ReactDOM.findDOMNode(this.refs[this.state.activeKey]);
      let childHeight = childDom.offsetHeight;
      if (!childDom.style.height) {
        childDom.style.height = 'auto';
        childHeight = childDom.offsetHeight;
        childDom.style.height = '';
      }
      contentDom.style.height = Math.max(childHeight, navDom.offsetHeight) + 'px';
    }
  },

  onTabDestroy(key) {
    delete this.renderPanels[key];
  },

  onTabClick(key) {
    this.props.onTabClick(key);
    if (this.state.activeKey !== key) {
      this.setActiveKey(key);
      this.props.onChange(key);
    }
  },

  onKeyDown(e) {
    if (e.target !== ReactDOM.findDOMNode(this)) {
      return;
    }
    const eventKeyCode = e.keyCode;
    switch (eventKeyCode) {
    case KeyCode.RIGHT:
    case KeyCode.DOWN:
      e.preventDefault();
      const nextKey = this.getNextActiveKey(true);
      this.onTabClick(nextKey);
      break;
    case KeyCode.LEFT:
    case KeyCode.UP:
      e.preventDefault();
      const previousKey = this.getNextActiveKey(false);
      this.onTabClick(previousKey);
      break;
    default:
    }
  },

  getNextActiveKey(next) {
    const activeKey = this.state.activeKey;
    const children = [];
    React.Children.forEach(this.props.children, (c) => {
      if (!c.props.disabled) {
        if (next) {
          children.push(c);
        } else {
          children.unshift(c);
        }
      }
    });
    const length = children.length;
    let ret = length && children[0].key;
    children.forEach((child, i) => {
      if (child.key === activeKey) {
        if (i === length - 1) {
          ret = children[0].key;
        } else {
          ret = children[i + 1].key;
        }
      }
    });
    return ret;
  },

  getTabPanes() {
    const state = this.state;
    const props = this.props;
    const activeKey = state.activeKey;
    const children = props.children;
    const newChildren = [];
    const renderPanels = this.renderPanels;

    React.Children.forEach(children, (c) => {
      let child = c;
      const key = child.key;
      const active = activeKey === key;
      if (active || renderPanels[key]) {
        child = active ? child : renderPanels[key];
        renderPanels[key] = React.cloneElement(child, {
          active: active,
          onDestroy: this.onTabDestroy.bind(this, key),
          // eventKey: key,
          rootPrefixCls: props.prefixCls,
          ref: key,
        });
        newChildren.push(renderPanels[key]);
      } else {
        // do not change owner ...
        // or else will destroy and reinit
        // newChildren.push(<TabPane active={false}
        //  key={key}
        //  eventKey={key}
        //  rootPrefixCls={this.props.prefixCls}></TabPane>);
        // return
        // lazy load
        newChildren.push(React.cloneElement(child, {
          active: false,
          // eventKey: key,
          rootPrefixCls: props.prefixCls,
          ref: key,
        }, []));
      }
    });

    return newChildren;
  },

  setActiveKey(activeKey) {
    const currentActiveKey = this.state.activeKey;
    if (!currentActiveKey) {
      this.setState({
        activeKey: activeKey,
      });
    } else {
      const keys = [];
      React.Children.forEach(this.props.children, c=> {
        keys.push(c.key);
      });
      const tabMovingDirection = keys.indexOf(currentActiveKey) > keys.indexOf(activeKey) ? 'backward' : 'forward';
      this.setState({
        activeKey: activeKey,
        tabMovingDirection: tabMovingDirection,
      });
    }
  },

  render() {
    const props = this.props;
    const {destroyInactiveTabPane, prefixCls, tabPosition} = props;
    let cls = `${prefixCls} ${prefixCls}-${tabPosition}`;
    const tabMovingDirection = this.state.tabMovingDirection;
    if (props.className) {
      cls += ' ' + props.className;
    }
    const animation = this.props.animation;
    let tabPanes = this.getTabPanes();
    let transitionName;
    transitionName = props.transitionName && props.transitionName[tabMovingDirection || 'backward'];
    if (!transitionName && animation) {
      transitionName = `${prefixCls}-${animation}-${tabMovingDirection || 'backward'}`;
    }
    if (destroyInactiveTabPane) {
      tabPanes = tabPanes.filter((panel)=> {
        return panel.props.active;
      });
    }
    if (transitionName) {
      if (destroyInactiveTabPane) {
        tabPanes = (<Animate exclusive
                             transitionName={transitionName}>
          {tabPanes}
        </Animate>);
      } else {
        tabPanes = (<Animate showProp="active"
                             exclusive
                             transitionName={transitionName}>
          {tabPanes}
        </Animate>);
      }
    }
    const contents = [
      (<Nav prefixCls={prefixCls}
            key="nav"
            ref="nav"
            tabBarExtraContent={this.props.tabBarExtraContent}
            tabPosition={tabPosition}
            style={props.navStyle}
            onTabClick={this.onTabClick}
            tabMovingDirection={tabMovingDirection}
            panels={this.props.children}
            activeKey={this.state.activeKey}/>),
      (<div className={`${prefixCls}-content`}
            style={props.contentStyle}
            key="content"
            ref="content">
        {tabPanes}
      </div>),
    ];
    if (tabPosition === 'bottom') {
      contents.reverse();
    }
    return (
      <div className={cls}
           tabIndex="0"
           style={props.style}
           onKeyDown={this.onKeyDown}>
        {contents}
      </div>
    );
  },
});

Tabs.TabPane = TabPane;

export default Tabs;
