var express = require('express');
var router = express.Router();

var firebaseApp = require('../../../firebase/firebase_app');

/* GET the administration home page. */
router.get('/', function(req, res, next) {
    
    res.render('admin/index');

});
    
module.exports = router;