var express = require('express');
var router = express.Router();
var db = require("../models");


router.get('/', function(req, res){
	res.render('signup');
});

router.post('/', function(req, res){
	if(req.body.password===req.body.password2){
		db.user.findOrCreate({
			where: {
				email: req.body.email
			},
			defaults: {
				username: req.body.username,
				password: req.body.password
			}
		}).spread(function(user, created){
			if(created){
				res.send('login successful');
			}else{
				res.send('email must already be in use');
			}
		});
	}else{
		var error1 = "passwords didn't match";
		res.redirect("/signup", )
	}
});

module.exports = router;