var path = require('path');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');

module.exports = {
  entry: {
    main: './js/index.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    // the publicPath, unfortunately does not support relative
    // urls. this absolute path is required for webpack's lazy chunk
    // loading to work.
    publicPath: '/static/grin_app/js/node_modules/lis_tours/build/',
    filename: 'bundle.js',
    chunkFilename: 'part-[chunkhash].js'
  },
  plugins: [
    new WebpackCleanupPlugin()
  ]
}
