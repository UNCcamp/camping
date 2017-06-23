var auth = require("./authCode");

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
