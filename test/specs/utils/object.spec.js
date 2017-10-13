"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var object_1 = require("../../../lib/utils/object");
/* tslint:disable:max-classes-per-file */
describe('utils', function () {
    describe('object', function () {
        describe('deepAssign', function () {
            var childSourceF = {};
            var childSourceA = { f: childSourceF };
            var childSourceB = {};
            var source1 = { a: childSourceA, b: childSourceB, c: 1, d: 'd', over: 'ride', regex: /reg/gim, notNull: null };
            var source2 = { e: 'für elisa', g: function () { return null; }, arr: [{ h: 1 }, {}, 'e'], over: 'ridden', nullable: null, notNull: 'notNull' };
            var sourceKeys = [].concat(Object.keys(source1), Object.keys(source2));
            it('should not be undefined', function () {
                var copy = object_1.deepAssign({}, source1, source2);
                chai_1.expect(copy).not.to.be.undefined;
            });
            it('should have all keys of sources', function () {
                var copy = object_1.deepAssign({}, source1, source2);
                sourceKeys
                    .forEach(function (key) { return chai_1.expect(copy).to.have.property(key); });
            });
            it('should override previous properties', function () {
                var copy = object_1.deepAssign({}, source1, source2);
                chai_1.expect(copy).to.have.property('over', 'ridden');
            });
            it('should have all primitive & function values of sources', function () {
                var copy = object_1.deepAssign({}, source1, source2);
                sourceKeys
                    .forEach(function (key) {
                    if (typeof copy[key] !== 'object') {
                        chai_1.expect(copy[key]).to.equal(source2[key] || source1[key]);
                    }
                });
            });
            it('should have copies of all non-primitive values of sources', function () {
                var copy = object_1.deepAssign({}, source1, source2);
                sourceKeys
                    .forEach(function (key) {
                    if (typeof copy[key] === 'object' && copy[key] !== null) {
                        chai_1.expect(copy[key]).not.to.equal(source1[key] || source2[key]);
                        chai_1.expect(copy[key]).to.eql(source1[key] || source2[key]);
                    }
                });
            });
            it('should have copies of child source', function () {
                var copy = object_1.deepAssign({}, source1, source2);
                chai_1.expect(copy.a).to.have.property('f');
                chai_1.expect(copy.a.f).to.not.equal(source1.a.f);
                chai_1.expect(copy.a.f).to.eql(source1.a.f);
            });
            it('should have copy of array items', function () {
                var copy = object_1.deepAssign({}, source1, source2);
                chai_1.expect(copy.arr).to.be.an('array');
                copy.arr.forEach(function (value, index) {
                    var isObject = typeof value === 'object';
                    if (isObject) {
                        chai_1.expect(value).not.to.equal(source2.arr[index]);
                        chai_1.expect(value).to.eql(source2.arr[index]);
                    }
                    else {
                        chai_1.expect(value).to.equal(source2.arr[index]);
                    }
                });
            });
            it('should have copy of nullable', function () {
                var copy = object_1.deepAssign({}, source1, source2);
                chai_1.expect(copy.nullable).to.equals(null);
                chai_1.expect(copy.notNull).to.not.equals(null);
            });
            it('should keep prototype chain', function () {
                var Test = /** @class */ (function () {
                    function Test() {
                    }
                    Test.prototype.protoFn = function () { };
                    return Test;
                }());
                var copy = object_1.deepAssign({}, { test: new Test() });
                chai_1.expect(copy.test)
                    .to.have.property('protoFn')
                    .that.is.a('function');
            });
        });
    });
});
//# sourceMappingURL=object.spec.js.map