/* eslint-disable react/no-did-mount-set-state */
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getDataAttr } from './utils';

export default class TabBarRootNode extends React.Component {
  componentDidMount() {
    // child inktabbar depends on parent ref
    // so in mounting phase, we render parent first and then children
    this.hasMounted = true;

    // ref https://github.com/airbnb/javascript/issues/684#issuecomment-264094930
    this.setState({});
  }
  getChildren() {
    const {
      extraContent, tabBarPosition, children,
    } = this.props;

    const topOrBottom = (tabBarPosition === 'top' || tabBarPosition === 'bottom');
    const tabBarExtraContentStyle = topOrBottom ? { float: 'right' } : {};
    const extraContentStyle = (extraContent && extraContent.props) ? extraContent.props.style : {};
    let newChildren = children;
    if (extraContent) {
      newChildren = [
        cloneElement(extraContent, {
          key: 'extra',
          style: {
            ...tabBarExtraContentStyle,
            ...extraContentStyle,
          },
        }),
        cloneElement(children, { key: 'content' }),
      ];
      newChildren = topOrBottom ? newChildren : newChildren.reverse();
    }

    return newChildren;
  }
  hasMounted = false;
  render() {
    const {
      prefixCls, onKeyDown, className, extraContent, style, tabBarPosition, children,
      ...restProps,
    } = this.props;

    const cls = classnames(`${prefixCls}-bar`, {
      [className]: !!className,
    });
    const newChildren = this.hasMounted ? this.getChildren() : null;

    return (
      <div
        role="tablist"
        className={cls}
        tabIndex="0"
        ref={this.props.saveRef('root')}
        onKeyDown={onKeyDown}
        style={style}
        {...getDataAttr(restProps)}
      >
        {newChildren}
      </div>
    );
  }
}

TabBarRootNode.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  tabBarPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  children: PropTypes.node,
  extraContent: PropTypes.node,
  onKeyDown: PropTypes.func,
  saveRef: PropTypes.func,
};

TabBarRootNode.defaultProps = {
  prefixCls: '',
  className: '',
  style: {},
  tabBarPosition: 'top',
  extraContent: null,
  children: null,
  onKeyDown: () => {},
  saveRef: () => {},
};
