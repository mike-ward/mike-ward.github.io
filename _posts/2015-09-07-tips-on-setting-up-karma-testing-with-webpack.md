---
layout: post  
title: "Tips on Setting up Karma Testing with Webpack"
---

Despite the plethora of examples on using Karma with Webpack, I struggled to get
things working. Afterwards, I realized there were a few key bits of information
that were either glossed over or not emphasized enough (for me to notice).

Once I did figure it out, my `karma.config.js` file became smaller and easier to
understand. For reference, here's my final `karma.config.js` file:

    var webpackConfig = require('./webpack.config.js');
    webpackConfig.entry = {};

    module.exports = function(config) {
      config.set({
        basePath: '',
        frameworks: ['jasmine', 'chai'],

        reporters: ['progress'],
        port: 9876,
        colors: false,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        autoWatchBatchDelay: 300,

        files: [
          './app/bundle.js',
          './node_modules/angular-mocks/angular-mocks.js',
          './tests/**/*.js'],

        preprocessors: {
          './app/bundle.js': ['webpack'],      
          './tests/**/*.spec.js': ['babel']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
          noInfo: true
        }
      });
    }

First, make sure `karma-webpack` is installed in the project.

    npm install karma-webpack --save-dev

### Tip 1 - Reference webpack.config.js, don't repeat it.

Most of the examples I could find repeat the `webpack.config.js` in the
`karma.config.js` file. I don't like having the same configuration in different
files. However, Karma is running in Node so it's quite acceptable to simply
import the configuration as I did in the first two lines.

    var webpackConfig = require('./webpack.config.js');
    webpackConfig.entry = {};

But here's a gotcha. The entry point from the referenced Webpack configuration
has to be removed or tests will fail in weird and inscrutable ways. Easy enough,
just define an empty `entry` object (`null` won't work).

Finally, reference the Webpack configuration in the Karma configuration:

    webpack: webpackConfig,

### Tip 2 - Specify the entry point in Karma

    preprocessors: {
      './app/bundle.js': ['webpack'],      
      './tests/**/*.spec.js': ['babel']
    },

In the preprocessors portion, add the application's entry point. Here
`'./app/bundle.js'` is the entry point to my Web application. It's the same one
I used in `Webpack.config.js`. The `karama-webpack` plugin requires this. It's
documented but the part about removing the `webpack.config.js` entry point is
not as evident.

Secondly, you have to tell Karma that you want the `karma-webpack` plugin to
process these files. That's what `['webpack']` does.

### Tip 3 - Do not enumerate plugins

The plugins section is missing from my `karma.config.js` file. When missing,
Karma will load any plugins it can find in the `node-modules` folder. Much
simpler in my opinion.

### Tip - Write tests in ES6

Writing tests in ES6 is better. Or at least if feels that way to me (it's also
feels better in application code as well). You'll need to install the Babel
preprocessor.

`npm install karma-babel-preprocessor --save-dev`

The `karma-babel-preprocessor` has additional configuration sections that I was
instructed to add. In my case, I didn't need it and simply referenced the
`['babel']` preprocessor as above.

To use ES6 in my application code, I configured it in my `webpack.config.js` (a
subject of another post perhaps).
