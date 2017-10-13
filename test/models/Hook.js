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
var index_1 = require("../../index");
var index_2 = require("../../index");
var index_3 = require("../../index");
var index_4 = require("../../index");
var index_5 = require("../../index");
var index_6 = require("../../index");
var index_7 = require("../../index");
var index_8 = require("../../index");
var index_9 = require("../../index");
var index_10 = require("../../index");
/**
 * Model used to test hook decorators. Defined hooks are mocked out for testing.
 */
var Hook = /** @class */ (function (_super) {
    __extends(Hook, _super);
    function Hook() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hook.beforeValidateHook = function (instance, options) { };
    Hook.afterValidateHook = function (instance, options) { };
    Hook.validationFailedHook = function (instance, options, err) { };
    Hook.beforeCreateHook = function (instance, options) { };
    Hook.afterCreateHook = function (instance, options) { };
    Hook.beforeDestroyHook = function (instance, options) { };
    Hook.beforeDeleteHook = function (instance, options) { };
    Hook.afterDestroyHook = function (instance, options) { };
    Hook.afterDeleteHook = function (instance, options) { };
    Hook.beforeRestoreHook = function (instance, options) { };
    Hook.afterRestoreHook = function (instance, options) { };
    Hook.beforeUpdateHook = function (instance, options) { };
    Hook.afterUpdateHook = function (instance, options) { };
    // NOTE: this hook only available in Sequelize v4
    Hook.beforeSaveHook = function (instance, options) { };
    // NOTE: this hook only available in Sequelize v4
    Hook.afterSaveHook = function (instance, options) { };
    // NOTE: this hook only available in Sequelize v4
    Hook.beforeUpsertHook = function (instance, options) { };
    // NOTE: this hook only available in Sequelize v4
    Hook.afterUpsertHook = function (instance, options) { };
    Hook.beforeBulkCreateHook = function (instances, options) { };
    Hook.afterBulkCreateHook = function (instances, options) { };
    Hook.beforeBulkDestroyHook = function (options) { };
    Hook.beforeBulkDeleteHook = function (options) { };
    Hook.afterBulkDestroyHook = function (options) { };
    Hook.afterBulkDeleteHook = function (options) { };
    Hook.beforeBulkRestoreHook = function (options) { };
    Hook.afterBulkRestoreHook = function (options) { };
    Hook.beforeBulkUpdateHook = function (options) { };
    Hook.afterBulkUpdateHook = function (options) { };
    Hook.beforeFindHook = function (options) { };
    Hook.beforeFindAfterExpandIncludeAllHook = function (options) { };
    Hook.beforeFindAfterOptionsHook = function (options) { };
    Hook.afterFindHook = function (options) { };
    Hook.beforeCountHook = function (options) { };
    // Hooks can also be named. This allows them to be removed at a later time using
    // Model.removeHook('hookType', 'hookName'). Please be aware that hook removal does not
    // work correctly in versions of Sequelize earlier than 4.4.10.
    Hook.beforeValidateHookWithName = function (instance, options) { };
    Hook.afterValidateHookWithName = function (instance, options) { };
    Hook.validationFailedHookWithName = function (instance, options, err) { };
    Hook.beforeCreateHookWithName = function (instance, options) { };
    Hook.afterCreateHookWithName = function (instance, options) { };
    Hook.beforeDestroyHookWithName = function (instance, options) { };
    Hook.beforeDeleteHookWithName = function (instance, options) { };
    Hook.afterDestroyHookWithName = function (instance, options) { };
    Hook.afterDeleteHookWithName = function (instance, options) { };
    Hook.beforeRestoreHookWithName = function (instance, options) { };
    Hook.afterRestoreHookWithName = function (instance, options) { };
    Hook.beforeUpdateHookWithName = function (instance, options) { };
    Hook.afterUpdateHookWithName = function (instance, options) { };
    // NOTE: this hook only available in Sequelize v4
    Hook.beforeSaveHookWithName = function (instance, options) { };
    // NOTE: this hook only available in Sequelize v4
    Hook.afterSaveHookWithName = function (instance, options) { };
    // NOTE: this hook only available in Sequelize v4
    Hook.beforeUpsertHookWithName = function (instance, options) { };
    // NOTE: this hook only available in Sequelize v4
    Hook.afterUpsertHookWithName = function (instance, options) { };
    Hook.beforeBulkCreateHookWithName = function (instances, options) { };
    Hook.afterBulkCreateHookWithName = function (instances, options) { };
    Hook.beforeBulkDestroyHookWithName = function (options) { };
    Hook.beforeBulkDeleteHookWithName = function (options) { };
    Hook.afterBulkDestroyHookWithName = function (options) { };
    Hook.afterBulkDeleteHookWithName = function (options) { };
    Hook.beforeBulkRestoreHookWithName = function (options) { };
    Hook.afterBulkRestoreHookWithName = function (options) { };
    Hook.beforeBulkUpdateHookWithName = function (options) { };
    Hook.afterBulkUpdateHookWithName = function (options) { };
    Hook.beforeFindHookWithName = function (options) { };
    Hook.beforeFindAfterExpandIncludeAllHookWithName = function (options) { };
    Hook.beforeFindAfterOptionsHookWithName = function (options) { };
    Hook.afterFindHookWithName = function (options) { };
    Hook.beforeCountHookWithName = function (options) { };
    __decorate([
        index_8.Column,
        __metadata("design:type", String)
    ], Hook.prototype, "name", void 0);
    __decorate([
        index_8.BeforeValidate,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeValidateHook", null);
    __decorate([
        index_4.AfterValidate,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "afterValidateHook", null);
    __decorate([
        index_4.ValidationFailed,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "validationFailedHook", null);
    __decorate([
        index_8.BeforeCreate,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeCreateHook", null);
    __decorate([
        index_4.AfterCreate,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "afterCreateHook", null);
    __decorate([
        index_5.BeforeDestroy,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeDestroyHook", null);
    __decorate([
        index_10.BeforeDelete,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeDeleteHook", null);
    __decorate([
        index_5.AfterDestroy,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "afterDestroyHook", null);
    __decorate([
        index_10.AfterDelete,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "afterDeleteHook", null);
    __decorate([
        index_5.BeforeRestore,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeRestoreHook", null);
    __decorate([
        index_5.AfterRestore,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "afterRestoreHook", null);
    __decorate([
        index_7.BeforeUpdate,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeUpdateHook", null);
    __decorate([
        index_7.AfterUpdate,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "afterUpdateHook", null);
    __decorate([
        index_7.BeforeSave,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeSaveHook", null);
    __decorate([
        index_7.AfterSave,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "afterSaveHook", null);
    __decorate([
        index_1.BeforeUpsert,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeUpsertHook", null);
    __decorate([
        index_1.AfterUpsert,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "afterUpsertHook", null);
    __decorate([
        index_1.BeforeBulkCreate,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeBulkCreateHook", null);
    __decorate([
        index_1.AfterBulkCreate,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "afterBulkCreateHook", null);
    __decorate([
        index_2.BeforeBulkDestroy,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeBulkDestroyHook", null);
    __decorate([
        index_10.BeforeBulkDelete,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeBulkDeleteHook", null);
    __decorate([
        index_2.AfterBulkDestroy,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "afterBulkDestroyHook", null);
    __decorate([
        index_10.AfterBulkDelete,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "afterBulkDeleteHook", null);
    __decorate([
        index_2.BeforeBulkRestore,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeBulkRestoreHook", null);
    __decorate([
        index_3.AfterBulkRestore,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "afterBulkRestoreHook", null);
    __decorate([
        index_3.BeforeBulkUpdate,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeBulkUpdateHook", null);
    __decorate([
        index_3.AfterBulkUpdate,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "afterBulkUpdateHook", null);
    __decorate([
        index_9.BeforeFind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeFindHook", null);
    __decorate([
        index_9.BeforeFindAfterExpandIncludeAll,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeFindAfterExpandIncludeAllHook", null);
    __decorate([
        index_6.BeforeFindAfterOptions,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeFindAfterOptionsHook", null);
    __decorate([
        index_6.AfterFind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "afterFindHook", null);
    __decorate([
        index_6.BeforeCount,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeCountHook", null);
    __decorate([
        index_8.BeforeValidate({ name: 'myBeforeValidateHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeValidateHookWithName", null);
    __decorate([
        index_4.AfterValidate({ name: 'myAfterValidateHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "afterValidateHookWithName", null);
    __decorate([
        index_4.ValidationFailed({ name: 'myValidationFailedHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "validationFailedHookWithName", null);
    __decorate([
        index_8.BeforeCreate({ name: 'myBeforeCreateHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeCreateHookWithName", null);
    __decorate([
        index_4.AfterCreate({ name: 'myAfterCreateHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "afterCreateHookWithName", null);
    __decorate([
        index_5.BeforeDestroy({ name: 'myBeforeDestroyHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeDestroyHookWithName", null);
    __decorate([
        index_10.BeforeDelete({ name: 'myBeforeDeleteHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeDeleteHookWithName", null);
    __decorate([
        index_5.AfterDestroy({ name: 'myAfterDestroyHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "afterDestroyHookWithName", null);
    __decorate([
        index_10.AfterDelete({ name: 'myAfterDeleteHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "afterDeleteHookWithName", null);
    __decorate([
        index_5.BeforeRestore({ name: 'myBeforeRestoreHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeRestoreHookWithName", null);
    __decorate([
        index_5.AfterRestore({ name: 'myAfterRestoreHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "afterRestoreHookWithName", null);
    __decorate([
        index_7.BeforeUpdate({ name: 'myBeforeUpdateHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeUpdateHookWithName", null);
    __decorate([
        index_7.AfterUpdate({ name: 'myAfterUpdateHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "afterUpdateHookWithName", null);
    __decorate([
        index_7.BeforeSave({ name: 'myBeforeSaveHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeSaveHookWithName", null);
    __decorate([
        index_7.AfterSave({ name: 'myAfterSaveHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "afterSaveHookWithName", null);
    __decorate([
        index_1.BeforeUpsert({ name: 'myBeforeUpsertHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeUpsertHookWithName", null);
    __decorate([
        index_1.AfterUpsert({ name: 'myAfterUpsertHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hook, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "afterUpsertHookWithName", null);
    __decorate([
        index_1.BeforeBulkCreate({ name: 'myBeforeBulkCreateHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeBulkCreateHookWithName", null);
    __decorate([
        index_1.AfterBulkCreate({ name: 'myAfterBulkCreateHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array, Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "afterBulkCreateHookWithName", null);
    __decorate([
        index_2.BeforeBulkDestroy({ name: 'myBeforeBulkDestroyHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeBulkDestroyHookWithName", null);
    __decorate([
        index_10.BeforeBulkDelete({ name: 'myBeforeBulkDeleteHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeBulkDeleteHookWithName", null);
    __decorate([
        index_2.AfterBulkDestroy({ name: 'myAfterBulkDestroyHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "afterBulkDestroyHookWithName", null);
    __decorate([
        index_10.AfterBulkDelete({ name: 'myAfterBulkDeleteHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "afterBulkDeleteHookWithName", null);
    __decorate([
        index_2.BeforeBulkRestore({ name: 'myBeforeBulkRestoreHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeBulkRestoreHookWithName", null);
    __decorate([
        index_3.AfterBulkRestore({ name: 'myAfterBulkRestoreHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "afterBulkRestoreHookWithName", null);
    __decorate([
        index_3.BeforeBulkUpdate({ name: 'myBeforeBulkUpdateHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeBulkUpdateHookWithName", null);
    __decorate([
        index_3.AfterBulkUpdate({ name: 'myAfterBulkUpdateHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "afterBulkUpdateHookWithName", null);
    __decorate([
        index_9.BeforeFind({ name: 'myBeforeFindHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeFindHookWithName", null);
    __decorate([
        index_9.BeforeFindAfterExpandIncludeAll({ name: 'myBeforeFindAfterExpandIncludeAllHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeFindAfterExpandIncludeAllHookWithName", null);
    __decorate([
        index_6.BeforeFindAfterOptions({ name: 'myBeforeFindAfterOptionsHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeFindAfterOptionsHookWithName", null);
    __decorate([
        index_6.AfterFind({ name: 'myAfterFindHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "afterFindHookWithName", null);
    __decorate([
        index_6.BeforeCount({ name: 'myBeforeCountHook' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Hook, "beforeCountHookWithName", null);
    Hook = __decorate([
        index_8.Table
    ], Hook);
    return Hook;
}(index_8.Model));
exports.Hook = Hook;
//# sourceMappingURL=Hook.js.map