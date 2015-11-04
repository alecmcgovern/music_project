

$('document').ready(function(){
	var timeLeft = 30;
	$('#time').text(timeLeft);

	var timer = setInterval(function(){
		timeLeft -= 1;
		$('#time').text(timeLeft);
		if(timeLeft<1){
			// alert("Too slow!")
			clearInterval(timer);
		}
	}, 1000);


	function win(){
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
			console.log("ajax completed");
		});
	}
	function lose(){
		$('#answer').text("Incorrect!");
		$('#answer').css({color: "red"});
	}

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
	


});