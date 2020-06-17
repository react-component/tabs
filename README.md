# rc-tabs

---

React Tabs

[![NPM version][npm-image]][npm-url] [![build status][travis-image]][travis-url] [![Test coverage][coveralls-image]][coveralls-url] [![gemnasium deps][gemnasium-image]][gemnasium-url] [![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/rc-tabs.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-tabs
[travis-image]: https://img.shields.io/travis/react-component/tabs.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/tabs
[coveralls-image]: https://img.shields.io/coveralls/react-component/tabs.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/tabs?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/tabs.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/tabs
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-tabs.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-tabs

## Screenshot

<img src='https://zos.alipayobjects.com/rmsportal/JwLASrsOYJuFRIt.png' width='408'>

## Example

http://localhost:8000/examples

online example: https://tabs.react-component.now.sh/

## install

[![rc-tabs](https://nodei.co/npm/rc-tabs.png)](https://npmjs.org/package/rc-tabs)

## Feature

### Keyboard

- left and up: switch to previous tab
- right and down: switch to next tab

## Usage

```jsx
import Tabs, { TabPane } from 'rc-tabs';

var callback = function(key) {};

React.render(
  <Tabs defaultActiveKey="2" onChange={callback}>
    <TabPane tab="tab 1" key="1">
      first
    </TabPane>
    <TabPane tab="tab 2" key="2">
      second
    </TabPane>
    <TabPane tab="tab 3" key="3">
      third
    </TabPane>
  </Tabs>,
  document.getElementById('t2'),
);
```

## API

### Tabs

| name | type | default | description |
| --- | --- | --- | --- |
| activeKey | string | - | current active tabPanel's key |
| animated | boolean \| { inkBar: boolean, tabPane: boolean } | true | config animation |
| defaultActiveKey | string | - | initial active tabPanel's key if activeKey is absent |
| destroyInactiveTabPane | `'ltr' | 'rlt'` | `'ltr'` | Layout direction of tabs component |
| direction | boolean | false | whether destroy inactive TabPane when change tab |
| editable | { onEdit(type: 'add' | 'remove', info: { key, event }), showAdd: boolean, removeIcon: ReactNode, addIcon: ReactNode } | - | config tab editable |
| locale | { dropdownAriaLabel: string, removeAriaLabel: string, addAriaLabel: string } | - | Accessibility locale help text |
| moreIcon | ReactNode | - | collapse icon |
| tabBarGutter | number | 0 | config tab bar gutter |
| tabBarPosition | `'left' | 'right' | 'top' | 'bottom'` | `'top'` | tab nav 's position |
| tabBarStyle | style | - | tab nav style |
| tabBarExtraContent | ReactNode | - | config extra content |
| renderTabBar | (props, TabBarComponent) => ReactElement | - | How to render tab bar |
| prefixCls | string | `'rc-tabs'` | prefix class name, use to custom style |
| onChange | (key) => void | - | called when tabPanel is changed |
| onTabClick | (key) => void | - | called when tab click |
| onTabScroll | ({ direction }) => void | - | called when tab scroll |

### TabPane

| name | type | default | description |
| --- | --- | --- | --- |
| key | string | - | corresponding to activeKey, should be unique |
| forceRender | boolean | false | forced render of content in tabs, not lazy render after clicking on tabs |
| tab | ReactNode | - | current tab's title corresponding to current tabPane |
| closeIcon | ReactNode | - | Config close icon |

## Development

```
npm install
npm start
```

## Test Case

```
npm test
npm run chrome-test
```

## Coverage

```
npm run coverage
```

open coverage/ dir

## License

rc-tabs is released under the MIT license.
