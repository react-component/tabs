<div align="center">
  <h1>@rc-component/tabs</h1>
  <p><sub><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /> Ant Design 生态的一部分。</sub></p>
  <p>📑 React 标签页组件，支持可编辑标签、溢出滚动和自定义渲染。</p>

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

- 支持 RTL 布局的顶部、底部、左侧和右侧选项卡位置。
- 使用下拉操作菜单处理溢出。
- 支持可编辑选项卡、额外选项卡栏内容、指示器和自定义选项卡栏。
- 为面板和导航自定义提供语义 `classNames` 和 `styles` 插槽。

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

在线预览：https://tabs.react-component.vercel.app/

## API

### Tabs

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `activeKey` | string | - | 受控的活动 Tab 键。 |
| `animated` | boolean \| AnimatedConfig | `{ inkBar: true, tabPane: false }` | 动画配置。 |
| `className` | string | - | 附加className。 |
| `classNames` | `Partial<Record<SemanticName, string>>` | - | 语义className。 |
| `defaultActiveKey` | string | - | 初始活动 Tab 键。 |
| `destroyOnHidden` | boolean | false | Destroy inactive tab panels. |
| `direction` | `'ltr' \| 'rtl'` | `'ltr'` | Layout direction. |
| `editable` | EditableConfig | - | 可编辑标签页配置。 |
| `getPopupContainer` | `(node: HTMLElement) => HTMLElement` | - | 弹层容器解析器。 |
| `id` | string | - | 根 ID。 |
| `indicator` | `{ size?: GetIndicatorSize; align?: 'start' \| 'center' \| 'end' }` | - | Indicator size and alignment. |
| `items` | Tab[] | [] | 选项卡项目。 |
| `locale` | TabsLocale | - | 无障碍本地化文本。 |
| `more` | MoreProps | - | 溢出下拉菜单配置。 |
| `onChange` | `(activeKey: string) => void` | - | 当活动选项卡更改时触发。 |
| `onTabClick` | `(activeKey, event) => void` | - | 单击选项卡时触发。 |
| `onTabScroll` | `({ direction }) => void` | - | 当选项卡导航滚动时触发。 |
| `prefixCls` | string | `'rc-tabs'` | 前缀className。 |
| `renderTabBar` | RenderTabBar | - | 自定义标签栏渲染函数。 |
| `style` | React.CSSProperties | - | 根样式。 |
| `styles` | `Partial<Record<SemanticName, React.CSSProperties>>` | - | 语义化样式。 |
| `tabBarExtraContent` | React.ReactNode \| TabBarExtraMap | - | 标签栏旁的额外内容。 |
| `tabBarGutter` | number | 0 | 选项卡之间的间隙。 |
| `tabBarStyle` | React.CSSProperties | - | 标签栏样式。 |
| `tabPosition` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'top'` | Tab position. |

### Tab

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `children` | React.ReactNode | - | 选项卡面板内容。 |
| `className` | string | - | 面板className称。 |
| `closable` | boolean | - | 是否可以在可编辑模式下关闭选项卡。 |
| `closeIcon` | React.ReactNode | - | 自定义关闭图标。 |
| `destroyOnHidden` | boolean | false | 销毁非活动面板。 |
| `disabled` | boolean | false | 禁用该选项卡。 |
| `forceRender` | boolean | false | 在面板变为活动状态之前渲染面板。 |
| `key` | string | - | 需要唯一的 Tab 键。 |
| `label` | React.ReactNode | - | Tab label. |
| `style` | React.CSSProperties | - | 面板风格。 |

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

包构建完成后，发布流程由 `@rc-component/np` 通过 `rc-np` 命令处理。

## 许可证

@rc-component/tabs 基于 [MIT](./LICENSE.md) 许可证发布。
