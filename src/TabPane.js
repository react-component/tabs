import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getDataAttr } from './utils';
import Sentinel, { SentinelConsumer } from './Sentinel';

export default class TabPane extends React.Component {
  render() {
    const {
      id, className, destroyInactiveTabPane, active, forceRender,
      rootPrefixCls, style, children, placeholder,
      ...restProps
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

    return (
      <SentinelConsumer>
        {({ sentinelStart, sentinelEnd, setPanelSentinelStart, setPanelSentinelEnd }) => {
          // Create sentinel
          let panelSentinelStart;
          let panelSentinelEnd;
          if (active && shouldRender) {
            panelSentinelStart = (
              <Sentinel
                setRef={setPanelSentinelStart}
                prevElement={sentinelStart}
              />
            );
            panelSentinelEnd = (
              <Sentinel
                setRef={setPanelSentinelEnd}
                nextElement={sentinelEnd}
              />
            );
          }

          return (
            <div
              style={style}
              role="tabpanel"
              aria-hidden={active ? 'false' : 'true'}
              className={cls}
              id={id}
              {...getDataAttr(restProps)}
            >
              {panelSentinelStart}
              {shouldRender ? children : placeholder}
              {panelSentinelEnd}
            </div>
          );
        }}
      </SentinelConsumer>
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
  id: PropTypes.string,
};

TabPane.defaultProps = {
  placeholder: null,
};
