var expect = require('chai').expect;
var mongoose = require('mongoose');
var Organization = require(process.env.PROJECT_HOME + '/dist/node/data/interfaces/organizations').Organization;
var Organizations = require(process.env.PROJECT_HOME + '/dist/node/data/mongo/organizations').Organizations;
var OrganizationsDB = require(process.env.PROJECT_HOME + '/dist/node/data/mongo/schemas/organizations').OrganizationsDB;

describe('DATA (mongodb): organizations', function () {
    describe('save', function () {
        xit('should create a new organization', function (done) {

        });

        xit('should update an organization with a valid id', function (done) {

        });

        xit('should not update an organization with an invalid id', function (done) {

        });
    });

    describe('delete', function () {
        xit('should set an existing organization as deleted', function (done) {

        });

        xit('should return null for a non-existent organization', function (done) {

        });
    });

    describe('get', function () {
        xit('should return an existing organization', function (done) {

        });

        xit('should return a deleted organization', function (done) {

        });

        xit('should not return a deleted organization', function (done) {

        });

        xit('should return null for a non-existent organization', function (done) {

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
                    if (err) {
                        console.log('err', err);
                        reject(err);
                    }
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
                    if (err) {
                        console.log('err', err);
                        reject(err);
                    }
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
                    if (err) {
                        console.log('err', err);
                        reject(err);
                    }
                    else
                        resolve();
                });
            });

            Promise.all([p1, p2, p3]).then((vals) => {
                done();
            });
        });

        after(function (done) {
            OrganizationsDB.remove({}, done);
        })

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