var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));
app.use(ejsLayouts);
app.set("view engine", "ejs");


app.get("/", function(req, res){
	res.send("musicmusicmusic");
});


app.listen(3000);