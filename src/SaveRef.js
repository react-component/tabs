import React from 'react';
import PropTypes from 'prop-types';

export default class SaveRef extends React.Component {
  getRef = (name) => {
    return this[name];
  }

  saveRef = (name) => {
    return (node) => {
      if (node) {
        this[name] = node;
      }
    };
  }

  render() {
    return this.props.children(this.saveRef, this.getRef);
  }
}

SaveRef.propTypes = {
  children: PropTypes.func,
};

SaveRef.defaultProps = {
  children: () => null,
};
