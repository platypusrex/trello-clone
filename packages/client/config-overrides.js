const {
  override,
  addBabelPlugin,
  fixBabelImports
} = require('customize-cra');

module.exports = override(
  addBabelPlugin(['emotion', { "sourceMap": true }]),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  })
);

