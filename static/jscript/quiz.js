$('document').ready(function(){


	//Tracks the time
	var timeLeft = 30;
	$('#time').text(timeLeft);
	var timer = setInterval(function(){
		timeLeft -= 1;
		$('#time').text(timeLeft);
		if(timeLeft<1){
			lose();
			clearInterval(timer);
		}
	}, 1000);

	// var to ensure that two answers can't be chosen
	// for the same song
	var decided = false;

	//function called when the correct song is chosen
	function win(){
		if(decided===false){
			decided = true;
			clearInterval(timer);
			$('#answer').text("Correct!");
			$('#answer').css({color: "green"});
			$.ajax({
				method: 'POST',
				url: '/quiz/result',
				data: {
					answer: true,
					time: timeLeft
				}
			}).done(function(){
				setTimeout(function(){
					decided = false;
					location.reload();
				}, 1000);
			});
		}
	}

	//function for incorrect answer
	function lose(){
		if(decided===false){
			decided = true;
			clearInterval(timer);
			$('#answer').text("Incorrect!");
			$('#answer').css({color: "red"});
			$.ajax({
				method: 'POST',
				url: '/quiz/result',
				data: {
					answer: false,
					time: timeLeft
				}
			}).done(function(){
				setTimeout(function(){
					decided = false;
					location.reload();
				}, 1000);
			});
		}
	}

	//each different possible list item and the win/loss function
	$('#a1').on('click', win);
	$('#a2').on('click', lose);
	$('#a3').on('click', lose);
	$('#a4').on('click', lose);
	$('#b1').on('click', lose);
	$('#b2').on('click', win);
	$('#b3').on('click', lose);
	$('#b4').on('click', lose);
	$('#c1').on('click', lose);
	$('#c2').on('click', lose);
	$('#c3').on('click', win);
	$('#c4').on('click', lose);
	$('#d1').on('click', lose);
	$('#d2').on('click', lose);
	$('#d3').on('click', lose);
	$('#d4').on('click', win);


	//Adds favorite
	$('#favorite').on('click', function(){
		$('#favorite').hide();
		$('#redfav').show();
		$.ajax({
			method: 'POST',
			url: '/quiz/fav',
			data: {
				song: $('#cheat').text(),
				artist: $('#cheatartist').text(),
				preview: $('#cheatpreview').text(),
				itunes: $('#cheatitunes').text()
			}
		}).done(function(){

		});
	});
	


});