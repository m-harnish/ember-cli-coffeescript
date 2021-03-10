'use strict';
var path      = require('path');
var defaults  = require('lodash.defaults');

var CoffeePreprocessor = require('./lib/coffee-preprocessor');

module.exports = {
  name: require('./package').name,

  getConfig: function() {
    var brocfileConfig = {};
    var coffeeOptions = defaults(this.project.configWithoutCache(process.env.EMBER_ENV).coffeeOptions || {},
      brocfileConfig, {
        blueprints: true
      });

    return coffeeOptions;
  },

  blueprintsPath: function() {
    if (this.getConfig().blueprints) {
      return path.join(__dirname, 'blueprints');
    }
  },

  setupPreprocessorRegistry: function(type, registry) {
    var plugin = new CoffeePreprocessor(this.getConfig());

    registry.add('js', plugin);
  },

  included: function(app) {
    this.app = app;
    this.setupPreprocessorRegistry('parent', app.registry);
  }
};
