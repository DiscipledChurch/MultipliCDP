var request = require('supertest');
var expect = require('chai').expect;

xdescribe('loading express', () => {
    var server;

    beforeEach((done) => {
        //delete require.cache[require.resolve('../src/index')];
        //server = require('../src/index');
        delete require.cache[require.resolve('../../dist/node/index')];
        server = require('../../dist/node/index');
        done();
    });

    afterEach((done) => {
        server.close(done);
    });

    it('responds to /', (done) => {
        request(server).get('/')
            .expect(200)
            .end(function(err, response) {
                expect(response.header['content-type']).to.equal('text/html; charset=UTF-8');
                expect(response.header['access-control-allow-origin']).to.equal('*');
                expect(response.header['access-control-allow-methods']).to.equal('GET,POST');
                expect(response.header['access-control-allow-headers']).to.equal('X-Requested-With,content-type,Authorization');
                done();
            });
    });

    it('returns 404', (done) => {
        request(server).get('/foo').expect(404, done);
    });
});