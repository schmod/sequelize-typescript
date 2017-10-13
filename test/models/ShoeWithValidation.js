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
var IsCreditCard_1 = require("../../lib/annotations/validation/IsCreditCard");
exports.HEX_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
function hexColor(value) {
    if (!exports.HEX_REGEX.test(value)) {
        throw new Error("\"" + value + "\" is not a hex color value.");
    }
}
exports.hexColor = hexColor;
exports.UUID_VERSION = 4;
exports.IS_IN = [['a', 'b']];
exports.NOT_CONTAINS = 'b';
exports.NOT = /b/;
exports.MAX = 100;
exports.MIN = -100;
exports.KEY_VALUE = 'READONLY';
exports.PARTIAL_SPECIAL_VALUE = 'Special';
exports.PRODUCED_AT_IS_AFTER = '1987-04-04';
exports.PRODUCED_AT_IS_BEFORE = '2017-02-27';
exports.BRAND_LENGTH = { min: 3, max: 15 };
var ShoeWithValidation = /** @class */ (function (_super) {
    __extends(ShoeWithValidation, _super);
    function ShoeWithValidation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        index_1.IsUUID(exports.UUID_VERSION),
        index_1.PrimaryKey,
        index_1.Column,
        __metadata("design:type", String)
    ], ShoeWithValidation.prototype, "id", void 0);
    __decorate([
        index_1.Equals(exports.KEY_VALUE),
        index_1.Column,
        __metadata("design:type", String)
    ], ShoeWithValidation.prototype, "key", void 0);
    __decorate([
        index_1.Contains(exports.PARTIAL_SPECIAL_VALUE),
        index_1.Column,
        __metadata("design:type", String)
    ], ShoeWithValidation.prototype, "special", void 0);
    __decorate([
        index_1.Length(exports.BRAND_LENGTH),
        index_1.Column,
        __metadata("design:type", String)
    ], ShoeWithValidation.prototype, "brand", void 0);
    __decorate([
        index_1.IsUrl,
        index_1.Column,
        __metadata("design:type", String)
    ], ShoeWithValidation.prototype, "brandUrl", void 0);
    __decorate([
        index_1.Is('HexColor', hexColor),
        index_1.Length({ min: 4, msg: 'too short' }),
        index_1.Column,
        __metadata("design:type", String)
    ], ShoeWithValidation.prototype, "primaryColor", void 0);
    __decorate([
        index_1.Is(hexColor),
        index_1.Column,
        __metadata("design:type", String)
    ], ShoeWithValidation.prototype, "secondaryColor", void 0);
    __decorate([
        index_1.Is(exports.HEX_REGEX),
        index_1.Column,
        __metadata("design:type", String)
    ], ShoeWithValidation.prototype, "tertiaryColor", void 0);
    __decorate([
        index_1.IsDate,
        index_1.IsAfter(exports.PRODUCED_AT_IS_AFTER),
        index_1.IsBefore(exports.PRODUCED_AT_IS_BEFORE),
        index_1.Column,
        __metadata("design:type", Date)
    ], ShoeWithValidation.prototype, "producedAt", void 0);
    __decorate([
        IsCreditCard_1.IsCreditCard,
        index_1.IsAlpha,
        index_1.IsAlphanumeric,
        index_1.IsEmail,
        index_1.IsDecimal,
        index_1.IsFloat,
        index_1.IsInt,
        index_1.IsIP,
        index_1.IsIPv4,
        index_1.IsIPv6,
        index_1.IsLowercase,
        index_1.IsUppercase,
        index_1.NotNull,
        index_1.NotEmpty,
        index_1.IsArray,
        index_1.IsNull,
        index_1.IsNumeric,
        index_1.Max(exports.MAX),
        index_1.Min(exports.MIN),
        index_1.Not(exports.NOT),
        index_1.IsIn(exports.IS_IN),
        index_1.NotIn(exports.IS_IN),
        index_1.NotContains(exports.NOT_CONTAINS),
        index_1.Validate({ isArray: true }),
        index_1.Column(index_1.DataType.STRING),
        __metadata("design:type", Object)
    ], ShoeWithValidation.prototype, "dummy", void 0);
    ShoeWithValidation = __decorate([
        index_1.Table
    ], ShoeWithValidation);
    return ShoeWithValidation;
}(index_1.Model));
exports.ShoeWithValidation = ShoeWithValidation;
//# sourceMappingURL=ShoeWithValidation.js.map