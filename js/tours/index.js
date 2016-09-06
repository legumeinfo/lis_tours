// All tours must be require() here for the webpack bundler to be able
// to find the modules at compile time. Each tour should register()
// itself with lisTours. It seems there should be a way to not have to
// maintain this index.js, maybe with require.context? But for now
// this is required.

require('./germplasm-map.js');
