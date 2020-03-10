/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import TabBarRootNode from './TabBarRootNode';
import TabBarTabsNode from './TabBarTabsNode';
import SaveRef from './SaveRef';

export default class TabBar extends React.Component {
  render() {
    return (
      <SaveRef>
        {saveRef => (
          <TabBarRootNode saveRef={saveRef} {...this.props}>
            <TabBarTabsNode saveRef={saveRef} {...this.props} />
          </TabBarRootNode>
        )}
      </SaveRef>
    );
  }
}
