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

router.post('/result', function(req, res){
	db.user.findById(req.currentUser.id).then(function(user){
		if(!user.song_count){
			user.song_count = 1;
		}else{
			user.song_count++;
		}

		user.save().then(function(){
			console.log(req.body.answer+" dat");
		 	if(req.body.answer==="true"){
				if(!user.total_ids){
					user.total_ids = 1;
				}else{
					user.total_ids++;
				}
			}
			user.save().then(function(){
		 		res.send("done");
			});
		});
		
	});
});

router.post('/fav', function(req, res){
	db.favorite.find({
		where: {
			song_name: req.body.song
		}
	}).then(function(song){
		if(song){
			//do nothing, as the song has already been favorited
		}else{
			db.user.findById(req.currentUser.id).then(function(user){
				user.createFavorite({
					song_name: req.body.song,
					artist_name: req.body.artist,
					preview_link: req.body.preview,
					itunes_link: req.body.itunes
			}).then(function(fav){
				res.send("added");
		});
	});
		}
	})
	
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