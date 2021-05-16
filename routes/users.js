var express = require('express');
var router = express.Router();
var userController = require('../Controller/user.controller');
var dataHelper = require('../middleware/data.midleware');
var loginController = require('../Controller/login.controller');
var formidable = require('formidable');
var fs = require('fs');
const { signedCookie } = require('cookie-parser');

router.get('/', loginController.auth, userController.getUserInfo);
router.post('/',userController.saveData);
router.post('/upfile', function (req,res,next) {  
    var path = process.cwd()+"/public/user_public/"+req.signedCookies.data+"/";
    var form = new formidable.IncomingForm();
    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = path + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    res.send("uploaded file");
});

router.post('/createguess', function(req, res, next){
    var data = req.body.data;
    //fs.writeFile(,req.body)
    //console.log(data);
    fs.writeFile(process.cwd()+"/data/"+req.signedCookies.data+"/guess.html", data, {encoding: 'utf-8'},function(err){
        if(err){
            res.send(err);
            
        }else
            res.send("sucesss");
    });
    
});

module.exports = router;

