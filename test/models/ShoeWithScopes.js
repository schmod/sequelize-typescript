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
var Manufacturer_1 = require("./Manufacturer");
var Person_1 = require("./Person");
exports.SHOE_DEFAULT_SCOPE = {
    attributes: ['id', 'primaryColor', 'secondaryColor', 'producedAt']
};
exports.SHOE_SCOPES = {
    full: {
        include: [function () { return Manufacturer_1.Manufacturer; }]
    },
    yellow: {
        where: { primaryColor: 'yellow' }
    },
    red: {
        where: { primaryColor: 'red' }
    },
    noImg: {
        where: { img: null }
    },
    manufacturerWithScope: {
        include: [function () { return Manufacturer_1.Manufacturer.scope('brandOnly'); }]
    },
    primaryColor: function (primaryColor) { return ({
        where: { primaryColor: primaryColor }
    }); },
    primaryColorWithManufacturer: function (primaryColor) { return ({
        include: [Manufacturer_1.Manufacturer],
        where: { primaryColor: primaryColor },
    }); }
};
var ShoeWithScopes = /** @class */ (function (_super) {
    __extends(ShoeWithScopes, _super);
    function ShoeWithScopes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        index_1.Column,
        __metadata("design:type", String)
    ], ShoeWithScopes.prototype, "secretKey", void 0);
    __decorate([
        index_1.Column,
        __metadata("design:type", String)
    ], ShoeWithScopes.prototype, "primaryColor", void 0);
    __decorate([
        index_1.Column,
        __metadata("design:type", String)
    ], ShoeWithScopes.prototype, "secondaryColor", void 0);
    __decorate([
        index_1.Column,
        __metadata("design:type", Buffer)
    ], ShoeWithScopes.prototype, "img", void 0);
    __decorate([
        index_1.Column,
        __metadata("design:type", Date)
    ], ShoeWithScopes.prototype, "producedAt", void 0);
    __decorate([
        index_1.ForeignKey(function () { return Manufacturer_1.Manufacturer; }),
        index_1.Column,
        __metadata("design:type", Number)
    ], ShoeWithScopes.prototype, "manufacturerId", void 0);
    __decorate([
        index_1.BelongsTo(function () { return Manufacturer_1.Manufacturer; }),
        __metadata("design:type", Manufacturer_1.Manufacturer)
    ], ShoeWithScopes.prototype, "manufacturer", void 0);
    __decorate([
        index_1.ForeignKey(function () { return Person_1.Person; }),
        index_1.Column,
        __metadata("design:type", Number)
    ], ShoeWithScopes.prototype, "ownerId", void 0);
    __decorate([
        index_1.BelongsTo(function () { return Person_1.Person; }),
        __metadata("design:type", Person_1.Person)
    ], ShoeWithScopes.prototype, "owner", void 0);
    ShoeWithScopes = __decorate([
        index_1.DefaultScope(exports.SHOE_DEFAULT_SCOPE),
        index_1.Scopes(exports.SHOE_SCOPES),
        index_1.Table
    ], ShoeWithScopes);
    return ShoeWithScopes;
}(index_1.Model));
exports.ShoeWithScopes = ShoeWithScopes;
//# sourceMappingURL=ShoeWithScopes.js.map