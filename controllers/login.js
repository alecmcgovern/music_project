var express = require('express');
var router = express.Router();
var db = require("../models");

router.get('/', function(req, res){
	res.render('login', {extractStyles: true});
});

//Authentication
router.post('/', function(req, res){
	db.user.authenticate(req.body.email, 
		req.body.password, function(err, user){
			if(err){
				res.send(err);
			} else if (user) {
				req.session.user = user.id;
				res.redirect('/profile/'+user.username);
			} else {
				req.flash('danger', 'incorrect username or password');
				res.redirect('/login');
			}
	});
});

module.exports = router;