var express = require('express');
var router = express.Router();

var firebaseApp = require('../../firebase/firebase_app');

var response = {
  message : '',
  valid : false
};

router.post('/login', (req, res, next) => {

  var credential = req.body;

  firebaseApp.auth().getUser(credential.uid)
      .then(user => {

        var options = {
          maxAge: 1000 * 60 * 5, // would expire after 5 minutes
          httpOnly: true, // The cookie only accessible by the web server
          //signed: true // Indicates if the cookie should be signed
        };
      
        // Set cookie
        res.cookie('user_uuid', user.uid, options); // options is optional
        res.render(require.resolve('./index'));
      })
      .catch(error => {
        res.json(error);
      });
});

//router.post('/login')

router.post('/phoneauth', (req, res, next) => {

  response.message = 'Got PHONEAUTH';
  response.valid = false;

  res.json(response);
});

module.exports = router;