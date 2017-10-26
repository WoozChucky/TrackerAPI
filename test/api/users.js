//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = require('should');

chai.use(chaiHttp);

 /**
 * Test the /GET api/user/authenticate
 */

describe('/GET api/user/authenticate', () => {
    it('should get htpp 400 from authentication process', done => {
        chai.request(server)
            .post('/api/user/authenticate')
            .send({uid: 'invalid_token'})
            .end((err, res) => {
                should.equal(res.status, 400);
                done();
            });
    });
 });