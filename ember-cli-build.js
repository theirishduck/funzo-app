/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    minifyJS: {
      enabled: false
    },
    minifyCSS: {
      enabled: false
    },
    fingerprint: {
      exclude: ['courses']
    },
    jscsOptions: {
      enabled: true
    },
    sassOptions: {
      includePaths: [
        'bower_components/bootstrap-sass/assets/stylesheets',
        'bower_components/bootstrap-material-design/sass'
      ]
    }
  });

  var course = new Funnel('bower_components', {
    include: ['funzo-*/**'],
    destDir: 'courses/'
  });

  // app.import('bower_components/materialize/dist/css/materialize.css');
  app.import('bower_components/tincan/build/tincan.js');

  // app.import('bower_components/Materialize/dist/js/materialize.js');
  app.import('bower_components/bootstrap/dist/js/bootstrap.js');
  app.import('bower_components/bootstrap-material-design/dist/js/material.js');
  app.import('bower_components/bootstrap-material-design/dist/js/ripples.js');

  app.import('bower_components/Materialize/font/roboto/Roboto-Regular.woff2');
  app.import('bower_components/Materialize/font/roboto/Roboto-Regular.woff');
  app.import('bower_components/Materialize/font/roboto/Roboto-Regular.ttf');
  app.import('bower_components/Materialize/font/roboto/Roboto-Light.woff2');
  app.import('bower_components/Materialize/font/roboto/Roboto-Light.woff');
  app.import('bower_components/Materialize/font/roboto/Roboto-Light.ttf');

  app.import('bower_components/h5p-standalone/dist/js/h5p-standalone-main.js');

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  // return app.toTree();
  // return app.toTree();
  return mergeTrees([app.toTree(), course]);
};
