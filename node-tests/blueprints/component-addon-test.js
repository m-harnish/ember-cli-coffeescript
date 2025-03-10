'use strict';

var blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
var setupTestHooks = blueprintHelpers.setupTestHooks;
var emberNew = blueprintHelpers.emberNew;
var emberGenerateDestroy = blueprintHelpers.emberGenerateDestroy;

var expect = require('ember-cli-blueprint-test-helpers/chai').expect;

describe('Acceptance: ember generate and destroy component-addon', function() {
  setupTestHooks(this);

  it('component-addon foo-bar', function() {
    var args = ['component-addon', 'foo-bar'];

    return emberNew({target: 'addon'})
      .then(() => emberGenerateDestroy(args, (file) => {
        var componentFile = file('app/components/foo-bar.js');

        expect(componentFile)
          .to.contain("export { default } from 'my-addon/components/foo-bar';");
    }));
  });
});
