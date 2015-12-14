//
// Created by alykoshin on 9/3/14.
//

/* globals describe, before, beforeEach, afterEach, after, it */

'use strict';

var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();


var Emitter = require('../index.js');

describe('mini-emitter', function () {

  before('before', function () {

  });

  beforeEach('before', function () {

  });

  afterEach('after', function () {

  });

  after('after', function () {

  });

  it('should have pass multiple parameters', function (done) {
    var obj = {};
    Emitter(obj);

    obj.on('event1', function(p1, p2, p3) {
      if (p1 === 'p1' && p2 === 'p2' && p3 === 'p3') {
        done();
      } else {
        throw 'Parameters were not passed correctly';
      }
    });

    obj.emit('event1', 'p1', 'p2', 'p3');

  });

  it('should support multiple handlers', function (done) {
    var obj = {};
    Emitter(obj);
    var n = 1;
    obj.on('event1', function() { n++; });
    obj.on('event1', function() { if (n === 2) { done(); } else {throw 'multiple handler order fail: 1='+n; } });
    obj.emit('event1');
  });

  it('should keep order of multiple event handlers', function (done) {
    var obj = {};
    Emitter(obj);
    var n = 1;
    obj.on('event1', function() { if (n === 1) { n++; } else {throw 'multiple handler order fail: 1='+n; } } );
    obj.on('event1', function() { if (n === 2) { n++; } else {throw 'multiple handler order fail: 2='+n; } } );
    obj.on('event1', function() { if (n === 3) { n++; done(); } else {throw 'multiple handler order fail: 3='+n; } } );
    obj.emit('event1');
  });

  it('should switch off event (1)', function (done) {
    var obj = {};
    Emitter(obj);
    obj.on('event1', function() { throw 'received event while it must be switched off' } );
    obj.off('event1');
    obj.emit('event1');
    done();
  });

  it('should switch off event (2)', function (done) {
    var obj = {};
    Emitter(obj);
    var n = 1;
    obj.on('event1', function(num) {
      if (n===1 && num===1) { n++; }
      //else if (n!==2 || num!==2) { n++; done(); }
      else {throw 'received event while it must be switched off: n='+n+', num='+num; }
    });
    obj.emit('event1', 1);
    obj.off('event1');
    obj.emit('event1', 2);
    done();
  });

  it('should support wildcards', function (done) {
    var obj = {};
    Emitter(obj);
    var n1 = 1,
        n2 = 1;
    obj.on('abc*',    function(p) { if (n1===1 && p==='abc') { n1++; } else {t.fail('wildcard fail: abc='+p)} } );
    obj.on('def*',    function(p) { if (n2===1 && p==='def') { n2++; } else {t.fail('wildcard fail: def='+p)} } );
    obj.emit('abc1', 'abc');
    obj.emit('def2', 'def');
    obj.off('abc*');
    obj.off('def*');
    obj.emit('abc1', 'no such event: abc1');
    obj.emit('def2', 'no such event: def2');
    done();
  });

});
