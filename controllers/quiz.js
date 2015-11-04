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
			"https://itunes.apple.com/search?term="+genre+"&entity=song",
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

					//Fisher-Yates Shuffle -- source: http://bost.ocks.org/mike/shuffle/
					var m = songArray.length, t, i;
					while(m) {
						i = Math.floor(Math.random()* m--);

						t = songArray[m];
						songArray[m] = songArray[i];
						songArray[i] = t;
					}

					var random = songArray[0];
					var filler = {
						one: songArray[1],
						two: songArray[2],
						three: songArray[3]
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