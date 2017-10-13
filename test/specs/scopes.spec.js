"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var chaiAsPromised = require("chai-as-promised");
var sequelize_1 = require("../utils/sequelize");
var scopes_1 = require("../../lib/services/scopes");
var ShoeWithScopes_1 = require("../models/ShoeWithScopes");
var Manufacturer_1 = require("../models/Manufacturer");
var Person_1 = require("../models/Person");
chai_1.use(chaiAsPromised);
describe('scopes', function () {
    var sequelize = sequelize_1.createSequelize();
    beforeEach(function () { return sequelize.sync({ force: true }); });
    describe('options', function () {
        it('should be retrievable from class prototype', function () {
            var showScopeOptions = scopes_1.getScopeOptions(ShoeWithScopes_1.ShoeWithScopes.prototype);
            chai_1.expect(showScopeOptions).not.to.be.undefined;
        });
        it('should contain default and other scopes', function () {
            var showScopeOptions = scopes_1.getScopeOptions(ShoeWithScopes_1.ShoeWithScopes.prototype);
            chai_1.expect(showScopeOptions).to.have.property('defaultScope').that.eqls(ShoeWithScopes_1.SHOE_DEFAULT_SCOPE);
            chai_1.expect(showScopeOptions).to.have.property('full').that.eqls(ShoeWithScopes_1.SHOE_SCOPES.full);
        });
    });
    describe('find', function () {
        var BRAND = 'adiwas';
        var OWNER = 'bob';
        beforeEach(function () { return ShoeWithScopes_1.ShoeWithScopes
            .create({
            secretKey: 'j435njk3',
            primaryColor: 'red',
            secondaryColor: 'blue',
            producedAt: new Date(),
            manufacturer: {
                brand: BRAND,
                notInScopeBrandOnly: 'invisible :)',
            },
            owner: {
                name: OWNER
            }
        }, { include: [Manufacturer_1.Manufacturer, Person_1.Person] }); });
        it('should consider default scope', function () {
            return ShoeWithScopes_1.ShoeWithScopes.findOne()
                .then(function (shoe) {
                chai_1.expect(Object.keys(shoe['dataValues'])).to.eql(ShoeWithScopes_1.SHOE_DEFAULT_SCOPE.attributes);
            });
        });
        it('should consider other scopes', function () {
            return ShoeWithScopes_1.ShoeWithScopes.scope('full').findOne()
                .then(function (shoe) {
                chai_1.expect(shoe).to.have.property('manufacturer').which.is.not.null;
                chai_1.expect(shoe).to.have.property('manufacturer').which.have.property('brand', BRAND);
            })
                .then(function () { return ShoeWithScopes_1.ShoeWithScopes.scope('yellow').findAll(); })
                .then(function (yellowShoes) {
                chai_1.expect(yellowShoes).to.be.empty;
            })
                .then(function () { return ShoeWithScopes_1.ShoeWithScopes.scope('noImg').findAll(); })
                .then(function (noImgShoes) {
                chai_1.expect(noImgShoes).to.be.not.empty;
            });
        });
        it('should not consider default scope due to unscoped call', function () {
            return ShoeWithScopes_1.ShoeWithScopes
                .unscoped()
                .findOne()
                .then(function (shoe) {
                chai_1.expect(shoe).to.have.property('secretKey').which.is.a('string');
            });
        });
        describe('with include options', function () {
            it('should consider scopes and additional included model (object)', function () {
                return chai_1.expect(ShoeWithScopes_1.ShoeWithScopes
                    .scope('full')
                    .findOne({
                    include: [{
                            model: Person_1.Person,
                        }]
                })
                    .then(function (shoe) {
                    chai_1.expect(shoe).to.have.property('manufacturer').which.is.not.null;
                    chai_1.expect(shoe).to.have.property('manufacturer').which.have.property('brand', BRAND);
                    chai_1.expect(shoe).to.have.property('owner').which.is.not.null;
                })).not.to.be.rejected;
            });
            it('should consider scopes and additional included model (model)', function () {
                return chai_1.expect(ShoeWithScopes_1.ShoeWithScopes
                    .scope('full')
                    .findOne({
                    include: [Person_1.Person]
                })
                    .then(function (shoe) {
                    chai_1.expect(shoe).to.have.property('manufacturer').which.is.not.null;
                    chai_1.expect(shoe).to.have.property('manufacturer').which.have.property('brand', BRAND);
                    chai_1.expect(shoe).to.have.property('owner').which.is.not.null;
                })).not.to.be.rejected;
            });
            it('should not consider default scope due to unscoped call, but additonal includes (object)', function () {
                return ShoeWithScopes_1.ShoeWithScopes
                    .unscoped()
                    .findOne({
                    include: [{ model: Person_1.Person }]
                })
                    .then(function (shoe) {
                    chai_1.expect(shoe).to.have.property('secretKey').which.is.not.null;
                    chai_1.expect(shoe).to.have.property('owner').which.is.not.null;
                });
            });
            it('should not consider default scope due to unscoped call, but additonal includes (model)', function () {
                return ShoeWithScopes_1.ShoeWithScopes
                    .unscoped()
                    .findOne({
                    include: [Person_1.Person]
                })
                    .then(function (shoe) {
                    chai_1.expect(shoe).to.have.property('secretKey').which.is.not.null;
                    chai_1.expect(shoe).to.have.property('owner').which.is.not.null;
                });
            });
            describe('with using scoped included model', function () {
                it('should consider scope of included model (without own scope)', function () {
                    return ShoeWithScopes_1.ShoeWithScopes
                        .findOne({
                        include: [Manufacturer_1.Manufacturer.scope('brandOnly')]
                    })
                        .then(function (shoe) {
                        chai_1.expect(shoe).to.have.property('manufacturer')
                            .that.have.property('notInScopeBrandOnly')
                            .which.is.undefined;
                    });
                });
                it('should consider scope of included model (with own scope)', function () {
                    return ShoeWithScopes_1.ShoeWithScopes
                        .scope('red')
                        .findOne({
                        include: [Manufacturer_1.Manufacturer.scope('brandOnly')]
                    })
                        .then(function (shoe) {
                        chai_1.expect(shoe).to.have.property('manufacturer')
                            .that.have.property('notInScopeBrandOnly')
                            .which.is.undefined;
                    });
                });
            });
        });
        describe('with nested scope', function () {
            it('should consider nested scope', function () {
                return ShoeWithScopes_1.ShoeWithScopes
                    .scope('manufacturerWithScope')
                    .findOne()
                    .then(function (shoe) {
                    chai_1.expect(shoe).to.have.property('manufacturer')
                        .that.have.property('notInScopeBrandOnly')
                        .which.is.undefined;
                });
            });
            it('should not consider nested scope', function () {
                return ShoeWithScopes_1.ShoeWithScopes
                    .scope('full')
                    .findOne()
                    .then(function (shoe) {
                    chai_1.expect(shoe).to.have.property('manufacturer')
                        .that.have.property('notInScopeBrandOnly')
                        .which.is.a('string');
                });
            });
        });
        describe('with scope function', function () {
            it('should find appropriate shoe due to correctly passed scope function param', function () {
                return ShoeWithScopes_1.ShoeWithScopes
                    .scope({ method: ['primaryColor', 'red'] })
                    .findOne()
                    .then(function (shoe) {
                    chai_1.expect(shoe).to.have.property('primaryColor', 'red');
                });
            });
            it('should find appropriate shoe due to correctly passed scope function param including associated model', function () {
                return ShoeWithScopes_1.ShoeWithScopes
                    .scope({ method: ['primaryColorWithManufacturer', 'red'] })
                    .findOne()
                    .then(function (shoe) {
                    chai_1.expect(shoe).to.have.property('primaryColor', 'red');
                    chai_1.expect(shoe).to.have.property('manufacturer').that.is.an('object');
                });
            });
        });
    });
});
//# sourceMappingURL=scopes.spec.js.map