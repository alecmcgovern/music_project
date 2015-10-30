var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));
app.use(ejsLayouts);
app.set("view engine", "ejs");


app.get("/", function(req, res){
	res.render("login");
});


app.use("/signup", require("./controllers/signup"));


app.listen(3000);