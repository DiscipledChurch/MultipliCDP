var expect = require('chai').expect;
var sinon = require('sinon');
var request = require('supertest');
var clone = require('clone');
var Organizations = require(process.env.PROJECT_HOME + '/dist/node/data/mongo/organizations');
var api = require(process.env.PROJECT_HOME + '/dist/node/controllers/api/index');


describe('API: organizations', function() {
    var server;
    var orgsStub;

    before(function() {
        orgsStub = [
            {
                _id: 1,
                name: 'Organization 1',
                hostname: 'org1',
                isAuthorized: true,
                createDate: new Date(),
                isDeleted: false,
                deletedDate: null
            },
            {
                _id: 2,
                name: 'Organization 2',
                hostname: 'org2',
                isAuthorized: false,
                createDate: new Date(),
                isDeleted: true,
                deletedDate: new Date()
            }
        ];



        saveStub = sinon.stub(Organizations.Organizations.prototype, 'save', (org) => {

        });


    });

    after(function() {
        saveStub.restore();
    });

    beforeEach(function(done) {
        delete require.cache[require.resolve(process.env.PROJECT_HOME + '/dist/node/index')];
        server = require(process.env.PROJECT_HOME + '/dist/node/index');
        done();
    });

    afterEach(function(done) {
        server.close(done);
    });

    describe('GET /api/organizations', function() {
        var getAllStub;

        before(function() {
            getAllStub = sinon.stub(Organizations.Organizations.prototype, 'getAll', (includeInactive) => {
                return new Promise((resolve, reject) => {
                    if (includeInactive)
                        resolve(orgsStub);
                    else
                        resolve(orgsStub.filter((org) => {
                            return org.isDeleted == false;
                        }));
                })
            });
        });

        after(function() {
            getAllStub.restore();
        });

        it('should return a list of all organizations', function(done) {
            request(server).get('/api/organizations')
                .send({
                    includeDeleted: true
                })
                .expect(200, (err, resp) => {
                    expect(resp.body).to.not.be.empty;

                    var orgs = resp.body;
                    expect(orgs).to.have.lengthOf(2);
                    expect(orgs.filter((org) => { return org.isDeleted; })).to.have.lengthOf(1);
                    done();
                });
        });

        it('should only return a list of undeleted organizations', function(done) {
            request(server).get('/api/organizations')
                .expect(200, (err, resp) => {
                    expect(resp.body).to.not.be.empty;

                    var orgs = resp.body;
                    expect(orgs).to.have.lengthOf(1);
                    expect(orgs[0].name).to.equal('Organization 1');
                    done();
                });
        });
    });

    describe('GET /api/organizations/:id', function() {
        var getStub;

        before(function() {
            getStub = sinon.stub(Organizations.Organizations.prototype, 'get', (id, includeInactive) => {
                return new Promise((resolve, reject) => {
                    resolve(orgsStub.filter((org) => {
                        if (includeInactive)
                            return org._id == id;
                        else
                            return org._id == id && org.isDeleted == false;
                    }));
                })
            });
        });

        after(function() {
            getStub.restore();
        });

        it('should return the organization with id of 1', function(done) {
            request(server).get('/api/organizations/1')
                .expect(200, (err, resp) => {
                    expect(resp.body).to.not.be.empty;

                    var orgs = resp.body;
                    expect(orgs).to.have.lengthOf(1);
                    expect(orgs[0].name).to.equal('Organization 1');
                    done();
                });
        });

        it('should return the deleted organization with id of 2', function(done) {
            request(server).get('/api/organizations/2')
                .send({
                    includeDeleted: true
                })
                .expect(200, (err, resp) => {
                    expect(resp.body).to.not.be.empty;

                    var orgs = resp.body;
                    expect(orgs).to.have.lengthOf(1);
                    expect(orgs[0].name).to.equal('Organization 2');
                    done();
                });
        });

        it('should not return any organization', function(done) {
            request(server).get('/api/organizations/2')
                .expect(200, (err, resp) => {
                    expect(resp.body).to.be.empty;
                    done();
                });
        });
    });

    xdescribe('POST /api/organizations', function() {

    });

    xdescribe('PUT /api/organizations/:id', function() {

    });

    describe('DELETE /api/organizations', function() {
        var deleteStub;
        var copyStub;

        before(function() {
            copyStub = clone(orgsStub);
            deleteStub = sinon.stub(Organizations.Organizations.prototype, 'delete', (id) => {
                var orgs = copyStub.filter((org) => {
                    return org._id == id && org.isDeleted == false;
                });
                
                orgs.forEach((org) => { org.isDeleted = true; });

                return new Promise((resolve, reject) => {
                    if (orgs.length == 0)
                        resolve(null);
                    else
                        resolve(orgs);
                });
            });
        });

        after(function() {
            deleteStub.restore();
        });

        it('should delete an active organization', function(done) {
            request(server).delete('/api/organizations/1')
                .expect(200, (err, resp) => {
                    expect(resp.body).to.not.be.empty;
                    expect(resp.body).to.have.lengthOf(1);

                    var org = resp.body[0];
                    expect(org._id).to.equal(1);
                    expect(org.isDeleted).to.be.true;
                    done();
                });
        });

        it('should not delete an already deleted organization', function(done) {
            request(server).delete('/api/organizations/2')
                .expect(200, (err, resp) => {
                    expect(resp.body).to.be.empty;
                    done();
                });
        });

        it('should not delete a non-existent organization', function(done) {
            request(server).delete('/api/organizations/3')
                .expect(200, (err, resp) => {
                    expect(resp.body).to.be.empty;
                    done();
                });
        });
    });
});