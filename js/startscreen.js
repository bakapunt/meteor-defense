//set height of start screen
$('#startscreen').css("height",($(window).height()) - 53 + "px");
//print highscore on start screen
print_highscore();

//when user clicks on startscreen, switch to canvas and start the game
$('#startscreen').click(function() {
	$(this).hide();
	$('#game').show();
	start_game();
});

//when user presses spacebar, switch to canvas and start the game
$(document).keypress(function(e) {
	if (e.keyCode == 32) {
		$('#startscreen').hide();
		$('#game').show();
		start_game();
	};
})