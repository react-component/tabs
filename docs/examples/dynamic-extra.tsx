import React from 'react';
import Tabs from '../../src';
import type { TabsProps } from '../../src';
import '../../assets/index.less';

const items: TabsProps['items'] = [];
for (let i = 0; i < 50; i += 1) {
  items.push({
    key: String(i),
    label: `Tab ${i}`,
    children: `Content of ${i}`,
  });
}
export default () => {
  const [key, setKey] = React.useState('0');

  const extra = React.useMemo(() => {
    if (key === '0') {
      return (
        <div>额外内容</div>
      )
    } 
    return null
  }, [key])

  return (
    <div style={{ maxWidth: 550 }}>
      <Tabs 
        activeKey={key}
        onChange={(curKey) => setKey(curKey)}
        tabBarExtraContent={extra} 
        defaultActiveKey="8" 
        items={items} 
      />
    </div>
  );
};