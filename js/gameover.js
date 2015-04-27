$('#gameover').css("height",($(window).height()) - 53 + "px");

function game_over() {
	playing = false;
	$('#game').hide();
	$('#gameover').show();
	setTimeout(function() {
		$('#gameover').hide();
		$('#startscreen').show();
	}, 3000);
}