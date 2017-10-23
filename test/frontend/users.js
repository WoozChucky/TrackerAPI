//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = require('should');

chai.use(chaiHttp);

/**
 * Test the /GET users/
 */

describe('/GET /users', () => {
    it('should get the users view rendered', done => {
        chai.request(server)
            .get('/users')
            .end((err, res) => {
                should.exist(res.body);
                should.equal(res.status, 200);
                done();
            });
    });
 });