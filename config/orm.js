const con = require("./connection");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push('?');
  }

  return arr.toString();
}

// another function for building queries
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    if (ob.hasOwnProperty(key)) {
      arr.push(key + '=' + ob[key]);
    }
  }

  return arr.toString();
}





var orm = {

  // Select all Activities, Inventory, Loadouts, 

  selectAll:function(table,cb) {
    con.query("SELECT * FROM ??",[table], function (error,results){
      if(error) throw error;
      cb(results);
    });
  }, // Get everything from any table 

  // insertOne function for inserting one burger into table
  insertOne: function(table, cols, vals, cb) {
    console.log(typeof(vals));
    var queryString = 'INSERT INTO ' + table;
    queryString += ' (';
    queryString += cols.toString();
    queryString += ') ';
    queryString += 'VALUES (';
    // queryString += vals[0] + ' , ' + vals[1];
    queryString += printQuestionMarks(vals.length);
    queryString += ') ';

    console.log(queryString);
    console.log(vals);

    connection.query(queryString, vals, function(err, result) {
      if (err) throw err;
      // send the query result back to the callback function
      cb(result);
    });
  },