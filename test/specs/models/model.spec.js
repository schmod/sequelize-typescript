"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Model_1 = require("../../../lib/models/Model");
describe('model', function () {
    describe('constructor', function () {
        it('should equal Model class', function () {
            chai_1.expect(Model_1.Model.prototype.constructor).to.equal(Model_1.Model);
        });
    });
});
//# sourceMappingURL=model.spec.js.map