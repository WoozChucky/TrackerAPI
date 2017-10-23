var express = require('express');
var router = express.Router();

var firebaseApp = require('../../../firebase/firebase_app.js');

/**
 * This route gets all the node configs in the realm database
 */
router.get('/', function(req, res, next) {
    
    //Get reference to the config 'table/node'
    var configsRef = firebaseApp.database().ref('configs');
    
          configsRef.once('value', snapshot => {
                res.json(snapshot.val());
            }, error => {
                res.statusCode = 400;
                res.json(error);
          });

});

/**
 * This route gets a node config given a :key
 */
router.get('/:key', function(req, res, next) {
    
    //Get reference to the config 'table/node'
    var configsRef = firebaseApp.database().ref('configs/' + req.params.key);
    
          configsRef.once('value', snapshot => {
              var responseBody = snapshot.val();
              if(responseBody != null) {
                res.json(snapshot.val());
              } else {
                res.statusCode = 400;
                res.json({message: 'Not found'});
              }
            }, error => {
                res.statusCode = 400;
                res.json(error);
          });

});

/**
 * This route adds/replaces a config node in the realm database
 */
router.post('/add', (req, res, next) => {

    //Get reference to the database object
    var database = firebaseApp.database();

    var data = {};

    // Verify if required body data is present
    if(req.body.key == undefined || req.body.value == undefined) {
        res.statusCode = 400;
        res.json(
            { 
                valid : false,
                error: 'Missing params'
            }
        );
        return;
    }

    // Build object to insert in database
    data[req.body.key] = { value: req.body.value };

    database.ref('configs/' + req.body.key).set({
        value : req.body.value
        })
        .then(() => {
            res.statusCode = 200;
            res.json({ valid : true });
        })
        .catch(error => {
            res.statusCode = 400;
            res.json(
                { 
                    valid : false,
                    error: error
                }
            );
    });
});

/**
 * This route deletes a config node given a :key 
 */
router.delete('/:key', (req, res, next) => {
    
    var database = firebaseApp.database();

    // Verify if required body data is present
    if(req.params.key == undefined) {
        res.statusCode = 400;
        res.json(
            { 
                valid : false,
                error: error
            }
        );
        return;
    }
    
    var key = req.params.key;

    var itemReference = database.ref('configs/' + key);

    itemReference.once('value', snapshot => {
        if(snapshot.exists()) {
            itemReference.remove()
            .then(() => {
                res.statusCode = 200;
                res.json({ valid : true });
            })
            .catch(reason => {
                res.statusCode = 400;
                res.json(
                    { 
                        valid : false,
                        error: reason
                    }
                );
            });
        } else {
            res.statusCode = 400;
            res.json(
                { 
                    valid : false,
                    error: 'Not found'
                }
            );
        }
    });
});

module.exports = router;