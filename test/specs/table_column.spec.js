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
var chaiAsPromised = require("chai-as-promised");
var index_1 = require("../../index");
var sequelize_1 = require("../utils/sequelize");
var User_1 = require("../models/User");
var models_1 = require("../../lib/services/models");
var Shoe_1 = require("../models/Shoe");
var _ = require("lodash");
chai_1.use(chaiAsPromised);
/* tslint:disable:max-classes-per-file */
describe('table_column', function () {
    var sequelize = sequelize_1.createSequelize();
    var expectedUserAttributes = {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: index_1.DataType.INTEGER
        },
        uuidv1: {
            type: index_1.DataType.UUID,
            defaultValue: index_1.DataType.UUIDV1
        },
        uuidv4: {
            type: index_1.DataType.UUID,
            unique: true,
            defaultValue: index_1.DataType.UUIDV4
        },
        username: {
            type: index_1.DataType.STRING
        },
        username2: {
            type: index_1.DataType.STRING(5)
        },
        aNumber: {
            type: index_1.DataType.INTEGER
        },
        bNumber: {
            type: index_1.DataType.INTEGER
        },
        isAdmin: {
            type: index_1.DataType.BOOLEAN
        },
        isSuperUser: {
            type: index_1.DataType.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        touchedAt: {
            type: index_1.DataType.DATE,
            defaultValue: index_1.DataType.NOW
        },
        birthDate: {
            type: index_1.DataType.DATE
        },
        dateAllowNullTrue: {
            allowNull: true,
            type: index_1.DataType.DATE
        },
        name: {
            type: index_1.DataType.STRING
        },
        bio: {
            type: index_1.DataType.TEXT
        },
        email: {
            type: index_1.DataType.STRING
        }
    };
    beforeEach(function () { return sequelize.sync({ force: true }); });
    describe('define options', function () {
        it('should be retrievable from class prototype', function () {
            var userDefineOptions = models_1.getOptions(User_1.User.prototype);
            chai_1.expect(userDefineOptions).not.to.be.undefined;
            var shoeDefineOptions = models_1.getOptions(Shoe_1.Shoe.prototype);
            chai_1.expect(shoeDefineOptions).not.to.be.undefined;
        });
        it('should be retrievable from an instance', function () {
            var user = new User_1.User();
            var userDefineOptions = models_1.getOptions(user);
            chai_1.expect(userDefineOptions).not.to.be.undefined;
            var shoe = new Shoe_1.Shoe();
            var shoeDefineOptions = models_1.getOptions(shoe);
            chai_1.expect(shoeDefineOptions).not.to.be.undefined;
        });
        it('should set freezeTableName to true', function () {
            var userDefineOptions = models_1.getOptions(User_1.User.prototype);
            chai_1.expect(userDefineOptions).to.have.property('freezeTableName', true);
        });
        it('should have explicitly defined tableName', function () {
            var shoeDefineOptions = models_1.getOptions(Shoe_1.Shoe.prototype);
            chai_1.expect(shoeDefineOptions).to.have.property('tableName', Shoe_1.SHOE_TABLE_NAME);
        });
        it('should have class methods', function () {
            var userDefineOptions = models_1.getOptions(User_1.User.prototype);
            chai_1.expect(userDefineOptions).to.have.property('classMethods', User_1.User);
            var shoeDefineOptions = models_1.getOptions(Shoe_1.Shoe.prototype);
            chai_1.expect(shoeDefineOptions).to.have.property('classMethods', Shoe_1.Shoe);
        });
        it('should have instance methods', function () {
            var userDefineOptions = models_1.getOptions(User_1.User.prototype);
            chai_1.expect(userDefineOptions).to.have.property('instanceMethods', User_1.User.prototype);
            var shoeDefineOptions = models_1.getOptions(Shoe_1.Shoe.prototype);
            chai_1.expect(shoeDefineOptions).to.have.property('instanceMethods', Shoe_1.Shoe.prototype);
        });
    });
    describe('attribute options', function () {
        it('should be retrievable from class prototype', function () {
            var attributes = models_1.getAttributes(User_1.User.prototype);
            chai_1.expect(attributes).not.to.be.undefined;
        });
        it('should be retrievable from an instance', function () {
            var user = new User_1.User();
            var attributes = models_1.getAttributes(user);
            chai_1.expect(attributes).not.to.be.undefined;
        });
        it('should have annotated attributes', function () {
            var attributes = models_1.getAttributes(User_1.User.prototype);
            Object
                .keys(expectedUserAttributes)
                .forEach(function (key) {
                chai_1.expect(attributes).to.have.property(key);
                Object
                    .keys(expectedUserAttributes[key])
                    .forEach(function (attrOptionKey) {
                    try {
                        chai_1.expect(attributes[key]).to.have.property(attrOptionKey).that.eql(expectedUserAttributes[key][attrOptionKey]);
                    }
                    catch (e) {
                        e.message += " for property \"" + key + "\"";
                        throw e;
                    }
                });
            });
        });
    });
    describe('rawAttributes', function () {
        var rawAttributes = User_1.User['rawAttributes'];
        it('should have annotated attributes', function () {
            Object
                .keys(expectedUserAttributes)
                .forEach(function (key) {
                chai_1.expect(rawAttributes).to.have.property(key);
            });
        });
        it('should not have attributes, that are note annotated by column decorator', function () {
            chai_1.expect(rawAttributes).not.to.have.property('extraField');
            chai_1.expect(rawAttributes).not.to.have.property('extraField2');
            chai_1.expect(rawAttributes).not.to.have.property('extraField3');
        });
        it('should have passed attribute options', function () {
            var uidv1SeqRawAttrOptions = rawAttributes.uuidv1;
            chai_1.expect(uidv1SeqRawAttrOptions).to.have.property('type');
            chai_1.expect(uidv1SeqRawAttrOptions.type).to.be.an.instanceOf(index_1.DataType.UUID);
            chai_1.expect(uidv1SeqRawAttrOptions).to.have.property('defaultValue');
            chai_1.expect(uidv1SeqRawAttrOptions.defaultValue).to.be.an.instanceof(index_1.DataType.UUIDV1);
            var uidv4SeqRawAttrOptions = rawAttributes.uuidv4;
            chai_1.expect(uidv4SeqRawAttrOptions).to.have.property('type');
            chai_1.expect(uidv4SeqRawAttrOptions.type).to.be.an.instanceOf(index_1.DataType.UUID);
            chai_1.expect(uidv4SeqRawAttrOptions).to.have.property('defaultValue');
            chai_1.expect(uidv4SeqRawAttrOptions.defaultValue).to.be.an.instanceof(index_1.DataType.UUIDV4);
        });
    });
    describe('column', function () {
        it('should create appropriate sql query', function () {
            var seq = sequelize_1.createSequelize(false);
            var Bottle = /** @class */ (function (_super) {
                __extends(Bottle, _super);
                function Bottle() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                __decorate([
                    index_1.Column(index_1.DataType.STRING(5)),
                    __metadata("design:type", String)
                ], Bottle.prototype, "brand", void 0);
                __decorate([
                    index_1.Column(index_1.DataType.CHAR(2)),
                    __metadata("design:type", String)
                ], Bottle.prototype, "key", void 0);
                __decorate([
                    index_1.Column(index_1.DataType.INTEGER(100)),
                    __metadata("design:type", Number)
                ], Bottle.prototype, "num", void 0);
                Bottle = __decorate([
                    index_1.Table
                ], Bottle);
                return Bottle;
            }(index_1.Model));
            seq.addModels([Bottle]);
            return Bottle.sync({
                force: true, logging: _.after(2, _.once(function (sql) {
                    // tslint:disable:max-line-length
                    chai_1.expect(sql).to.match(/CREATE TABLE IF NOT EXISTS `Bottle` \(`id` INTEGER PRIMARY KEY AUTOINCREMENT, `brand` VARCHAR\(5\), `key` CHAR\(2\), `num` INTEGER\(100\)\)/);
                }))
            });
        });
    });
    describe('accessors', function () {
        describe('get', function () {
            var User = /** @class */ (function (_super) {
                __extends(User, _super);
                function User() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(User.prototype, "name", {
                    get: function () {
                        return 'My name is ' + this.getDataValue('name');
                    },
                    set: function (value) {
                        this.setDataValue('name', value);
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    index_1.Column,
                    __metadata("design:type", String),
                    __metadata("design:paramtypes", [String])
                ], User.prototype, "name", null);
                User = __decorate([
                    index_1.Table
                ], User);
                return User;
            }(index_1.Model));
            sequelize.addModels([User]);
            it('should consider getter', function () {
                var user = new User({});
                user.name = 'Peter';
                chai_1.expect(user.name).to.equal('My name is Peter');
            });
            it('shouldn\'t store value from getter into db', function () {
                var user = new User({});
                user.name = 'elli';
                return user
                    .save()
                    .then(function () { return User.findById(user.id); })
                    .then(function (_user) {
                    chai_1.expect(_user.getDataValue('name')).to.equal('elli');
                });
            });
        });
        describe('set', function () {
            var User = /** @class */ (function (_super) {
                __extends(User, _super);
                function User() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(User.prototype, "name", {
                    get: function () {
                        return this.getDataValue('name');
                    },
                    set: function (value) {
                        this.setDataValue('name', value.toUpperCase());
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    index_1.Column,
                    __metadata("design:type", String),
                    __metadata("design:paramtypes", [String])
                ], User.prototype, "name", null);
                User = __decorate([
                    index_1.Table
                ], User);
                return User;
            }(index_1.Model));
            sequelize.addModels([User]);
            it('should consider setter', function () {
                var name = 'Peter';
                var user = new User({});
                user.name = name;
                chai_1.expect(user.name).to.equal(name.toUpperCase());
            });
            it('should store value from setter into db', function () {
                var name = 'elli';
                var user = new User({});
                user.name = name;
                return user
                    .save()
                    .then(function () { return User.findById(user.id); })
                    .then(function (_user) {
                    chai_1.expect(_user.getDataValue('name')).to.equal(name.toUpperCase());
                });
            });
        });
    });
});
//# sourceMappingURL=table_column.spec.js.map