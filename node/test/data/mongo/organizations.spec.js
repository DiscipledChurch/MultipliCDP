var expect = require('chai').expect;
var mongoose = require('mongoose');
var Organization = require(process.env.PROJECT_HOME + '/dist/node/data/interfaces/organizations').Organization;
var Organizations = require(process.env.PROJECT_HOME + '/dist/node/data/mongo/organizations');

describe('DATA: organizations', function() {

    before(function() {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://testuser:!@#QWEasd@ds056979.mlab.com:56979/multiplitest')
    });

    describe('save', function() {
        xit('should create a new organization', function(done) {

        });

        xit('should update an organization with a valid id', function(done) {

        });

        xit('should not update an organization with an invalid id', function(done) {

        });
    });

    describe('delete', function() {
        xit('should set an existing organization as deleted', function(done) {

        });

        xit('should return null for a non-existent organization', function(done) {

        });
    });

    describe('get', function() {
        xit('should return an existing organization', function(done) {

        });

        xit('should return a deleted organization', function(done) {

        });

        xit('should not return a deleted organization', function(done) {

        });

        xit('should return null for a non-existent organization', function(done) {

        });
    });

    describe('getAll', function() {
        xit('should return all non-deleted organizations', function(done) {

        });

        xit('should return all, including deleted, organizations', function(done) {

        });
    });

});