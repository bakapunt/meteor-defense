$(document).ready(function() {
	var music = $('#bgmusic')[0];
	music.play();

	$(document).keydown(function(e) {
		//if 'm' key pressed, pause music
		if (e.keyCode == 77) {
			if (music.paused) {
				music.play();
			} else {
				music.pause();
			}
		}
	});
});

function play_sound(sfx) {
	sfx.pause();
	sfx.currentTime = 0;
	sfx.play();
}