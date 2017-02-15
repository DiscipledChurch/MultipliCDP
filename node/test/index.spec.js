var request = require('supertest');
var expect = require('chai').expect;

describe('loading express', function() {
    var server;

    beforeEach(function(done) {
        delete require.cache[require.resolve(process.env.PROJECT_HOME + '/dist/node/index')];
        server = require(process.env.PROJECT_HOME + '/dist/node/index');
        done();
    });

    afterEach(function(done) {
        server.close(done);
    });

    it('responds to /', function(done) {
        request(server).get('/')
            .expect(200, (err, resp) => {
                expect(resp.header['content-type']).to.equal('text/plain; charset=utf-8');
                expect(resp.header['access-control-allow-origin']).to.equal('*');
                expect(resp.header['access-control-allow-methods']).to.equal('GET,POST');
                expect(resp.header['access-control-allow-headers']).to.equal('X-Requested-With,content-type,Authorization');
                done();
            });
    });

    it('returns 404', function(done) {
        request(server).get('/foo').expect(404, done);
    });
});