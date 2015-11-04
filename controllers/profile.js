var express = require('express');
var router = express.Router();
var db = require("../models");

router.get('/:username', function(req, res){
	if(req.currentUser) {
		db.user.find({
			where: {
				username: req.params.username
			}
		}).then(function(user){
			if(user){
				res.render("profile", {username:req.params.username});
			}else{
				res.render('erruser');
			}
		})
	} else {
		req.flash('danger', 'Please login to access this page');
		res.redirect('/login');
	}
});

module.exports = router;