var expect = require('chai').expect;
var sinon = require('sinon');
var request = require('supertest');
var clone = require('clone');
var Organization = require(process.env.PROJECT_HOME + '/dist/node/data/interfaces/organizations').Organization;
var Organizations = require(process.env.PROJECT_HOME + '/dist/node/data/mongo/organizations');
var api = require(process.env.PROJECT_HOME + '/dist/node/controllers/api/index');


describe('API: organizations', function () {
    var server;
    var orgsStub;

    before(function () {
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
    });

    beforeEach(function (done) {
        delete require.cache[require.resolve(process.env.PROJECT_HOME + '/dist/node/index')];
        server = require(process.env.PROJECT_HOME + '/dist/node/index');
        done();
    });

    afterEach(function (done) {
        server.close(done);
    });

    describe('GET /api/organizations', function () {
        var getAllStub;

        before(function () {
            getAllStub = sinon.stub(Organizations.Organizations.prototype, 'getAll', (includeInactive) => {
                return new Promise((resolve, reject) => {
                    if (includeInactive)
                        resolve(orgsStub);
                    else
                        resolve(orgsStub.filter(org => !org.isDeleted));
                })
            });
        });

        after(function () {
            getAllStub.restore();
        });

        it('should return a list of all organizations', function (done) {
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

        it('should only return a list of non-deleted organizations', function (done) {
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

    describe('GET /api/organizations/:id', function () {
        var getStub;

        before(function () {
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

        after(function () {
            getStub.restore();
        });

        it('should return the organization with id of 1', function (done) {
            request(server).get('/api/organizations/1')
                .expect(200, (err, resp) => {
                    expect(resp.body).to.not.be.empty;

                    var orgs = resp.body;
                    expect(orgs).to.have.lengthOf(1);
                    expect(orgs[0].name).to.equal('Organization 1');
                    done();
                });
        });

        it('should return the deleted organization with id of 2', function (done) {
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

        it('should not return any organization', function (done) {
            request(server).get('/api/organizations/2')
                .expect(200, (err, resp) => {
                    expect(resp.body).to.be.empty;
                    done();
                });
        });
    });

    /*
    describe('POST /api/organizations', function () {
        var postStub;
        var copyStub;

        before(function () {
            copyStub = clone(orgsStub);
            postsStub = sinon.stub(Organizations.Organizations.prototype, 'save', (org) => {
                var ids = copyStub.map(o => o._id);
                org._id = (Math.max(...ids)) + 1;
                copyStub.push(_org);

                return new Promise((resolve, reject) => {
                    resolve(org);
                });
            });
        });

        after(function () {
            postStub.restore();
        });

        it('should save a new organization', function (done) {
            var org = new Organization('new org', 'neworg');
            request(server).post('/api/organizations')
                .send(org)
                .expect(200, (err, resp) => {
                    expect(resp.body).to.not.be.empty;

                    var newOrg = resp.body;
                    expect(newOrg._id).to.equal(3);
                    expect(newOrg.name).to.equal('new org');
                    expect(copyStub).to.have.lengthOf(3);
                    done();
                });
        });
    });
    */

    describe('PUT /api/organizations/:id', function () {
        var putStub;
        var copyStub;

        before(function () {
            copyStub = clone(orgsStub);
            putStub = sinon.stub(Organizations.Organizations.prototype, 'save', (org) => {
                return new Promise((resolve, reject) => {
                    var orgIndex = copyStub.findIndex((o) => {
                        return o._id == org._id && !o.isDeleted;
                    });

                    if (orgIndex < 0) 
                        reject({ _id: -1 });
                    else {
                        copyStub[orgIndex] = clone(org);
                        resolve({ _id: Number(org._id) });
                    }
                });
            });
        });

        after(function () {
            putStub.restore();
        });

        it('should update a pre-existing organization', function (done) {
            var org = new Organization('updated Org', 'updatedOrg');
            request(server).put('/api/organizations/1')
                .send(org)
                .expect(200, (err, resp) => {
                    expect(resp.body).to.not.be.empty;

                    expect(resp.body._id).to.equal(1);
                    expect(copyStub).to.have.lengthOf(2);
                    expect(copyStub.find(o => o._id == resp.body._id).name).to.equal('updated Org');
                    done();
                });
        });

        it('should not update a non-existent organization', function (done) {
            var org = new Organization('updated Org', 'updatedOrg');
            request(server).put('/api/organizations/3')
                .send(org)
                .expect(200, (err, resp) => {
                    expect(resp.body).to.not.be.empty;
                    expect(resp.body._id).to.equal(-1);
                    done();
                });
        });

        it('should not update a deleted organization', function (done) {
            var org = new Organization('updated Org', 'updatedOrg');
            request(server).put('/api/organizations/2')
                .send(org)
                .expect(200, (err, resp) => {
                    expect(resp.body).to.not.be.empty;
                    expect(resp.body._id).to.equal(-1);
                    done();
                });

        });

    });

    describe('DELETE /api/organizations', function () {
        var deleteStub;
        var copyStub;

        before(function () {
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

        after(function () {
            deleteStub.restore();
        });

        it('should delete an active organization', function (done) {
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

        it('should not delete an already deleted organization', function (done) {
            request(server).delete('/api/organizations/2')
                .expect(200, (err, resp) => {
                    expect(resp.body).to.be.empty;
                    done();
                });
        });

        it('should not delete a non-existent organization', function (done) {
            request(server).delete('/api/organizations/3')
                .expect(200, (err, resp) => {
                    expect(resp.body).to.be.empty;
                    done();
                });
        });
    });
});