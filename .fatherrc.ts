export default {
  esm: {
    type: 'babel',
    importLibToEs: true,
  },
  cjs: {
    type: 'babel',
    lazy: true,
  },
  extraExternals: [
    'prop-types',
    'path-to-regexp',
    'rc-picker',
    'rc-util',
    'rc-table',
  ],
  extractCSS: true,
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      { libraryName: 'antd', libraryDirectory: 'es', style: true },
      'antd',
    ],
  ],
};
