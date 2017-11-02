var jwt = require('jsonwebtoken');
var firebaseApp = require('../firebase/firebase_app.js');
var secretKey = process.env.SECRET_KEY;

function verifyToken(req, res, next) {
    
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token)
    return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, secretKey, function(err, decoded) {
    if (err)
    return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
    // if everything good, save to request for use in other routes

    firebaseApp.auth().getUser(req.userId)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(reason => {
        return res.status(401).send({ auth: false, message: 'Failed to retrieve firebase user from token.' });
      });

  });

}
module.exports = verifyToken;