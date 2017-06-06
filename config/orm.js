const con = require("./connection");

var orm = {
  selectAll:function(table,cb) {
    table = "burgers";
    con.query("SELECT * FROM ??",[table], function (error,results){
      if(error) throw error;
      cb(results);
    });
  },
  insertOne: function(insert, cb) {

    con.query("INSERT INTO burgers SET ?",{ burger_name: insert }, function (error,results) {
      if(error) throw error;
      cb(results);
    });
  },
  updateOne: function(burgerID,devoured, cb) {
    con.query("UPDATE burgers SET devoured = ? where id = ?",[devoured,burgerID], function (error,results) {
      if(error) throw error;
      cb(results);
    });
  }
};

module.exports = orm;
