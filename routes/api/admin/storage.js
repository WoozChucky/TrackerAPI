var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: './uploads' });

var firebaseApp = require('../../../firebase/firebase_app.js');

/**
 * This route gets all the data in the firebase storage
 */
router.get('/', function(req, res, next) {
    
    

    //
    
    //var uploadTask = rootReference.child('temp/' + filename).put(file, metadata);
    
    

});

router.post('/upload', upload.single('fileinput'), (req, res, next) => {
    console.log('Entered /upload !');
    console.log(req.file);

    var file = req.file;

    // Create the file metadata
    var metadata = {
        contentType: 'image/jpeg'
    };

    var rootReference = firebaseApp.storage().bucket('temp');

    rootReference.upload(file.path, {destination: file.filename })
        .then(storageFile => {
            console.log(storageFile);
        })
        .catch(reason => {
            console.log(reason);
        });

    res.render('admin/storage');
});


module.exports = router;