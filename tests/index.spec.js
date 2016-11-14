var request = require('supertest'),
    expect = require('chai').expect;

describe('loading express', function() {
    var server;

    beforeEach(function(done) {
        server = require('../server');
        done();
    });

    afterEach(function() {
        server.close();
    });

    it('responds to /', function(done) {
        request(server).get('/').expect(200, done);
    });

    it('returns 404', function(done) {
        request(server).get('/foo').expect(404, done);
    });
})