var express = require('express');
var router = express.Router();
var db = require("../models");
var request = require("request");

router.get('/:username', function(req, res){
	if(req.currentUser) {
		res.render("profile", {username:req.params.username});
	} else {
		req.flash('danger', 'Please login to access this page');
		res.redirect('/login');
	}
});

module.exports = router;