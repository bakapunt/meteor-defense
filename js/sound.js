$(document).ready(function() {
	//plays music when page loads
	var music = $('#bgmusic')[0];
	music.play();

	$(document).keydown(function(e) {
		//if 'm' key pressed, toggle music playing
		if (e.keyCode == 77) {
			if (music.paused) {
				music.play();
			} else {
				music.pause();
			}
		}
	});
});

//starts a sound from the beginning
//used when many of the same sound may play very shortly after each other
//ie. sfxbang and sfxscorepoint
function play_sound(sfx) {
	sfx.pause();
	sfx.currentTime = 0;
	sfx.play();
}