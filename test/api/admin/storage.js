//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../app');
let should = require('should');

chai.use(chaiHttp);

/**
 * Test the /GET api/admin/storage
 */

 describe('/GET api/admin/storage', () => {
    it('should get htpp 200 from not implemented route', done => {
        chai.request(server)
            .get('/api/admin/storage')
            .end((err, res) => {
                should.equal(res.status, 200);
                done();
            });
    });
 });