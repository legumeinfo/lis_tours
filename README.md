# lis_tours
Multi-page and dynamic bootstrap tours for legumeinfo.org and related websites

## Bootstrap tours

http://bootstraptour.com/

## Installation

Requires npm package manager (install nodejs)

    npm install # install all requirements from package.json
    npm install -g webpack # make this available on cli, by -g global flag
    
The entry point is js/index.js, so webpack can used like this:

    # build once
    webpack js/index.js build/bundle.js
    # build and watch for changes then rebuild
    webpack --watch js/index.js build/bundle.js 
    # show what files are being included in the bundle
    webpack -v --display-modules js/index.js build/bundle.js 
    # optimized bundle for production
    webpack -p --display-modules --optimize-minimize --optimize-dedupe js/index.js build/bundle.js 
    # etc.

Webpack will bundle up all the required javascript and css, into a single resource, build/bundle.js

## note: 

the file js/bootstrap-tour-loader.js is kind of a hack to insert a different jquery version than what is available in the global scope (because of idiotic drupal requirements for a very old jQuery).


