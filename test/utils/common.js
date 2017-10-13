"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
/**
 * Compares instance with expected values
 */
function assertInstance(instance, expectedValues) {
    if (Array.isArray(expectedValues)) {
        chai_1.expect(instance).to.have.property('length', expectedValues.length);
        return instance.forEach(function (_instance, i) { return assertInstance(_instance, expectedValues[i]); });
    }
    chai_1.expect(instance)
        .to.have.property('id')
        .that.is.not.null;
    Object
        .keys(expectedValues)
        .forEach(function (key) {
        var value = instance[key];
        var expectedValue = expectedValues[key];
        chai_1.expect(instance).to.have.property(key)
            .that.is.not.null.and.not.undefined;
        if (typeof expectedValue === 'object') {
            assertInstance(value, expectedValue);
        }
        else {
            chai_1.expect(instance).to.have.property(key, expectedValue);
        }
    });
}
exports.assertInstance = assertInstance;
/**
 * Checks if specified value contains es6 syntax or not;
 * @returns true if it contains es6 syntax
 */
function containsEs6Syntax(value) {
    // tslint:disable:max-line-length
    var ES6_SYNTAX_REGEX = /(^class | class )|(^const | const )|(^let | let )|(^async | async )|(^await | await )|(^yield | yield )|(=>)|function\*|\`/gm;
    return ES6_SYNTAX_REGEX.test(value
        .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '') // remove /** */ and /* */ // comments
        .replace(/(["'])(?:(?=(\\?))\2.)*?\1/gm, '') // remove all quotes
    );
}
exports.containsEs6Syntax = containsEs6Syntax;
//# sourceMappingURL=common.js.map