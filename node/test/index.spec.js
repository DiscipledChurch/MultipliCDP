var request = require('supertest');
var expect = require('chai').expect;

describe('loading express', () => {
    var server;
    var test;

    beforeEach((done) => {
        //delete require.cache[require.resolve('../src/index')];
        //server = require('../src/index');
        process.env.NODE_ENV = 'test';
        delete require.cache[require.resolve('../../dist/node/index')];
        server = require('../../dist/node/index');
        done();
    });

    afterEach((done) => {
        process.env.NODE_ENV = 'development';
        server.close(done);
    });

    it('responds to /', (done) => {
        request(server).get('/')
            .expect(200)
            .end(function(err, response) {
                expect(response.header['content-type']).to.equal('text/plain; charset=utf-8');
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