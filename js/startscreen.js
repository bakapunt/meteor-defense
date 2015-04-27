$('#startscreen').css("height",($(window).height()) - 53 + "px");
print_highscore();

$('#startscreen').click(function() {
	$(this).hide();
	$('#game').show();
	start_game();
});

$(document).keypress(function(e) {
	if (e.keyCode == 32) {
		$('#startscreen').hide();
		$('#game').show();
		start_game();
	};
})