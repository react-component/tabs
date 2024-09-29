import React, { useRef } from 'react';
import Tabs from '../../src';
import '../../assets/index.less';

export default () => {
  const countRef = useRef(8);
  const [tabs, setTabs] = React.useState(
    new Array(countRef.current).fill(0).map((_, index) => {
      return {
        key: `${index}`,
        content: `tab content ${index + 1}`,
      };
    }),
  );

  const editable = React.useMemo(() => {
    return {
      onEdit: (editType: 'add' | 'remove', { key }: any) => {
        if (editType === 'remove') {
          setTabs(lastTabs => {
            return lastTabs.filter(item => item.key != key);
          });
        } else if (editType === 'add') {
          setTabs(lastTabs => {
            return [
              ...lastTabs,
              {
                key: `${++countRef.current}`,
                content: `tab content ${countRef.current}`,
              },
            ];
          });
        }
      },
    };
  }, []);

  return (
    <div style={{ maxWidth: 550 }}>
      <Tabs
        editable={editable}
        defaultActiveKey="8"
        items={tabs.map(({ key, content }) => ({
          key,
          label: `tab ${key}`,
          children: content,
        }))}
      />
    </div>
  );
};
