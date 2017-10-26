var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var secretKey = process.env.SECRET_KEY;
var verifyToken = require('../../security/verify-token');
var firebaseApp = require('../../firebase/firebase_app');

router.post('/authenticate', (req, res, next) => {

  var credential = req.body;

  firebaseApp.auth().getUser(credential.uid)
      .then(user => {

        //TODO: Insert user in Realtime Database

        // create a token
        var token = jwt.sign({ id: credential.uid }, secretKey, {
          expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ auth: true, token: token, message : 'SignedIn' });
      })
      .catch(error => {
        res.status(400).send({ auth: false, token: null, message : error });
      });
});

//router.post('/login')

router.post('/phoneauth', verifyToken, (req, res, next) => {

  var response = {};
  response.message = 'Got PHONEAUTH';
  response.valid = false;

  res.json(response);
});

module.exports = router;