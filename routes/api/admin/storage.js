var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: './uploads' });

var firebaseApp = require('../../../firebase/firebase_app.js');

/**
 * This route gets all the data in the firebase storage
 */
router.get('/', function(req, res, next) {
    res.render('error');
});


module.exports = router;