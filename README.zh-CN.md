<div align="center">
  <h1>@rc-component/tabs</h1>
  <p><sub><a href="https://ant.design"><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /></a> Ant Design 生态的一部分。</sub></p>
  <p>📑 React 标签页组件，支持可编辑标签、溢出滚动和自定义渲染。</p>

  <p>
    <a href="https://npmjs.org/package/@rc-component/tabs"><img alt="NPM version" src="https://img.shields.io/npm/v/@rc-component/tabs.svg?style=flat-square"></a>
    <a href="https://npmjs.org/package/@rc-component/tabs"><img alt="npm downloads" src="https://img.shields.io/npm/dm/@rc-component/tabs.svg?style=flat-square"></a>
    <a href="https://github.com/react-component/tabs/actions/workflows/react-component-ci.yml"><img alt="build status" src="https://github.com/react-component/tabs/actions/workflows/react-component-ci.yml/badge.svg"></a>
    <a href="https://app.codecov.io/gh/react-component/tabs"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/react-component/tabs/master.svg?style=flat-square"></a>
    <a href="https://bundlephobia.com/package/@rc-component/tabs"><img alt="bundle size" src="https://img.shields.io/bundlephobia/minzip/@rc-component/tabs?style=flat-square"></a>
    <a href="https://github.com/umijs/dumi"><img alt="dumi" src="https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square"></a>
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

## 示例

运行本地 dumi 站点：

```bash
npm install
npm start
```

然后打开 `http://localhost:8000`。

## API

### Tabs

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `activeKey` | string | - | 受控的活动 Tab 键。 |
| `animated` | boolean \| AnimatedConfig | `{ inkBar: true, tabPane: false }` | 动画配置。 |
| `className` | string | - | 附加 className。 |
| `classNames` | `Partial<Record<SemanticName, string>>` | - | 语义化类名。 |
| `defaultActiveKey` | string | - | 初始活动 Tab 键。 |
| `destroyOnHidden` | boolean | false | 销毁非活动标签页面板。 |
| `direction` | `'ltr' \| 'rtl'` | `'ltr'` | 布局方向。 |
| `editable` | EditableConfig | - | 可编辑标签页配置。 |
| `getPopupContainer` | `(node: HTMLElement) => HTMLElement` | - | 弹层容器解析器。 |
| `id` | string | - | 根 ID。 |
| `indicator` | `{ size?: GetIndicatorSize; align?: 'start' \| 'center' \| 'end' }` | - | 指示器尺寸和对齐方式。 |
| `items` | Tab[] | [] | 选项卡项目。 |
| `locale` | TabsLocale | - | 无障碍本地化文本。 |
| `more` | MoreProps | - | 溢出下拉菜单配置。 |
| `onChange` | `(activeKey: string) => void` | - | 当活动选项卡更改时触发。 |
| `onTabClick` | `(activeKey, event) => void` | - | 单击选项卡时触发。 |
| `onTabScroll` | `({ direction }) => void` | - | 当选项卡导航滚动时触发。 |
| `prefixCls` | string | `'rc-tabs'` | 前缀 className。 |
| `renderTabBar` | RenderTabBar | - | 自定义标签栏渲染函数。 |
| `style` | React.CSSProperties | - | 根样式。 |
| `styles` | `Partial<Record<SemanticName, React.CSSProperties>>` | - | 语义化样式。 |
| `tabBarExtraContent` | React.ReactNode \| TabBarExtraMap | - | 标签栏旁的额外内容。 |
| `tabBarGutter` | number | 0 | 选项卡之间的间隙。 |
| `tabBarStyle` | React.CSSProperties | - | 标签栏样式。 |
| `tabPosition` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'top'` | 标签页位置。 |

### Tab

| 名称              | 类型                | 默认值 | 说明                               |
| ----------------- | ------------------- | ------ | ---------------------------------- |
| `children`        | React.ReactNode     | -      | 选项卡面板内容。                   |
| `className`       | string              | -      | 面板 className。                   |
| `closable`        | boolean             | -      | 是否可以在可编辑模式下关闭选项卡。 |
| `closeIcon`       | React.ReactNode     | -      | 自定义关闭图标。                   |
| `destroyOnHidden` | boolean             | false  | 销毁非活动面板。                   |
| `disabled`        | boolean             | false  | 禁用该选项卡。                     |
| `forceRender`     | boolean             | false  | 在面板变为活动状态之前渲染面板。   |
| `key`             | string              | -      | 需要唯一的 Tab 键。                |
| `label`           | React.ReactNode     | -      | Tab 标签内容。                     |
| `style`           | React.CSSProperties | -      | 面板样式。                         |

## 本地开发

```bash
npm install
npm start
npm test
npm run tsc
npm run compile
npm run build
```

dumi 站点默认运行在 `http://localhost:8000`。

## 发布

```bash
npm run prepublishOnly
```

包构建完成后，发布流程由 `@rc-component/np` 通过 `rc-np` 命令处理。

## 许可证

@rc-component/tabs 基于 [MIT](./LICENSE) 许可证发布。
