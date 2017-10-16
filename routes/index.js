var express = require('express');
var router = express.Router();

var admin = require("firebase-admin");

var serviceAccount = require('../firebase/serviceAccountKey.json');

var firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tracker-53924.firebaseio.com"
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: firebaseApp.name });
});

module.exports = router;
