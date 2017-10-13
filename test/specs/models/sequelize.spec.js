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
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var sequelize_1 = require("../../utils/sequelize");
var Game_1 = require("../../models/exports/Game");
var gamer_model_1 = require("../../models/exports/gamer.model");
var Sequelize_1 = require("../../../lib/models/Sequelize");
var Model_1 = require("../../../lib/models/Model");
var Table_1 = require("../../../lib/annotations/Table");
describe('sequelize', function () {
    var sequelize = sequelize_1.createSequelize(false);
    var connectionUri = "sqlite://root@localhost/__";
    function testOptionsProp(instance) {
        chai_1.expect(instance).to.have.property('options').that.have.property('dialect').that.eqls('sqlite');
        chai_1.expect(instance).to.have.property('config').that.have.property('host').that.eqls('localhost');
        chai_1.expect(instance).to.have.property('config').that.have.property('database').that.eqls('__');
        chai_1.expect(instance).to.have.property('config').that.have.property('username').that.eqls('root');
    }
    describe('constructor', function () {
        it('should equal Sequelize class', function () {
            chai_1.expect(sequelize.constructor).to.equal(Sequelize_1.Sequelize);
        });
    });
    describe('constructor: using "name" property as a db name', function () {
        var db = '__';
        var sequelizeDbName = new Sequelize_1.Sequelize({
            name: db,
            dialect: 'sqlite',
            username: 'root',
            password: '',
            storage: ':memory:',
            logging: !('SEQ_SILENT' in process.env)
        });
        it('should equal Sequelize class', function () {
            chai_1.expect(sequelizeDbName.constructor).to.equal(Sequelize_1.Sequelize);
        });
        it('should contain database property, which equal to db.', function () {
            chai_1.expect(sequelizeDbName)
                .to.have.property('config')
                .that.have.property('database')
                .that.eqls(db);
        });
    });
    describe('constructor using uri in options object', function () {
        var sequelizeUri = new Sequelize_1.Sequelize({
            url: connectionUri,
            storage: ':memory:',
            logging: !('SEQ_SILENT' in process.env),
            pool: { max: 8, min: 0 }
        });
        it('should equal Sequelize class', function () {
            chai_1.expect(sequelizeUri.constructor).to.equal(Sequelize_1.Sequelize);
        });
        it('should contain valid options extracted from connection string', function () {
            testOptionsProp(sequelizeUri);
        });
        it('should contain additional Sequelize options', function () {
            chai_1.expect(sequelizeUri)
                .to.have.property('options')
                .that.have.property('pool')
                .that.have.property('max')
                .that.eqls(8);
        });
    });
    describe('constructor using uri string', function () {
        var sequelizeUri = new Sequelize_1.Sequelize(connectionUri);
        it('should equal Sequelize class', function () {
            chai_1.expect(sequelizeUri.constructor).to.equal(Sequelize_1.Sequelize);
        });
        it('should contain valid options extracted from connection string', function () {
            testOptionsProp(sequelizeUri);
        });
    });
    describe('global define options', function () {
        var DEFINE_OPTIONS = { timestamps: true, underscoredAll: true };
        var sequelizeWithDefine = sequelize_1.createSequelize(false, DEFINE_OPTIONS);
        it('should have define options', function () {
            chai_1.expect(sequelizeWithDefine)
                .to.have.property('options')
                .that.has.property('define')
                .that.eqls(DEFINE_OPTIONS);
        });
        it('should set define options for models', function () {
            var User = /** @class */ (function (_super) {
                __extends(User, _super);
                function User() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                User = __decorate([
                    Table_1.Table
                ], User);
                return User;
            }(Model_1.Model));
            sequelizeWithDefine.addModels([User]);
            Object
                .keys(DEFINE_OPTIONS)
                .forEach(function (key) {
                chai_1.expect(User)
                    .to.have.property('options')
                    .that.have.property(key, DEFINE_OPTIONS[key]);
            });
        });
    });
    describe('addModels', function () {
        it('should not throw', function () {
            chai_1.expect(function () { return sequelize.addModels([__dirname + '/../../models/exports/']); }).not.to.throw();
        });
        it('should throw', function () {
            chai_1.expect(function () { return sequelize.addModels([__dirname + '/../../models/exports/throws']); }).to.throw();
        });
        describe('default exported models', function () {
            it('should work as expected', function () {
                sequelize.addModels([__dirname + '/../../models/exports/']);
                chai_1.expect(function () { return gamer_model_1.default.build({}); }).not.to.throw;
                var gamer = gamer_model_1.default.build({ nickname: 'the_gamer' });
                chai_1.expect(gamer.nickname).to.equal('the_gamer');
            });
        });
        describe('named exported models', function () {
            it('should work as expected', function () {
                sequelize.addModels([__dirname + '/../../models/exports/']);
                chai_1.expect(function () { return Game_1.Game.build({}); }).not.to.throw;
                var game = Game_1.Game.build({ title: 'Commander Keen' });
                chai_1.expect(game.title).to.equal('Commander Keen');
            });
        });
        describe('definition files', function () {
            it('should not load in definition files', function () {
                sequelize.addModels([__dirname + '/../../models/exports/']);
                chai_1.expect(function () { return Game_1.Game.build({}); }).not.to.throw;
                chai_1.expect(Object.keys(sequelize.models).length).to.equal(2);
            });
        });
    });
    describe('model', function () {
        it('should make class references of loaded models available', function () {
            sequelize.addModels([__dirname + '/../../models/exports/']);
            chai_1.expect(sequelize._).to.have.property('Game', Game_1.Game);
            chai_1.expect(sequelize._).to.have.property('Gamer', gamer_model_1.default);
        });
    });
});
//# sourceMappingURL=sequelize.spec.js.map