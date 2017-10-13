"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var DataType_1 = require("../../../lib/enums/DataType");
var data_type_1 = require("../../../lib/utils/data-type");
/* tslint:disable:max-classes-per-file */
describe('utils', function () {
    describe('data-type', function () {
        describe('isDataType', function () {
            it('should return true', function () {
                Object
                    .keys(DataType_1.DataType)
                    .forEach(function (key) {
                    if (key.toUpperCase() === key) {
                        chai_1.expect(data_type_1.isDataType(DataType_1.DataType[key])).to.be.true;
                    }
                });
                chai_1.expect(data_type_1.isDataType(DataType_1.DataType.STRING(55))).to.be.true;
                chai_1.expect(data_type_1.isDataType(DataType_1.DataType.ENUM('a', 'b'))).to.be.true;
            });
            it('should return false', function () {
                chai_1.expect(data_type_1.isDataType('abc')).to.be.false;
                chai_1.expect(data_type_1.isDataType(function () { })).to.be.false;
                chai_1.expect(data_type_1.isDataType(function () { return null; })).to.be.false;
                chai_1.expect(data_type_1.isDataType({})).to.be.false;
            });
        });
        describe('inferDataType', function () {
            it('should return appropriate sequelize data type', function () {
                chai_1.expect(data_type_1.inferDataType(Number)).to.equal(DataType_1.DataType.INTEGER);
                chai_1.expect(data_type_1.inferDataType(Boolean)).to.equal(DataType_1.DataType.BOOLEAN);
                chai_1.expect(data_type_1.inferDataType(Date)).to.equal(DataType_1.DataType.DATE);
                chai_1.expect(data_type_1.inferDataType(String)).to.equal(DataType_1.DataType.STRING);
            });
            it('should return undefined', function () {
                chai_1.expect(data_type_1.inferDataType('abc')).to.be.undefined;
                chai_1.expect(data_type_1.inferDataType(function () { })).to.be.undefined;
                chai_1.expect(data_type_1.inferDataType(function () { return null; })).to.be.undefined;
                chai_1.expect(data_type_1.inferDataType({})).to.be.undefined;
                chai_1.expect(data_type_1.inferDataType(/** @class */ (function () {
                    function hey() {
                    }
                    return hey;
                }()))).to.be.undefined;
            });
        });
    });
});
//# sourceMappingURL=data-type.spec.js.map