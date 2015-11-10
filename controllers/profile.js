var express = require('express');
var router = express.Router();
var db = require("../models");

//Route to any given user profile
router.get('/:username', function(req, res){
	db.user.find({
		where: {
			username: req.params.username
		}
	}).then(function(u){
		if(u){
			if(req.currentUser) {
				db.user.find({
					where: {
						username: req.params.username
					}
				}).then(function(user){
					var userinfo = {  //object with user info
						username: user.username,
						accuracy: user.accuracy,
						total_ids: user.total_ids,
						song_count: user.song_count
					}
					if(user){  // finds all favorites of the given user
						db.favorite.findAll({
							where: {
								userId: user.id
							}
						}).then(function(favs){
							res.render("profile", {user: userinfo, favs: favs});
						});
					}else{
						res.render('erruser');
					}
				})
			} else {
				req.flash('danger', 'Please login to access this page');
				res.redirect('/login');
			}
		}else{
			res.render("erruser");
		}
	})
		
});

// Delete favorites route
router.post('/nofav', function(req, res){
	db.favorite.findById(req.body.id).then(function(fav){
		fav.destroy().then(function(f){
			res.send("deleted");
		});
	})
});

//add favorites route (from another user's profile)
router.post('/fav', function(req, res){
	db.favorite.findOrCreate({
		where: {
			song_name: req.body.song,
			userId: req.currentUser.id
		},
		defaults:{
			userId: req.currentUser.id,
			song_name: req.body.song,
			artist_name: req.body.artist,
			preview_link: req.body.preview,
			itunes_link: req.body.itunes
		}
	}).spread(function(song, created){
		res.send("added");
	});
});








module.exports = router;