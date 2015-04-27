//set height of gameover screen
$('#gameover').css("height",($(window).height()) - 53 + "px");

//called when game ends
function game_over() {
	//stop the game loop
	playing = false;
	//hide the canvas
	$('#game').hide();
	//show the gameover screen
	$('#gameover').show();
	//pause the background music
	$('#bgmusic')[0].pause();
	//play the gameover sound
	$('#sfxgameover')[0].play();

	//waits for 3s on the gameover screen
	setTimeout(function() {
		//then switches to the startscreen
		$('#gameover').hide();
		$('#startscreen').show();
		//and starts the background music again
		$('#bgmusic')[0].play();
	}, 3000);

	//sets the highscore if the most recent score is higher
	if (score > localStorage.getItem("highscore")) {
		localStorage.setItem("highscore", score);
	}

	//prints new high score on start screen
	print_highscore();
}