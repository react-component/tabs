import React from 'react';
import classnames from 'classnames';
import Draggable from 'react-draggable';
import { delay } from './utils';

const tabBarExtraContentStyle = {
  float: 'right',
};

export default {
  getInitialState() {
    return {
      dragging: false,
    };
  },
  getDefaultProps() {
    return {
      styles: {},
    };
  },
  onTabClick(key) {
    this.props.onTabClick(key);
  },
  handleStart() {
    // handle drag start
  },
  handleDrag(e, data) {
    // handle dragging
    this.setState({ dragging: true });
    const { swapTab } = this.props;
    if (this.refs.navWrap && !this.tabVertical) {
      const { next, prev } = this.state;
      const wrapBounding = this.refs.navWrap.getBoundingClientRect();
      const clientX = e.clientX;
      const leftSpace = clientX - wrapBounding.left;
      const rightSpace = (wrapBounding.left + wrapBounding.width) - clientX;

      if (rightSpace < 0) {
        delay(this, 'next', () => {
          if (next) this.next();
        }, 200);
      } else if (leftSpace < 0) {
        delay(this, 'prev', () => {
          if (prev) this.prev();
        }, 200);
      }
    } else if (this.refs.navWrap && this.tabVertical) {
      // vertical tab, when tab position is 'left' or 'right'
      const { next, prev } = this.state;
      const wrapBounding = this.refs.navWrap.getBoundingClientRect();
      const clientY = e.clientY;
      const topSpace = clientY - wrapBounding.top;
      const bottomSpace = (wrapBounding.top + wrapBounding.height) - clientY;

      if (bottomSpace < 0) {
        delay(this, 'next', () => {
          if (next) this.next();
        }, 200);
      } else if (topSpace < 0) {
        delay(this, 'prev', () => {
          if (prev) this.prev();
        }, 200);
      }
    }

    if (!this.tabVertical) {
      const parentNode = data.node.parentNode;
      const nextTab = parentNode.nextSibling;
      const prevTab = parentNode.previousSibling;

      const nextTabWidth = nextTab && nextTab.getAttribute('role') === 'tab' ?
        nextTab.clientWidth : null;
      const prevTabWidth = prevTab && prevTab.getAttribute('role') === 'tab' ?
        prevTab.clientWidth : null;
      const fromKey = parentNode.getAttribute('data-tab-key');

      if (nextTab && nextTabWidth && data.x > nextTabWidth) {
        // swap place with the next tab
        const nextKey = nextTab.getAttribute('data-tab-key');
        swapTab(fromKey, nextKey);
      } else if (prevTab && prevTabWidth && data.x < -prevTabWidth) {
        // swap place with the previous tab
        const prevKey = prevTab.getAttribute('data-tab-key');
        swapTab(fromKey, prevKey);
      }
    } else {
      const parentNode = data.node.parentNode;
      const nextTab = parentNode.nextSibling;
      const prevTab = parentNode.previousSibling;

      const nextTabHeight = nextTab && nextTab.getAttribute('role') === 'tab' ?
        nextTab.clientHeight : null;
      const prevTabHeight = prevTab && prevTab.getAttribute('role') === 'tab' ?
        prevTab.clientHeight : null;
      const fromKey = parentNode.getAttribute('data-tab-key');

      if (nextTab && nextTabHeight && data.y > nextTabHeight) {
        // swap place with the next tab
        const nextKey = nextTab.getAttribute('data-tab-key');
        swapTab(fromKey, nextKey);
      } else if (prevTab && prevTabHeight && data.y < -prevTabHeight) {
        // swap place with the previous tab
        const prevKey = prevTab.getAttribute('data-tab-key');
        swapTab(fromKey, prevKey);
      }
    }
  },
  handleStop() {
    // handle stop dragging
    this.setState({ dragging: false });
    this.props.swapTab();
  },
  getTabs() {
    const props = this.props;
    const { dragging } = this.state;
    const children = props.panels;
    const activeKey = props.activeKey;
    const rst = [];
    const prefixCls = props.prefixCls;
    let tabVertical;

    if (props.tabBarPosition === 'left' || props.tabBarPosition === 'right') {
      tabVertical = true;
    }
    this.tabVertical = tabVertical;

    children.forEach((child) => {
      if (!child) {
        return;
      }
      const key = child.key;
      let cls = activeKey === key ? `${prefixCls}-tab-active` : '';
      cls += ` ${prefixCls}-tab`;
      let events = {};
      if (child.props.disabled) {
        cls += ` ${prefixCls}-tab-disabled`;
      } else {
        events = {
          onClick: this.onTabClick.bind(this, key),
        };
      }
      const ref = {};
      if (activeKey === key) {
        ref.ref = 'activeTab';
      }

      if (child.props.role) {
        // if have customized role, such as add, ... will not wrapped by draggable.
        rst.push(
          <div
            role={child.props.role}
            data-tab-key={key}
            aria-disabled={child.props.disabled ? 'true' : 'false'}
            aria-selected={activeKey === key ? 'true' : 'false'}
            {...events}
            className={cls}
            key={key}
            {...ref}
          >
            {child.props.tab}
          </div>
        );
      } else {
        rst.push(
          <div
            role="tab"
            data-tab-key={key}
            aria-disabled={child.props.disabled ? 'true' : 'false'}
            aria-selected={activeKey === key ? 'true' : 'false'}
            {...events}
            className={cls}
            key={key}
            {...ref}
          >
            {dragging ?
              <div style={{ position: 'absolute' }}>
                { child.props.tab }
              </div> : null}
            <Draggable
              axis={tabVertical ? 'y' : 'x'}
              defaultPosition={{ x: 0, y: 0 }}
              position={dragging ? null : { x: 0, y: 0 }}
              zIndex={100}
              onStart={this.handleStart}
              onDrag={this.handleDrag}
              onStop={this.handleStop}
            >
              <div>
                {child.props.tab}
              </div>
            </Draggable>
          </div>
        );
      }
    });

    return rst;
  },
  getRootNode(contents) {
    const { prefixCls, onKeyDown, className, extraContent, style } = this.props;
    const cls = classnames({
      [`${prefixCls}-bar`]: 1,
      [className]: !!className,
    });
    return (
      <div
        role="tablist"
        className={cls}
        tabIndex="0"
        ref="root"
        onKeyDown={onKeyDown}
        style={style}
      >
        {extraContent ?
          (<div
            style={tabBarExtraContentStyle}
            key="extra"
          >
            {extraContent}
          </div>) : null}
        {contents}
      </div>);
  },
};
