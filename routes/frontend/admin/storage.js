var express = require('express');
var router = express.Router();

/* GET the administration home page. */
router.get('/', function(req, res, next) {
    
    res.render('admin/storage');

});
    
module.exports = router;