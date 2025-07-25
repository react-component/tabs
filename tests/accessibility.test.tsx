import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import type { TabsProps } from '../src';
import Tabs from '../src';

describe('Tabs.Accessibility', () => {
  const createTabs = (props: TabsProps = {}) => (
    <Tabs
      defaultActiveKey="1"
      {...props}
      items={[
        {
          key: '1',
          label: 'Tab1',
          children: 'Content 1',
        },
        {
          key: '2',
          label: 'Tab2',
          children: 'Content 2',
        },
        {
          key: '3',
          label: 'Tab3',
          disabled: true,
          children: 'Content 3',
        },
        {
          key: '4',
          label: 'Tab4',
          children: 'Content 4',
        },
      ]}
    />
  );

  it('should support keyboard navigation', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(createTabs());

    const firstTab = getByRole('tab', { name: /Tab1/i });
    const secondTab = getByRole('tab', { name: /Tab2/i });
    const fourthTab = getByRole('tab', { name: /Tab4/i });

    await user.tab();
    expect(firstTab).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(secondTab.parentElement).toHaveClass('rc-tabs-tab-focus');

    // skip disabled tab
    await user.keyboard('{ArrowRight}');
    expect(fourthTab.parentElement).toHaveClass('rc-tabs-tab-focus');

    // cycle to first tab
    await user.keyboard('{ArrowRight}');
    expect(firstTab.parentElement).toHaveClass('rc-tabs-tab-focus');

    // cycle to last tab
    await user.keyboard('{ArrowLeft}');
    expect(fourthTab.parentElement).toHaveClass('rc-tabs-tab-focus');

    // jump to first tab
    await user.keyboard('{Home}');
    expect(firstTab.parentElement).toHaveClass('rc-tabs-tab-focus');

    // jump to last tab
    await user.keyboard('{End}');
    expect(fourthTab.parentElement).toHaveClass('rc-tabs-tab-focus');
  });

  it('should support vertical keyboard navigation', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(createTabs({ tabPosition: 'left' }));

    // jump to first tab
    await user.tab();
    const firstTab = getByRole('tab', { name: /Tab1/i });
    expect(firstTab).toHaveFocus();

    // move to second tab
    await user.keyboard('{ArrowDown}');
    const secondTab = getByRole('tab', { name: /Tab2/i });
    expect(secondTab.parentElement).toHaveClass('rc-tabs-tab-focus');

    // move to first tab
    await user.keyboard('{ArrowUp}');
    expect(firstTab.parentElement).toHaveClass('rc-tabs-tab-focus');
  });

  it('should activate tab on Enter/Space', async () => {
    const onTabClick = jest.fn();
    const onChange = jest.fn();
    const user = userEvent.setup();

    render(createTabs({ onTabClick, onChange }));

    // jump to first tab
    await user.tab();

    // activate tab
    await user.keyboard(' ');
    expect(onTabClick).toHaveBeenCalledTimes(1);
    expect(onTabClick).toHaveBeenLastCalledWith('1', expect.any(Object));
    expect(onChange).toHaveBeenCalledTimes(0);

    // move focus to second tab
    await user.keyboard('{ArrowRight}');

    // activate tab
    await user.keyboard('{Enter}');
    expect(onTabClick).toHaveBeenCalledTimes(2);
    expect(onTabClick).toHaveBeenLastCalledWith('2', expect.any(Object));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith('2');

    // press enter on same tab
    await user.keyboard('{Enter}');
    expect(onTabClick).toHaveBeenCalledTimes(3);
    expect(onTabClick).toHaveBeenLastCalledWith('2', expect.any(Object));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should not navigate to disabled tabs', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(createTabs());

    // jump to first tab
    await user.tab();

    // should skip disabled tab
    await user.keyboard('{ArrowRight}');
    await user.keyboard('{ArrowRight}');

    const fourthTab = getByRole('tab', { name: /Tab4/i });
    expect(fourthTab.parentElement).toHaveClass('rc-tabs-tab-focus');
  });

  it('should distinguish between keyboard and mouse navigation', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(createTabs());

    const secondTab = getByRole('tab', { name: /Tab2/i });
    const fourthTab = getByRole('tab', { name: /Tab4/i });

    // mouse click should not add focus style
    await user.click(secondTab);
    expect(secondTab.parentElement).not.toHaveClass('rc-tabs-tab-focus');

    // clear focus
    await user.click(document.body);

    // keyboard navigation should add focus style
    await user.tab();
    // default focus active tab
    expect(secondTab.parentElement).toHaveClass('rc-tabs-tab-focus');

    await user.keyboard('{ArrowRight}');
    // skip disabled tab
    expect(fourthTab.parentElement).toHaveClass('rc-tabs-tab-focus');
  });

  it('should support keyboard delete tab', async () => {
    const user = userEvent.setup();
    const Demo = () => {
      const [items, setItems] = React.useState([
        {
          key: '1',
          label: 'Tab1',
          children: 'Content 1',
        },
        {
          key: '2',
          label: 'Tab2',
          children: 'Content 2',
        },
        {
          key: '3',
          label: 'Tab3',
          disabled: true,
          children: 'Content 3',
        },
        {
          key: '4',
          label: 'Tab4',
          children: 'Content 4',
        },
      ]);
      return (
        <Tabs
          defaultActiveKey="1"
          items={items}
          editable={{
            onEdit: (type, { key }) => {
              if (type === 'remove') {
                setItems(prevItems => prevItems.filter(item => item.key !== key));
              }
            },
          }}
        />
      );
    };

    const { getByRole, queryByRole } = render(<Demo />);

    // focus to first tab
    await user.tab();
    const firstTab = getByRole('tab', { name: /Tab1/i });
    expect(firstTab).toHaveFocus();

    // delete first tab
    await user.keyboard('{Backspace}');
    expect(queryByRole('tab', { name: /Tab1/i })).toBeNull();

    // focus should move to next tab
    const secondTab = getByRole('tab', { name: /Tab2/i });
    expect(secondTab).toHaveFocus();

    // delete second tab
    await user.keyboard('{Backspace}');
    expect(queryByRole('tab', { name: /Tab2/i })).toBeNull();

    // focus should move to next tab
    const fourthTab = getByRole('tab', { name: /Tab4/i });
    expect(fourthTab).toHaveFocus();

    // keyboard navigation should work
    await user.keyboard('{ArrowRight}');
    expect(fourthTab.parentElement).toHaveClass('rc-tabs-tab-focus');
  });

  it('should focus previous tab when deleting the last tab', async () => {
    const user = userEvent.setup();
    const Demo = () => {
      const [items, setItems] = React.useState([
        {
          key: '1',
          label: 'Tab1',
          children: 'Content 1',
        },
        {
          key: '2',
          label: 'Tab2',
          children: 'Content 2',
        },
        {
          key: '3',
          label: 'Tab3',
          children: 'Content 3',
        },
      ]);
      return (
        <Tabs
          defaultActiveKey="2"
          items={items}
          editable={{
            onEdit: (type, { key }) => {
              if (type === 'remove') {
                setItems(prevItems => prevItems.filter(item => item.key !== key));
              }
            },
          }}
        />
      );
    };

    const { getByRole, queryByRole } = render(<Demo />);

    await user.tab();
    const secondTab = getByRole('tab', { name: /Tab2/i });
    expect(secondTab).toHaveFocus();

    await user.keyboard('{Backspace}');
    expect(queryByRole('tab', { name: /Tab2/i })).toBeNull();

    await user.keyboard('{Delete}');
    expect(queryByRole('tab', { name: /Tab3/i })).toBeNull();

    const firstTab = getByRole('tab', { name: /Tab1/i });
    expect(firstTab).toHaveFocus();
  });

  it('should not focus on tab panel when it is empty', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(
      <Tabs defaultActiveKey="1" items={[{ key: '1', label: 'Tab1', children: null }]} />,
    );

    const tabPanel = getByRole('tabpanel', { name: /Tab1/i });
    await user.tab();
    await user.tab();
    expect(tabPanel).not.toHaveFocus();
  });

  it('should close tab on middle mouse button click', async () => {
    const Demo = () => {
      const [items, setItems] = React.useState(
        Array.from({ length: 3 }, (_, i) => ({
          key: `${i + 1}`,
          label: `Tab${i + 1}`,
          children: `Content ${i + 1}`,
        })),
      );
      return (
        <Tabs
          defaultActiveKey="1"
          items={items}
          editable={{
            onEdit: (type, { key }) => {
              if (type === 'remove') {
                setItems(prevItems => prevItems.filter(item => item.key !== key));
              }
            },
          }}
        />
      );
    };

    const { queryByRole } = render(<Demo />);

    // Get the second tab
    const secondTab = queryByRole('tab', { name: /Tab2/i });
    expect(secondTab).toBeInTheDocument();

    // Simulate middle mouse button click (button index 1)
    fireEvent.mouseDown(secondTab, { button: 1 });

    expect(queryByRole('tab', { name: /Tab2/i })).toBeNull();

    // First and third tabs should still be there
    expect(queryByRole('tab', { name: /Tab1/i })).toBeInTheDocument();
    expect(queryByRole('tab', { name: /Tab3/i })).toBeInTheDocument();
  });
});
