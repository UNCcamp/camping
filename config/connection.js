var mysql      = require('mysql');

const HOST = process.env.HOST || "localhost";
const USER = process.env.USER || "root";
const PASSWORD = process.env.PASSWORD || "";
const DATABASE = process.env.DATABASE || "burgers_db";


var connection = mysql.createConnection({
  host     : HOST,
  user     : USER,
  password : PASSWORD,
  database : DATABASE
});
try {
  connection.connect();
}
catch(e) {
  throw e;
}
module.exports = connection;
