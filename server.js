const express = require("express"),
pageRoutes = require("./routes/routes"),
exphbs  = require("express-handlebars"),
bodyParser = require("body-parser");

var path = require("path");
var app = express();
 var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
    section: function(name, options){
        if(!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
    }
  }
});

const PORT = process.env.PORT || 8080;
app.engine("handlebars", hbs.engine);
app.locals.layout = "main";
var db = require("./models");

app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(pageRoutes);


// var db = require('./models');
//  db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
 // });

