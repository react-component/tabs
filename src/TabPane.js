import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import KeyCode from 'rc-util/lib/KeyCode';
import { getDataAttr } from './utils';

export default class TabPane extends React.Component {
  onTopSentinelKeyDown = ({ target, which, shiftKey }) => {
    if (
      this.sentinelEnd &&
      which === KeyCode.TAB &&
      document.activeElement === target &&
      shiftKey
    ) {
      this.sentinelEnd.focus();
    }
  };

  onBottomSentinelKeyDown = ({ target, which, shiftKey }) => {
    if (
      this.sentinelStart &&
      which === KeyCode.TAB &&
      document.activeElement === target &&
      !shiftKey
    ) {
      this.sentinelStart.focus();
    }
  };

  setSentinelStart = (node) => {
    this.sentinelStart = node;
  };

  setSentinelEnd = (node) => {
    this.sentinelEnd = node;
  };

  render() {
    const {
      className, destroyInactiveTabPane, active, forceRender,
      rootPrefixCls, style, children, placeholder, ...restProps,
    } = this.props;
    this._isActived = this._isActived || active;
    const prefixCls = `${rootPrefixCls}-tabpane`;
    const cls = classnames({
      [prefixCls]: 1,
      [`${prefixCls}-inactive`]: !active,
      [`${prefixCls}-active`]: active,
      [className]: className,
    });
    const isRender = destroyInactiveTabPane ? active : this._isActived;
    const shouldRender = isRender || forceRender;

    let sentinelStart;
    let sentinelEnd;
    if (shouldRender) {
      const sentinelStyle = { width: 0, height: 0, overflow: 'hidden' };
      sentinelStart = (
        <div
          tabIndex={0}
          ref={this.setSentinelStart}
          style={sentinelStyle}
          onKeyDown={this.onTopSentinelKeyDown}
        />
      );
      sentinelEnd = (
        <div
          tabIndex={0}
          ref={this.setSentinelEnd}
          style={sentinelStyle}
          onKeyDown={this.onBottomSentinelKeyDown}
        />
      );
    }

    return (
      <div
        style={style}
        role="tabpanel"
        aria-hidden={active ? 'false' : 'true'}
        className={cls}
        {...getDataAttr(restProps)}
      >
        {sentinelStart}
        {shouldRender ? children : placeholder}
        {sentinelEnd}
      </div>
    );
  }
}

TabPane.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  style: PropTypes.any,
  destroyInactiveTabPane: PropTypes.bool,
  forceRender: PropTypes.bool,
  placeholder: PropTypes.node,
  rootPrefixCls: PropTypes.string,
  children: PropTypes.node,
};

TabPane.defaultProps = {
  placeholder: null,
};
