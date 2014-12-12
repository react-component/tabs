# rc-tabs

react tabs component

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/rc-tabs.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-tabs
[travis-image]: https://img.shields.io/travis/react-component/tabs.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/tabs
[coveralls-image]: https://img.shields.io/coveralls/react-component/tabs.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/tabs?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/tabs.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/tabs
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-tabs.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-tabs

## install

[![rc-tabs](https://nodei.co/npm/rc-tabs.png)](https://npmjs.org/package/rc-tabs)

## Usage

```js
var Tabs = require('rc-tabs');


var items = [
    {title : 'title 1',id:'1'},
    {title : 'title 2',id:'2'},
    {title : 'title 3',id:'3'}
  ];

  var callback = function(index,item){

  }

  var tabs = React.render(
    (
      <Tabs activedIndex={1} onNavChange={callback} items={items}>
        <p>first</p>
        <p>second</p>
        <p>third</p>
      </Tabs>
    ),
    document.getElementById('t2'));

// use tabs
```

## Development

```
npm install
npm start
```

## API 

name|type|default|description|
----|----|-------|-----------|
items|Array|[]|nav collection, set the header navigation|
activedIndex|Number|0|The current actived index|
onNavChange|Function(index,item)|null|When changing to the navigation|

## Test Case

http://localhost:8000/tests/runner.html?coverage

## Coverage

http://localhost:8000/node_modules/node-jscover/lib/front-end/jscoverage.html?w=http://localhost:8000/tests/runner.html?coverage

## License

rc-tabs is released under the MIT license.