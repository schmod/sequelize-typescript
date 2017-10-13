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
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        index_1.PrimaryKey,
        index_1.AutoIncrement,
        index_1.Column,
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        index_1.Column({
            type: index_1.DataType.UUID,
            defaultValue: index_1.DataType.UUIDV1
        }),
        __metadata("design:type", String)
    ], User.prototype, "uuidv1", void 0);
    __decorate([
        index_1.Unique,
        index_1.Default(index_1.DataType.UUIDV4),
        index_1.Column(index_1.DataType.UUID),
        __metadata("design:type", String)
    ], User.prototype, "uuidv4", void 0);
    __decorate([
        index_1.Column,
        __metadata("design:type", String)
    ], User.prototype, "username", void 0);
    __decorate([
        index_1.Column(index_1.DataType.STRING(5)),
        __metadata("design:type", String)
    ], User.prototype, "username2", void 0);
    __decorate([
        index_1.Column,
        __metadata("design:type", Number)
    ], User.prototype, "aNumber", void 0);
    __decorate([
        index_1.Column,
        __metadata("design:type", Number)
    ], User.prototype, "bNumber", void 0);
    __decorate([
        index_1.Column,
        __metadata("design:type", Boolean)
    ], User.prototype, "isAdmin", void 0);
    __decorate([
        index_1.Default(false),
        index_1.AllowNull(false),
        index_1.Column(index_1.DataType.BOOLEAN),
        __metadata("design:type", Object)
    ], User.prototype, "isSuperUser", void 0);
    __decorate([
        index_1.Column({
            defaultValue: index_1.DataType.NOW
        }),
        __metadata("design:type", Date)
    ], User.prototype, "touchedAt", void 0);
    __decorate([
        index_1.Column,
        __metadata("design:type", Date)
    ], User.prototype, "birthDate", void 0);
    __decorate([
        index_1.Column({
            allowNull: true
        }),
        __metadata("design:type", Date)
    ], User.prototype, "dateAllowNullTrue", void 0);
    __decorate([
        index_1.Column,
        __metadata("design:type", String)
    ], User.prototype, "name", void 0);
    __decorate([
        index_1.Column(index_1.DataType.TEXT),
        __metadata("design:type", String)
    ], User.prototype, "bio", void 0);
    __decorate([
        index_1.Column,
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    User = __decorate([
        index_1.Table
    ], User);
    return User;
}(index_1.Model));
exports.User = User;
//# sourceMappingURL=User.js.map