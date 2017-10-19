var express = require('express');
var router = express.Router();

var firebaseApp = require('../firebase/firebase_app');

var payload = {

  notification : {
    title: "Example Notification",
    body: "Notification body"
  },

  data : {
    stock: "GOOG",
    open: "829.62",
    close: "635.67"
  }

};

var logged = false;
var userUUID = '';

/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.cookies.user_uuid !== undefined) {
    userUUID = req.cookies.user_uuid;
  }

  console.log(req.cookies);

  firebaseApp.auth().getUser(userUUID)
  .then(user => {
    res.render('index',
    {
      userJSON: JSON.stringify(user.toJSON(), null, 2),
      userOBJECT: user
    }
   );
  })
  .catch(error => {
    res.render('login',
     {
       message: error
     }
    );
  });

  /*
  firebaseApp.messaging().sendToDevice(token, payload)
  .then(response => {
    console.log('Successfully sent message to ', + response.successCount);
  })
  .catch(error => {
    console.log("Error sending message:", error);
  }); */
});

module.exports = router;
