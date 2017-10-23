//During the test the env variable is set to test
//process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = require('should');

chai.use(chaiHttp);

/**
 * Test the /GET api/admin/config
 */

 describe('/GET api/admin/config', () => {
    it('should get all config entries in firebase realtime dabatase', done => {
        chai.request(server)
            .get('/api/admin/config')
            .end((err, res) => {
                should.exist(res.body);
                should.equal(res.status, 200);
                done();
            });
    });
 });

 /**
 * Test the /GET api/admin/config/:key
 */

describe('/GET api/admin/config/:key', () => {
    it('should get the config entry given a :key', done => {
        chai.request(server)
            .get('/api/admin/config/test')
            .end((err, res) => {
                should(res.status).be.exactly(200, 'should receive 200 http code');
                should(res.body).have.property('value', '123');
                done();
            });
    });
 });

/**
 * Test the /GET api/admin/config/:key
 */

describe('/GET api/admin/config/:key', () => {
    it('should get http code 400 given an invalid config :key', done => {
        chai.request(server)
            .get('/api/admin/config/invalidkey')
            .end((err, res) => {
                should(res.status).be.exactly(400, 'should receive 400 http code');
                should(res.body).have.property('message', 'Not found');
                done();
            });
    });
 });

/**
 * Test the /POST api/admin/config/add
 */

describe('/POST api/admin/config/:key', () => {
    it('should insert a new config in database', done => {

        var config = {
            key: 'newKey',
            value: '456'
        };

        chai.request(server)
            .post('/api/admin/config/add')
            .send(config)
            .end((err, res) => {
                should(res.status).be.exactly(200, 'should receive 200 http code');
                should(res.body).have.property('valid', true);
                done();
            });
    });
 });

 /**
 * Test the /POST api/admin/config/add
 */

describe('/POST api/admin/config/:key', () => {
    it('should fail to insert a new config in database', done => {

        var config = {
            value: '123'
        };

        chai.request(server)
            .post('/api/admin/config/add')
            .send(config)
            .end((err, res) => {
                should(res.status).be.exactly(400, 'should receive 400 http code');
                should(res.body).have.property('valid', false);
                should(res.body).have.property('error', 'Missing params');
                done();
            });
    });
 });

  /**
 * Test the /DELTE api/admin/config/
 */

describe('/DELETE api/admin/config/:key', () => {
    it('should delete a config given a :key', done => {

        var key = 'newKey';

        chai.request(server)
            .del('/api/admin/config/' + key)
            .end((err, res) => {
                should(res.status).be.exactly(200, 'should receive 200 http code');
                should(res.body).have.property('valid', true);
                done();
            });
    });
 });

/**
 * Test the /DELTE api/admin/config/
 */

describe('/DELETE api/admin/config/:key', () => {
    it('should fail to delete a config given an invalid :key', done => {

        var key = 'nonexistingkey';

        chai.request(server)
            .del('/api/admin/config/' + key)
            .end((err, res) => {
                should(res.status).be.exactly(400, 'should receive 400 http code');
                should(res.body).have.property('valid', false);
                should(res.body).have.property('error', 'Not found');
                done();
            });
    });
 });