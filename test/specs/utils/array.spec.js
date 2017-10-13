"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var array_1 = require("../../../lib/utils/array");
/* tslint:disable:max-classes-per-file */
describe('utils', function () {
    describe('array', function () {
        describe('unique', function () {
            var duplicates = [1, 'a', 'b', 1, 'a', 'c', 2, 'd', 'b', 2, 3, 'd', 'b'];
            it('should not throw', function () {
                chai_1.expect(function () { return array_1.unique(duplicates); }).not.to.throw();
            });
            it('should remove duplicates from array', function () {
                var unified = array_1.unique(duplicates);
                chai_1.expect(unified).to.have.property('length', 7);
            });
        });
    });
});
//# sourceMappingURL=array.spec.js.map