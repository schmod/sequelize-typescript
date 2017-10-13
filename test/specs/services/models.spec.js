"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var models_1 = require("../../../lib/services/models");
var Book_1 = require("../../models/Book");
var DataType_1 = require("../../../lib/enums/DataType");
/* tslint:disable:max-classes-per-file */
describe('services.models', function () {
    describe('resolveModelGetter', function () {
        var options = {
            a: function () { return Book_1.Book; },
            b: function () { return null; },
            c: {
                c1: function () { return Book_1.Book; },
                c2: function () { return null; }
            }
        };
        models_1.resolveModelGetter(options);
        it('should resolve getter', function () {
            chai_1.expect(options.a).to.be.equal(Book_1.Book);
            chai_1.expect(options.c.c1).to.be.equal(Book_1.Book);
        });
        it('should not resolve other functions', function () {
            chai_1.expect(options.b).to.be.a('function');
            chai_1.expect(options.c.c2).to.be.a('function');
        });
    });
    describe('addAttribute', function () {
        it('should not throw', function () {
            chai_1.expect(function () { return models_1.addAttribute({}, 'test', {}); }).to.not.throw();
        });
    });
    describe('getAttributes', function () {
        var target = {};
        var ATTRIBUTES = { name: { primaryKey: true }, age: { type: DataType_1.DataType.NUMBER } };
        models_1.setAttributes(target, ATTRIBUTES);
        it('should not return reference but copy of attributes', function () {
            var attributes = models_1.getAttributes(target);
            chai_1.expect(attributes).to.not.equal(ATTRIBUTES);
        });
    });
    describe('addAttributeOptions', function () {
        var target = {};
        var PROPERTY_NAME = 'test';
        var OPTIONS = { allowNull: true };
        models_1.addAttribute(target, PROPERTY_NAME, {});
        models_1.addAttributeOptions(target, PROPERTY_NAME, OPTIONS);
        it('should be able to retrieve added attribute options', function () {
            var attributes = models_1.getAttributes(target);
            chai_1.expect(Object.keys(attributes)).to.have.property('length', 1);
            chai_1.expect(Object.keys(attributes[PROPERTY_NAME])).to.have.property('length', Object.keys(OPTIONS).length);
            chai_1.expect(attributes).to.have.property(PROPERTY_NAME).that.eqls(OPTIONS);
        });
        it('should be able to retrieve added attribute options of prototype linked object', function () {
            var child = Object.create(target);
            var attributes = models_1.getAttributes(child);
            chai_1.expect(Object.keys(attributes)).to.have.property('length', 1);
            chai_1.expect(Object.keys(attributes[PROPERTY_NAME])).to.have.property('length', Object.keys(OPTIONS).length);
            chai_1.expect(attributes).to.have.property(PROPERTY_NAME).that.eqls(OPTIONS);
        });
        it('should add new options to child prototype but not parent one', function () {
            var child = Object.create(target);
            var NEW_OPTIONS = { primaryKey: true };
            models_1.addAttributeOptions(child, PROPERTY_NAME, NEW_OPTIONS);
            // for child
            var attributes = models_1.getAttributes(child);
            chai_1.expect(Object.keys(attributes)).to.have.property('length', 1);
            chai_1.expect(Object.keys(attributes[PROPERTY_NAME]))
                .to.have.property('length', Object.keys(OPTIONS).length + Object.keys(NEW_OPTIONS).length);
            chai_1.expect(attributes).to.have.property(PROPERTY_NAME).that.eqls(__assign({}, OPTIONS, NEW_OPTIONS));
            // for parent
            var parentAttributes = models_1.getAttributes(target);
            chai_1.expect(Object.keys(parentAttributes)).to.have.property('length', 1);
            chai_1.expect(Object.keys(parentAttributes[PROPERTY_NAME])).to.have.property('length', Object.keys(OPTIONS).length);
            chai_1.expect(parentAttributes).to.have.property(PROPERTY_NAME).that.eqls(OPTIONS);
        });
    });
});
//# sourceMappingURL=models.spec.js.map