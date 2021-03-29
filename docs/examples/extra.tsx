import React from 'react';
import Tabs, { TabPane } from 'rc-tabs';
import '../../assets/index.less';

const tabs: React.ReactElement[] = [];

for (let i = 0; i < 50; i += 1) {
  tabs.push(
    <TabPane key={i} tab={`Tab ${i}`}>
      Content of {i}
    </TabPane>,
  );
}

type P = 'default' | 'left' | 'right';

type Content<T> = Record<P, T>;

const content: Content<React.ReactNode> = {
  default: 'default',
  left: 'left',
  right: 'right',
};

export default () => {
  const [isDefault, setIsDefault] = React.useState(true);
  const [position, setPosition] = React.useState<P[]>([]);
  const checkRef = React.useRef<any>(null);

  const extra = React.useMemo(() => {
    if (isDefault) {
      return content.default;
    }

    if (position.length === 0) {
      return undefined;
    }

    return position.reduce((acc, cur: P) => {
      return {
        ...acc,
        [cur]: content[cur],
      };
    }, {});
  }, [isDefault, position]);

  const setBothSide = () => {
    if (position.length < 2) {
      setPosition(['left', 'right']);
    }
  };

  const handleCheck = (pos: P) => {
    const nextPos = () => {
      const add = position.indexOf(pos) === -1;

      if (add) {
        return [...position, pos];
      }

      return position.filter(item => item !== pos);
    };

    setPosition(nextPos());
  };

  const overall = React.useMemo(() => {
    if (position.length === 0) {
      return {
        checked: false,
        indeterminate: false,
      };
    }

    if (position.length === 2) {
      return {
        checked: true,
        indeterminate: false,
      };
    }

    return {
      checked: false,
      indeterminate: true,
    };
  }, [position]);

  React.useEffect(() => {
    checkRef.current.indeterminate = overall.indeterminate;
  }, [overall]);

  React.useEffect(() => {
    if (isDefault) {
      setPosition([]);
    }
  }, [isDefault]);

  React.useEffect(() => {
    if (position.length > 0) {
      setIsDefault(false);
    }
  }, [position]);

  return (
    <div style={{ maxWidth: 550 }}>
      <Tabs tabBarExtraContent={extra} defaultActiveKey="8" moreIcon="...">
        {tabs}
      </Tabs>
      <div style={{ display: 'flex' }}>
        <div>
          <input
            id="default-position"
            type="radio"
            checked={isDefault}
            onChange={() => {
              setIsDefault(true);
            }}
          />
          <label htmlFor="default-position">default position(right)</label>
        </div>
        <div style={{ marginLeft: '15px' }}>
          <input
            id="coustom-position"
            ref={checkRef}
            type={overall.indeterminate ? 'checkbox' : 'radio'}
            checked={overall.checked}
            onChange={setBothSide}
          />
          <label htmlFor="coustom-position">coustom position</label>
          <ul>
            <li>
              <input
                id="left"
                type="checkbox"
                checked={position.indexOf('left') !== -1}
                onChange={() => {
                  handleCheck('left');
                }}
              />
              <label htmlFor="left">left</label>
            </li>
            <li>
              <input
                id="right"
                type="checkbox"
                checked={position.indexOf('right') !== -1}
                onChange={() => {
                  handleCheck('right');
                }}
              />
              <label htmlFor="right">right</label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
