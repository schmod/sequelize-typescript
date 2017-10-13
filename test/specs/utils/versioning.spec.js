"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var versioning_1 = require("../../../lib/utils/versioning");
/* tslint:disable:max-classes-per-file */
describe('utils', function () {
    describe('versioning', function () {
        describe('version', function () {
            it('should be a string', function () {
                chai_1.expect(versioning_1.version).to.be.a('string');
            });
        });
        describe('majorVersion', function () {
            it('should be a number', function () {
                chai_1.expect(versioning_1.majorVersion).to.be.a('number');
            });
        });
    });
});
//# sourceMappingURL=versioning.spec.js.map