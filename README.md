# lis_tours
Multi-page and dynamic  [bootstrap-tours](http://bootstraptour.com)  for legumeinfo.org and related websites

## Installation

Requires npm package manager (install nodejs)

    npm install # install all requirements from package.json
    npm install webpack -g # make this available on cli, by -g global flag

## Webpack usage

The [webpack module bundler] (https://webpack.github.io) is used to:

* sandbox the jquery version needed
* bundle all the css and javascript
* minify
* and lazy-load the required code unless a tour has been requested or is already in progress.

The core bundle.js is only ~2KB.

The webpack build config is in `webpack.config.js` so webpack can used like this:

    # build once
    webpack
    # rebuild upon any source file changes
    webpack --watch
    # build optimized bundle for production
    webpack -p --display-modules --optimize-minimize --optimize-dedupe

Webpack will bundle up all the required javascript and css, into a loader, `build/bundle.js`, and a chunk file `part-[hash].js`.

## Deploy to production

1. Remove `debug: true` from all the tour definitions if the property was set.
1. Ensure that only the required tours are added to `tours/index.js`
1. Commit and merge to master branch.
1. Run webpack with optimized flags (see above)
