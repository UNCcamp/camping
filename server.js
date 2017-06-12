const express = require("express"),
      cryptoRoutes = require("./controllers/auth/cryptoRoutes"),
      exphbs  = require("express-handlebars"),
      bodyParser = require("body-parser");

var path = require("path");
var app = express();
const PORT = process.env.PORT || 8080;
app.engine("handlebars", exphbs({defaultLayout: "main"}));
var db = require("./models");

app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use("/auth", cryptoRoutes);


db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
