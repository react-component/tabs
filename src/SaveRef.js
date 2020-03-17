import React from 'react';

export default class SaveRef extends React.Component {
  getRef = name => this[name];

  saveRef = name => node => {
    if (node) {
      this[name] = node;
    }
  };

  render() {
    return this.props.children(this.saveRef, this.getRef);
  }
}

SaveRef.defaultProps = {
  children: () => null,
};
