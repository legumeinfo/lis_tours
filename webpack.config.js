var path = require('path');

module.exports = {
  entry: {
    main: './js/index.js'
  },
  output: {
    path: path.join(__dirname, 'build/'),
    publicPath: 'sites/all/modules/lis_hopscotch_tours/build/',
    filename: 'bundle.js',
    chunkFilename: 'part-[chunkhash].js'
  }
}
