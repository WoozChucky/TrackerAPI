var express = require('express');
var router = express.Router();

var firebaseApp = require('../../../firebase/firebase_app.js');

/**
 * This route gets all the data in the firebase storage
 */
router.get('/', function(req, res, next) {
    
    var rootReference = firebaseApp.storage().ref();
    
    //var uploadTask = rootReference.child('temp/' + filename).put(file, metadata);
    
    

});


module.exports = router;