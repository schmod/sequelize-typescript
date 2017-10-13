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
var Book_1 = require("./Book");
var Page = /** @class */ (function (_super) {
    __extends(Page, _super);
    function Page() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        index_1.Column(index_1.DataType.TEXT),
        __metadata("design:type", String)
    ], Page.prototype, "content", void 0);
    __decorate([
        index_1.ForeignKey(function () { return Book_1.Book; }),
        index_1.Column,
        __metadata("design:type", Number)
    ], Page.prototype, "bookId", void 0);
    __decorate([
        index_1.BelongsTo(function () { return Book_1.Book; }),
        __metadata("design:type", Book_1.Book)
    ], Page.prototype, "book", void 0);
    Page = __decorate([
        index_1.Table
    ], Page);
    return Page;
}(index_1.Model));
exports.Page = Page;
//# sourceMappingURL=Page.js.map