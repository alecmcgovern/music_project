var express = require('express');
var router = express.Router();
var db = require("../models");


router.get('/', function(req, res){
	res.render('signup', {extractStyles: true});
});

router.post('/', function(req, res){
	if(req.body.email && req.body.username
		&& req.body.password && req.body.password2){
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
					req.session.user = user.id;
					req.flash("success", "Thanks for signing up!");
					res.redirect("/profile/"+user.username);
				}else{
					req.flash("danger", "Email already in use");
					res.redirect("/signup");
				}
			});
		}else{
			req.flash('danger', "Passwords did not match.  Please try again");
			res.redirect("/signup");
		}
	} else {
		req.flash("danger", "Please fill out all sections");
		res.redirect("/signup");
	}
});

module.exports = router;