var express = require('express');
var router = express.Router();

var admin = require("firebase-admin");

var serviceAccount = require('../firebase/serviceAccountKey.json');

var firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tracker-53924.firebaseio.com"
});

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

var token = 'c7CI4gHs2MQ:APA91bFDw2_Ab77xR3IBhQBh4nIKSko8Q62-vaDRHb6-vfIjpOz3JdH4GAppv0qycDwgiAwKksg1L1BS8Ll4jA6XSWDyaj0JqiZDNA1WalgKXdnRB0trQ3_hxlmSfyGc5KNcriSGv3WC';

/* GET home page. */
router.get('/', function(req, res, next) {

  /*
  firebaseApp.messaging().sendToDevice(token, payload)
  .then(response => {
    console.log('Successfully sent message to ', + response.successCount);
  })
  .catch(error => {
    console.log("Error sending message:", error);
  }); */

  res.render('index', 
    { title: firebaseApp.name,
      message: "" 
    }
  );
});

module.exports = router;
