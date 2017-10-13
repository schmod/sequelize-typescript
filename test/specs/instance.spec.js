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
var sinon_1 = require("sinon");
var chaiAsPromised = require("chai-as-promised");
var validateUUID = require("uuid-validate");
var sequelize_1 = require("../utils/sequelize");
var index_1 = require("../../index");
var User_1 = require("../models/User");
var TimeStampsUser_1 = require("../models/TimeStampsUser");
var Book_1 = require("../models/Book");
var Page_1 = require("../models/Page");
var Team_1 = require("../models/Team");
var Player_1 = require("../models/Player");
var Shoe_1 = require("../models/Shoe");
var Person_1 = require("../models/Person");
var Box_1 = require("../models/Box");
var UserWithValidation_1 = require("../models/UserWithValidation");
var UserWithNoAutoIncrementation_1 = require("../models/UserWithNoAutoIncrementation");
var UserWithCustomUpdatedAt_1 = require("../models/UserWithCustomUpdatedAt");
var UserWithCreatedAtButWithoutUpdatedAt_1 = require("../models/UserWithCreatedAtButWithoutUpdatedAt");
var UserWithVersion_1 = require("../models/UserWithVersion");
var chaiDatetime = require("chai-datetime");
// import {UserWithSwag} from "../models/UserWithSwag";
// TODO@robin create belongs to many with through options "add" test
var InstanceError = require('sequelize').InstanceError;
chai_1.use(chaiAsPromised);
chai_1.use(chaiDatetime);
/* tslint:disable:max-classes-per-file */
describe('instance', function () {
    var sequelize = sequelize_1.createSequelize();
    beforeEach(function () { return sequelize.sync({ force: true }); });
    describe('instanceof', function () {
        beforeEach(function () {
            return Promise.all([
                Book_1.Book.create({
                    title: 'Crime and Punishment',
                    pages: [{ content: 'A' }]
                }, { include: [Page_1.Page] }),
                Book_1.Book.create({
                    title: 'The Brothers Karamazov',
                    pages: [{ content: 'B' }, { content: 'C' }]
                }, { include: [Page_1.Page] })
            ]);
        });
        it('should return true for found instance (findOne)', function () {
            return Book_1.Book
                .findOne()
                .then(function (book) {
                chai_1.expect(book).to.be.an.instanceof(Book_1.Book);
                chai_1.expect(book).to.be.an.instanceof(index_1.Model);
            });
        });
        it('should return true for found instances (findAll)', function () {
            return Book_1.Book
                .findAll()
                .then(function (books) {
                books.forEach(function (book) {
                    chai_1.expect(book).to.be.an.instanceof(Book_1.Book);
                    chai_1.expect(book).to.be.an.instanceof(index_1.Model);
                });
            });
        });
        it('should return true for include values of found instance', function () {
            return Book_1.Book
                .findOne({ include: [Page_1.Page] })
                .then(function (book) {
                book.pages.forEach(function (page) {
                    chai_1.expect(page).to.be.an.instanceof(Page_1.Page);
                    chai_1.expect(page).to.be.an.instanceof(index_1.Model);
                });
            });
        });
    });
    describe('isNewRecord', function () {
        it('returns true for non-saved objects', function () {
            var user = User_1.User.build({ username: 'user' });
            chai_1.expect(user.id).to.be.null;
            chai_1.expect(user.isNewRecord).to.be.ok;
        });
        it('returns false for saved objects', function () {
            return User_1.User
                .build({ username: 'user' })
                .save()
                .then(function (user) {
                chai_1.expect(user.isNewRecord).to.not.be.ok;
            });
        });
        it('returns false for created objects', function () {
            return User_1.User
                .create({ username: 'user' })
                .then(function (user) {
                chai_1.expect(user.id).to.not.be.null;
                chai_1.expect(user.isNewRecord).to.not.be.ok;
            });
        });
        it('returns false for objects found by find method', function () {
            return User_1.User
                .create({ username: 'user' })
                .then(function () {
                return User_1.User
                    .create({ username: 'user' })
                    .then(function (user) {
                    return User_1.User
                        .findById(user.id)
                        .then(function (_user) {
                        chai_1.expect(_user).to.not.be.null;
                        chai_1.expect(_user && _user.isNewRecord).to.not.be.ok;
                    });
                });
            });
        });
        it('returns false for objects found by findAll method', function () {
            var users = [];
            for (var i = 0; i < 10; i++) {
                users[users.length] = { username: 'user' };
            }
            return User_1.User
                .bulkCreate(users)
                .then(function () {
                return User_1.User
                    .findAll()
                    .then(function (_users) {
                    _users.forEach(function (u) {
                        chai_1.expect(u.isNewRecord).to.not.be.ok;
                    });
                });
            });
        });
    });
    describe('increment', function () {
        beforeEach(function () { return User_1.User.create({ id: 1, aNumber: 0, bNumber: 0 }); });
        // TODO transactions doesn't seem to work with sqlite3
        // if (sequelize['dialect']['supports']['transactions']) {
        //
        //   it('supports transactions', () =>
        //     User
        //       .findOne()
        //       .then((user: User) =>
        //         sequelize
        //           .transaction()
        //           .then(transaction =>
        //
        //             user
        //               .increment('aNumber', {by: 2, transaction})
        //               .then(() =>
        //                 User
        //                   .findAll()
        //                   .then((users1) =>
        //
        //                     User
        //                       .findAll<User>({transaction})
        //                       .then((users2) => {
        //
        //                         // expect(users1[0].aNumber).to.equal(0); TODO check
        //                         expect(users2[0].aNumber).to.equal(2);
        //                       })
        //                       .then(() => transaction.rollback())
        //                   )
        //                   .then(() => User.findAll())
        //               )
        //           )
        //       )
        //   );
        // }
        if (sequelize['dialect']['supports']['returnValues']) {
            it('supports returning', function () {
                return User_1.User
                    .findById(1)
                    .then(function (user1) {
                    if (user1) {
                        return user1
                            .increment('aNumber', { by: 2 })
                            .then(function () {
                            chai_1.expect(user1.aNumber).to.be.equal(2);
                        });
                    }
                });
            });
        }
        it('supports where conditions', function () {
            return User_1.User
                .findById(1)
                .then(function (user1) {
                if (user1) {
                    return user1.increment(['aNumber'], { by: 2, where: { bNumber: 1 } })
                        .then(function () {
                        return User_1.User
                            .findById(1)
                            .then(function (user3) {
                            chai_1.expect(user3.aNumber).to.be.equal(0);
                        });
                    });
                }
            });
        });
        it('with array', function () {
            return User_1.User
                .findById(1)
                .then(function (user1) {
                return user1.increment(['aNumber'], { by: 2 })
                    .then(function () {
                    return User_1.User
                        .findById(1)
                        .then(function (user3) {
                        chai_1.expect(user3.aNumber).to.be.equal(2);
                    });
                });
            });
        });
        it('with single field', function () {
            return User_1.User
                .findById(1)
                .then(function (user1) {
                return user1
                    .increment('aNumber', { by: 2 })
                    .then(function () {
                    return User_1.User
                        .findById(1)
                        .then(function (user3) {
                        chai_1.expect(user3.aNumber).to.be.equal(2);
                    });
                });
            });
        });
        it('with single field and no value', function () {
            return User_1.User
                .findById(1)
                .then(function (user1) {
                return user1.increment('aNumber')
                    .then(function () {
                    return User_1.User
                        .findById(1)
                        .then(function (user2) {
                        chai_1.expect(user2.aNumber).to.be.equal(1);
                    });
                });
            });
        });
        it('should still work right with other concurrent updates', function () {
            return User_1.User
                .findById(1)
                .then(function (user1) {
                // Select the user again (simulating a concurrent query)
                return User_1.User
                    .findById(1)
                    .then(function (user2) {
                    return user2
                        .updateAttributes({
                        aNumber: user2.aNumber + 1
                    })
                        .then(function () {
                        return user1
                            .increment(['aNumber'], { by: 2 })
                            .then(function () {
                            return User_1.User
                                .findById(1)
                                .then(function (user5) {
                                chai_1.expect(user5.aNumber).to.be.equal(3);
                            });
                        });
                    });
                });
            });
        });
        it('should still work right with other concurrent increments', function () {
            return User_1.User
                .findById(1)
                .then(function (user1) {
                return sequelize.Promise.all([
                    user1.increment(['aNumber'], { by: 2 }),
                    user1.increment(['aNumber'], { by: 2 }),
                    user1.increment(['aNumber'], { by: 2 })
                ])
                    .then(function () {
                    return User_1.User
                        .findById(1)
                        .then(function (user2) {
                        chai_1.expect(user2.aNumber).to.equal(6);
                    });
                });
            });
        });
        it('with key value pair', function () {
            return User_1.User
                .findById(1)
                .then(function (user1) {
                return user1
                    .increment({ aNumber: 1, bNumber: 2 })
                    .then(function () {
                    return User_1.User
                        .findById(1)
                        .then(function (user3) {
                        chai_1.expect(user3.aNumber).to.be.equal(1);
                        chai_1.expect(user3.bNumber).to.be.equal(2);
                    });
                });
            });
        });
        it('with timestamps set to true', function () {
            var clock = sinon_1.useFakeTimers();
            var oldDate;
            return TimeStampsUser_1.TimeStampsUser
                .sync({ force: true })
                .then(function () { return TimeStampsUser_1.TimeStampsUser.create({ aNumber: 1 }); })
                .then(function (user) {
                oldDate = user.updatedAt;
                clock.tick(1000);
                return user.increment('aNumber', { by: 1 });
            })
                .then(function () { return TimeStampsUser_1.TimeStampsUser.findById(1); })
                .then(function (user) {
                chai_1.expect(user).to.have.property('updatedAt');
                chai_1.expect(user.updatedAt).to.be.greaterThan(oldDate);
            });
        });
        it('with timestamps set to true and options.silent set to true', function () {
            var oldDate;
            return TimeStampsUser_1.TimeStampsUser
                .sync({ force: true })
                .then(function () { return TimeStampsUser_1.TimeStampsUser.create({ aNumber: 1 }); })
                .then(function (user) {
                oldDate = user.updatedAt;
                return user.increment('aNumber', { by: 1, silent: true });
            })
                .then(function () { return TimeStampsUser_1.TimeStampsUser.findById(1); })
                .then(function (user) {
                chai_1.expect(user).to.have.property('updatedAt');
                chai_1.expect(user.updatedAt).to.eqls(oldDate);
            });
        });
    });
    describe('decrement', function () {
        // TODO transactions doesn't seem to work with sqlite3
        // if (sequelize['dialect']['supports']['transactions']) {
        //
        //   it('supports transactions', () =>
        //     User
        //       .create<User>({aNumber: 3})
        //       .then((user) =>
        //         sequelize
        //           .transaction()
        //           .then(transaction =>
        //             user
        //               .decrement('aNumber', {by: 2, transaction})
        //               .then(() =>
        //                 User
        //                   .findAll()
        //                   .then((users1) =>
        //                     User
        //                       .findAll<User>({transaction})
        //                       .then((users2) => {
        //                         // expect(users1[0].aNumber).to.equal(3); // TODO transactions does not seem to work
        //                         expect(users2[0].aNumber).to.equal(1);
        //                       })
        //                       .then(() => transaction.rollback())
        //                   )
        //               )
        //           )
        //       )
        //   );
        // }
        it('with array', function () {
            return User_1.User
                .create({ aNumber: 0 })
                .then(function () { return User_1.User.findById(1); })
                .then(function (user1) {
                return user1
                    .decrement(['aNumber'], { by: 2 })
                    .then(function () {
                    return User_1.User
                        .findById(1)
                        .then(function (user3) {
                        chai_1.expect(user3.aNumber).to.be.equal(-2);
                    });
                });
            });
        });
        it('with single field', function () {
            return User_1.User
                .create({ aNumber: 0 })
                .then(function () { return User_1.User.findById(1); })
                .then(function (user1) {
                return user1
                    .decrement('aNumber', { by: 2 })
                    .then(function () {
                    return User_1.User
                        .findById(1)
                        .then(function (user3) {
                        chai_1.expect(user3.aNumber).to.be.equal(-2);
                    });
                });
            });
        });
        it('with single field and no value', function () {
            return User_1.User
                .create({ aNumber: 0 })
                .then(function () { return User_1.User.findById(1); })
                .then(function (user1) {
                return user1
                    .decrement('aNumber')
                    .then(function () {
                    return User_1.User
                        .findById(1)
                        .then(function (user2) {
                        chai_1.expect(user2.aNumber).to.be.equal(-1);
                    });
                });
            });
        });
        it('should still work right with other concurrent updates', function () {
            return User_1.User
                .create({ aNumber: 0 })
                .then(function () { return User_1.User.findById(1); })
                .then(function (user1) {
                // Select the user again (simulating a concurrent query)
                return User_1.User
                    .findById(1)
                    .then(function (user2) {
                    return user2
                        .updateAttributes({
                        aNumber: user2.aNumber + 1
                    })
                        .then(function () {
                        return user1
                            .decrement(['aNumber'], { by: 2 })
                            .then(function () {
                            return User_1.User
                                .findById(1)
                                .then(function (user5) {
                                chai_1.expect(user5.aNumber).to.be.equal(-1);
                            });
                        });
                    });
                });
            });
        });
        it('should still work right with other concurrent increments', function () {
            return User_1.User
                .create({ aNumber: 0 })
                .then(function () { return User_1.User.findById(1); })
                .then(function (user1) {
                return sequelize.Promise.all([
                    user1.decrement(['aNumber'], { by: 2 }),
                    user1.decrement(['aNumber'], { by: 2 }),
                    user1.decrement(['aNumber'], { by: 2 })
                ])
                    .then(function () {
                    return User_1.User
                        .findById(1)
                        .then(function (user2) {
                        chai_1.expect(user2.aNumber).to.equal(-6);
                    });
                });
            });
        });
        it('with key value pair', function () {
            return User_1.User
                .create({ aNumber: 0, bNumber: 0 })
                .then(function () { return User_1.User.findById(1); })
                .then(function (user1) {
                return user1
                    .decrement({ aNumber: 1, bNumber: 2 })
                    .then(function () {
                    return User_1.User
                        .findById(1)
                        .then(function (user3) {
                        chai_1.expect(user3.aNumber).to.be.equal(-1);
                        chai_1.expect(user3.bNumber).to.be.equal(-2);
                    });
                });
            });
        });
        it('with timestamps set to true', function () {
            var oldDate;
            var clock = sinon_1.useFakeTimers();
            return TimeStampsUser_1.TimeStampsUser
                .sync({ force: true })
                .then(function () { return TimeStampsUser_1.TimeStampsUser.create({ aNumber: 1 }); })
                .then(function (user) {
                oldDate = user.updatedAt;
                clock.tick(1000);
                return user.decrement('aNumber', { by: 1 });
            })
                .then(function () { return TimeStampsUser_1.TimeStampsUser.findById(1); })
                .then(function (user) {
                chai_1.expect(user).to.have.property('updatedAt');
                chai_1.expect(user.updatedAt).to.be.greaterThan(oldDate);
            });
        });
        it('with timestamps set to true and options.silent set to true', function () {
            var oldDate;
            return TimeStampsUser_1.TimeStampsUser
                .sync({ force: true })
                .then(function () { return TimeStampsUser_1.TimeStampsUser.create({ aNumber: 1 }); })
                .then(function (user) {
                oldDate = user.updatedAt;
                return user.decrement('aNumber', { by: 1, silent: true });
            })
                .then(function () { return TimeStampsUser_1.TimeStampsUser.findById(1); })
                .then(function (user) {
                chai_1.expect(user).to.have.property('updatedAt');
                chai_1.expect(user.updatedAt).to.eqls(oldDate);
            });
        });
    });
    describe('reload', function () {
        // TODO transactions doesn't seem to work with sqlite3
        // if (sequelize['dialect']['supports']['transactions']) {
        //
        //   it('supports transactions', () =>
        //     User
        //       .sync({force: true})
        //       .then(() =>
        //         User
        //           .create<User>({username: 'foo'})
        //           .then((user) =>
        //             sequelize
        //               .transaction()
        //               .then((transaction) =>
        //                 User
        //                   .update<User>({username: 'bar'}, {where: {username: 'foo'}, transaction})
        //                   .then(() =>
        //                     user
        //                       .reload()
        //                       .then((user1) => {
        //                         // expect(user1.username).to.equal('foo'); // TODO transactions doesn't seem to work properly in sqlite3
        //                         return user1
        //                           .reload({transaction})
        //                           .then((user2) => {
        //                             expect(user2.username).to.equal('bar');
        //                             return transaction.rollback();
        //                           });
        //                       })
        //                   )
        //               )
        //           )
        //       )
        //   );
        // }
        it('should return a reference to the same DAO instead of creating a new one', function () {
            return User_1.User
                .create({ username: 'John Doe' })
                .then(function (originalUser) {
                return originalUser
                    .updateAttributes({ username: 'Doe John' })
                    .then(function () {
                    return originalUser
                        .reload()
                        .then(function (updatedUser) {
                        chai_1.expect(originalUser === updatedUser).to.be.true;
                    });
                });
            });
        });
        it('should update the values on all references to the DAO', function () {
            return User_1.User
                .create({ username: 'John Doe' })
                .then(function (originalUser) {
                return User_1.User
                    .findById(originalUser.id)
                    .then(function (updater) {
                    return updater
                        .updateAttributes({ username: 'Doe John' })
                        .then(function () {
                        // We used a different reference when calling updateAttributes, so originalUser is now out of sync
                        chai_1.expect(originalUser.username).to.equal('John Doe');
                        return originalUser.reload().then(function (updatedUser) {
                            chai_1.expect(originalUser.username).to.equal('Doe John');
                            chai_1.expect(updatedUser.username).to.equal('Doe John');
                        });
                    });
                });
            });
        });
        it('should support updating a subset of attributes', function () {
            return User_1.User
                .create({ aNumber: 1, bNumber: 1 })
                .tap(function (user) { return User_1.User.update({ bNumber: 2 }, { where: { id: user.get('id') } }); })
                .then(function (user) { return user.reload({ attributes: ['bNumber'] }); })
                .then(function (user) {
                chai_1.expect(user.get('aNumber')).to.equal(1);
                chai_1.expect(user.get('bNumber')).to.equal(2);
            });
        });
        it('should update read only attributes as well (updatedAt)', function () {
            var _originalUser;
            var originallyUpdatedAt;
            var _updatedUser;
            return TimeStampsUser_1.TimeStampsUser
                .create({ username: 'John Doe' })
                .then(function (originalUser) {
                originallyUpdatedAt = originalUser.updatedAt;
                _originalUser = originalUser;
                return TimeStampsUser_1.TimeStampsUser.findById(originalUser.id);
            })
                .then(function (updater) { return updater.updateAttributes({ username: 'Doe John' }); })
                .then(function (updatedUser) {
                _updatedUser = updatedUser;
                _originalUser.reload();
            })
                .then(function () {
                chai_1.expect(_originalUser.updatedAt).to.be.least(originallyUpdatedAt);
                chai_1.expect(_updatedUser.updatedAt).to.be.least(originallyUpdatedAt);
            });
        });
        it('should update the associations as well', function () {
            return Book_1.Book
                .sync({ force: true })
                .then(function () { return Page_1.Page.sync({ force: true }); })
                .then(function () { return Book_1.Book.create({ title: 'A very old book' }); })
                .then(function (book) {
                return Page_1.Page
                    .create({ content: 'om nom nom' })
                    .then(function (page) {
                    return book
                        .$set('pages', [page])
                        .then(function () { return Book_1.Book.findOne({ where: { id: book.id }, include: [Page_1.Page] }); })
                        .then(function (leBook) {
                        return page
                            .updateAttributes({ content: 'something totally different' })
                            .then(function (_page) {
                            chai_1.expect(leBook.pages.length).to.equal(1);
                            chai_1.expect(leBook.pages[0].content).to.equal('om nom nom');
                            chai_1.expect(_page.content).to.equal('something totally different');
                            return leBook
                                .reload()
                                .then(function (_leBook) {
                                chai_1.expect(_leBook.pages.length).to.equal(1);
                                chai_1.expect(_leBook.pages[0].content).to.equal('something totally different');
                                chai_1.expect(_page.content).to.equal('something totally different');
                            });
                        });
                    });
                });
            });
        });
        it('should update internal options of the instance', function () {
            return Book_1.Book
                .sync({ force: true })
                .then(function () { return Page_1.Page.sync({ force: true }); })
                .then(function () { return Book_1.Book.create({ title: 'A very old book' }); })
                .then(function (book) {
                return Page_1.Page
                    .create()
                    .then(function (page) {
                    return book['setPages']([page]) // todo
                        .then(function () {
                        return Book_1.Book
                            .findOne({ where: { id: book.id } })
                            .then(function (leBook) {
                            return leBook.reload({ include: [Page_1.Page] })
                                .then(function (_leBook) {
                                chai_1.expect(_leBook.pages.length).to.equal(1);
                                chai_1.expect(_leBook.get({ plain: true }).pages.length).to.equal(1);
                            });
                        });
                    });
                });
            });
        });
        it('should return an error when reload fails', function () {
            return User_1.User
                .create({ username: 'John Doe' })
                .then(function (user) {
                return user
                    .destroy()
                    .then(function () {
                    return chai_1.expect(user.reload()).to.be.rejectedWith(InstanceError, 'Instance could not be reloaded because it does not exist anymore (find call returned null)');
                });
            });
        });
        it('should set an association to null after deletion, 1-1', function () {
            return Shoe_1.Shoe
                .create({
                brand: 'the brand',
                player: {
                    name: 'the player'
                }
            }, { include: [Player_1.Player] })
                .then(function (shoe) {
                return Player_1.Player
                    .findOne({
                    where: { id: shoe.player.id },
                    include: [Shoe_1.Shoe]
                })
                    .then(function (lePlayer) {
                    chai_1.expect(lePlayer.shoe).not.to.be.null;
                    return lePlayer.shoe.destroy().return(lePlayer);
                })
                    .then(function (lePlayer) { return lePlayer.reload(); })
                    .then(function (lePlayer) {
                    chai_1.expect(lePlayer.shoe).to.be.null;
                });
            });
        });
        it('should set an association to empty after all deletion, 1-N', function () {
            return Team_1.Team
                .create({
                name: 'the team',
                players: [{
                        name: 'the player1'
                    }, {
                        name: 'the player2'
                    }]
            }, { include: [Player_1.Player] })
                .then(function (team) {
                return Team_1.Team
                    .findOne({
                    where: { id: team.id },
                    include: [Player_1.Player]
                })
                    .then(function (leTeam) {
                    chai_1.expect(leTeam.players).not.to.be.empty;
                    return leTeam.players[1]
                        .destroy()
                        .then(function () {
                        return leTeam.players[0].destroy();
                    }).return(leTeam);
                })
                    .then(function (leTeam) { return leTeam.reload(); })
                    .then(function (leTeam) {
                    chai_1.expect(leTeam.players).to.be.empty;
                });
            });
        });
        it('should update the associations after one element deleted', function () {
            return Team_1.Team
                .create({
                name: 'the team',
                players: [{
                        name: 'the player1'
                    }, {
                        name: 'the player2'
                    }]
            }, { include: [Player_1.Player] })
                .then(function (team) {
                return Team_1.Team
                    .findOne({
                    where: { id: team.id },
                    include: [Player_1.Player]
                })
                    .then(function (leTeam) {
                    chai_1.expect(leTeam.players).to.have.length(2);
                    return leTeam.players[0].destroy().then(function () { return leTeam; });
                })
                    .then(function (leTeam) { return leTeam.reload(); })
                    .then(function (leTeam) {
                    chai_1.expect(leTeam.players).to.have.length(1);
                });
            });
        });
    });
    describe('default values', function () {
        describe('uuid', function () {
            it('should store a string in uuidv1 and uuidv4', function () {
                var user = User_1.User.build({ username: 'a user' });
                chai_1.expect(user.uuidv1).to.be.a('string');
                chai_1.expect(user.uuidv4).to.be.a('string');
            });
            it('should store a string of length 36 in uuidv1 and uuidv4', function () {
                var user = User_1.User.build({ username: 'a user' });
                chai_1.expect(user.uuidv1).to.have.length(36);
                chai_1.expect(user.uuidv4).to.have.length(36);
            });
            it('should store a valid uuid in uuidv1 and uuidv4 that conforms to the UUID v1 and v4 specifications', function () {
                var user = User_1.User.build({ username: 'a user' });
                chai_1.expect(validateUUID(user.uuidv1, 1)).to.be.true;
                chai_1.expect(validateUUID(user.uuidv4, 4)).to.be.true;
            });
            it('should store a valid uuid if the field is a primary key named id', function () {
                var person = Person_1.Person.build({});
                chai_1.expect(person.id).to.be.ok;
                chai_1.expect(person.id).to.have.length(36);
            });
        });
        describe('current date', function () {
            it('should store a date in touchedAt', function () {
                var user = User_1.User.build({ username: 'a user' });
                chai_1.expect(user.touchedAt).to.be.instanceof(Date);
            });
            it('should store the current date in touchedAt', function () {
                var clock = sinon_1.useFakeTimers();
                clock.tick(5000);
                var user = User_1.User.build({ username: 'a user' });
                clock.restore();
                chai_1.expect(+user.touchedAt).to.be.equal(5000);
            });
        });
        describe('allowNull date', function () {
            it('should be just "null" and not Date with Invalid Date', function () {
                return User_1.User
                    .build({ username: 'a user' })
                    .save()
                    .then(function () {
                    return User_1.User
                        .findOne({ where: { username: 'a user' } })
                        .then(function (user) {
                        chai_1.expect(user.dateAllowNullTrue).to.be.null;
                    });
                });
            });
            it('should be the same valid date when saving the date', function () {
                var date = new Date();
                return User_1.User
                    .build({ username: 'a user', dateAllowNullTrue: date })
                    .save()
                    .then(function () {
                    return User_1.User
                        .findOne({ where: { username: 'a user' } })
                        .then(function (user) {
                        chai_1.expect(user.dateAllowNullTrue.toString()).to.equal(date.toString());
                    });
                });
            });
        });
        describe('super user boolean', function () {
            it('should default to false', function () {
                return User_1.User
                    .build({
                    username: 'a user'
                })
                    .save()
                    .then(function () {
                    return User_1.User.findOne({
                        where: {
                            username: 'a user'
                        }
                    });
                })
                    .then(function (user) {
                    chai_1.expect(user.isSuperUser).to.be.false;
                });
            });
            it('should override default when given truthy boolean', function () {
                return User_1.User
                    .build({
                    username: 'a user',
                    isSuperUser: true
                })
                    .save()
                    .then(function () {
                    User_1.User.findOne({
                        where: {
                            username: 'a user'
                        }
                    })
                        .then(function (user) {
                        chai_1.expect(user.isSuperUser).to.be.true;
                    });
                });
            });
            it('should override default when given truthy boolean-string ("true")', function () {
                return User_1.User
                    .build({
                    username: 'a user',
                    isSuperUser: "true" // by intention
                })
                    .save()
                    .then(function () {
                    User_1.User.findOne({
                        where: {
                            username: 'a user'
                        }
                    })
                        .then(function (user) {
                        chai_1.expect(user.isSuperUser).to.be.true;
                    });
                });
            });
            it('should override default when given truthy boolean-int (1)', function () {
                return User_1.User
                    .build({
                    username: 'a user',
                    isSuperUser: 1
                })
                    .save()
                    .then(function () {
                    User_1.User.findOne({
                        where: {
                            username: 'a user'
                        }
                    })
                        .then(function (user) {
                        chai_1.expect(user.isSuperUser).to.be.true;
                    });
                });
            });
            it('should throw error when given value of incorrect type', function () {
                var callCount = 0;
                return User_1.User
                    .build({
                    username: 'a user',
                    isSuperUser: "INCORRECT_VALUE_TYPE" // incorrect value by intention
                })
                    .save()
                    .then(function () { return callCount += 1; })
                    .catch(function (err) {
                    chai_1.expect(callCount).to.equal(0);
                    chai_1.expect(err).to.exist;
                    chai_1.expect(err.message).to.exist;
                });
            });
        });
    });
    describe('complete', function () {
        it('gets triggered if an error occurs', function () {
            return User_1.User
                .findOne({ where: { bad: 'asdasdasd' } })
                .catch(function (err) {
                chai_1.expect(err).to.exist;
                chai_1.expect(err.message).to.exist;
            });
        });
        it('gets triggered if everything was ok', function () {
            return User_1.User
                .count()
                .then(function (result) {
                chai_1.expect(result).to.exist;
            });
        });
    });
    describe('save', function () {
        // TODO transactions doesn't seem to work with sqlite3
        // if (sequelize['dialect']['supports']['transactions']) {
        //
        //   it('supports transactions', () =>
        //     User
        //       .sync({force: true})
        //       .then(() => sequelize.transaction())
        //       .then((transaction) =>
        //         User
        //           .build<User>({username: 'foo'})
        //           .save({transaction})
        //           .then(() => User.count())
        //           .then((count1) =>
        //             User
        //               .count({transaction})
        //               .then((count2) => {
        //
        //                 // expect(count1).to.equal(0); // TODO transaction => sqlite3
        //                 expect(count2).to.equal(1);
        //                 return transaction.rollback();
        //               })
        //           )
        //       )
        //   );
        // }
        it('only updates fields in passed array', function () {
            var date = new Date(1990, 1, 1);
            return User_1.User
                .create({
                username: 'foo',
                touchedAt: new Date()
            })
                .then(function (user) {
                user.username = 'fizz';
                user.touchedAt = date;
                return user
                    .save({ fields: ['username'] })
                    .then(function () { return User_1.User.findById(user.id); })
                    .then(function (user2) {
                    // name should have changed
                    chai_1.expect(user2.username).to.equal('fizz');
                    // bio should be unchanged
                    chai_1.expect(user2).to.have.property('birthDate');
                    chai_1.expect(user2.birthDate).not.to.equal(date);
                });
            });
        });
        it('should work on a model with an attribute named length', function () {
            return Box_1.Box
                .sync({ force: true })
                .then(function () { return Box_1.Box.create({ length: 1, width: 2, height: 3 }); })
                .then(function (box) { return box.update({ length: 4, width: 5, height: 6 }); })
                .then(function () { return Box_1.Box.findOne({}); })
                .then(function (box) {
                chai_1.expect(box.get('length')).to.equal(4);
                chai_1.expect(box.get('width')).to.equal(5);
                chai_1.expect(box.get('height')).to.equal(6);
            });
        });
        it('only validates fields in passed array', function () {
            return User_1.User
                .build({
                validateTest: 'cake',
                validateCustom: '1'
            })
                .save({
                fields: ['validateCustom']
            });
        });
        describe('hooks', function () {
            it('should update attributes added in hooks when default fields are used', function () {
                User_1.User
                    .beforeUpdate(function (instance) {
                    instance.set('email', 'B');
                });
                return User_1.User
                    .sync({ force: true })
                    .then(function () { return User_1.User.create({ name: 'A', bio: 'A', email: 'A' }); })
                    .then(function (user) { return user.set({ name: 'B', bio: 'B' }).save(); })
                    .then(function () { return User_1.User.findOne({}); })
                    .then(function (user) {
                    chai_1.expect(user.get('name')).to.equal('B');
                    chai_1.expect(user.get('bio')).to.equal('B');
                    chai_1.expect(user.get('email')).to.equal('B');
                });
            });
            it('should update attributes changed in hooks when default fields are used', function () {
                User_1.User.beforeUpdate(function (instance) {
                    instance.set('email', 'C');
                });
                return User_1.User
                    .sync({ force: true })
                    .then(function () { return User_1.User.create({ name: 'A', bio: 'A', email: 'A' }); })
                    .then(function (user) { return user.set({ name: 'B', bio: 'B', email: 'B' }).save(); })
                    .then(function () { return User_1.User.findOne({}); })
                    .then(function (user) {
                    chai_1.expect(user.get('name')).to.equal('B');
                    chai_1.expect(user.get('bio')).to.equal('B');
                    chai_1.expect(user.get('email')).to.equal('C');
                });
            });
            it('should validate attributes added in hooks when default fields are used', function () {
                UserWithValidation_1.UserWithValidation.beforeUpdate(function (instance) {
                    instance.set('email', 'B');
                });
                return UserWithValidation_1.UserWithValidation
                    .sync({ force: true })
                    .then(function () { return UserWithValidation_1.UserWithValidation.create({
                    name: 'A',
                    bio: 'A',
                    email: 'valid.email@gmail.com'
                }); })
                    .then(function (user) {
                    return chai_1.expect(user.set({
                        name: 'B'
                    }).save()).to.be.rejectedWith(index_1.Sequelize.ValidationError);
                })
                    .then(function () { return UserWithValidation_1.UserWithValidation.findOne({}); })
                    .then(function (user) {
                    chai_1.expect(user.get('email')).to.equal('valid.email@gmail.com');
                });
            });
            it('should validate attributes changed in hooks when default fields are used', function () {
                UserWithValidation_1.UserWithValidation.beforeUpdate(function (instance) {
                    instance.set('email', 'B');
                });
                return UserWithValidation_1.UserWithValidation
                    .sync({ force: true })
                    .then(function () { return UserWithValidation_1.UserWithValidation.create({
                    name: 'A',
                    bio: 'A',
                    email: 'valid.email@gmail.com'
                }); })
                    .then(function (user) {
                    return chai_1.expect(user.set({
                        name: 'B',
                        email: 'still.valid.email@gmail.com'
                    }).save()).to.be.rejectedWith(index_1.Sequelize.ValidationError);
                })
                    .then(function () { return UserWithValidation_1.UserWithValidation.findOne({}); })
                    .then(function (user) {
                    chai_1.expect(user.get('email')).to.equal('valid.email@gmail.com');
                });
            });
        });
        it('stores an entry in the database', function () {
            var username = 'user';
            var user = User_1.User.build({
                username: username,
                touchedAt: new Date(1984, 8, 23)
            });
            return User_1.User.findAll()
                .then(function (users) {
                chai_1.expect(users).to.have.length(0);
                return user.save();
            })
                .then(function () { return User_1.User.findAll(); })
                .then(function (users) {
                chai_1.expect(users).to.have.length(1);
                chai_1.expect(users[0].username).to.equal(username);
                chai_1.expect(users[0].touchedAt).to.be.instanceof(Date);
                chai_1.expect(users[0].touchedAt.toString()).to.equal(new Date(1984, 8, 23).toString());
            });
        });
        it('handles an entry with primaryKey of zero', function () {
            var username = 'user';
            var newUsername = 'newUser';
            return UserWithNoAutoIncrementation_1.UserWithNoAutoIncrementation.create({ id: 0, username: username })
                .then(function (user) {
                chai_1.expect(user).to.be.ok;
                chai_1.expect(user.id).to.equal(0);
                chai_1.expect(user.username).to.equal(username);
            })
                .then(function () { return UserWithNoAutoIncrementation_1.UserWithNoAutoIncrementation.findById(0); })
                .then(function (user) {
                chai_1.expect(user).to.be.ok;
                chai_1.expect(user.id).to.equal(0);
                chai_1.expect(user.username).to.equal(username);
                return user.updateAttributes({ username: newUsername });
            })
                .then(function (user) {
                chai_1.expect(user).to.be.ok;
                chai_1.expect(user.id).to.equal(0);
                chai_1.expect(user.username).to.equal(newUsername);
            });
        });
        it('updates the timestamps', function () {
            var clock = sinon_1.useFakeTimers();
            var now = new Date();
            var user = TimeStampsUser_1.TimeStampsUser.build({ username: 'user' });
            clock.tick(1000);
            return user
                .save()
                .then(function () {
                chai_1.expect(user).to.have.property('updatedAt');
                chai_1.expect(user.updatedAt).to.be.least(now);
            });
        });
        it('does not update timestamps when passing silent=true', function () {
            var clock = sinon_1.useFakeTimers();
            return TimeStampsUser_1.TimeStampsUser
                .create({ username: 'user' })
                .then(function (user) {
                var updatedAt = user.updatedAt;
                clock.tick(1000);
                return user
                    .update({ username: 'userman' }, { silent: true })
                    .then(function () {
                    chai_1.expect(user).to.have.property('updatedAt').equalTime(updatedAt);
                });
            });
        });
        it('does not update timestamps when passing silent=true in a bulk update', function () {
            var updatedAtPeter;
            var updatedAtPaul;
            var clock = sinon_1.useFakeTimers();
            var data = [
                { username: 'Paul' },
                { username: 'Peter' }
            ];
            return TimeStampsUser_1.TimeStampsUser
                .bulkCreate(data)
                .then(function () { return TimeStampsUser_1.TimeStampsUser.findAll(); })
                .then(function (users) {
                updatedAtPaul = users[0].updatedAt;
                updatedAtPeter = users[1].updatedAt;
            })
                .then(function () {
                clock.tick(150);
                return TimeStampsUser_1.TimeStampsUser
                    .update({ aNumber: 1 }, { where: {}, silent: true });
            })
                .then(function () { return TimeStampsUser_1.TimeStampsUser.findAll(); })
                .then(function (users) {
                chai_1.expect(users[0].updatedAt).to.equalTime(updatedAtPeter);
                chai_1.expect(users[1].updatedAt).to.equalTime(updatedAtPaul);
            });
        });
        describe('when nothing changed', function () {
            var clock;
            beforeEach(function () { return clock = sinon_1.useFakeTimers(); });
            afterEach(function () { return clock.restore(); });
            it('does not update timestamps', function () {
                return TimeStampsUser_1.TimeStampsUser
                    .create({ username: 'John' })
                    .then(function () { return TimeStampsUser_1.TimeStampsUser.findOne({ where: { username: 'John' } }); })
                    .then(function (user) {
                    var updatedAt = user.updatedAt;
                    clock.tick(2000);
                    return user
                        .save()
                        .then(function (newlySavedUser) {
                        chai_1.expect(newlySavedUser.updatedAt).to.equalTime(updatedAt);
                        return TimeStampsUser_1.TimeStampsUser
                            .findOne({ where: { username: 'John' } })
                            .then(function (_newlySavedUser) {
                            chai_1.expect(_newlySavedUser.updatedAt).to.equalTime(updatedAt);
                        });
                    });
                });
            });
            // Does not create an empty query but a corrupted one;
            // Since "bio" is a virtual field, sequelize produces this
            // query "UPDATE `UserWithSwag` SET  WHERE `id` = 1", which
            // also throws
            // "'SequelizeDatabaseError: SQLITE_ERROR: near "WHERE": syntax error'"
            // TODO@robin check if sequelize-typescript causes this problem or not
            // TODO@robin  - it does not seem so
            // it('should not throw ER_EMPTY_QUERY if changed only virtual fields', () =>
            //   UserWithSwag
            //     .sync({force: true})
            //     .then(() => UserWithSwag.create<UserWithSwag>({name: 'John', bio: 'swag 1'}))
            //     .then((user) => expect(user.update({bio: 'swag 2'})).to.be.fulfilled)
            // );
        });
        it('updates with function and column value', function () {
            return User_1.User
                .create({
                aNumber: 42
            })
                .then(function (user) {
                user.bNumber = sequelize.col('aNumber');
                user.username = sequelize.fn('upper', 'sequelize');
                return user
                    .save()
                    .then(function () { return User_1.User.findById(user.id); })
                    .then(function (user2) {
                    chai_1.expect(user2.username).to.equal('SEQUELIZE');
                    chai_1.expect(user2.bNumber).to.equal(42);
                });
            });
        });
        describe('without timestamps option', function () {
            it("doesn't update the updatedAt column", function () {
                return UserWithCustomUpdatedAt_1.UserWithCustomUpdatedAt
                    .sync()
                    .then(function () { return UserWithCustomUpdatedAt_1.UserWithCustomUpdatedAt.create({ username: 'john doe' }); })
                    .then(function (johnDoe) {
                    // sqlite and mysql return undefined, whereas postgres returns null
                    chai_1.expect([undefined, null].indexOf(johnDoe.updatedAt)).not.to.be.equal(-1);
                });
            });
        });
        describe('with custom timestamp options', function () {
            it('updates the createdAt column if updatedAt is disabled', function () {
                var now = new Date();
                var clock = sinon_1.useFakeTimers();
                clock.tick(1000);
                UserWithCreatedAtButWithoutUpdatedAt_1.UserWithCreatedAtButWithoutUpdatedAt
                    .sync()
                    .then(function () { return UserWithCreatedAtButWithoutUpdatedAt_1.UserWithCreatedAtButWithoutUpdatedAt
                    .create({ username: 'john doe' }); })
                    .then(function (johnDoe) {
                    chai_1.expect(johnDoe).not.to.have.property('updatedAt');
                    chai_1.expect(now).to.be.beforeTime(johnDoe.createdAt);
                });
            });
            it('updates the updatedAt column if createdAt is disabled', function () {
                var clock = sinon_1.useFakeTimers();
                var now = new Date();
                clock.tick(1000);
                var User2 = /** @class */ (function (_super) {
                    __extends(User2, _super);
                    function User2() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    __decorate([
                        index_1.Column,
                        __metadata("design:type", String)
                    ], User2.prototype, "username", void 0);
                    User2 = __decorate([
                        index_1.Table({
                            timestamps: true,
                            createdAt: false
                        })
                    ], User2);
                    return User2;
                }(index_1.Model));
                sequelize.addModels([User2]);
                return User2.sync()
                    .then(function () { return User2.create({ username: 'john doe' }); })
                    .then(function (johnDoe) {
                    chai_1.expect(johnDoe.createdAt).to.be.undefined;
                    chai_1.expect(now).to.be.beforeTime(johnDoe.updatedAt);
                });
            });
            it('works with `allowNull: false` on createdAt and updatedAt columns', function () {
                var User3 = /** @class */ (function (_super) {
                    __extends(User3, _super);
                    function User3() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    __decorate([
                        index_1.Column,
                        __metadata("design:type", String)
                    ], User3.prototype, "username", void 0);
                    __decorate([
                        index_1.AllowNull(false),
                        index_1.Column,
                        __metadata("design:type", Date)
                    ], User3.prototype, "createdAt", void 0);
                    __decorate([
                        index_1.AllowNull(false),
                        index_1.Column,
                        __metadata("design:type", Date)
                    ], User3.prototype, "updatedAt", void 0);
                    User3 = __decorate([
                        index_1.Table({
                            timestamps: true
                        })
                    ], User3);
                    return User3;
                }(index_1.Model));
                sequelize.addModels([User3]);
                return User3
                    .sync()
                    .then(function () { return User3.create({ username: 'john doe' }); })
                    .then(function (johnDoe) {
                    chai_1.expect(johnDoe.createdAt).to.be.an.instanceof(Date);
                    chai_1.expect(!isNaN(johnDoe.createdAt.valueOf())).to.be.ok;
                    chai_1.expect(johnDoe.createdAt).to.equalTime(johnDoe.updatedAt);
                });
            });
        });
        describe('with version option', function () {
            it("version column is updated by sequelize", function () {
                var version = undefined;
                UserWithCustomUpdatedAt_1.UserWithCustomUpdatedAt
                    .sync()
                    .then(function () { return UserWithVersion_1.UserWithVersion.create({ name: 'john doe' }); })
                    .then(function (johnDoe) {
                    chai_1.expect(johnDoe.version).not.to.be.undefined;
                    version = johnDoe.version;
                    return johnDoe.update({ name: 'doe john' });
                })
                    .then(function (johnDoe) {
                    chai_1.expect(johnDoe.name).not.equals('doe john');
                    chai_1.expect(johnDoe.version).not.equals(version);
                    return johnDoe.update({});
                });
            });
        });
        it('should fail a validation upon creating', function () {
            return User_1.User
                .create({ aNumber: 0, validateTest: 'hello' })
                .catch(function (err) {
                chai_1.expect(err).to.exist;
                chai_1.expect(err).to.be.instanceof(Object);
                chai_1.expect(err.get('validateTest')).to.be.instanceof(Array);
                chai_1.expect(err.get('validateTest')[0]).to.exist;
                chai_1.expect(err.get('validateTest')[0].message).to.equal('Validation isInt on validateTest failed');
            });
        });
        it('should fail a validation upon creating with hooks false', function () {
            return User_1.User
                .create({ aNumber: 0, validateTest: 'hello' }, { hooks: false })
                .catch(function (err) {
                chai_1.expect(err).to.exist;
                chai_1.expect(err).to.be.instanceof(Object);
                chai_1.expect(err.get('validateTest')).to.be.instanceof(Array);
                chai_1.expect(err.get('validateTest')[0]).to.exist;
                chai_1.expect(err.get('validateTest')[0].message).to.equal('Validation isInt on validateTest failed');
            });
        });
        it('should fail a validation upon building', function () {
            return User_1.User
                .build({ aNumber: 0, validateCustom: 'aaaaaaaaaaaaaaaaaaaaaaaaaa' })
                .save()
                .catch(function (err) {
                chai_1.expect(err).to.exist;
                chai_1.expect(err).to.be.instanceof(Object);
                chai_1.expect(err.get('validateCustom')).to.exist;
                chai_1.expect(err.get('validateCustom')).to.be.instanceof(Array);
                chai_1.expect(err.get('validateCustom')[0]).to.exist;
                chai_1.expect(err.get('validateCustom')[0].message).to.equal('Length failed.');
            });
        });
        it('should fail a validation when updating', function () {
            return User_1.User
                .create({ aNumber: 0 })
                .then(function (user) { return user.updateAttributes({ validateTest: 'hello' }); })
                .catch(function (err) {
                chai_1.expect(err).to.exist;
                chai_1.expect(err).to.be.instanceof(Object);
                chai_1.expect(err.get('validateTest')).to.exist;
                chai_1.expect(err.get('validateTest')).to.be.instanceof(Array);
                chai_1.expect(err.get('validateTest')[0]).to.exist;
                chai_1.expect(err.get('validateTest')[0].message).to.equal('Validation isInt on validateTest failed');
            });
        });
        it('takes zero into account', function () {
            return User_1.User
                .build({ aNumber: 0 })
                .save({ fields: ['aNumber'] })
                .then(function (user) {
                chai_1.expect(user.aNumber).to.equal(0);
            });
        });
        it('saves a record with no primary key', function () {
            var HistoryLog = /** @class */ (function (_super) {
                __extends(HistoryLog, _super);
                function HistoryLog() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                __decorate([
                    index_1.Column,
                    __metadata("design:type", String)
                ], HistoryLog.prototype, "someText", void 0);
                __decorate([
                    index_1.Column,
                    __metadata("design:type", Number)
                ], HistoryLog.prototype, "aNumber", void 0);
                __decorate([
                    index_1.Column,
                    __metadata("design:type", Number)
                ], HistoryLog.prototype, "aRandomId", void 0);
                HistoryLog = __decorate([
                    index_1.Table
                ], HistoryLog);
                return HistoryLog;
            }(index_1.Model));
            sequelize.addModels([HistoryLog]);
            return HistoryLog
                .sync()
                .then(function () { return HistoryLog.create({ someText: 'Some random text', aNumber: 3, aRandomId: 5 }); })
                .then(function (log) { return log.updateAttributes({ aNumber: 5 }); })
                .then(function (newLog) {
                chai_1.expect(newLog.aNumber).to.equal(5);
            });
        });
        describe('eagerly loaded objects', function () {
            var UserEager = /** @class */ (function (_super) {
                __extends(UserEager, _super);
                function UserEager() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                __decorate([
                    index_1.Column,
                    __metadata("design:type", String)
                ], UserEager.prototype, "username", void 0);
                __decorate([
                    index_1.Column,
                    __metadata("design:type", Number)
                ], UserEager.prototype, "age", void 0);
                __decorate([
                    index_1.HasMany(function () { return ProjectEager; }),
                    __metadata("design:type", Array)
                ], UserEager.prototype, "projects", void 0);
                UserEager = __decorate([
                    index_1.Table
                ], UserEager);
                return UserEager;
            }(index_1.Model));
            var ProjectEager = /** @class */ (function (_super) {
                __extends(ProjectEager, _super);
                function ProjectEager() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                __decorate([
                    index_1.Column,
                    __metadata("design:type", String)
                ], ProjectEager.prototype, "title", void 0);
                __decorate([
                    index_1.Column,
                    __metadata("design:type", Number)
                ], ProjectEager.prototype, "overdueDays", void 0);
                __decorate([
                    index_1.ForeignKey(function () { return UserEager; }),
                    index_1.Column,
                    __metadata("design:type", Number)
                ], ProjectEager.prototype, "poobahId", void 0);
                __decorate([
                    index_1.BelongsTo(function () { return UserEager; }),
                    __metadata("design:type", UserEager)
                ], ProjectEager.prototype, "poobah", void 0);
                ProjectEager = __decorate([
                    index_1.Table
                ], ProjectEager);
                return ProjectEager;
            }(index_1.Model));
            sequelize.addModels([UserEager, ProjectEager]);
            beforeEach(function () { return UserEager.sync({ force: true }).then(function () { return ProjectEager.sync({ force: true }); }); });
            it('saves one object that has a collection of eagerly loaded objects', function () {
                return UserEager
                    .create({ username: 'joe', age: 1 })
                    .then(function (user) { return ProjectEager.create({ title: 'project-joe1', overdueDays: 0 })
                    .then(function (project1) { return ProjectEager.create({ title: 'project-joe2', overdueDays: 0 })
                    .then(function (project2) { return user.$set('projects', [project1, project2]); })
                    .then(function () { return UserEager.findOne({ where: { age: 1 }, include: [ProjectEager] }); })
                    .then(function (_user) {
                    chai_1.expect(_user.username).to.equal('joe');
                    chai_1.expect(_user.age).to.equal(1);
                    chai_1.expect(_user.projects).to.exist;
                    chai_1.expect(_user.projects.length).to.equal(2);
                    _user.age = _user.age + 1; // happy birthday joe
                    return _user.save();
                })
                    .then(function (_user) {
                    chai_1.expect(_user.username).to.equal('joe');
                    chai_1.expect(_user.age).to.equal(2);
                    chai_1.expect(_user.projects).to.exist;
                    chai_1.expect(_user.projects.length).to.equal(2);
                }); }); });
            });
            it('saves many objects that each a have collection of eagerly loaded objects', function () {
                return Promise
                    .all([
                    UserEager.create({ username: 'bart', age: 20 }),
                    UserEager.create({ username: 'lisa', age: 20 }),
                    ProjectEager.create({ title: 'detention1', overdueDays: 0 }),
                    ProjectEager.create({ title: 'detention2', overdueDays: 0 }),
                    ProjectEager.create({ title: 'exam1', overdueDays: 0 }),
                    ProjectEager.create({ title: 'exam2', overdueDays: 0 })
                ])
                    .then(function (_a) {
                    var bart = _a[0], lisa = _a[1], detention1 = _a[2], detention2 = _a[3], exam1 = _a[4], exam2 = _a[5];
                    return Promise
                        .all([
                        bart.$set('projects', [detention1, detention2]),
                        lisa.$set('projects', [exam1, exam2])
                    ])
                        .then(function () { return UserEager.findAll({
                        where: { age: 20 },
                        order: [['username', 'ASC']],
                        include: [ProjectEager]
                    }); })
                        .then(function (simpsons) {
                        var _bart;
                        var _lisa;
                        chai_1.expect(simpsons.length).to.equal(2);
                        _bart = simpsons[0];
                        _lisa = simpsons[1];
                        chai_1.expect(_bart.projects).to.exist;
                        chai_1.expect(_lisa.projects).to.exist;
                        chai_1.expect(_bart.projects.length).to.equal(2);
                        chai_1.expect(_lisa.projects.length).to.equal(2);
                        _bart.age = _bart.age + 1; // happy birthday bart - off to Moe's
                        _lisa.username = 'lsimpson';
                        return Promise.all([
                            _bart.save(),
                            _lisa.save()
                        ]);
                    })
                        .then(function (_a) {
                        var savedBart = _a[0], savedLisa = _a[1];
                        chai_1.expect(savedBart.username).to.equal('bart');
                        chai_1.expect(savedBart.age).to.equal(21);
                        chai_1.expect(savedLisa.username).to.equal('lsimpson');
                        chai_1.expect(savedLisa.age).to.equal(20);
                    });
                });
            });
            it('saves many objects that each has one eagerly loaded object (to which they belong)', function () {
                return Promise
                    .all([
                    UserEager.create({ username: 'poobah', age: 18 }),
                    ProjectEager.create({ title: 'homework', overdueDays: 10 }),
                    ProjectEager.create({ title: 'party', overdueDays: 2 })
                ])
                    .then(function (_a) {
                    var user = _a[0], homework = _a[1], party = _a[2];
                    return user.$set('projects', [homework, party]);
                })
                    .then(function () { return ProjectEager.findAll({
                    include: [{
                            model: UserEager,
                            as: 'poobah'
                        }]
                }); })
                    .then(function (projects) {
                    chai_1.expect(projects.length).to.equal(2);
                    chai_1.expect(projects[0].poobah).to.exist;
                    chai_1.expect(projects[1].poobah).to.exist;
                    chai_1.expect(projects[0].poobah).to.have.property('username', 'poobah');
                    chai_1.expect(projects[1].poobah).to.have.property('username', 'poobah');
                    projects[0].title = 'partymore';
                    projects[1].title = 'partymore';
                    projects[0].overdueDays = 0;
                    projects[1].overdueDays = 0;
                    return Promise.all([
                        projects[0].save(),
                        projects[1].save()
                    ]);
                })
                    .then(function () { return ProjectEager.findAll({
                    where: { title: 'partymore', overdueDays: 0 },
                    include: [UserEager]
                }); })
                    .then(function (savedprojects) {
                    chai_1.expect(savedprojects.length).to.equal(2);
                    chai_1.expect(savedprojects[0].poobah).to.exist;
                    chai_1.expect(savedprojects[1].poobah).to.exist;
                    chai_1.expect(savedprojects[0].poobah).to.have.property('username', 'poobah');
                    chai_1.expect(savedprojects[1].poobah).to.have.property('username', 'poobah');
                });
            });
        });
    });
    describe('toJSON', function () {
        var NiceUser = /** @class */ (function (_super) {
            __extends(NiceUser, _super);
            function NiceUser() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            __decorate([
                index_1.Column,
                __metadata("design:type", String)
            ], NiceUser.prototype, "username", void 0);
            __decorate([
                index_1.Column,
                __metadata("design:type", Number)
            ], NiceUser.prototype, "age", void 0);
            __decorate([
                index_1.Column,
                __metadata("design:type", Boolean)
            ], NiceUser.prototype, "isAdmin", void 0);
            __decorate([
                index_1.HasMany(function () { return NiceProject; }),
                __metadata("design:type", Array)
            ], NiceUser.prototype, "projects", void 0);
            NiceUser = __decorate([
                index_1.Table
            ], NiceUser);
            return NiceUser;
        }(index_1.Model));
        var NiceProject = /** @class */ (function (_super) {
            __extends(NiceProject, _super);
            function NiceProject() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            __decorate([
                index_1.Column,
                __metadata("design:type", String)
            ], NiceProject.prototype, "title", void 0);
            __decorate([
                index_1.ForeignKey(function () { return NiceUser; }),
                index_1.Column,
                __metadata("design:type", Number)
            ], NiceProject.prototype, "userId", void 0);
            __decorate([
                index_1.BelongsTo(function () { return NiceUser; }),
                __metadata("design:type", NiceUser)
            ], NiceProject.prototype, "user", void 0);
            NiceProject = __decorate([
                index_1.Table
            ], NiceProject);
            return NiceProject;
        }(index_1.Model));
        sequelize.addModels([NiceUser, NiceProject]);
        beforeEach(function () { return NiceUser.sync({ force: true }).then(function () { return NiceProject.sync({ force: true }); }); });
        it("dont return instance that isn't defined", function () {
            return NiceProject
                .create({ user: null })
                .then(function (project) {
                return NiceProject.findOne({
                    where: {
                        id: project.id
                    },
                    include: [
                        { model: NiceUser, as: 'user' }
                    ]
                });
            })
                .then(function (project) {
                var json = project.toJSON();
                chai_1.expect(json.user).to.be.equal(null);
            });
        });
        it("dont return instances that aren't defined", function () {
            return NiceUser
                .create({ username: 'cuss' })
                .then(function (user) {
                return NiceUser.findOne({
                    where: {
                        id: user.id
                    },
                    include: [NiceProject]
                });
            })
                .then(function (user) {
                chai_1.expect(user.projects).to.be.instanceof(Array);
                chai_1.expect(user.projects).to.be.length(0);
            });
        });
        it('returns an object containing all values', function () {
            var user = NiceUser.build({ username: 'test.user', age: 99, isAdmin: true });
            chai_1.expect(user.toJSON()).to.deep.equal({ username: 'test.user', age: 99, isAdmin: true, id: null });
        });
        it('returns an object containing all values (created with new)', function () {
            var user = new NiceUser({ username: 'test.user', age: 99, isAdmin: true });
            chai_1.expect(user.toJSON()).to.deep.equal({ username: 'test.user', age: 99, isAdmin: true, id: null });
        });
        it('returns a response that can be stringified', function () {
            var user = NiceUser.build({ username: 'test.user', age: 99, isAdmin: true });
            chai_1.expect(JSON.stringify(user)).to.deep.equal('{"id":null,"username":"test.user","age":99,"isAdmin":true}');
        });
        it('returns a response that can be stringified (created with new)', function () {
            var user = new NiceUser({ username: 'test.user', age: 99, isAdmin: true });
            chai_1.expect(JSON.stringify(user)).to.deep.equal('{"id":null,"username":"test.user","age":99,"isAdmin":true}');
        });
        it('returns a response that can be stringified and then parsed', function () {
            var user = NiceUser.build({ username: 'test.user', age: 99, isAdmin: true });
            chai_1.expect(JSON.parse(JSON.stringify(user))).to.deep.equal({
                username: 'test.user',
                age: 99,
                isAdmin: true,
                id: null
            });
        });
        it('returns a response that can be stringified and then parsed (created with new)', function () {
            var user = new NiceUser({ username: 'test.user', age: 99, isAdmin: true });
            chai_1.expect(JSON.parse(JSON.stringify(user))).to.deep.equal({
                username: 'test.user',
                age: 99,
                isAdmin: true,
                id: null
            });
        });
        it('includes the eagerly loaded associations', function () {
            return Promise
                .all([
                NiceUser.create({ username: 'fnord', age: 1, isAdmin: true }),
                NiceProject.create({ title: 'fnord' })
            ])
                .then(function (_a) {
                var user = _a[0], project = _a[1];
                return user.$set('projects', [project]);
            })
                .then(function () {
                return Promise.all([
                    NiceUser.findAll({ include: [NiceProject] }),
                    NiceProject.findAll({ include: [NiceUser] })
                ]);
            })
                .then(function (_a) {
                var users = _a[0], projects = _a[1];
                var user = users[0];
                var project = projects[0];
                chai_1.expect(user.projects).to.exist;
                chai_1.expect(JSON.parse(JSON.stringify(user)).projects).to.exist;
                chai_1.expect(project.user).to.exist;
                chai_1.expect(JSON.parse(JSON.stringify(project)).user).to.exist;
            });
        });
    });
    describe('findAll', function () {
        var ParanoidUser = /** @class */ (function (_super) {
            __extends(ParanoidUser, _super);
            function ParanoidUser() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ParanoidUser_1 = ParanoidUser;
            __decorate([
                index_1.Column,
                __metadata("design:type", String)
            ], ParanoidUser.prototype, "username", void 0);
            __decorate([
                index_1.ForeignKey(function () { return ParanoidUser_1; }),
                index_1.Column,
                __metadata("design:type", Number)
            ], ParanoidUser.prototype, "paranoidUserId", void 0);
            __decorate([
                index_1.HasOne(function () { return ParanoidUser_1; }),
                __metadata("design:type", ParanoidUser)
            ], ParanoidUser.prototype, "paranoidUser", void 0);
            ParanoidUser = ParanoidUser_1 = __decorate([
                index_1.Table({ timestamps: true, paranoid: true })
            ], ParanoidUser);
            return ParanoidUser;
            var ParanoidUser_1;
        }(index_1.Model));
        sequelize.addModels([ParanoidUser]);
        beforeEach(function () { return ParanoidUser.sync({ force: true }); });
        it('sql should have paranoid condition', function () {
            return ParanoidUser.create({ username: 'cuss' })
                .then(function () { return ParanoidUser.findAll(); })
                .then(function (users) {
                chai_1.expect(users).to.have.length(1);
                return users[0].destroy();
            })
                .then(function () { return ParanoidUser.findAll(); })
                .then(function (users) {
                chai_1.expect(users).to.have.length(0);
            });
        });
        it('sequelize.and as where should include paranoid condition', function () {
            return ParanoidUser.create({ username: 'cuss' })
                .then(function () {
                return ParanoidUser.findAll({
                    where: (_a = {},
                        _a[sequelize.Op ? sequelize.Op.and : '$and'] = { username: 'cuss' },
                        _a)
                });
                var _a;
            })
                .then(function (users) {
                chai_1.expect(users).to.have.length(1);
                return users[0].destroy();
            })
                .then(function () {
                return ParanoidUser.findAll({
                    where: (_a = {},
                        _a[sequelize.Op ? sequelize.Op.and : '$and'] = { username: 'cuss' },
                        _a)
                });
                var _a;
            })
                .then(function (users) {
                chai_1.expect(users).to.have.length(0);
            });
        });
        it('sequelize.or as where should include paranoid condition', function () {
            return ParanoidUser.create({ username: 'cuss' })
                .then(function () {
                return ParanoidUser.findAll({
                    where: (_a = {},
                        _a[sequelize.Op ? sequelize.Op.or : '$or'] = { username: 'cuss' },
                        _a)
                });
                var _a;
            })
                .then(function (users) {
                chai_1.expect(users).to.have.length(1);
                return users[0].destroy();
            })
                .then(function () {
                return ParanoidUser.findAll({
                    where: (_a = {},
                        _a[sequelize.Op ? sequelize.Op.or : '$or'] = { username: 'cuss' },
                        _a)
                });
                var _a;
            })
                .then(function (users) {
                chai_1.expect(users).to.have.length(0);
            });
        });
        it('escapes a single single quotes properly in where clauses', function () {
            return User_1.User
                .create({ username: "user'name" })
                .then(function () { return User_1.User.findAll({ where: { username: "user'name" } }); })
                .then(function (users) {
                chai_1.expect(users.length).to.equal(1);
                chai_1.expect(users[0].username).to.equal("user'name");
            });
        });
        it('escapes two single quotes properly in where clauses', function () {
            return User_1.User
                .create({ username: "user''name" })
                .then(function () { return User_1.User.findAll({ where: { username: "user''name" } }); })
                .then(function (users) {
                chai_1.expect(users.length).to.equal(1);
                chai_1.expect(users[0].username).to.equal("user''name");
            });
        });
        it('returns the timestamps if no attributes have been specified', function () {
            return TimeStampsUser_1.TimeStampsUser.create({ username: 'fnord' })
                .then(function () { return TimeStampsUser_1.TimeStampsUser.findAll(); })
                .then(function (users) {
                chai_1.expect(users[0].createdAt).to.exist;
            });
        });
        it('does not return the timestamps if the username attribute has been specified', function () {
            return User_1.User.create({ username: 'fnord' })
                .then(function () { return User_1.User.findAll({ attributes: ['username'] }); })
                .then(function (users) {
                chai_1.expect(users[0].createdAt).not.to.exist;
                chai_1.expect(users[0].username).to.exist;
            });
        });
        it('creates the deletedAt property, when defining paranoid as true', function () {
            return ParanoidUser.create({ username: 'fnord' })
                .then(function () { return ParanoidUser.findAll(); })
                .then(function (users) {
                chai_1.expect(users[0].deletedAt).to.be.null;
            });
        });
        it('destroys a record with a primary key of something other than id', function () {
            var UserDestroy = /** @class */ (function (_super) {
                __extends(UserDestroy, _super);
                function UserDestroy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                __decorate([
                    index_1.PrimaryKey,
                    index_1.Column,
                    __metadata("design:type", String)
                ], UserDestroy.prototype, "newId", void 0);
                __decorate([
                    index_1.Column,
                    __metadata("design:type", String)
                ], UserDestroy.prototype, "email", void 0);
                UserDestroy = __decorate([
                    index_1.Table
                ], UserDestroy);
                return UserDestroy;
            }(index_1.Model));
            sequelize.addModels([UserDestroy]);
            return UserDestroy.sync().then(function () {
                return UserDestroy.create({ newId: '123ABC', email: 'hello' }).then(function () {
                    return UserDestroy.findOne({ where: { email: 'hello' } }).then(function (user) {
                        return user.destroy();
                    });
                });
            });
        });
        it('sets deletedAt property to a specific date when deleting an instance', function () {
            return ParanoidUser.create({ username: 'fnord' }).then(function () {
                return ParanoidUser.findAll().then(function (users) {
                    return users[0].destroy().then(function () {
                        chai_1.expect(users[0].deletedAt.getMonth).to.exist;
                        return users[0].reload({ paranoid: false }).then(function (user) {
                            chai_1.expect(user.deletedAt.getMonth).to.exist;
                        });
                    });
                });
            });
        });
        it('keeps the deletedAt-attribute with value null, when running updateAttributes', function () {
            return ParanoidUser.create({ username: 'fnord' }).then(function () {
                return ParanoidUser.findAll().then(function (users) {
                    return users[0].updateAttributes({ username: 'newFnord' }).then(function (user) {
                        chai_1.expect(user.deletedAt).not.to.exist;
                    });
                });
            });
        });
        it('keeps the deletedAt-attribute with value null, when updating associations', function () {
            return ParanoidUser.create({ username: 'fnord' }).then(function () {
                return ParanoidUser.findAll().then(function (users) {
                    return ParanoidUser.create({ username: 'linkedFnord' }).then(function (linkedUser) {
                        return users[0].$set('paranoidUser', linkedUser).then(function (user) {
                            chai_1.expect(user.deletedAt).not.to.exist;
                        });
                    });
                });
            });
        });
        it('can reuse query option objects', function () {
            return User_1.User.create({ username: 'fnord' }).then(function () {
                var query = { where: { username: 'fnord' } };
                return User_1.User.findAll(query).then(function (users) {
                    chai_1.expect(users[0].username).to.equal('fnord');
                    return User_1.User.findAll(query).then(function (_users) {
                        chai_1.expect(_users[0].username).to.equal('fnord');
                    });
                });
            });
        });
    });
    describe('find', function () {
        it('can reuse query option objects', function () {
            return User_1.User.create({ username: 'fnord' }).then(function () {
                var query = { where: { username: 'fnord' } };
                return User_1.User.findOne(query).then(function (user) {
                    chai_1.expect(user.username).to.equal('fnord');
                    return User_1.User.findOne(query).then(function (_user) {
                        chai_1.expect(_user.username).to.equal('fnord');
                    });
                });
            });
        });
        it('returns null for null, undefined, and unset boolean values', function () {
            var Setting = /** @class */ (function (_super) {
                __extends(Setting, _super);
                function Setting() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                __decorate([
                    index_1.Column,
                    __metadata("design:type", String)
                ], Setting.prototype, "settingKey", void 0);
                __decorate([
                    index_1.AllowNull,
                    index_1.Column,
                    __metadata("design:type", Boolean)
                ], Setting.prototype, "boolValue", void 0);
                __decorate([
                    index_1.AllowNull,
                    index_1.Column,
                    __metadata("design:type", Boolean)
                ], Setting.prototype, "boolValue2", void 0);
                __decorate([
                    index_1.AllowNull,
                    index_1.Column,
                    __metadata("design:type", Boolean)
                ], Setting.prototype, "boolValue3", void 0);
                Setting = __decorate([
                    index_1.Table({ logging: true })
                ], Setting);
                return Setting;
            }(index_1.Model));
            sequelize.addModels([Setting]);
            return Setting.sync({ force: true }).then(function () {
                return Setting.create({ settingKey: 'test', boolValue: null, boolValue2: undefined }).then(function () {
                    return Setting.findOne({ where: { settingKey: 'test' } }).then(function (setting) {
                        chai_1.expect(setting.boolValue).to.equal(null);
                        chai_1.expect(setting.boolValue2).to.equal(null);
                        chai_1.expect(setting.boolValue3).to.equal(null);
                    });
                });
            });
        });
    });
    describe('equals', function () {
        it('can compare records with Date field', function () {
            return User_1.User.create({ username: 'fnord' }).then(function (user1) {
                return User_1.User.findOne({ where: { username: 'fnord' } }).then(function (user2) {
                    chai_1.expect(user1.equals(user2)).to.be.true;
                });
            });
        });
        it('does not compare the existence of associations', function () {
            var UserAssociationEqual = /** @class */ (function (_super) {
                __extends(UserAssociationEqual, _super);
                function UserAssociationEqual() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                __decorate([
                    index_1.Column,
                    __metadata("design:type", String)
                ], UserAssociationEqual.prototype, "username", void 0);
                __decorate([
                    index_1.HasMany(function () { return ProjectAssociationEqual; }),
                    __metadata("design:type", Array)
                ], UserAssociationEqual.prototype, "projects", void 0);
                UserAssociationEqual = __decorate([
                    index_1.Table
                ], UserAssociationEqual);
                return UserAssociationEqual;
            }(index_1.Model));
            var ProjectAssociationEqual = /** @class */ (function (_super) {
                __extends(ProjectAssociationEqual, _super);
                function ProjectAssociationEqual() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                __decorate([
                    index_1.Column,
                    __metadata("design:type", String)
                ], ProjectAssociationEqual.prototype, "title", void 0);
                __decorate([
                    index_1.Column,
                    __metadata("design:type", Number)
                ], ProjectAssociationEqual.prototype, "overdueDays", void 0);
                __decorate([
                    index_1.ForeignKey(function () { return UserAssociationEqual; }),
                    index_1.Column,
                    __metadata("design:type", Number)
                ], ProjectAssociationEqual.prototype, "userId", void 0);
                __decorate([
                    index_1.BelongsTo(function () { return UserAssociationEqual; }),
                    __metadata("design:type", UserAssociationEqual)
                ], ProjectAssociationEqual.prototype, "user", void 0);
                ProjectAssociationEqual = __decorate([
                    index_1.Table
                ], ProjectAssociationEqual);
                return ProjectAssociationEqual;
            }(index_1.Model));
            sequelize.addModels([UserAssociationEqual, ProjectAssociationEqual]);
            return UserAssociationEqual.sync({ force: true })
                .then(function () { return ProjectAssociationEqual.sync({ force: true }); })
                .then(function () { return Promise.all([
                UserAssociationEqual.create({ username: 'jimhalpert' }),
                ProjectAssociationEqual.create({ title: 'A Cool Project' })
            ]); })
                .then(function (_a) {
                var user1 = _a[0], project1 = _a[1];
                return user1.$set('projects', [project1])
                    .then(function () {
                    return Promise.all([
                        UserAssociationEqual.findOne({
                            where: { username: 'jimhalpert' },
                            include: [ProjectAssociationEqual]
                        }),
                        UserAssociationEqual.create({ username: 'pambeesly' })
                    ]);
                })
                    .then(function (_a) {
                    var user2 = _a[0], user3 = _a[1];
                    chai_1.expect(user1.get('projects')).to.not.exist;
                    chai_1.expect(user2.get('projects')).to.exist;
                    chai_1.expect(user1.equals(user2)).to.be.true;
                    // expect(user2.equals(user1)).to.be.true; TODO@robin does not work with classic define either - so whats wrong?
                    chai_1.expect(user1.equals(user3)).to.not.be.true;
                    chai_1.expect(user3.equals(user1)).to.not.be.true;
                });
            });
        });
    });
    describe('values', function () {
        it('returns all values', function () {
            var UserHelper = /** @class */ (function (_super) {
                __extends(UserHelper, _super);
                function UserHelper() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                __decorate([
                    index_1.Column,
                    __metadata("design:type", String)
                ], UserHelper.prototype, "username", void 0);
                __decorate([
                    index_1.Column,
                    __metadata("design:type", String)
                ], UserHelper.prototype, "email", void 0);
                UserHelper = __decorate([
                    index_1.Table({ logging: false })
                ], UserHelper);
                return UserHelper;
            }(index_1.Model));
            sequelize.addModels([UserHelper]);
            return UserHelper.sync().then(function () {
                var user = UserHelper.build({ username: 'foo' });
                chai_1.expect(user.get({ plain: true })).to.deep.equal({ username: 'foo', id: null });
            });
        });
    });
    describe('destroy', function () {
        // TODO@robin sqlite3 transaction issue??
        // if (current.dialect.supports.transactions) {
        //   it('supports transactions', () => {
        //     return Support.prepareTransactionTest(this.sequelize).bind({}).then((sequelize) => {
        //       var User = sequelize.define('User', {username: Support.Sequelize.STRING});
        //
        //       return User.sync({force: true}).then(() => {
        //         return User.create({username: 'foo'}).then((user) => {
        //           return sequelize.transaction().then((t) => {
        //             return user.destroy({transaction: t}).then(() => {
        //               return User.count().then((count1) => {
        //                 return User.count({transaction: t}).then((count2) => {
        //                   expect(count1).to.equal(1);
        //                   expect(count2).to.equal(0);
        //                   return t.rollback();
        //                 });
        //               });
        //             });
        //           });
        //         });
        //       });
        //     });
        //   });
        // }
        it('does not set the deletedAt date in subsequent destroys if dao is paranoid', function () {
            var UserDestroy = /** @class */ (function (_super) {
                __extends(UserDestroy, _super);
                function UserDestroy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                __decorate([
                    index_1.Column,
                    __metadata("design:type", String)
                ], UserDestroy.prototype, "name", void 0);
                __decorate([
                    index_1.Column(index_1.DataType.TEXT),
                    __metadata("design:type", String)
                ], UserDestroy.prototype, "bio", void 0);
                UserDestroy = __decorate([
                    index_1.Table({ timestamps: true, paranoid: true })
                ], UserDestroy);
                return UserDestroy;
            }(index_1.Model));
            sequelize.addModels([UserDestroy]);
            return UserDestroy.sync({ force: true }).then(function () {
                return UserDestroy.create({ name: 'hallo', bio: 'welt' }).then(function (user) {
                    return user.destroy().then(function () {
                        return user.reload({ paranoid: false }).then(function () {
                            var deletedAt = user.deletedAt;
                            return user.destroy().then(function () {
                                return user.reload({ paranoid: false }).then(function () {
                                    chai_1.expect(user.deletedAt).to.eql(deletedAt);
                                });
                            });
                        });
                    });
                });
            });
        });
        it('deletes a record from the database if dao is not paranoid', function () {
            var UserDestroy = /** @class */ (function (_super) {
                __extends(UserDestroy, _super);
                function UserDestroy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                __decorate([
                    index_1.Column,
                    __metadata("design:type", String)
                ], UserDestroy.prototype, "name", void 0);
                __decorate([
                    index_1.Column(index_1.DataType.TEXT),
                    __metadata("design:type", String)
                ], UserDestroy.prototype, "bio", void 0);
                UserDestroy = __decorate([
                    index_1.Table
                ], UserDestroy);
                return UserDestroy;
            }(index_1.Model));
            sequelize.addModels([UserDestroy]);
            return UserDestroy.sync({ force: true }).then(function () {
                return UserDestroy.create({ name: 'hallo', bio: 'welt' }).then(function (u) {
                    return UserDestroy.findAll().then(function (users) {
                        chai_1.expect(users.length).to.equal(1);
                        return u.destroy().then(function () {
                            return UserDestroy.findAll().then(function (_users) {
                                chai_1.expect(_users.length).to.equal(0);
                            });
                        });
                    });
                });
            });
        });
        it('allows sql logging of delete statements', function () {
            var UserDelete = /** @class */ (function (_super) {
                __extends(UserDelete, _super);
                function UserDelete() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                __decorate([
                    index_1.Column,
                    __metadata("design:type", String)
                ], UserDelete.prototype, "name", void 0);
                __decorate([
                    index_1.Column(index_1.DataType.TEXT),
                    __metadata("design:type", String)
                ], UserDelete.prototype, "bio", void 0);
                UserDelete = __decorate([
                    index_1.Table({ paranoid: true })
                ], UserDelete);
                return UserDelete;
            }(index_1.Model));
            sequelize.addModels([UserDelete]);
            return UserDelete.sync({ force: true }).then(function () {
                return UserDelete.create({ name: 'hallo', bio: 'welt' }).then(function (u) {
                    return UserDelete.findAll().then(function (users) {
                        chai_1.expect(users.length).to.equal(1);
                        return u.destroy({
                            logging: function (sql) {
                                chai_1.expect(sql).to.exist;
                                chai_1.expect(sql.toUpperCase().indexOf('DELETE')).to.be.above(-1);
                            }
                        });
                    });
                });
            });
        });
        it('delete a record of multiple primary keys table', function () {
            var MultiPrimary = /** @class */ (function (_super) {
                __extends(MultiPrimary, _super);
                function MultiPrimary() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                __decorate([
                    index_1.PrimaryKey,
                    index_1.Column(index_1.DataType.CHAR(2)),
                    __metadata("design:type", String)
                ], MultiPrimary.prototype, "bilibili", void 0);
                __decorate([
                    index_1.PrimaryKey,
                    index_1.Column(index_1.DataType.CHAR(2)),
                    __metadata("design:type", String)
                ], MultiPrimary.prototype, "guruguru", void 0);
                MultiPrimary = __decorate([
                    index_1.Table
                ], MultiPrimary);
                return MultiPrimary;
            }(index_1.Model));
            sequelize.addModels([MultiPrimary]);
            return MultiPrimary.sync({ force: true }).then(function () {
                return MultiPrimary.create({ bilibili: 'bl', guruguru: 'gu' }).then(function () {
                    return MultiPrimary.create({ bilibili: 'bl', guruguru: 'ru' }).then(function (m2) {
                        return MultiPrimary.findAll().then(function (ms) {
                            chai_1.expect(ms.length).to.equal(2);
                            return m2.destroy({
                                logging: function (sql) {
                                    chai_1.expect(sql).to.exist;
                                    chai_1.expect(sql.toUpperCase().indexOf('DELETE')).to.be.above(-1);
                                    chai_1.expect(sql.indexOf('ru')).to.be.above(-1);
                                    chai_1.expect(sql.indexOf('bl')).to.be.above(-1);
                                }
                            }).then(function () {
                                return MultiPrimary.findAll().then(function (ms3) {
                                    chai_1.expect(ms3.length).to.equal(1);
                                    chai_1.expect(ms3[0].bilibili).to.equal('bl');
                                    chai_1.expect(ms3[0].guruguru).to.equal('gu');
                                });
                            });
                        });
                    });
                });
            });
        });
    });
    describe('restore', function () {
        it('returns an error if the model is not paranoid', function () {
            return User_1.User.create({ username: 'Peter' }).then(function (user) {
                return chai_1.expect(function () { return user.restore(); }).to.throw(Error, 'Model is not paranoid');
            });
        });
        it('restores a previously deleted model', function () {
            var ParanoidUser2 = /** @class */ (function (_super) {
                __extends(ParanoidUser2, _super);
                function ParanoidUser2() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                __decorate([
                    index_1.Column,
                    __metadata("design:type", String)
                ], ParanoidUser2.prototype, "username", void 0);
                __decorate([
                    index_1.Column,
                    __metadata("design:type", String)
                ], ParanoidUser2.prototype, "secretValue", void 0);
                __decorate([
                    index_1.Column,
                    __metadata("design:type", String)
                ], ParanoidUser2.prototype, "data", void 0);
                __decorate([
                    index_1.Default(1),
                    index_1.Column,
                    __metadata("design:type", Number)
                ], ParanoidUser2.prototype, "inVal", void 0);
                ParanoidUser2 = __decorate([
                    index_1.Table({ timestamps: true, paranoid: true })
                ], ParanoidUser2);
                return ParanoidUser2;
            }(index_1.Model));
            sequelize.addModels([ParanoidUser2]);
            var data = [{ username: 'Peter', secretValue: '42' },
                { username: 'Paul', secretValue: '43' },
                { username: 'Bob', secretValue: '44' }];
            return ParanoidUser2.sync({ force: true }).then(function () {
                return ParanoidUser2.bulkCreate(data);
            }).then(function () {
                return ParanoidUser2.findOne({ where: { secretValue: '42' } });
            }).then(function (user) {
                return user.destroy().then(function () {
                    return user.restore();
                });
            }).then(function () {
                return ParanoidUser2.findOne({ where: { secretValue: '42' } });
            }).then(function (user) {
                chai_1.expect(user).to.be.ok;
                chai_1.expect(user.username).to.equal('Peter');
            });
        });
    });
});
//# sourceMappingURL=instance.spec.js.map