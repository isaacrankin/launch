'use strict';

var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

var ExampleModule = require('./tmp/lib/example-module.js').default;

describe('ExampleModule', function() {
  var exMod = new ExampleModule();
  describe('hello', function() {
    it('should return hello world', function() {
      assert.equal('Hello world!', exMod.hello('world!'));
    });
  });
});
