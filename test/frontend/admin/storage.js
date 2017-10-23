//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../app');
let should = require('should');

chai.use(chaiHttp);

/**
 * Test the /GET admin/storage
 */

describe('/GET /admin/storage', () => {
    it('should get the admin storage view rendered', done => {
        chai.request(server)
            .get('/admin/storage')
            .end((err, res) => {
                should.exist(res.body);
                should.equal(res.status, 200);
                done();
            });
    });
 });