
module.exports.getSignUpPage = function (req, res, next) {
    res.render('signup');
}

module.exports.getSignUpInfo = function(req, res, next){
    res.locals.newAccount = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        account: req.body.account,
        password: req.body.password[0]
    }
    next();
}

module.exports.validate = function(req,res,next) {
    var data = JSON.parse(res.locals.stringData);
    var newAccount = res.locals.newAccount;
    var user =  data.find(user => user.login.account === newAccount.account)
    if(user != undefined){
        res.send({
          head: "error",
          content: "account already exists"
        });
        return;
    }
    var newUser = {
        "template": {
          "name": "template1",
          "color": "#c74a73",
          "background_color": "linear-gradient(to top, rgb(11, 163, 96) 0%, rgb(60, 186, 146) 100%)"
        },
        "login": {
          "account": newAccount.account,
          "pass": newAccount.password,
        },
        "avatar": "",
        "about": {
          "name": newAccount.first_name+newAccount.last_name,
          "level": "Ph.D",
          "university": [],
          "address": "",
          "phone": "",
          "fax": "",
          "mail": [] 
        },
        "research_interests": [],
        "academic": [],
        "teaching": {
          "academic_year": "",
          "graduate_course": [],
          "undergraduate_courses": []
        },
        "thesis": {
          "link": [],
          "content": []
        },
        "research_grant":  [],
        "publications": {
          "book": [],
          "paper": []
        }
    
      }
    data.push(newUser)
    res.locals.jsonObj = data;
    next();
}

module.exports.redirectLoginPage = function(req,res,next){
    res.redirect('/login');
}

