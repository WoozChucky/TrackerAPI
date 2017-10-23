//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = require('should');

chai.use(chaiHttp);

 /**
 * Test the /GET api/user/login
 */

describe('/GET api/user/login', () => {
    it('should get htpp 400 from authentication process', done => {
        chai.request(server)
            .post('/api/user/login')
            .send({uid: 'invalid_token'})
            .end((err, res) => {
                should.equal(res.status, 400);
                done();
            });
    });
 });