var admin = require("firebase-admin");

var serviceAccount = require('./serviceAccountKey.json');

var firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tracker-53924.firebaseio.com"
});

module.exports = firebaseApp;