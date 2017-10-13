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
var Promise = require("bluebird");
var index_1 = require("../../index");
var sequelize_1 = require("../utils/sequelize");
describe('instance-methods', function () {
    var sequelize = sequelize_1.createSequelize();
    var User = /** @class */ (function (_super) {
        __extends(User, _super);
        function User() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        User.prototype.getFullName = function () {
            return this.firstName + ' ' + this.lastName;
        };
        User.prototype.setFullName = function (name) {
            var split = name.split(' ');
            this.lastName = split.pop();
            this.firstName = split.join(' ');
        };
        __decorate([
            index_1.Column,
            __metadata("design:type", String)
        ], User.prototype, "firstName", void 0);
        __decorate([
            index_1.Column,
            __metadata("design:type", String)
        ], User.prototype, "lastName", void 0);
        User = __decorate([
            index_1.Table
        ], User);
        return User;
    }(index_1.Model));
    sequelize.addModels([User]);
    beforeEach(function () { return sequelize.sync({ force: true }); });
    var suites = [
        ['build', function () { return Promise.resolve(User.build({ firstName: 'Peter', lastName: 'Parker' })); }],
        ['new', function () { return Promise.resolve(new User({ firstName: 'Peter', lastName: 'Parker' })); }],
        ['create', function () { return (User.create({ firstName: 'Peter', lastName: 'Parker' })); }],
    ];
    suites.forEach(function (_a) {
        var name = _a[0], create = _a[1];
        describe(name, function () {
            var user;
            beforeEach(function () { return create().then(function (_user) { return user = _user; }); });
            it('should have access to functions of prototype', function () {
                Object
                    .keys(User.prototype)
                    .forEach(function (key) {
                    chai_1.expect(user).to.have.property(key, User.prototype[key]);
                });
            });
            describe('"get" function', function () {
                it('should return appropriate value', function () {
                    chai_1.expect(user.getFullName()).to.equal(user.firstName + ' ' + user.lastName);
                });
            });
            describe('"set" function', function () {
                var firstName = 'Tony';
                var lastName = 'Stark';
                var fullName = firstName + ' ' + lastName;
                it('should set specified value to instance', function () {
                    user.setFullName(fullName);
                    chai_1.expect(user.firstName).to.equal(firstName);
                    chai_1.expect(user.lastName).to.equal(lastName);
                });
                it('should store set value', function () {
                    user.setFullName(fullName);
                    return user
                        .save()
                        .then(function () { return User.findById(user.id); })
                        .then(function (_user) {
                        chai_1.expect(_user.firstName).to.equal(firstName);
                        chai_1.expect(_user.lastName).to.equal(lastName);
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=instance-methods.spec.js.map