/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';
import PropTypes from 'prop-types';
import KeyCode from 'rc-util/lib/KeyCode';
import createReactContext from '@ant-design/create-react-context';

const SentinelContext = createReactContext({});
export const SentinelProvider = SentinelContext.Provider;
export const SentinelConsumer = SentinelContext.Consumer;

const sentinelStyle = { width: 0, height: 0, overflow: 'hidden', position: 'absolute' };
export default class Sentinel extends React.Component {
  static propTypes = {
    setRef: PropTypes.func,
    prevElement: PropTypes.object,
    nextElement: PropTypes.object,
  };

  onKeyDown = ({ target, which, shiftKey }) => {
    const { nextElement, prevElement } = this.props;
    if (which !== KeyCode.TAB || document.activeElement !== target) return;

    // Tab next
    if (!shiftKey && nextElement) {
      nextElement.focus();
    }

    // Tab prev
    if (shiftKey && prevElement) {
      prevElement.focus();
    }
  };

  render() {
    const { setRef } = this.props;

    return (
      <div
        tabIndex={0}
        ref={setRef}
        style={sentinelStyle}
        onKeyDown={this.onKeyDown}
        role="presentation"
      />
    );
  }
}
