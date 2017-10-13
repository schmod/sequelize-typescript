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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var OriginSequelize = require("sequelize");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var index_1 = require("../../../index");
var index_2 = require("../../../index");
var Hook_1 = require("../../models/Hook");
var sequelize_1 = require("../../utils/sequelize");
var expect = chai.expect;
chai.use(sinonChai);
describe('hook', function () {
    var sequelize = sequelize_1.createSequelize(false);
    beforeEach(function () {
        return sequelize.sync({ force: true });
    });
    it('should throw on non-static hooks', function () {
        expect(function () {
            var User = /** @class */ (function (_super) {
                __extends(User, _super);
                function User() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                User.prototype.nonStaticHookFunction = function () { };
                __decorate([
                    index_2.Column,
                    __metadata("design:type", String)
                ], User.prototype, "firstName", void 0);
                __decorate([
                    index_2.Column,
                    __metadata("design:type", String)
                ], User.prototype, "lastName", void 0);
                __decorate([
                    index_1.BeforeCreate,
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], User.prototype, "nonStaticHookFunction", null);
                User = __decorate([
                    index_2.Table
                ], User);
                return User;
            }(index_2.Model));
        }).to.throw(Error, /not a static method/);
    });
    it('should throw on methods with reserved names', function () {
        expect(function () {
            // tslint:disable-next-line:max-classes-per-file
            var User = /** @class */ (function (_super) {
                __extends(User, _super);
                function User() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                User.beforeCreate = function () { };
                __decorate([
                    index_2.Column,
                    __metadata("design:type", String)
                ], User.prototype, "firstName", void 0);
                __decorate([
                    index_2.Column,
                    __metadata("design:type", String)
                ], User.prototype, "lastName", void 0);
                __decorate([
                    index_1.BeforeCreate,
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], User, "beforeCreate", null);
                User = __decorate([
                    index_2.Table
                ], User);
                return User;
            }(index_2.Model));
        }).to.throw(Error, /name is reserved/);
    });
    it('should install all hooks', function () {
        var beforeValidateHookStub = sinon.stub(Hook_1.Hook, 'beforeValidateHook');
        var afterValidateHookStub = sinon.stub(Hook_1.Hook, 'afterValidateHook');
        var validationFailedHookStub = sinon.stub(Hook_1.Hook, 'validationFailedHook');
        var beforeCreateHookStub = sinon.stub(Hook_1.Hook, 'beforeCreateHook');
        var afterCreateHookStub = sinon.stub(Hook_1.Hook, 'afterCreateHook');
        var beforeDestroyHookStub = sinon.stub(Hook_1.Hook, 'beforeDestroyHook');
        var afterDestroyHookStub = sinon.stub(Hook_1.Hook, 'afterDestroyHook');
        var beforeRestoreHookStub = sinon.stub(Hook_1.Hook, 'beforeRestoreHook');
        var afterRestoreHookStub = sinon.stub(Hook_1.Hook, 'afterRestoreHook');
        var beforeUpdateHookStub = sinon.stub(Hook_1.Hook, 'beforeUpdateHook');
        var afterUpdateHookStub = sinon.stub(Hook_1.Hook, 'afterUpdateHook');
        var beforeBulkCreateHookStub = sinon.stub(Hook_1.Hook, 'beforeBulkCreateHook');
        var afterBulkCreateHookStub = sinon.stub(Hook_1.Hook, 'afterBulkCreateHook');
        var beforeBulkDestroyHookStub = sinon.stub(Hook_1.Hook, 'beforeBulkDestroyHook');
        var afterBulkDestroyHookStub = sinon.stub(Hook_1.Hook, 'afterBulkDestroyHook');
        var beforeBulkRestoreHookStub = sinon.stub(Hook_1.Hook, 'beforeBulkRestoreHook');
        var afterBulkRestoreHookStub = sinon.stub(Hook_1.Hook, 'afterBulkRestoreHook');
        var beforeBulkUpdateHookStub = sinon.stub(Hook_1.Hook, 'beforeBulkUpdateHook');
        var afterBulkUpdateHookStub = sinon.stub(Hook_1.Hook, 'afterBulkUpdateHook');
        var beforeFindHookStub = sinon.stub(Hook_1.Hook, 'beforeFindHook');
        var beforeFindAfterExpandIncludeAllHookStub = sinon.stub(Hook_1.Hook, 'beforeFindAfterExpandIncludeAllHook');
        var beforeFindAfterOptionsHookStub = sinon.stub(Hook_1.Hook, 'beforeFindAfterOptionsHook');
        var afterFindHookStub = sinon.stub(Hook_1.Hook, 'afterFindHook');
        var beforeCountHookStub = sinon.stub(Hook_1.Hook, 'beforeCountHook');
        // these hooks are aliases for the equivalent “destroy” hooks
        var beforeDeleteHookStub = sinon.stub(Hook_1.Hook, 'beforeDeleteHook');
        var afterDeleteHookStub = sinon.stub(Hook_1.Hook, 'afterDeleteHook');
        var beforeBulkDeleteHookStub = sinon.stub(Hook_1.Hook, 'beforeBulkDeleteHook');
        var afterBulkDeleteHookStub = sinon.stub(Hook_1.Hook, 'afterBulkDeleteHook');
        // some hooks are only available in Sequelize v4
        var beforeSaveHookStub;
        var afterSaveHookStub;
        var beforeUpsertHookStub;
        var afterUpsertHookStub;
        if (OriginSequelize['version'].split('.')[0] === '4') {
            beforeSaveHookStub = sinon.stub(Hook_1.Hook, 'beforeSaveHook');
            afterSaveHookStub = sinon.stub(Hook_1.Hook, 'afterSaveHook');
            beforeUpsertHookStub = sinon.stub(Hook_1.Hook, 'beforeUpsertHook');
            afterUpsertHookStub = sinon.stub(Hook_1.Hook, 'afterUpsertHook');
        }
        var beforeValidateHookWithNameStub = sinon.stub(Hook_1.Hook, 'beforeValidateHookWithName');
        var afterValidateHookWithNameStub = sinon.stub(Hook_1.Hook, 'afterValidateHookWithName');
        var validationFailedHookWithNameStub = sinon.stub(Hook_1.Hook, 'validationFailedHookWithName');
        var beforeCreateHookWithNameStub = sinon.stub(Hook_1.Hook, 'beforeCreateHookWithName');
        var afterCreateHookWithNameStub = sinon.stub(Hook_1.Hook, 'afterCreateHookWithName');
        var beforeDestroyHookWithNameStub = sinon.stub(Hook_1.Hook, 'beforeDestroyHookWithName');
        var afterDestroyHookWithNameStub = sinon.stub(Hook_1.Hook, 'afterDestroyHookWithName');
        var beforeRestoreHookWithNameStub = sinon.stub(Hook_1.Hook, 'beforeRestoreHookWithName');
        var afterRestoreHookWithNameStub = sinon.stub(Hook_1.Hook, 'afterRestoreHookWithName');
        var beforeUpdateHookWithNameStub = sinon.stub(Hook_1.Hook, 'beforeUpdateHookWithName');
        var afterUpdateHookWithNameStub = sinon.stub(Hook_1.Hook, 'afterUpdateHookWithName');
        var beforeBulkCreateHookWithNameStub = sinon.stub(Hook_1.Hook, 'beforeBulkCreateHookWithName');
        var afterBulkCreateHookWithNameStub = sinon.stub(Hook_1.Hook, 'afterBulkCreateHookWithName');
        var beforeBulkDestroyHookWithNameStub = sinon.stub(Hook_1.Hook, 'beforeBulkDestroyHookWithName');
        var afterBulkDestroyHookWithNameStub = sinon.stub(Hook_1.Hook, 'afterBulkDestroyHookWithName');
        var beforeBulkRestoreHookWithNameStub = sinon.stub(Hook_1.Hook, 'beforeBulkRestoreHookWithName');
        var afterBulkRestoreHookWithNameStub = sinon.stub(Hook_1.Hook, 'afterBulkRestoreHookWithName');
        var beforeBulkUpdateHookWithNameStub = sinon.stub(Hook_1.Hook, 'beforeBulkUpdateHookWithName');
        var afterBulkUpdateHookWithNameStub = sinon.stub(Hook_1.Hook, 'afterBulkUpdateHookWithName');
        var beforeFindHookWithNameStub = sinon.stub(Hook_1.Hook, 'beforeFindHookWithName');
        var beforeFindAfterExpandIncludeAllHookWithNameStub = sinon.stub(Hook_1.Hook, 'beforeFindAfterExpandIncludeAllHookWithName');
        var beforeFindAfterOptionsHookWithNameStub = sinon.stub(Hook_1.Hook, 'beforeFindAfterOptionsHookWithName');
        var afterFindHookWithNameStub = sinon.stub(Hook_1.Hook, 'afterFindHookWithName');
        var beforeCountHookWithNameStub = sinon.stub(Hook_1.Hook, 'beforeCountHookWithName');
        // these hooks are aliases for the equivalent “destroy” hooks
        var beforeDeleteHookWithNameStub = sinon.stub(Hook_1.Hook, 'beforeDeleteHookWithName');
        var afterDeleteHookWithNameStub = sinon.stub(Hook_1.Hook, 'afterDeleteHookWithName');
        var beforeBulkDeleteHookWithNameStub = sinon.stub(Hook_1.Hook, 'beforeBulkDeleteHookWithName');
        var afterBulkDeleteHookWithNameStub = sinon.stub(Hook_1.Hook, 'afterBulkDeleteHookWithName');
        // some hooks are only available in Sequelize v4
        var beforeSaveHookWithNameStub;
        var afterSaveHookWithNameStub;
        var beforeUpsertHookWithNameStub;
        var afterUpsertHookWithNameStub;
        if (OriginSequelize['version'].split('.')[0] === '4') {
            beforeSaveHookWithNameStub = sinon.stub(Hook_1.Hook, 'beforeSaveHookWithName');
            afterSaveHookWithNameStub = sinon.stub(Hook_1.Hook, 'afterSaveHookWithName');
            beforeUpsertHookWithNameStub = sinon.stub(Hook_1.Hook, 'beforeUpsertHookWithName');
            afterUpsertHookWithNameStub = sinon.stub(Hook_1.Hook, 'afterUpsertHookWithName');
        }
        sequelize.addModels([Hook_1.Hook]);
        // Sequelize provides no public API to retrieve existing hooks. We are relying on an
        // implementation detail: that the addHook method works by adding the specified
        // function to the Model’s options.hooks object.
        //
        // We are not testing that the hooks are called: that’s in Sequelize’s domain. Our job
        // is to ensure that the hooks are installed.
        expect(Hook_1.Hook['options'].hooks['beforeValidate']).to.include(beforeValidateHookStub);
        expect(Hook_1.Hook['options'].hooks['afterValidate']).to.include(afterValidateHookStub);
        expect(Hook_1.Hook['options'].hooks['validationFailed']).to.include(validationFailedHookStub);
        expect(Hook_1.Hook['options'].hooks['beforeCreate']).to.include(beforeCreateHookStub);
        expect(Hook_1.Hook['options'].hooks['afterCreate']).to.include(afterCreateHookStub);
        expect(Hook_1.Hook['options'].hooks['beforeDestroy']).to.include(beforeDestroyHookStub);
        expect(Hook_1.Hook['options'].hooks['afterDestroy']).to.include(afterDestroyHookStub);
        expect(Hook_1.Hook['options'].hooks['beforeRestore']).to.include(beforeRestoreHookStub);
        expect(Hook_1.Hook['options'].hooks['afterRestore']).to.include(afterRestoreHookStub);
        expect(Hook_1.Hook['options'].hooks['beforeUpdate']).to.include(beforeUpdateHookStub);
        expect(Hook_1.Hook['options'].hooks['afterUpdate']).to.include(afterUpdateHookStub);
        expect(Hook_1.Hook['options'].hooks['beforeBulkCreate']).to.include(beforeBulkCreateHookStub);
        expect(Hook_1.Hook['options'].hooks['afterBulkCreate']).to.include(afterBulkCreateHookStub);
        expect(Hook_1.Hook['options'].hooks['beforeBulkDestroy']).to.include(beforeBulkDestroyHookStub);
        expect(Hook_1.Hook['options'].hooks['afterBulkDestroy']).to.include(afterBulkDestroyHookStub);
        expect(Hook_1.Hook['options'].hooks['beforeBulkRestore']).to.include(beforeBulkRestoreHookStub);
        expect(Hook_1.Hook['options'].hooks['afterBulkRestore']).to.include(afterBulkRestoreHookStub);
        expect(Hook_1.Hook['options'].hooks['beforeBulkUpdate']).to.include(beforeBulkUpdateHookStub);
        expect(Hook_1.Hook['options'].hooks['afterBulkUpdate']).to.include(afterBulkUpdateHookStub);
        expect(Hook_1.Hook['options'].hooks['beforeFind']).to.include(beforeFindHookStub);
        expect(Hook_1.Hook['options'].hooks['beforeFindAfterExpandIncludeAll']).to.include(beforeFindAfterExpandIncludeAllHookStub);
        expect(Hook_1.Hook['options'].hooks['beforeFindAfterOptions']).to.include(beforeFindAfterOptionsHookStub);
        expect(Hook_1.Hook['options'].hooks['afterFind']).to.include(afterFindHookStub);
        expect(Hook_1.Hook['options'].hooks['beforeCount']).to.include(beforeCountHookStub);
        expect(Hook_1.Hook['options'].hooks['beforeDestroy']).to.include(beforeDeleteHookStub);
        expect(Hook_1.Hook['options'].hooks['afterDestroy']).to.include(afterDeleteHookStub);
        expect(Hook_1.Hook['options'].hooks['beforeBulkDestroy']).to.include(beforeBulkDeleteHookStub);
        expect(Hook_1.Hook['options'].hooks['afterBulkDestroy']).to.include(afterBulkDeleteHookStub);
        if (OriginSequelize['version'].split('.')[0] === '4') {
            expect(Hook_1.Hook['options'].hooks['beforeSave']).to.include(beforeSaveHookStub);
            expect(Hook_1.Hook['options'].hooks['afterSave']).to.include(afterSaveHookStub);
            expect(Hook_1.Hook['options'].hooks['beforeUpsert']).to.include(beforeUpsertHookStub);
            expect(Hook_1.Hook['options'].hooks['afterUpsert']).to.include(afterUpsertHookStub);
        }
        // Named hooks
        expect(Hook_1.Hook['options'].hooks['beforeValidate'])
            .to.include({ name: 'myBeforeValidateHook', fn: beforeValidateHookWithNameStub });
        expect(Hook_1.Hook['options'].hooks['afterValidate'])
            .to.include({ name: 'myAfterValidateHook', fn: afterValidateHookWithNameStub });
        expect(Hook_1.Hook['options'].hooks['validationFailed'])
            .to.include({ name: 'myValidationFailedHook', fn: validationFailedHookWithNameStub });
        expect(Hook_1.Hook['options'].hooks['beforeCreate'])
            .to.include({ name: 'myBeforeCreateHook', fn: beforeCreateHookWithNameStub });
        expect(Hook_1.Hook['options'].hooks['afterCreate'])
            .to.include({ name: 'myAfterCreateHook', fn: afterCreateHookWithNameStub });
        expect(Hook_1.Hook['options'].hooks['beforeDestroy'])
            .to.include({ name: 'myBeforeDestroyHook', fn: beforeDestroyHookWithNameStub });
        expect(Hook_1.Hook['options'].hooks['afterDestroy'])
            .to.include({ name: 'myAfterDestroyHook', fn: afterDestroyHookWithNameStub });
        expect(Hook_1.Hook['options'].hooks['beforeRestore'])
            .to.include({ name: 'myBeforeRestoreHook', fn: beforeRestoreHookWithNameStub });
        expect(Hook_1.Hook['options'].hooks['afterRestore'])
            .to.include({ name: 'myAfterRestoreHook', fn: afterRestoreHookWithNameStub });
        expect(Hook_1.Hook['options'].hooks['beforeUpdate'])
            .to.include({ name: 'myBeforeUpdateHook', fn: beforeUpdateHookWithNameStub });
        expect(Hook_1.Hook['options'].hooks['afterUpdate'])
            .to.include({ name: 'myAfterUpdateHook', fn: afterUpdateHookWithNameStub });
        expect(Hook_1.Hook['options'].hooks['beforeBulkCreate'])
            .to.include({ name: 'myBeforeBulkCreateHook', fn: beforeBulkCreateHookWithNameStub });
        expect(Hook_1.Hook['options'].hooks['afterBulkCreate'])
            .to.include({ name: 'myAfterBulkCreateHook', fn: afterBulkCreateHookWithNameStub });
        expect(Hook_1.Hook['options'].hooks['beforeBulkDestroy'])
            .to.include({ name: 'myBeforeBulkDestroyHook', fn: beforeBulkDestroyHookWithNameStub });
        expect(Hook_1.Hook['options'].hooks['afterBulkDestroy'])
            .to.include({ name: 'myAfterBulkDestroyHook', fn: afterBulkDestroyHookWithNameStub });
        expect(Hook_1.Hook['options'].hooks['beforeBulkRestore'])
            .to.include({ name: 'myBeforeBulkRestoreHook', fn: beforeBulkRestoreHookWithNameStub });
        expect(Hook_1.Hook['options'].hooks['afterBulkRestore'])
            .to.include({ name: 'myAfterBulkRestoreHook', fn: afterBulkRestoreHookWithNameStub });
        expect(Hook_1.Hook['options'].hooks['beforeBulkUpdate'])
            .to.include({ name: 'myBeforeBulkUpdateHook', fn: beforeBulkUpdateHookWithNameStub });
        expect(Hook_1.Hook['options'].hooks['afterBulkUpdate'])
            .to.include({ name: 'myAfterBulkUpdateHook', fn: afterBulkUpdateHookWithNameStub });
        expect(Hook_1.Hook['options'].hooks['beforeFind'])
            .to.include({ name: 'myBeforeFindHook', fn: beforeFindHookWithNameStub });
        expect(Hook_1.Hook['options'].hooks['beforeFindAfterExpandIncludeAll'])
            .to.include({ name: 'myBeforeFindAfterExpandIncludeAllHook', fn: beforeFindAfterExpandIncludeAllHookWithNameStub });
        expect(Hook_1.Hook['options'].hooks['beforeFindAfterOptions'])
            .to.include({ name: 'myBeforeFindAfterOptionsHook', fn: beforeFindAfterOptionsHookWithNameStub });
        expect(Hook_1.Hook['options'].hooks['afterFind'])
            .to.include({ name: 'myAfterFindHook', fn: afterFindHookWithNameStub });
        expect(Hook_1.Hook['options'].hooks['beforeCount'])
            .to.include({ name: 'myBeforeCountHook', fn: beforeCountHookWithNameStub });
        expect(Hook_1.Hook['options'].hooks['beforeDestroy'])
            .to.include({ name: 'myBeforeDeleteHook', fn: beforeDeleteHookWithNameStub });
        expect(Hook_1.Hook['options'].hooks['afterDestroy'])
            .to.include({ name: 'myAfterDeleteHook', fn: afterDeleteHookWithNameStub });
        expect(Hook_1.Hook['options'].hooks['beforeBulkDestroy'])
            .to.include({ name: 'myBeforeBulkDeleteHook', fn: beforeBulkDeleteHookWithNameStub });
        expect(Hook_1.Hook['options'].hooks['afterBulkDestroy'])
            .to.include({ name: 'myAfterBulkDeleteHook', fn: afterBulkDeleteHookWithNameStub });
        if (OriginSequelize['version'].split('.')[0] === '4') {
            expect(Hook_1.Hook['options'].hooks['beforeSave'])
                .to.include({ name: 'myBeforeSaveHook', fn: beforeSaveHookWithNameStub });
            expect(Hook_1.Hook['options'].hooks['afterSave'])
                .to.include({ name: 'myAfterSaveHook', fn: afterSaveHookWithNameStub });
            expect(Hook_1.Hook['options'].hooks['beforeUpsert'])
                .to.include({ name: 'myBeforeUpsertHook', fn: beforeUpsertHookWithNameStub });
            expect(Hook_1.Hook['options'].hooks['afterUpsert'])
                .to.include({ name: 'myAfterUpsertHook', fn: afterUpsertHookWithNameStub });
        }
    });
});
//# sourceMappingURL=hooks.spec.js.map