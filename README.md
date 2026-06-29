<div align="center">
  <h1>@rc-component/tabs</h1>
  <p><sub><a href="https://ant.design"><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /></a> Part of the Ant Design ecosystem.</sub></p>
  <p>📑 Flexible React tabs with overflow, editable items, custom tab bars, and accessible panels.</p>

  <p>
    <a href="https://npmjs.org/package/@rc-component/tabs"><img alt="NPM version" src="https://img.shields.io/npm/v/@rc-component/tabs.svg?style=flat-square"></a>
    <a href="https://npmjs.org/package/@rc-component/tabs"><img alt="npm downloads" src="https://img.shields.io/npm/dm/@rc-component/tabs.svg?style=flat-square"></a>
    <a href="https://github.com/react-component/tabs/actions/workflows/react-component-ci.yml"><img alt="build status" src="https://github.com/react-component/tabs/actions/workflows/react-component-ci.yml/badge.svg"></a>
    <a href="https://app.codecov.io/gh/react-component/tabs"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/react-component/tabs/master.svg?style=flat-square"></a>
    <a href="https://bundlephobia.com/package/@rc-component/tabs"><img alt="bundle size" src="https://img.shields.io/bundlephobia/minzip/@rc-component/tabs?style=flat-square"></a>
    <a href="https://github.com/umijs/dumi"><img alt="dumi" src="https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square"></a>
  </p>
</div>

<p align="center">English | <a href="./README.zh-CN.md">简体中文</a></p>


## Highlights

- Supports top, bottom, left, and right tab positions with RTL layouts.
- Handles overflow with a dropdown operation menu.
- Supports editable tabs, extra tab bar content, indicators, and custom tab bars.
- Provides semantic `classNames` and `styles` slots for panel and navigation customization.

## Install

```bash
npm install @rc-component/tabs
```

## Usage

```tsx pure
import Tabs from '@rc-component/tabs';
import '@rc-component/tabs/assets/index.css';

const items = [
  { key: 'overview', label: 'Overview', children: 'Overview content' },
  { key: 'settings', label: 'Settings', children: 'Settings content' },
];

export default () => <Tabs items={items} defaultActiveKey="overview" />;
```

Online preview: https://tabs.react-component.vercel.app/

## Examples

Run the local dumi site:

```bash
npm install
npm start
```

Then open `http://localhost:8000`.

## API

### Tabs

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `activeKey` | string | - | Controlled active tab key. |
| `animated` | boolean \| AnimatedConfig | `{ inkBar: true, tabPane: false }` | Animation config. |
| `className` | string | - | Additional class name. |
| `classNames` | `Partial<Record<SemanticName, string>>` | - | Semantic class names. |
| `defaultActiveKey` | string | - | Initial active tab key. |
| `destroyOnHidden` | boolean | false | Destroy inactive tab panels. |
| `direction` | `'ltr' \| 'rtl'` | `'ltr'` | Layout direction. |
| `editable` | EditableConfig | - | Editable tab configuration. |
| `getPopupContainer` | `(node: HTMLElement) => HTMLElement` | - | Popup container resolver. |
| `id` | string | - | Root id. |
| `indicator` | `{ size?: GetIndicatorSize; align?: 'start' \| 'center' \| 'end' }` | - | Indicator size and alignment. |
| `items` | Tab[] | [] | Tab items. |
| `locale` | TabsLocale | - | Accessibility locale text. |
| `more` | MoreProps | - | Overflow dropdown config. |
| `onChange` | `(activeKey: string) => void` | - | Triggered when active tab changes. |
| `onTabClick` | `(activeKey, event) => void` | - | Triggered when a tab is clicked. |
| `onTabScroll` | `({ direction }) => void` | - | Triggered when tab navigation scrolls. |
| `prefixCls` | string | `'rc-tabs'` | Prefix class name. |
| `renderTabBar` | RenderTabBar | - | Custom tab bar renderer. |
| `style` | React.CSSProperties | - | Root style. |
| `styles` | `Partial<Record<SemanticName, React.CSSProperties>>` | - | Semantic styles. |
| `tabBarExtraContent` | React.ReactNode \| TabBarExtraMap | - | Extra content beside the tab bar. |
| `tabBarGutter` | number | 0 | Gap between tabs. |
| `tabBarStyle` | React.CSSProperties | - | Tab bar style. |
| `tabPosition` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'top'` | Tab position. |

### Tab

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | React.ReactNode | - | Tab panel content. |
| `className` | string | - | Panel class name. |
| `closable` | boolean | - | Whether the tab can be closed in editable mode. |
| `closeIcon` | React.ReactNode | - | Custom close icon. |
| `destroyOnHidden` | boolean | false | Destroy inactive panel. |
| `disabled` | boolean | false | Disable the tab. |
| `forceRender` | boolean | false | Render panel before it becomes active. |
| `key` | string | - | Required unique tab key. |
| `label` | React.ReactNode | - | Tab label. |
| `style` | React.CSSProperties | - | Panel style. |

## Development

```bash
npm install
npm start
npm test
npm run tsc
npm run compile
npm run build
```

The dumi site runs at `http://localhost:8000` by default.

## Release

```bash
npm run prepublishOnly
```

The release flow is handled by `@rc-component/np` through the `rc-np` command after the package build.

## License

@rc-component/tabs is released under the [MIT](./LICENSE) license.
