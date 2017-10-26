
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


mongoose.Promise = Promise;

// Setting port
var port = process.env.PORT || 3000;


var app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));


app.use(express.static("public"));


var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/NewsScrape";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

var db = mongoose.connection;


db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});
db.once("open", function() {
  console.log("Mongoose connection successful.");
});



require("./controllers/articleControls.js")(app);


app.listen(port, function() {
	console.log("App is ready and listening on " + port);
});