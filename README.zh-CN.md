<div align="center">
  <h1>@rc-component/tabs</h1>
  <p><sub>Ant Design 生态的一部分。</sub></p>
  <img alt="Ant Design" height="32" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
  <p>🗂️ React 标签页组件，支持可编辑标签、溢出滚动和自定义渲染。</p>

  <p>
    <a href="https://www.npmjs.com/package/@rc-component/tabs"><img src="https://img.shields.io/npm/v/@rc-component/tabs.svg?style=flat-square" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/@rc-component/tabs"><img src="https://img.shields.io/npm/dm/@rc-component/tabs.svg?style=flat-square" alt="npm downloads" /></a>
    <a href="https://github.com/react-component/tabs/actions"><img src="https://github.com/react-component/tabs/actions/workflows/react-component-ci.yml/badge.svg" alt="CI" /></a>
    <a href="https://codecov.io/gh/react-component/tabs"><img src="https://img.shields.io/codecov/c/github/react-component/tabs/master.svg?style=flat-square" alt="Codecov" /></a>
    <a href="https://bundlephobia.com/package/@rc-component/tabs"><img src="https://badgen.net/bundlephobia/minzip/@rc-component/tabs" alt="bundle size" /></a>
    <a href="https://github.com/umijs/dumi"><img src="https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square" alt="dumi" /></a>
  </p>
</div>

<p align="center"><a href="./README.md">English</a> | 简体中文</p>


## 特性

- 支持 top, bottom, left, and right tab positions with RTL layouts.
- Handles overflow with a dropdown operation menu.
- 支持 editable tabs, extra tab bar content, indicators, and custom tab bars.
- 提供 semantic `classNames` and `styles` slots for panel and navigation customization.

## 安装

```bash
npm install @rc-component/tabs
```

## 使用

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

## API

### Tabs

| 名称 | 类型 | 默认值 | 说明 |
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

| 名称 | 类型 | 默认值 | 说明 |
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

## 本地开发

```bash
npm install
npm start
npm test
npm run tsc
npm run compile
npm run build
```

## 发布

```bash
npm run prepublishOnly
```

The release flow is handled by `@rc-component/np` through the `rc-np` command after the package build.

## 许可证

@rc-component/tabs is released under the [MIT](./LICENSE.md) license.
