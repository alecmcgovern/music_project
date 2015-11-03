$('document').ready(function(){
	console.log("scripttttt");
	var timeLeft = 30;
	$('#time').text(timeLeft);

	var timer = setInterval(function(){
		timeLeft -= 1;
		$('#time').text(timeLeft);
		if(timeLeft<1){
			alert("Too slow!")
			clearInterval(timer);
		}
	}, 1000);

});