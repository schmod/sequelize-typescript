"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var string_1 = require("../../../lib/utils/string");
/* tslint:disable:max-classes-per-file */
describe('utils', function () {
    describe('string', function () {
        describe('capitalize', function () {
            it('should not throw', function () {
                var value = 'abc';
                chai_1.expect(function () { return string_1.capitalize(value); }).not.to.throw();
            });
            it('should capitalize specified value', function () {
                var value = 'abc';
                chai_1.expect(string_1.capitalize(value)).to.equal('Abc');
            });
        });
    });
});
//# sourceMappingURL=string.spec.js.map