'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export tachacoincore-lib', function() {
    var tachacoincore = require('../');
    should.exist(tachacoincore.lib);
    should.exist(tachacoincore.lib.Transaction);
    should.exist(tachacoincore.lib.Block);
  });
});
