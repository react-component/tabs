module.exports = function(webpackConfig) {
  if (process.env.DEMO_ENV === 'preact') {
    webpackConfig.resolve.alias = Object.assign(webpackConfig.resolve.alias, {
        'react': 'preact-compat',
        'react-dom': 'preact-compat',
        // Not necessary unless you consume a module using `createClass`
        'create-react-class': 'preact-compat/lib/create-react-class'
    });
  }
  return webpackConfig;
}
