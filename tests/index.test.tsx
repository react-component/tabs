import '@testing-library/dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import KeyCode from 'rc-util/lib/KeyCode';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
import React from 'react';
import Tabs from '../src';
import type { TabsProps } from '../src/Tabs';
import type { HackInfo } from './common/util';
import { getOffsetSizeFunc, waitFakeTimer } from './common/util';

global.animated = null;

jest.mock('../src/TabPanelList', () => {
  const Origin = jest.requireActual('../src/TabPanelList').default;

  return (props: any) => {
    global.animated = props.animated;
    return <Origin {...props} />;
  };
});

describe('Tabs.Basic', () => {
  let domSpy: ReturnType<typeof spyElementPrototypes>;

  const hackOffsetInfo: HackInfo = {};

  beforeEach(() => {
    Object.keys(hackOffsetInfo).forEach(key => {
      delete hackOffsetInfo[key];
    });

    global.animated = null;
  });

  beforeAll(() => {
    domSpy = spyElementPrototypes(HTMLElement, {
      scrollIntoView: () => {},
      offsetWidth: {
        get: getOffsetSizeFunc(hackOffsetInfo),
      },
    });
  });

  afterAll(() => {
    domSpy.mockRestore();
  });

  function getTabs(props: TabsProps = null) {
    const mergedProps = {
      items: [
        {
          label: 'light',
          key: 'light',
          children: 'Light',
        },
        {
          label: 'bamboo',
          key: 'bamboo',
          children: 'Bamboo',
        },
        {
          label: 'cute',
          key: 'cute',
          children: 'Cute',
        },
      ],
      ...props,
    };

    return <Tabs {...mergedProps} />;
  }

  it('Normal', () => {
    const { container } = render(getTabs({ defaultActiveKey: 'bamboo' }));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('disabled not change', () => {
    const onChange = jest.fn();

    const { container } = render(
      getTabs({
        defaultActiveKey: 'light',
        items: [
          {
            label: 'light',
            key: 'light',
            children: 'Light',
          },
          {
            label: 'disabled',
            key: 'disabled',
            children: 'Disabled',
            disabled: true,
          },
        ],
      }),
    );

    fireEvent.click(container.querySelector('.rc-tabs-tab-disabled'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('Skip invalidate children', () => {
    const { container } = render(
      getTabs({
        items: [
          {
            label: 'light',
            key: 'light',
            children: 'Light',
          },
          'not me' as any,
        ],
      }),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('nothing for empty tabs', () => {
    render(getTabs({ items: null }));
  });

  it('strictMode should show correct ink bar', () => {
    jest.useFakeTimers();

    const { container } = render(
      <React.StrictMode>
        <Tabs
          items={new Array(2).fill(0).map((_, index) => ({
            label: `Tab ${index}`,
            key: `${index}`,
            children: `Content of Tab Pane ${index}`,
          }))}
          activeKey="0"
        />
      </React.StrictMode>,
    );

    for (let i = 0; i < 10; i += 1) {
      act(() => {
        jest.runAllTimers();
      });
    }

    expect(container.querySelector<HTMLElement>('.rc-tabs-ink-bar')).toHaveStyle({
      width: '20px',
    });
    jest.useRealTimers();
  });

  it('same width in windows call resize', async () => {
    const App = () => {
      const [list, setList] = React.useState([
        {
          label: `Tab 1`,
          key: '1',
          children: `Content of Tab Pane 1`,
        },
        {
          label: `Tab 2`,
          key: '2',
          children: `Content of Tab Pane 2`,
        },
        {
          label: `Tab 3`,
          key: '3',
          children: `Content of Tab Pane 3`,
        },
      ]);
      const changeItems = () => {
        const listCp = [
          {
            label: `Tab 4`,
            key: '4',
            children: `Content of Tab Pane 4`,
          },
          {
            label: `Tab 5`,
            key: '5',
            children: `Content of Tab Pane 5`,
          },
          {
            label: `Tab 6`,
            key: '6',
            children: `Content of Tab Pane 6`,
          },
        ];
        setList(listCp);
      };
      return (
        <div className="App">
          <button id="changeItems" onClick={changeItems}>
            change
          </button>
          <Tabs items={list} />
        </div>
      );
    };

    const { container } = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'change' }));
    expect(container.querySelector<HTMLElement>('.rc-tabs-ink-bar').offsetWidth).toBe(50);
  });

  describe('onChange and onTabClick should work', () => {
    const list: { name: string; trigger: (container: HTMLElement) => void }[] = [
      {
        name: 'outer div',
        trigger: container => fireEvent.click(container.querySelectorAll('.rc-tabs-tab')[2]),
      },
      {
        name: 'inner button',
        trigger: container =>
          fireEvent.click(container.querySelectorAll('.rc-tabs-tab .rc-tabs-tab-btn')[2]),
      },
      {
        name: 'inner button key down',
        trigger: container =>
          fireEvent.keyDown(container.querySelectorAll('.rc-tabs-tab .rc-tabs-tab-btn')[2], {
            which: KeyCode.SPACE,
            keyCode: KeyCode.SPACE,
            charCode: KeyCode.SPACE,
          }),
      },
    ];

    list.forEach(({ name, trigger }) => {
      it(name, () => {
        const onChange = jest.fn();
        const onTabClick = jest.fn();
        const { container } = render(getTabs({ onChange, onTabClick }));

        trigger(container);
        expect(onTabClick).toHaveBeenCalledWith('cute', expect.anything());
        expect(onChange).toHaveBeenCalledWith('cute');
      });
    });

    // https://github.com/ant-design/ant-design/issues/33032
    it('should not trigger onChange when click current tab', () => {
      const onChange = jest.fn();
      const onTabClick = jest.fn();
      const { container } = render(getTabs({ onChange, onTabClick }));

      fireEvent.click(container.querySelector('.rc-tabs-tab'));
      expect(onTabClick).toHaveBeenCalledWith('light', expect.anything());
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  it('active first tab when children is changed', () => {
    const { container, rerender } = render(getTabs());
    rerender(
      getTabs({
        items: [
          {
            label: 'Yo',
            key: '2333',
            children: 'New',
          },
        ],
      }),
    );

    expect(container.querySelector('.rc-tabs-tab-active').textContent).toEqual('Yo');
  });

  it('active first tab when children is not changed at controlled mode', () => {
    const { container, rerender } = render(getTabs({ activeKey: 'light' }));
    expect(container.querySelector('.rc-tabs-tab-active').textContent).toEqual('light');

    rerender(
      getTabs({
        activeKey: 'light',
        items: [
          {
            label: 'Yo',
            key: '2333',
            children: 'New',
          },
        ],
      }),
    );
    expect(container.querySelector('.rc-tabs-tab-active')).toBeFalsy();
  });

  it('tabBarGutter should work', () => {
    const topTabs = render(getTabs({ tabBarGutter: 23 }));
    expect(topTabs.container.querySelectorAll('.rc-tabs-tab')[0]).toHaveStyle({
      marginLeft: undefined,
    });
    expect(topTabs.container.querySelectorAll('.rc-tabs-tab')[1]).toHaveStyle({
      marginLeft: '23px',
    });

    const rightTabs = render(getTabs({ tabBarGutter: 33, tabPosition: 'right' }));
    expect(rightTabs.container.querySelectorAll('.rc-tabs-tab')[0]).toHaveStyle({
      marginTop: undefined,
    });
    expect(rightTabs.container.querySelectorAll('.rc-tabs-tab')[1]).toHaveStyle({
      marginTop: '33px',
    });
  });

  describe('renderTabBar', () => {
    it('works', () => {
      const renderTabBar = jest.fn((props, Component) => {
        return (
          <div className="my-wrapper">
            <Component {...props}>{node => <span className="my-node">{node}</span>}</Component>
          </div>
        );
      });
      const { container } = render(getTabs({ renderTabBar }));
      expect(container.querySelector('.my-wrapper')).toBeTruthy();
      expect(container.querySelector('.my-node')).toBeTruthy();
      expect(renderTabBar).toHaveBeenCalled();
    });
    it('has panes property in props', () => {
      const renderTabBar = props => {
        return (
          <div>
            {props.panes.map(pane => (
              <span key={pane.key} data-key={pane.key}>
                tab
              </span>
            ))}
          </div>
        );
      };
      const { container } = render(getTabs({ renderTabBar }));
      expect(container.querySelector('[data-key="light"]')).toBeTruthy();
      expect(container.querySelector('[data-key="bamboo"]')).toBeTruthy();
      expect(container.querySelector('[data-key="cute"]')).toBeTruthy();
    });
  });

  it('destroyInactiveTabPane', () => {
    const props = {
      activeKey: 'light',
      destroyInactiveTabPane: true,
      items: [
        {
          key: 'light',
          children: 'Light',
        },
        {
          key: 'bamboo',
          children: 'Bamboo',
        },
      ] as any,
    };

    const { container, rerender } = render(getTabs(props));

    function matchText(text: string) {
      expect(container.querySelectorAll('.rc-tabs-tabpane')).toHaveLength(1);
      expect(container.querySelector('.rc-tabs-tabpane-active').textContent).toEqual(text);
    }

    matchText('Light');

    rerender(
      getTabs({
        ...props,
        activeKey: 'bamboo',
      }),
    );
    matchText('Bamboo');
  });

  it('destroyInactiveTabPane from TabPane', () => {
    const props = {
      activeKey: 'light',

      items: [
        {
          key: 'light',
          children: 'Light',
          destroyInactiveTabPane: true,
        },
        {
          key: 'bamboo',
          children: 'Bamboo',
          destroyInactiveTabPane: true,
        },
      ] as any,
    };

    const { container, rerender } = render(getTabs(props));

    function matchText(text: string) {
      expect(container.querySelectorAll('.rc-tabs-tabpane')).toHaveLength(1);
      expect(container.querySelector('.rc-tabs-tabpane-active').textContent).toEqual(text);
    }

    matchText('Light');

    rerender(
      getTabs({
        ...props,
        activeKey: 'bamboo',
      }),
    );
    matchText('Bamboo');
  });

  describe('editable', () => {
    it('no and', () => {
      const onEdit = jest.fn();
      const { container } = render(getTabs({ editable: { onEdit, showAdd: false } }));
      expect(container.querySelector('.rc-tabs-nav-add')).toBeFalsy();
    });

    it('add', () => {
      const onEdit = jest.fn();
      const { container } = render(getTabs({ editable: { onEdit } }));
      fireEvent.click(container.querySelector('.rc-tabs-nav-add'));
      expect(onEdit).toHaveBeenCalledWith('add', {
        key: undefined,
        event: expect.anything(),
      });
    });

    const list: { name: string; trigger: (node: Element) => void }[] = [
      {
        name: 'click',
        trigger: node => {
          fireEvent.click(node);
        },
      },
    ];

    list.forEach(({ name, trigger }) => {
      it(`remove by ${name}`, () => {
        const onEdit = jest.fn();
        const { container } = render(getTabs({ editable: { onEdit } }));

        const first = container.querySelector('.rc-tabs-tab-remove');
        trigger(first);

        // Should be button to enable press SPACE key to trigger
        expect(first instanceof HTMLButtonElement).toBeTruthy();

        expect(onEdit).toHaveBeenCalledWith('remove', {
          key: 'light',
          event: expect.anything(),
        });
      });
    });

    it('customize closeIcon', () => {
      const onEdit = jest.fn();
      const { container } = render(
        getTabs({
          editable: { onEdit },
          items: [
            {
              key: 'light',
              closeIcon: <span className="close-light" />,
              children: 'Light',
            },
          ] as any,
        }),
      );

      expect(
        container.querySelector('.rc-tabs-tab-remove').querySelector('.close-light'),
      ).toBeTruthy();
    });
    it('customize closeIcon', () => {
      const onEdit = jest.fn();
      const { container } = render(
        getTabs({
          editable: { onEdit },
          items: [
            {
              key: 'light',
              closeIcon: <span className="close-light" />,
              children: 'Light',
            },
          ] as any,
        }),
      );

      expect(
        container.querySelector('.rc-tabs-tab-remove').querySelector('.close-light'),
      ).toBeTruthy();
    });
    it('should hide closeIcon when closeIcon is set to null or false', () => {
      const onEdit = jest.fn();
      const { container } = render(
        getTabs({
          editable: { onEdit },
          items: [
            {
              key: 'light1',
              closeIcon: null,
              children: 'Light',
            },
            {
              key: 'light2',
              closeIcon: false,
              children: 'Light',
            },
            {
              key: 'light3',
              closeIcon: null,
              closable: true,
              children: 'Light',
            },
            {
              key: 'light4',
              closeIcon: false,
              closable: true,
              children: 'Light',
            },
            {
              key: 'light5',
              closable: false,
              children: 'Light',
            },
          ] as any,
        }),
      );

      const removes = container.querySelectorAll('.rc-tabs-tab-remove');
      expect(removes.length).toBe(2);
      expect(
        container.querySelector('[data-node-key="light1"]').querySelector('.rc-tabs-tab-remove'),
      ).toBeFalsy();
      expect(
        container.querySelector('[data-node-key="light2"]').querySelector('.rc-tabs-tab-remove'),
      ).toBeFalsy();
      expect(
        container.querySelector('[data-node-key="light3"]').querySelector('.rc-tabs-tab-remove'),
      ).toBeTruthy();
      expect(
        container.querySelector('[data-node-key="light4"]').querySelector('.rc-tabs-tab-remove'),
      ).toBeTruthy();
      expect(
        container.querySelector('[data-node-key="light5"]').querySelector('.rc-tabs-tab-remove'),
      ).toBeFalsy();
    });
  });

  it('extra', () => {
    const { container } = render(getTabs({ tabBarExtraContent: 'Bamboo' }));
    expect(container.querySelector('.rc-tabs-extra-content').textContent).toEqual('Bamboo');
  });

  it('extra position', () => {
    const { container } = render(
      getTabs({ tabBarExtraContent: { left: 'Left Bamboo', right: 'Right Bamboo' } }),
    );
    expect(container.querySelector('.rc-tabs-extra-content').textContent).toEqual('Left Bamboo');

    expect(container.querySelectorAll('.rc-tabs-extra-content')[1].textContent).toEqual(
      'Right Bamboo',
    );
  });

  it('no break of empty object', () => {
    render(getTabs({ tabBarExtraContent: {} }));
  });

  describe('animated', () => {
    it('false', () => {
      render(getTabs({ animated: false }));
      expect(global.animated).toEqual({
        inkBar: false,
        tabPane: false,
      });
    });

    it('true', () => {
      render(getTabs({ animated: true }));
      expect(global.animated).toEqual({
        inkBar: true,
        tabPane: false,
      });
    });

    it('customize but !tabPaneMotion', () => {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      render(getTabs({ animated: { inkBar: false, tabPane: true } }));
      expect(global.animated).toEqual({
        inkBar: false,
        tabPane: false,
      });

      expect(errorSpy).toHaveBeenCalledWith(
        'Warning: `animated.tabPane` is true but `animated.tabPaneMotion` is not provided. Motion will not work.',
      );
      errorSpy.mockRestore();
    });

    it('customize', () => {
      render(getTabs({ animated: { inkBar: true, tabPane: true, tabPaneMotion: {} } }));
      expect(global.animated).toEqual(
        expect.objectContaining({
          inkBar: true,
          tabPane: true,
        }),
      );
    });
  });

  it('focus to scroll', () => {
    const { container, unmount } = render(getTabs());
    fireEvent.focus(container.querySelector('.rc-tabs-tab'));
    unmount();
  });

  it('tabBarStyle', () => {
    const { container } = render(getTabs({ tabBarStyle: { background: 'red' } }));
    expect(container.querySelector('.rc-tabs-nav')).toHaveStyle({ background: 'red' });
  });

  it('key contains double quote should not crash', () => {
    render(<Tabs items={[{ key: '"key"', label: 'test' }]} />);
  });

  it('key could be number', () => {
    render(<Tabs items={[{ key: 1 as any, label: 'test' }]} />);
  });

  it('support indicatorSize', async () => {
    const { container, rerender } = render(getTabs({ indicatorSize: 10 }));
    await waitFakeTimer();
    expect(container.querySelector('.rc-tabs-ink-bar')).toHaveStyle({ width: '10px' });

    rerender(getTabs({ indicatorSize: origin => origin - 2 }));
    await waitFakeTimer();
    expect(container.querySelector('.rc-tabs-ink-bar')).toHaveStyle({ width: '18px' });
  });

  it('Add span to text label when have icon', () => {
    const selectors = '.rc-tabs-tab .rc-tabs-tab-btn span';
    const { container, rerender } = render(
      <Tabs items={[{ key: 'key', label: 'test', icon: 'test' }]} />,
    );
    expect(container.querySelectorAll<HTMLSpanElement>(selectors).length).toBe(2);
    rerender(<Tabs items={[{ key: 'key', label: <div>test</div>, icon: 'test' }]} />);
    expect(container.querySelectorAll<HTMLSpanElement>(selectors).length).toBe(1);
  });

  it('support indicatorPosition', async () => {
    const { container: startContainer } = render(
      <Tabs
        items={[{ key: 'test', label: 'test', icon: 'test' }]}
        indicatorSize={origin => origin - 10}
        indicatorPosition="start"
      />,
    );
    const { container: centerContainer } = render(
      <Tabs
        items={[{ key: 'test', label: 'test', icon: 'test' }]}
        indicatorSize={origin => origin - 10}
        indicatorPosition="center"
      />,
    );
    const { container: endContainer } = render(
      <Tabs
        items={[{ key: 'test', label: 'test', icon: 'test' }]}
        indicatorSize={origin => origin - 10}
        indicatorPosition="end"
      />,
    );

    await waitFakeTimer();

    const selectors = '.rc-tabs .rc-tabs-nav .rc-tabs-nav-list .rc-tabs-ink-bar';

    const startBar = startContainer.querySelector<HTMLDivElement>(selectors);
    const centerBar = centerContainer.querySelector<HTMLDivElement>(selectors);
    const endBar = endContainer.querySelector<HTMLDivElement>(selectors);

    expect(parseInt(startBar.style.left, 10)).toBeLessThan(parseInt(centerBar.style.left, 10));
    expect(parseInt(centerBar.style.left, 10)).toBeLessThan(parseInt(endBar.style.left, 10));
  });
});
