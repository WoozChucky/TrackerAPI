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

        var usersTableReference = firebaseApp.database().ref('users');

        var userReference = usersTableReference.child(credential.uid);

        var userExists = false;

        //This checks if the user exists in realtime database
        usersTableReference.on('value', snapshot => {
          userExists = snapshot.hasChild(credential.uid);
        });

        if(userExists) {
          //Update current tokens if necessary
          var userEntry = {
            notification_token: credential.notification_token
          };

          userReference.update(userEntry, error => {
            if(error) {
              res.status(400).send({ auth: true, token: null, message : error });
            } else {
              // create a token
              var token = jwt.sign({ id: credential.uid }, secretKey, {
                expiresIn: 86400 // expires in 24 hours
              });

              res.status(200).send({ auth: true, token: token, message : 'SignedIn' });
            }
          })
          .catch(reason => {
            res.status(400).send({ auth: true, token: null, message : reason });
          });

        } else {
          //create new user registry
          var userEntry = {
            uid: credential.uid,
            display_name: 'User',
            phone_number: credential.phone_number,
            photo_url: credential.photo_url,
            notification_token: credential.notification_token
          };

          userReference.set(userEntry, error => {
            if(error) {
              res.status(400).send({ auth: true, token: null, message : error });
            } else {
              // create a token
              var token = jwt.sign({ id: credential.uid }, secretKey, {
                expiresIn: 86400 // expires in 24 hours
              });

              res.status(200).send({ auth: true, token: token, message : 'SignedIn' });
            }
          })
          .catch(reason => {
            res.status(400).send({ auth: true, token: null, message : reason });
          });

        }

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