// Copy from antd jest config file. We need compile `rc-resize-observer`
const compileModules = [
  'array-move',
  'react-dnd',
  'react-dnd-html5-backend',
  '@react-dnd',
  'dnd-core',
  'tween-one',
  '@babel',
  '@ant-design',
  '@rc-component',
];

const ignoreList = [];

// cnpm use `_` as prefix
['', '_'].forEach(prefix => {
  compileModules.forEach(module => {
    ignoreList.push(`${prefix}${module}`);
  });
});

module.exports = {
  transformIgnorePatterns: [`/node_modules/(?!${ignoreList.join('|')})[^/]+?/(?!(es)/)`],
};
