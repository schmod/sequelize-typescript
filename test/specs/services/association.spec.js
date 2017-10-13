"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:max-classes-per-file */
var chai_1 = require("chai");
var association_1 = require("../../../lib/services/association");
var Model_1 = require("../../../lib/models/Model");
describe('service.association', function () {
    describe('addAssociation', function () {
        it('should add association to target metadata', function () {
            var target = {};
            var RELATION = 'hasMany';
            var AS_NAME = 'test';
            var RELATED_CLASS_GETTER = function () { return /** @class */ (function (_super) {
                __extends(T, _super);
                function T() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return T;
            }(Model_1.Model)); };
            association_1.addAssociation(target, RELATION, RELATED_CLASS_GETTER, AS_NAME);
            var associations = association_1.getAssociations(target);
            chai_1.expect(associations).to.have.property('length', 1);
            chai_1.expect(associations[0]).to.eql({
                relation: RELATION,
                options: {},
                through: undefined,
                throughClassGetter: undefined,
                as: AS_NAME,
                relatedClassGetter: RELATED_CLASS_GETTER,
            });
        });
        it('should add association to target metadata, but not parent', function () {
            var parent = {};
            var target = Object.create(parent);
            var RELATION = 'hasMany';
            var PARENT_RELATION = 'belongsToMany';
            var AS_NAME = 'test';
            var RELATED_CLASS_GETTER = function () { return /** @class */ (function (_super) {
                __extends(T, _super);
                function T() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return T;
            }(Model_1.Model)); };
            association_1.addAssociation(parent, PARENT_RELATION, RELATED_CLASS_GETTER, AS_NAME);
            association_1.addAssociation(target, RELATION, RELATED_CLASS_GETTER, AS_NAME);
            var associations = association_1.getAssociations(target);
            chai_1.expect(associations).to.have.property('length', 2);
            chai_1.expect(associations[0]).to.eql({
                relation: PARENT_RELATION,
                options: {},
                through: undefined,
                throughClassGetter: undefined,
                as: AS_NAME,
                relatedClassGetter: RELATED_CLASS_GETTER,
            });
            chai_1.expect(associations[1]).to.eql({
                relation: RELATION,
                options: {},
                through: undefined,
                throughClassGetter: undefined,
                as: AS_NAME,
                relatedClassGetter: RELATED_CLASS_GETTER,
            });
            var parentAssociations = association_1.getAssociations(parent);
            chai_1.expect(parentAssociations).to.have.property('length', 1);
            chai_1.expect(parentAssociations[0]).to.eql({
                relation: PARENT_RELATION,
                options: {},
                through: undefined,
                throughClassGetter: undefined,
                as: AS_NAME,
                relatedClassGetter: RELATED_CLASS_GETTER,
            });
        });
    });
    describe('addForeignKey', function () {
        it('should add foreign key to target metadata', function () {
            var target = {};
            var FOREIGN_KEY = 'testId';
            var RELATED_CLASS_GETTER = function () { return /** @class */ (function (_super) {
                __extends(T, _super);
                function T() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return T;
            }(Model_1.Model)); };
            association_1.addForeignKey(target, RELATED_CLASS_GETTER, FOREIGN_KEY);
            var foreignKeys = association_1.getForeignKeys(target);
            chai_1.expect(foreignKeys).to.have.property('length', 1);
            chai_1.expect(foreignKeys[0]).to.eql({
                foreignKey: FOREIGN_KEY,
                relatedClassGetter: RELATED_CLASS_GETTER,
            });
        });
        it('should add foreign key to target metadata, but not parent', function () {
            var parent = {};
            var target = Object.create(parent);
            var FOREIGN_KEY = 'testId';
            var PARENT_FOREIGN_KEY = 'parentTestId';
            var RELATED_CLASS_GETTER = function () { return /** @class */ (function (_super) {
                __extends(T, _super);
                function T() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return T;
            }(Model_1.Model)); };
            association_1.addForeignKey(parent, RELATED_CLASS_GETTER, PARENT_FOREIGN_KEY);
            association_1.addForeignKey(target, RELATED_CLASS_GETTER, FOREIGN_KEY);
            var foreignKeys = association_1.getForeignKeys(target);
            chai_1.expect(foreignKeys).to.have.property('length', 2);
            chai_1.expect(foreignKeys[0]).to.eql({
                foreignKey: PARENT_FOREIGN_KEY,
                relatedClassGetter: RELATED_CLASS_GETTER,
            });
            chai_1.expect(foreignKeys[1]).to.eql({
                foreignKey: FOREIGN_KEY,
                relatedClassGetter: RELATED_CLASS_GETTER,
            });
            var parentForeignKeys = association_1.getForeignKeys(parent);
            chai_1.expect(parentForeignKeys).to.have.property('length', 1);
            chai_1.expect(parentForeignKeys[0]).to.eql({
                foreignKey: PARENT_FOREIGN_KEY,
                relatedClassGetter: RELATED_CLASS_GETTER,
            });
        });
    });
});
//# sourceMappingURL=association.spec.js.map