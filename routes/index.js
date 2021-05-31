var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/:account',function (req,res, next) {
    try{
        var path = process.cwd()+"/public/user_public/"+req.params.account+"/guess.html";
        if(fs.existsSync(path)){
            res.sendFile(path);
            return;
        }
        res.render("error", {message: "profile not found", error:{status: "404", stack: "file not found"}});
    } catch(err){
        res.render("error", {message: "profile not found", error:{status: "404", stack: "file not found"}});
    }
});

router.get("/", function(req,res,next){
    res.render("index");
});



module.exports = router;
