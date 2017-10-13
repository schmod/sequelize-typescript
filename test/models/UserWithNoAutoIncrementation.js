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
var UserWithNoAutoIncrementation = /** @class */ (function (_super) {
    __extends(UserWithNoAutoIncrementation, _super);
    function UserWithNoAutoIncrementation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        index_1.Column({
            type: index_1.DataType.INTEGER.UNSIGNED,
            autoIncrement: false,
            primaryKey: true
        }),
        __metadata("design:type", Number)
    ], UserWithNoAutoIncrementation.prototype, "id", void 0);
    __decorate([
        index_1.Column,
        __metadata("design:type", String)
    ], UserWithNoAutoIncrementation.prototype, "username", void 0);
    UserWithNoAutoIncrementation = __decorate([
        index_1.Table
    ], UserWithNoAutoIncrementation);
    return UserWithNoAutoIncrementation;
}(index_1.Model));
exports.UserWithNoAutoIncrementation = UserWithNoAutoIncrementation;
//# sourceMappingURL=UserWithNoAutoIncrementation.js.map