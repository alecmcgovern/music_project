var express = require('express');
var router = express.Router();
var db = require("../models");
var request = require("request");


router.get('/', function(req, res){

	request(
		"https://itunes.apple.com/search?term=daft+punk",
		function(err, response, body){
			if(!err && response.statusCode === 200){
				var data = JSON.parse(body);
				res.render('quiz', {extractStyles: true, data: data});
			}
		}
	);
});

module.exports = router;