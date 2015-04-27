//this game was developed loosely following the tutorial at
//http://code.tutsplus.com/tutorials/develop-your-first-game-in-canvas-from-start-to-finish--pre-39198

//canvas element and context
var canvas = $('#game')[0];
var ctx = canvas.getContext('2d');

//setting width and height of canvas to fill page
canvas.width = $('.container').width() - 10;
canvas.height = ($(window).height()) - 53;

//global variables
var health,
		score;

var time_then = 0,
		time_now = 0;

//returns random number between min and max, not necessarily an integer
//taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function get_random_num(min, max) {
	return Math.random() * (max - min) + min;
}
//returns random integer between min and max inclusively
//also taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function get_random_int(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//resets everything for a new game
function reset() {
	health = 100;
	score = 0;
	level = 1;

	catcher.reset();
	//add listener that moves the catcher when the mouse moves
	canvas.addEventListener("mousemove", mouse_motion, false);

	fo_reset();

	time_then = new Date().getTime();
}

//updates all objects
function update() {
	//update all falling objects
	fo_update_all();

	//get current time
	time_now = new Date().getTime();

	//if it is time to add a new falling object
	if (time_now >= time_then + (fo_spawn_interval * 1000)) {
		//spawn new falling object if needed for this level, or level up
		spawn_falling_object();

		//reset the timer
		time_then = time_now;
	}
}

//clears canvas then draws all objects
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	catcher.draw();
	fo_draw_all();
}

//main game loop, updates and draws everything
function game_loop() {
	requestAnimationFrame(game_loop);
	update();
	draw();
}

//starts a new game
function start_game() {
	reset();
	game_loop();
}