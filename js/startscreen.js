$('#startscreen').css("height",($(window).height()) - 53 + "px");
print_highscore();

$('#startscreen').click(function() {
	$(this).hide();
	$('#game').show();
	start_game();
});