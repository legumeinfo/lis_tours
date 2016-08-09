// All tours must be require() here for the webpack bundler to be able
// to find the modules at compile time. Each tour should register()
// itself with lisTours. It seems there should be a way to not have to
// maintain this index.js, maybe with require.context? But for now
// this is required.

require('./qtl-search-to-gbrowse.js');
require('./gene-to-phylotree-to-context-viewer.js');
require('./blast-demo.js');
require('./protein-domain.js');
require('./phylotree.js');
require('./germplasm-map.js');
