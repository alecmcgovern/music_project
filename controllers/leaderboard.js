var express = require('express');
var router = express.Router();
var db = require("../models");

router.get('/', function(req, res){
	if(req.currentUser){  //finds all users and orders them by accuracy
		db.user.findAll({order: [['accuracy', 'DESC']]})
		.then(function(users){
			res.render('leaderboard', {users: users});
		})
	}else{ //warning if not logged in
		req.flash('danger', 'Please login to access this page');
		res.redirect('/login');
	}
});

module.exports = router;