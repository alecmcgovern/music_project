var express = require('express');
var router = express.Router();
var db = require("../models");

router.get('/', function(req, res){
	if(req.currentUser) {
		res.render("profile");
	} else {
		req.flash('danger', 'Please login to access this page');
		res.redirect('/login');
	}
});

module.exports = router;