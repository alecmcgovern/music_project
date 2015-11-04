var express = require('express');
var router = express.Router();
var db = require("../models");
var request = require("request");

router.get('/', function(req, res){
	if(req.currentUser) {
		var songArray = [];
		res.render('quiz', {
			extractStyles: true, 
			randomSong: null, 
			filler: null
		});
	} else {
		req.flash('danger', 'Please login to access this page');
		res.redirect('/login');
	}
});

router.post('/', function(req, res){
	res.redirect('/quiz/'+req.body.selector);
});

router.get('/:genre', function(req, res){
	if(req.currentUser) {
		var genre = req.params.genre;
		var songArray = [];
		request(
			"https://itunes.apple.com/search?term="+genre,
			function(err, response, body) {
				if(!err && response.statusCode === 200){
					var data = JSON.parse(body);
					data.results.forEach(function(song){
						var songinfo ={};
						songinfo.trackName = song.trackName;
						songinfo.previewUrl = song.previewUrl;
						songinfo.artistName = song.artistName;
						songinfo.trackId = song.trackId;
						songinfo.trackViewUrl = song.trackViewUrl;
						songArray.push(songinfo);
					});
					var random = songArray[Math.floor(Math.random()*songArray.length)];
					var filler = {
						one: songArray[Math.floor(Math.random()*songArray.length)],
						two: songArray[Math.floor(Math.random()*songArray.length)],
						three: songArray[Math.floor(Math.random()*songArray.length)]
					};
					res.render('quiz', {
						extractStyles: true, 
						extractScripts: true, 
						randomSong: random, 
						filler: filler,
						genre: genre
					});
				}
			}
		);
	} else {
		req.flash('danger', 'Please login to access this page');
		res.redirect('/login');
	}
});

module.exports = router;