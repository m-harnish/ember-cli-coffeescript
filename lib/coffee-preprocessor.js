var coffee = require('@eflexsystems/broccoli-coffee');
var coffeelintTree = require('./coffee-linter');
var fs = require('fs');

function CoffeePreprocessor(options) {
  this.name = 'ember-cli-coffeescript';
  this.options = options || {};
}

CoffeePreprocessor.prototype.ext = coffee.prototype.extensions;

CoffeePreprocessor.prototype.toTree = function(tree, inputPath, outputPath) {

  if(this.options.lint || (this.options.lint !== false && fs.existsSync("./coffeelint.json"))){
    tree = coffeelintTree(tree, this.options.lint);
  }

  var options = {
    bare: true,
    srcDir: inputPath,
    destDir: outputPath
  };
  return new coffee(tree, options);
};

module.exports = CoffeePreprocessor;
