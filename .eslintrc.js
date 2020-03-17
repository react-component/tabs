const base = require('@umijs/fabric/dist/eslint');

module.exports = {
  ...base,
  rules: {
    ...base.rules,
    'react/sort-comp': 0,
    'react/no-array-index-key': 0,
    'react/no-access-state-in-setstate': 0,
    'no-plusplus': 0,
    'no-param-reassign': 0,
    'react/require-default-props': 0,
    'react/require-default-props': 0,
    'no-underscore-dangle': 0,
    'react/no-find-dom-node': 0,
    'no-mixed-operators': 0,
    'prefer-destructuring': 0,
    'react/no-unused-prop-types': 0,
    'max-len': 0,
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true, "optionalDependencies": false, "peerDependencies": false}],
    'brace-style': 0
  },
};
