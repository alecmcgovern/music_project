var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var db = require("./models");

app.use(flash());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));
app.use(ejsLayouts);
app.set("view engine", "ejs");
app.use(session({
	secret: 'musicprojectsecretcode871925781235',
	resave: false,
	saveUninitialized: true
}));

app.set("layout extractScripts", true);

app.use(function(req, res, next){
	if (req.session.user) {
		db.user.findById(req.session.user)
		.then(function(user){
			req.currentUser = user;
			next();
		});
	} else {
		req.currentUser = false;
		next();
	}
});


app.use(function(req, res, next){
  res.locals.currentUser = req.currentUser;
  res.locals.alerts = req.flash();
  next();
});

app.get("/", function(req, res){
	res.redirect("/login");
});


app.use("/quiz", require("./controllers/quiz"));
app.use("/signup", require("./controllers/signup"));
app.use("/logout", require("./controllers/logout"));
app.use("/login", require("./controllers/login"));
app.use("/profile", require("./controllers/profile"));



app.listen(process.env.PORT || 3000);