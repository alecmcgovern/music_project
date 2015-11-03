var express = require('express');
var router = express.Router();
var db = require("../models");


router.get('/', function(req, res){
	res.render('quiz');
});

module.exports = router;