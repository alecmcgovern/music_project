$('document').ready(function(){

	//removes a favorite from your profile
	$('.redfav').on('click', function(){
		$(this).parent().parent().fadeOut(1000);
		$.ajax({
			method: 'POST',
			url: '/profile/nofav',
			data: {
				id: $(this).data("id")
			}
		}).done(function(){
		});
	});

	//adds a favorite (from another user's profile)
	$('.otherfav').on('click', function(){
		$(this).removeClass("fa-heart-o");
		$(this).addClass("fa-heart");

		$.ajax({
			method: 'POST',
			url: '/profile/fav',
			data: {
				song: $(this).data("song"),
				artist: $(this).data("artist"),
				preview: $(this).data("preview"),
				itunes: $(this).data("itunes"),
				userId: $(this).data("userId")
			}
		}).done(function(){

		});
	});

});