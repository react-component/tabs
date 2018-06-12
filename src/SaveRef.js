import React from 'react';

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
