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
var Team_1 = require("./Team");
var Shoe_1 = require("./Shoe");
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        index_1.PrimaryKey,
        index_1.AutoIncrement,
        index_1.Column,
        __metadata("design:type", Number)
    ], Player.prototype, "id", void 0);
    __decorate([
        index_1.Column,
        __metadata("design:type", String)
    ], Player.prototype, "name", void 0);
    __decorate([
        index_1.HasOne(function () { return Shoe_1.Shoe; }),
        __metadata("design:type", Shoe_1.Shoe)
    ], Player.prototype, "shoe", void 0);
    __decorate([
        index_1.ForeignKey(function () { return Team_1.Team; }),
        index_1.Column,
        __metadata("design:type", Number)
    ], Player.prototype, "teamId", void 0);
    __decorate([
        index_1.BelongsTo(function () { return Team_1.Team; }),
        __metadata("design:type", Team_1.Team)
    ], Player.prototype, "team", void 0);
    Player = __decorate([
        index_1.Table
    ], Player);
    return Player;
}(index_1.Model));
exports.Player = Player;
//# sourceMappingURL=Player.js.map