
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


if(process.env.MONGODB_URI) {
	console.log("Attempting to connect to MLAB");
mongoose.connect("mongodb://heroku_290616kv:d6gv09k925ouo0jikcnr1nad2b@ds227565.mlab.com:27565/heroku_290616kv");

}else {
    mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/NewsScrape", {
    useMongoClient: true
});
}

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