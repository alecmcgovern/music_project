var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	req.session.user = false;
	res.redirect('/login');
});

module.exports = router;