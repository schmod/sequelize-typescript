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
var chai_1 = require("chai");
var index_1 = require("../../index");
var sequelize_1 = require("../utils/sequelize");
describe('model-methods', function () {
    var sequelize = sequelize_1.createSequelize();
    var User = /** @class */ (function (_super) {
        __extends(User, _super);
        function User() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        User_1 = User;
        User.createDemoUser = function () {
            return new User_1({ firstName: 'Peter', lastName: 'Parker' });
        };
        User.findDemoUser = function () {
            return this.findOne({ where: { firstName: 'Peter', lastName: 'Parker' } });
        };
        __decorate([
            index_1.Column,
            __metadata("design:type", String)
        ], User.prototype, "firstName", void 0);
        __decorate([
            index_1.Column,
            __metadata("design:type", String)
        ], User.prototype, "lastName", void 0);
        User = User_1 = __decorate([
            index_1.Table
        ], User);
        return User;
        var User_1;
    }(index_1.Model));
    sequelize.addModels([User]);
    beforeEach(function () { return sequelize.sync({ force: true }); });
    it('should work as expected', function () {
        var user = User.createDemoUser();
        chai_1.expect(user).to.be.an.instanceOf(User);
        return user
            .save()
            .then(function () { return User.findDemoUser(); })
            .then(function (_user) { return chai_1.expect(_user.equals(user)).to.be.true; });
    });
});
//# sourceMappingURL=model-methods.spec.js.map