var expect = require('chai').expect;
var mongoose = require('mongoose');
var Organization = require(process.env.PROJECT_HOME + '/dist/node/data/interfaces/organizations').Organization;
var Organizations = require(process.env.PROJECT_HOME + '/dist/node/data/mongo/organizations').Organizations;
var OrganizationsDB = require(process.env.PROJECT_HOME + '/dist/node/data/mongo/schemas/organizations').OrganizationsDB;

describe('DATA (mongodb): organizations', function () {
    this.timeout(60000);

    describe('save', function () {
        var ids;

        before(function (done) {
            var p1 = new Promise((resolve, reject) => {
                var org1 = new OrganizationsDB();

                org1.name = 'save Org 1';
                org1.hostname = 'saveOrg1';
                org1.isAuthorized = false;
                org1.createdDate = new Date();
                org1.isDeleted = false;
                org1.save((err, org) => {
                    if (err)
                        reject(err);
                    else
                        resolve({ org: 1, id: org._id });
                });
            });

            var p2 = new Promise((resolve, reject) => {
                var org2 = new OrganizationsDB();

                org2.name = 'save Org 2';
                org2.hostname = 'saveOrg2';
                org2.isAuthorized = false;
                org2.createdDate = new Date();
                org2.isDeleted = true;
                org2.save((err, org) => {
                    if (err)
                        reject(err);
                    else
                        resolve({ org: 2, id: org._id });
                });
            });

            Promise.all([p1, p2]).then((vals) => {
                ids = vals;
                done();
            });
        });

        after(function (done) {
            OrganizationsDB.remove({ 'name': /save / }, done);
        });

        it('should create a new organization', function (done) {
            var orgs = new Organizations();
            var org = new Organization();

            org.name = 'save Org 3';
            org.hostname = 'saveOrg3';

            orgs.save(org).then((result) => {
                expect(result._id).to.not.be.null;
                expect(result.name).to.equal('save Org 3');
                done();
            }).catch((e) => {
                done(e);
            });
        });

        it('should update an organization with a valid id', function (done) {
            var orgs = new Organizations();
            var id = ids.filter((id) => { return id.org == 1; })[0];
            OrganizationsDB.findById(id.id).then((org) => {

                org.name = 'save Org 1 - updated';

                orgs.save(org).then((result) => {
                    expect(result).to.be.true;
                    OrganizationsDB.findById(id.id).then((found) => {
                        expect(found.name).to.equal('save Org 1 - updated');
                        done();
                    }).catch((e) => {
                        done(e);
                    });
                }).catch((e) => {
                    done(e);
                });
            }).catch((e) => {
                done(e);
            });

        });

        it('should not update an organization with an invalid id', function (done) {
            var orgs = new Organizations();
            var id = ids.filter((id) => { return id.org == 1; })[0];
            OrganizationsDB.findById(id.id).then((org) => {

                org._id = mongoose.Types.ObjectId();
                org.name = 'save Org 1 - updated';

                orgs.save(org).then((result) => {
                    expect(result).to.be.null;
                    done();
                }).catch((e) => {
                    expect(e).to.not.be.null;
                    expect(e.error).to.equal('Entity not found.');
                    done();
                });
            }).catch((e) => {
                done(e);
            });
        });

        it('should not update a deleted organization', function (done) {
            var orgs = new Organizations();
            var id = ids.filter((id) => { return id.org == 2; })[0];
            OrganizationsDB.findById(id.id).then((org) => {

                org.name = 'save Org 2 - updated';

                orgs.save(org).then((result) => {
                    expect(result).to.be.null;
                    done();
                }).catch((e) => {
                    expect(e).to.not.be.null;
                    expect(e.error).to.equal('Entity is deleted.');
                    done();
                });
            }).catch((e) => {
                done(e);
            });
        });
    });

    describe('delete', function () {
        var ids;

        before(function (done) {
            var p1 = new Promise((resolve, reject) => {
                var org1 = new OrganizationsDB();

                org1.name = 'deleted Org 1';
                org1.hostname = 'deletedOrg1';
                org1.isAuthorized = false;
                org1.createdDate = new Date();
                org1.isDeleted = false;
                org1.save((err, org) => {
                    if (err)
                        reject(err);
                    else
                        resolve({ org: 1, id: org._id });
                });
            });

            var p2 = new Promise((resolve, reject) => {
                var org2 = new OrganizationsDB();

                org2.name = 'deleted Org 2';
                org2.hostname = 'deletedOrg2';
                org2.isAuthorized = false;
                org2.createdDate = new Date();
                org2.isDeleted = true;
                org2.save((err, org) => {
                    if (err)
                        reject(err);
                    else
                        resolve({ org: 2, id: org._id });
                });
            });

            Promise.all([p1, p2]).then((vals) => {
                ids = vals;
                done();
            });
        });

        after(function (done) {
            OrganizationsDB.remove({ 'name': /deleted / }, done);
        });

        it('should set an active organization as deleted', function (done) {
            var orgs = new Organizations();
            var id = ids.filter((id) => { return id.org == 1; })[0];

            orgs.delete(id.id).then((result) => {
                expect(result).to.be.true;
                OrganizationsDB.findById(id.id).then((found) => {
                    expect(found.isDeleted).to.be.true;
                    done();
                }).catch((e) => {
                    done(e);
                });
            }).catch((e) => {
                done(e);
            });

        });

        it('should return error for a previously deleted organization', function (done) {
            var orgs = new Organizations();
            var id = ids.filter((id) => { return id.org == 2; })[0];

            orgs.delete(id.id).then((result) => {
                expect(result).to.be.null;
                done();
            }).catch((e) => {
                expect(e).to.not.be.null;
                expect(e.error).to.equal('Entity is deleted.');
                done();
            });
        });

        xit('should undelete a previously-deleted organization', function (done) {

        });

        it('should return error for a non-existent organization', function (done) {
            var orgs = new Organizations();
            var id = mongoose.Types.ObjectId();

            orgs.delete(id).then((result) => {
                expect(result).to.be.null;
                done();
            }).catch((e) => {
                expect(e).to.not.be.null;
                expect(e.error).to.equal('Entity not found.');
                done();
            });
        });
    });

    describe('get', function () {
        var ids;

        before(function (done) {
            var p1 = new Promise((resolve, reject) => {
                var org1 = new OrganizationsDB();

                org1.name = 'get Org 1';
                org1.hostname = 'getOrg1';
                org1.isAuthorized = false;
                org1.createdDate = new Date();
                org1.isDeleted = false;
                org1.save((err, org) => {
                    if (err)
                        reject(err);
                    else
                        resolve({ org: 1, id: org._id });
                });
            });

            var p2 = new Promise((resolve, reject) => {
                var org2 = new OrganizationsDB();

                org2.name = 'get Org 2';
                org2.hostname = 'getOrg2';
                org2.isAuthorized = false;
                org2.createdDate = new Date();
                org2.isDeleted = false;
                org2.save((err, org) => {
                    if (err)
                        reject(err);
                    else
                        resolve({ org: 2, id: org._id });
                });
            });

            var p3 = new Promise((resolve, reject) => {

                var org3 = new OrganizationsDB();

                org3.name = 'get Org 3';
                org3.hostname = 'getOrg3';
                org3.isAuthorized = false;
                org3.createdDate = new Date();
                org3.isDeleted = true;
                org3.save((err, org) => {
                    if (err)
                        reject(err);
                    else
                        resolve({ org: 3, id: org._id });
                });
            });

            Promise.all([p1, p2, p3]).then((vals) => {
                ids = vals;
                done();
            });
        });

        after(function (done) {
            OrganizationsDB.remove({ 'name': /get / }, done);
        });

        it('should return an existing organization', function (done) {
            var orgs = new Organizations();
            var org = ids.filter((id) => { return id.org == 1; })[0];
            orgs.get(org.id).then((result) => {
                expect(result.name).to.equal('get Org 1');
                done();
            }).catch((e) => {
                done(e);
            });
        });

        it('should return a deleted organization', function (done) {
            var orgs = new Organizations();
            var org = ids.filter((id) => { return id.org == 3; })[0];
            orgs.get(org.id, true).then((result) => {
                expect(result.name).to.equal('get Org 3');
                done()
            }).catch((e) => {
                done(e);
            });
        });

        it('should not return a deleted organization', function (done) {
            var orgs = new Organizations();
            var org = ids.filter((id) => { return id.org == 3; })[0];
            orgs.get(org.id, false).then((result) => {
                expect(result).to.be.undefined;
                done();
            }).catch((e) => {
                done(e);
            });

        });

        it('should return null for a non-existent organization', function (done) {
            var orgs = new Organizations();
            orgs.get('aaaaaaaaaaaaaaaaaaaaaaaa').then((result) => {
                expect(result).to.be.undefined;
                done();
            }).catch((e) => {
                done(e);
            });
        });
    });

    describe('getAll', function () {

        before(function (done) {
            var p1 = new Promise((resolve, reject) => {
                var org1 = new OrganizationsDB();

                org1.name = 'getAll Org 1';
                org1.hostname = 'getAllOrg1';
                org1.isAuthorized = false;
                org1.createdDate = new Date();
                org1.isDeleted = false;
                org1.save((err) => {
                    if (err)
                        reject(err);
                    else
                        resolve();
                });
            });

            var p2 = new Promise((resolve, reject) => {
                var org2 = new OrganizationsDB();

                org2.name = 'getAll Org 2';
                org2.hostname = 'getAllOrg2';
                org2.isAuthorized = false;
                org2.createdDate = new Date();
                org2.isDeleted = false;
                org2.save((err) => {
                    if (err)
                        reject(err);
                    else
                        resolve();
                });
            });

            var p3 = new Promise((resolve, reject) => {

                var org3 = new OrganizationsDB();

                org3.name = 'getAll Org 3';
                org3.hostname = 'getAllOrg3';
                org3.isAuthorized = false;
                org3.createdDate = new Date();
                org3.isDeleted = true;
                org3.save((err) => {
                    if (err)
                        reject(err);
                    else
                        resolve();
                });
            });

            Promise.all([p1, p2, p3]).then((vals) => {
                done();
            });
        });

        after(function (done) {
            OrganizationsDB.remove({ 'name': /getAll / }, done);
        });

        it('should return all non-deleted organizations', function (done) {
            var orgs = new Organizations();
            orgs.getAll().then((results) => {
                expect(results).to.have.lengthOf(2);
                done();
            }).catch((e) => {
                done(e);
            });
        });

        it('should return all, including deleted, organizations', function (done) {
            var orgs = new Organizations();
            orgs.getAll(true).then((results) => {
                expect(results).to.have.lengthOf(3);
                done();
            }).catch((e) => {
                done(e);
            });
        });
    });

});