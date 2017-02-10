var expect = require('chai').expect;
var sinon = require('sinon');
var request = require('supertest');
var Organizations = require(process.env.PROJECT_HOME + '/dist/node/data/mongo/organizations');
var api = require(process.env.PROJECT_HOME + '/dist/node/controllers/api/index');


describe('API: organizations', () => {
    var server;
    var getAllStub;

    before(() => {
        var orgsStub = [
            {
                _id: 1,
                name: 'Organization 1',
                hostname: 'org1',
                isAuthorized: true,
                createDate: new Date()
            },
            {
                _id: 2,
                name: 'Organization 2',
                hostname: 'org2',
                isAuthorized: false,
                createDate: new Date()
            }
        ];

        getAllStub = sinon.stub(Organizations.Organizations.prototype, 'getAll', () => {
            return new Promise((resolve, reject) => {
                resolve(orgsStub);
            })
        });

    });

    after(() => {
        getAllStub.restore();
    });

    beforeEach((done) => {
        delete require.cache[require.resolve(process.env.PROJECT_HOME + '/dist/node/index')];
        server = require(process.env.PROJECT_HOME + '/dist/node/index');
        done();
    });

    afterEach((done) => {
        server.close(done);
    });

    describe('GET /api/organizations', () => {

        it('should return a list of organizations', (done) => {
            request(server).get('/api/organizations')
                .expect(200, (err, resp) => {
                    expect(resp.body).to.not.be.empty;
                    
                    var orgs = resp.body;
                    expect(orgs).to.have.lengthOf(2);
                    expect(orgs.filter((org) => { return org.isAuthorized; })).to.have.lengthOf(1);
                    done();
                });
        });

    });
});