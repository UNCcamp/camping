const express = require("express");
var auth = require("../controllers/auth/cryptoRoutes");
query = require("../controllers/controller");
var router = express.Router();
router.post('/adduser', accountExists,function(req, res) {
  var user = req.body;
  try {
      auth.hashPass(user.pass,function(result) {
      query.addUser(user,result)
      .then(function() {
        res.status("201")
        .send("User added");
      })
      .catch(function() {
        res.status("500")
        .send("Error adding user");
      });
    });
  }
  catch(e) {
    console.log(e);
    res.status("500")
    .send("Error occured");
  }
});

router.post("/authenticate",function(req,res) {
  var email = req.body.email;
  var pass = req.body.pass;
  query.getUserProfileByName(email)
  .then(function(result) {
    if(result.length < 1) {
      return res.status("401")        // HTTP unauthorized
      .send("Not authorized");
    }
    auth.authenticate(result[0].passWord,pass, function(isAuth) {
      if(isAuth) {
        res.cookie('user', result[0].id, { expires: new Date(Date.now() + 36000000), httpOnly: true });
        res.status("200")
        .send("OK");
      }
    });
  })
  .catch(function(e){
    console.log(e);
  });
});

function accountExists(req,res) {
  getUserProfileByName
}

module.exports = router;
