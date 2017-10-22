var express = require('express');
var router = express.Router();

var firebaseApp = require('../firebase/firebase_app');

/* GET home page. */
router.get('/', function(req, res, next) {
    
    res.render('admin/index');

});

router.get('/configs', (req, res, next) => {

    //Get reference to the config 'table/node'
    var configsRef = firebaseApp.database().ref('configs');
    
          configsRef.once('value', snapshot => {
                res.json(snapshot.val());
            }, error => {
                res.json(error);
          });

});

router.post('/add-config', (req, res, next) => {
    //Get reference to the config 'table/node'
    var database = firebaseApp.database();

    console.log(req.body);

    var data = {};

    data[req.body.key] = { value: req.body.value };

    console.log(data);

    database.ref('configs/' + req.body.key).set({
        value : req.body.value

        }).then(() => {
            res.statusCode = 200;
            res.json(
                { 
                    valid : true
                }
            );
        }).catch(error => {
            res.statusCode = 400;
            res.json(
                { 
                    valid : false,
                    error: error
                }
            );
    });
});

router.delete('/delete-config/:key', (req, res, next) => {

    var database = firebaseApp.database();

    var key = req.params.key;

    var itemReference = database.ref('configs/' + key);

    console.log('configs/' + key);

    itemReference.remove()
        .then(() => {
            res.statusCode = 200;
            res.json(
                { 
                    valid : true
                }
            );
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
});

function renderIndex(res, data) {
    res.render('admin/index',
    {
      data: data,
    });
}
    
module.exports = router;