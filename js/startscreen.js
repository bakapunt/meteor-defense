$('#startscreen').css("height",($(window).height()) - 53 + "px");
$('#startscreen').click(function() {
	$(this).hide();
	$('#game').show();
	start_game();
})