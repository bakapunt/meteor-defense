$('#gameover').css("height",($(window).height()) - 53 + "px");

function game_over() {
	playing = false;
	$('#game').hide();
	$('#gameover').show();
	$('#bgmusic')[0].pause();
	$('#sfxgameover')[0].play();

	setTimeout(function() {
		$('#gameover').hide();
		$('#startscreen').show();
		$('#bgmusic')[0].play();
	}, 3000);

	if (score > localStorage.getItem("highscore")) {
		localStorage.setItem("highscore", score);
	}

	$('#highscore').text("highscore: " + Math.floor(localStorage.getItem("highscore")));
}