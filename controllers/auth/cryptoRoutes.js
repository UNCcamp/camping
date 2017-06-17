var auth = require("./authCode");

// router.post('/adduser', function (req, res) {
//   var username = req.body.username;
//   var pass = req.body.pass;
//   var result = auth.encrypt(pass);
//   if(typeof(result) === "string") {
//     res.send(result);
//   }
//   res.send(false);
// });
//
// router.post('/updateuser', function (req, res) {
//   res.send('POST request to homepage');
// });

module.exports = {
  authenticate: function(crypto,pass, fn) {
    if((auth.decrypt(crypto)) === pass) {
      fn(true);
    }
    else {
      fn(false);
    }
  },
  hashPass: function(pass, fn){
    var result = auth.encrypt(pass)
    if(typeof(result) === "string") {
      fn(result);
    }
    else {
      throw "creating auth failed";
    }
  }
};
