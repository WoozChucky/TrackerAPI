//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = require('should');

chai.use(chaiHttp);

/**
 * Test the /GET index/
 */

describe('/GET /index', () => {
    it('should get the login view rendered', done => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                should.exist(res.body);
                should.equal(res.status, 200);
                done();
            });
    });
 });

 /**
 * Test the /GET index/
 */

describe('/GET /index', () => {
    it('should get the home view rendered', done => {
        chai.request(server)
            .get('/')
            .set('Authorization', 'P0Ma0aij6wXJCSXxCHAdF1qvtKm2')
            .end((err, res) => {
                should.exist(res.body);
                should.equal(res.status, 200);
                done();
            });
    });
 });