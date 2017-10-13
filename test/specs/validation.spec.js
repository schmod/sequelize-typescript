"use strict";
/* tslint:disable:max-classes-per-file */
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
var chaiAsPromised = require("chai-as-promised");
var sequelize_1 = require("../utils/sequelize");
var ShoeWithValidation_1 = require("../models/ShoeWithValidation");
var versioning_1 = require("../../lib/utils/versioning");
var Is_1 = require("../../lib/annotations/validation/Is");
var Model_1 = require("../../lib/models/Model");
var Table_1 = require("../../lib/annotations/Table");
var Column_1 = require("../../lib/annotations/Column");
var Length_1 = require("../../lib/annotations/validation/Length");
var NotEmpty_1 = require("../../lib/annotations/validation/NotEmpty");
var Validator_1 = require("../../lib/annotations/validation/Validator");
chai_1.use(chaiAsPromised);
describe('validation', function () {
    var sequelize = sequelize_1.createSequelize();
    beforeEach(function () { return sequelize.sync({ force: true }); });
    describe("rawAttributes of " + ShoeWithValidation_1.ShoeWithValidation.name, function () {
        var rawAttributes = ShoeWithValidation_1.ShoeWithValidation['rawAttributes'];
        var shoeAttributes = {
            id: {
                isUUID: ShoeWithValidation_1.UUID_VERSION
            },
            key: {
                equals: ShoeWithValidation_1.KEY_VALUE
            },
            special: {
                contains: ShoeWithValidation_1.PARTIAL_SPECIAL_VALUE
            },
            brand: {
                len: [ShoeWithValidation_1.BRAND_LENGTH.min, ShoeWithValidation_1.BRAND_LENGTH.max]
            },
            brandUrl: {
                isUrl: true
            },
            primaryColor: {
                isHexColor: ShoeWithValidation_1.hexColor
            },
            secondaryColor: {
                isHexColor: ShoeWithValidation_1.hexColor
            },
            tertiaryColor: {
                is: ShoeWithValidation_1.HEX_REGEX
            },
            producedAt: {
                isDate: true,
                isAfter: ShoeWithValidation_1.PRODUCED_AT_IS_AFTER,
                isBefore: ShoeWithValidation_1.PRODUCED_AT_IS_BEFORE,
            },
            dummy: {
                isCreditCard: true,
                isAlpha: true,
                isAlphanumeric: true,
                isEmail: true,
                isDecimal: true,
                isFloat: true,
                isInt: true,
                isIP: true,
                isIPv4: true,
                isIPv6: true,
                isLowercase: true,
                isUppercase: true,
                notNull: true,
                max: ShoeWithValidation_1.MAX,
                min: ShoeWithValidation_1.MIN,
                not: ShoeWithValidation_1.NOT,
                isIn: ShoeWithValidation_1.IS_IN,
                notIn: ShoeWithValidation_1.IS_IN,
                notContains: ShoeWithValidation_1.NOT_CONTAINS,
                isArray: true,
            }
        };
        it("should have properties with defined validations", function () {
            Object
                .keys(shoeAttributes)
                .forEach(function (key) {
                chai_1.expect(rawAttributes[key]).to.have.property('validate');
                var validations = shoeAttributes[key];
                Object
                    .keys(validations)
                    .forEach(function (validateKey) {
                    chai_1.expect(rawAttributes[key].validate).to.have.property(validateKey)
                        .that.eqls(validations[validateKey]);
                });
            });
        });
    });
    describe('validation', function () {
        var data = {
            id: {
                valid: ['903830b8-4dcc-4f10-a5aa-35afa8445691', null, undefined],
                invalid: ['', 'abc', 1],
            },
            key: {
                valid: [ShoeWithValidation_1.KEY_VALUE, null, undefined],
                invalid: ['', 'ad', '1234567891234567', 2],
            },
            special: {
                valid: [
                    "abc" + ShoeWithValidation_1.PARTIAL_SPECIAL_VALUE,
                    "abc" + ShoeWithValidation_1.PARTIAL_SPECIAL_VALUE + "def",
                    ShoeWithValidation_1.PARTIAL_SPECIAL_VALUE + "def",
                    "_" + ShoeWithValidation_1.PARTIAL_SPECIAL_VALUE + "_"
                ],
                invalid: ['', 'ad', '1234567891234567', 2],
            },
            brand: {
                valid: ['nike', 'adidas', 'puma', null, undefined],
                invalid: ['', 'ad', '1234567891234567', 2],
            },
            brandUrl: {
                valid: ['http://www.google.de', 'https://www.google.com', null, undefined],
                invalid: ['', 'ad', '1234567891234567', 2],
            },
            primaryColor: {
                valid: ['#666', '#666555', null, undefined],
                invalid: ['', 'ad', '1234567891234567', 2],
            },
            secondaryColor: {
                valid: ['#666', '#666555', null, undefined],
                invalid: ['', 'ad', '1234567891234567', 2],
            },
            tertiaryColor: {
                valid: ['#666', '#666555', null, undefined],
                invalid: ['', 'ad', '1234567891234567', 2],
            },
            producedAt: {
                valid: [new Date(2010, 1, 1), null, undefined],
                invalid: ['', 'ad', '1234567891234567', 2, new Date(1980, 1, 1)],
            }
        };
        var validPromises = [];
        var invalidPromises = [];
        Object
            .keys(data)
            .forEach(function (key) {
            var valid = data[key].valid;
            var invalid = data[key].invalid;
            validPromises.push(Promise.all(valid.map(function (value) {
                var shoe = new ShoeWithValidation_1.ShoeWithValidation((_a = {}, _a[key] = value, _a));
                if (versioning_1.majorVersion === 3) {
                    return shoe.validate().then(function (err) { return chai_1.expect(err).to.be.null; });
                }
                else if (versioning_1.majorVersion === 4) {
                    return chai_1.expect(shoe.validate()).to.be.fulfilled;
                }
                var _a;
            })));
            invalidPromises.push(Promise.all(invalid.map(function (value) {
                var shoe = new ShoeWithValidation_1.ShoeWithValidation((_a = {}, _a[key] = value, _a));
                if (versioning_1.majorVersion === 3) {
                    return shoe.validate().then(function (err) { return chai_1.expect(err).to.be.an('object'); });
                }
                else if (versioning_1.majorVersion === 4) {
                    return chai_1.expect(shoe.validate()).to.be.rejected;
                }
                var _a;
            })));
        });
        it("should not throw due to valid values", function () { return Promise.all(validPromises); });
        it("should throw due to invalid values", function () { return Promise.all(invalidPromises); });
    });
    describe('decorators', function () {
        describe('Is', function () {
            it('Should throw due to missing name of function', function () {
                chai_1.expect(function () { return Is_1.Is(function () { return null; }); }).to.throw(/Passed validator function must have a name/);
            });
        });
        describe('Length', function () {
            it('should not produce an error', function () {
                var User = /** @class */ (function (_super) {
                    __extends(User, _super);
                    function User() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    __decorate([
                        Length_1.Length({ min: 0, max: 5 }), Column_1.Column,
                        __metadata("design:type", String)
                    ], User.prototype, "name", void 0);
                    User = __decorate([
                        Table_1.Table
                    ], User);
                    return User;
                }(Model_1.Model));
                var sequelizeValidationOnly = sequelize_1.createSequelizeValidationOnly(false);
                sequelizeValidationOnly.addModels([User]);
                var user = new User({ name: 'elisa' });
                if (versioning_1.majorVersion === 3) {
                    return user.validate().then(function (err) { return chai_1.expect(err).to.be.not.an('object'); });
                }
                else if (versioning_1.majorVersion === 4) {
                    return chai_1.expect(user.validate()).to.be.not.rejected;
                }
            });
            it('should produce an error due to unfulfilled max', function () {
                var User = /** @class */ (function (_super) {
                    __extends(User, _super);
                    function User() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    __decorate([
                        Length_1.Length({ min: 0, max: 5 }), Column_1.Column,
                        __metadata("design:type", String)
                    ], User.prototype, "name", void 0);
                    User = __decorate([
                        Table_1.Table
                    ], User);
                    return User;
                }(Model_1.Model));
                var sequelizeValidationOnly = sequelize_1.createSequelizeValidationOnly(false);
                sequelizeValidationOnly.addModels([User]);
                var user = new User({ name: 'elisa tree' });
                if (versioning_1.majorVersion === 3) {
                    return user.validate().then(function (err) { return chai_1.expect(err).to.be.an('object'); });
                }
                else if (versioning_1.majorVersion === 4) {
                    return chai_1.expect(user.validate()).to.be.rejected;
                }
            });
            it('should produce an error due to unfulfilled min', function () {
                var User = /** @class */ (function (_super) {
                    __extends(User, _super);
                    function User() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    __decorate([
                        Length_1.Length({ min: 5, max: 5 }), Column_1.Column,
                        __metadata("design:type", String)
                    ], User.prototype, "name", void 0);
                    User = __decorate([
                        Table_1.Table
                    ], User);
                    return User;
                }(Model_1.Model));
                var sequelizeValidationOnly = sequelize_1.createSequelizeValidationOnly(false);
                sequelizeValidationOnly.addModels([User]);
                var user = new User({ name: 'elli' });
                if (versioning_1.majorVersion === 3) {
                    return user.validate().then(function (err) { return chai_1.expect(err).to.be.an('object'); });
                }
                else if (versioning_1.majorVersion === 4) {
                    return chai_1.expect(user.validate()).to.be.rejected;
                }
            });
            it('should not produce an error (max only)', function () {
                var User = /** @class */ (function (_super) {
                    __extends(User, _super);
                    function User() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    __decorate([
                        Length_1.Length({ max: 5 }), Column_1.Column,
                        __metadata("design:type", String)
                    ], User.prototype, "name", void 0);
                    User = __decorate([
                        Table_1.Table
                    ], User);
                    return User;
                }(Model_1.Model));
                var sequelizeValidationOnly = sequelize_1.createSequelizeValidationOnly(false);
                sequelizeValidationOnly.addModels([User]);
                var user = new User({ name: 'elisa' });
                if (versioning_1.majorVersion === 3) {
                    return user.validate().then(function (err) { return chai_1.expect(err).to.be.not.an('object'); });
                }
                else if (versioning_1.majorVersion === 4) {
                    return chai_1.expect(user.validate()).to.be.not.rejected;
                }
            });
            it('should produce an error (max only)', function () {
                var User = /** @class */ (function (_super) {
                    __extends(User, _super);
                    function User() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    __decorate([
                        Length_1.Length({ max: 5 }), Column_1.Column,
                        __metadata("design:type", String)
                    ], User.prototype, "name", void 0);
                    User = __decorate([
                        Table_1.Table
                    ], User);
                    return User;
                }(Model_1.Model));
                var sequelizeValidationOnly = sequelize_1.createSequelizeValidationOnly(false);
                sequelizeValidationOnly.addModels([User]);
                var user = new User({ name: 'elisa tree' });
                if (versioning_1.majorVersion === 3) {
                    return user.validate().then(function (err) { return chai_1.expect(err).to.be.an('object'); });
                }
                else if (versioning_1.majorVersion === 4) {
                    return chai_1.expect(user.validate()).to.be.rejected;
                }
            });
            it('should not produce an error (min only)', function () {
                var User = /** @class */ (function (_super) {
                    __extends(User, _super);
                    function User() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    __decorate([
                        Length_1.Length({ min: 4 }), Column_1.Column,
                        __metadata("design:type", String)
                    ], User.prototype, "name", void 0);
                    User = __decorate([
                        Table_1.Table
                    ], User);
                    return User;
                }(Model_1.Model));
                var sequelizeValidationOnly = sequelize_1.createSequelizeValidationOnly(false);
                sequelizeValidationOnly.addModels([User]);
                var user = new User({ name: 'elisa' });
                if (versioning_1.majorVersion === 3) {
                    return user.validate().then(function (err) { return chai_1.expect(err).to.be.not.an('object'); });
                }
                else if (versioning_1.majorVersion === 4) {
                    return chai_1.expect(user.validate()).to.be.not.rejected;
                }
            });
            it('should produce an error (min only)', function () {
                var User = /** @class */ (function (_super) {
                    __extends(User, _super);
                    function User() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    __decorate([
                        Length_1.Length({ min: 5 }), Column_1.Column,
                        __metadata("design:type", String)
                    ], User.prototype, "name", void 0);
                    User = __decorate([
                        Table_1.Table
                    ], User);
                    return User;
                }(Model_1.Model));
                var sequelizeValidationOnly = sequelize_1.createSequelizeValidationOnly(false);
                sequelizeValidationOnly.addModels([User]);
                var user = new User({ name: 'elli' });
                if (versioning_1.majorVersion === 3) {
                    return user.validate().then(function (err) { return chai_1.expect(err).to.be.an('object'); });
                }
                else if (versioning_1.majorVersion === 4) {
                    return chai_1.expect(user.validate()).to.be.rejected;
                }
            });
        });
        describe('NotEmpty', function () {
            it('should not produce an error', function () {
                var User = /** @class */ (function (_super) {
                    __extends(User, _super);
                    function User() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    __decorate([
                        NotEmpty_1.NotEmpty, Column_1.Column,
                        __metadata("design:type", String)
                    ], User.prototype, "name", void 0);
                    User = __decorate([
                        Table_1.Table
                    ], User);
                    return User;
                }(Model_1.Model));
                var sequelizeValidationOnly = sequelize_1.createSequelizeValidationOnly(false);
                sequelizeValidationOnly.addModels([User]);
                var user = new User({ name: 'elisa' });
                if (versioning_1.majorVersion === 3) {
                    return user.validate().then(function (err) { return chai_1.expect(err).to.be.not.an('object'); });
                }
                else if (versioning_1.majorVersion === 4) {
                    return chai_1.expect(user.validate()).to.be.not.rejected;
                }
            });
            it('should produce an error', function () {
                var User = /** @class */ (function (_super) {
                    __extends(User, _super);
                    function User() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    __decorate([
                        NotEmpty_1.NotEmpty, Column_1.Column,
                        __metadata("design:type", String)
                    ], User.prototype, "name", void 0);
                    User = __decorate([
                        Table_1.Table
                    ], User);
                    return User;
                }(Model_1.Model));
                var sequelizeValidationOnly = sequelize_1.createSequelizeValidationOnly(false);
                sequelizeValidationOnly.addModels([User]);
                var user = new User({ name: '' });
                if (versioning_1.majorVersion === 3) {
                    return user.validate().then(function (err) { return chai_1.expect(err).to.be.an('object'); });
                }
                else if (versioning_1.majorVersion === 4) {
                    return chai_1.expect(user.validate()).to.be.rejected;
                }
            });
            it('should not produce an error (with msg)', function () {
                var User = /** @class */ (function (_super) {
                    __extends(User, _super);
                    function User() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    __decorate([
                        NotEmpty_1.NotEmpty({ msg: 'NotEmpty' }), Column_1.Column,
                        __metadata("design:type", String)
                    ], User.prototype, "name", void 0);
                    User = __decorate([
                        Table_1.Table
                    ], User);
                    return User;
                }(Model_1.Model));
                var sequelizeValidationOnly = sequelize_1.createSequelizeValidationOnly(false);
                sequelizeValidationOnly.addModels([User]);
                var user = new User({ name: 'elisa' });
                if (versioning_1.majorVersion === 3) {
                    return user.validate().then(function (err) { return chai_1.expect(err).to.be.not.an('object'); });
                }
                else if (versioning_1.majorVersion === 4) {
                    return chai_1.expect(user.validate()).to.be.not.rejected;
                }
            });
            it('should produce an error (with msg)', function () {
                var User = /** @class */ (function (_super) {
                    __extends(User, _super);
                    function User() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    __decorate([
                        NotEmpty_1.NotEmpty({ msg: 'NotEmpty' }), Column_1.Column,
                        __metadata("design:type", String)
                    ], User.prototype, "name", void 0);
                    User = __decorate([
                        Table_1.Table
                    ], User);
                    return User;
                }(Model_1.Model));
                var sequelizeValidationOnly = sequelize_1.createSequelizeValidationOnly(false);
                sequelizeValidationOnly.addModels([User]);
                var user = new User({ name: '' });
                if (versioning_1.majorVersion === 3) {
                    return user.validate().then(function (err) { return chai_1.expect(err.errors[0].message).to.eq('NotEmpty'); });
                }
                else if (versioning_1.majorVersion === 4) {
                    return chai_1.expect(user.validate()).to.be.rejected;
                }
            });
        });
        describe('Validator', function () {
            describe('simple model, one validator', function () {
                var VALID_NAME = 'bob';
                var ERROR_MESSAGE = "Invalid name: Only '" + VALID_NAME + "' is valid";
                var _sequelize = sequelize_1.createSequelize({ modelPaths: [] });
                var User = /** @class */ (function (_super) {
                    __extends(User, _super);
                    function User() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    User.prototype.userValidator = function () {
                        if (this.name !== VALID_NAME) {
                            throw new Error(ERROR_MESSAGE);
                        }
                    };
                    __decorate([
                        Column_1.Column,
                        __metadata("design:type", String)
                    ], User.prototype, "name", void 0);
                    __decorate([
                        Validator_1.Validator,
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", []),
                        __metadata("design:returntype", void 0)
                    ], User.prototype, "userValidator", null);
                    User = __decorate([
                        Table_1.Table
                    ], User);
                    return User;
                }(Model_1.Model));
                _sequelize.addModels([User]);
                it('should throw', function () {
                    var user = new User({ name: 'will' });
                    if (versioning_1.majorVersion === 3) {
                        return user.validate().then(function (err) { return chai_1.expect(err.errors[0].message).to.eq(ERROR_MESSAGE); });
                    }
                    else if (versioning_1.majorVersion === 4) {
                        return chai_1.expect(user.validate()).to.be.rejected;
                    }
                });
                it('should not throw', function () {
                    var user = new User({ name: VALID_NAME });
                    if (versioning_1.majorVersion === 3) {
                        return user.validate().then(function (err) { return chai_1.expect(err).to.be.null; });
                    }
                    else if (versioning_1.majorVersion === 4) {
                        return chai_1.expect(user.validate()).to.be.fulfilled;
                    }
                });
            });
            describe('simple model, multiple validators', function () {
                var VALID_NAME = 'bob';
                var NAME_ERROR_MESSAGE = "Invalid name: Only '" + VALID_NAME + "' is valid";
                var VALID_AGE = 99;
                var AGE_ERROR_MESSAGE = "Invalid age: Only '" + VALID_AGE + "' is valid";
                var _sequelize = sequelize_1.createSequelize({ modelPaths: [] });
                var User = /** @class */ (function (_super) {
                    __extends(User, _super);
                    function User() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    User.prototype.nameValidator = function () {
                        if (this.name !== VALID_NAME) {
                            throw new Error(NAME_ERROR_MESSAGE);
                        }
                    };
                    User.prototype.ageValidator = function () {
                        if (this.age !== VALID_AGE) {
                            throw new Error(AGE_ERROR_MESSAGE);
                        }
                    };
                    __decorate([
                        Column_1.Column,
                        __metadata("design:type", String)
                    ], User.prototype, "name", void 0);
                    __decorate([
                        Column_1.Column,
                        __metadata("design:type", Number)
                    ], User.prototype, "age", void 0);
                    __decorate([
                        Validator_1.Validator,
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", []),
                        __metadata("design:returntype", void 0)
                    ], User.prototype, "nameValidator", null);
                    __decorate([
                        Validator_1.Validator,
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", []),
                        __metadata("design:returntype", void 0)
                    ], User.prototype, "ageValidator", null);
                    User = __decorate([
                        Table_1.Table
                    ], User);
                    return User;
                }(Model_1.Model));
                _sequelize.addModels([User]);
                it('should have metadata for multiple validators', function () {
                    var validate = Reflect.getMetadata('sequelize:options', User.prototype).validate;
                    chai_1.expect(validate).to.have.property('nameValidator');
                    chai_1.expect(validate).to.have.property('ageValidator');
                });
                it('should throw due to wrong name', function () {
                    var user = new User({ name: 'will', age: VALID_AGE });
                    if (versioning_1.majorVersion === 3) {
                        return user.validate().then(function (err) { return chai_1.expect(err.errors[0].message).to.eq(NAME_ERROR_MESSAGE); });
                    }
                    else if (versioning_1.majorVersion === 4) {
                        return chai_1.expect(user.validate()).to.be.rejectedWith(NAME_ERROR_MESSAGE);
                    }
                });
                it('should throw due to wrong age', function () {
                    var user = new User({ name: VALID_NAME, age: 1 });
                    if (versioning_1.majorVersion === 3) {
                        return user.validate().then(function (err) { return chai_1.expect(err.errors[0].message).to.eq(AGE_ERROR_MESSAGE); });
                    }
                    else if (versioning_1.majorVersion === 4) {
                        return chai_1.expect(user.validate()).to.be.rejectedWith(AGE_ERROR_MESSAGE);
                    }
                });
                // it('should not throw', () => {
                //   const user =  new User({name: VALID_NAME});
                //
                //   if (majorVersion === 3) {
                //     return user.validate().then(err => expect(err).to.be.null);
                //   } else if (majorVersion === 4) {
                //     return expect(user.validate()).to.be.fulfilled;
                //   }
                // });
            });
        });
    });
    describe('only', function () {
        it('should not throw', function () {
            chai_1.expect(function () { return sequelize_1.createSequelizeValidationOnly(); }).not.to.throw();
        });
    });
});
//# sourceMappingURL=validation.spec.js.map