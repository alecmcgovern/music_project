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
			var userinfo = {
				username: user.username,
				accuracy: user.accuracy,
				total_ids: user.total_ids,
				song_count: user.song_count
			}
			if(user){
				res.render("profile", {user: userinfo});
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