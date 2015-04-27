//canvas element and context
var canvas = $('#game')[0];
var ctx = canvas.getContext('2d');

//setting width and height of canvas to fill page
canvas.width = $('.container').width() - 10;
canvas.height = ($(window).height()) - 53;

var health,
		score,
		level;

var time_then = 0,
		time_now = 0;

var catcher = {
	x: 0,				//x coordinate
	y: 0,				//y coordinate
	width: 100,	//width in pixels
	height: 40,	//height in pixels
	reset: function() {
		//places catcher in bottom center of canvas
		this.x = canvas.width / 2 - this.width / 2;
		this.y = canvas.height - this.height;

		//add listener that moves the catcher when the mouse moves
		canvas.addEventListener("mousemove", mouse_motion, false);
	},
	draw: function() {
		ctx.fillStyle = "#000";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
};

var falling_objects = [], //array of falling objects
		fo_colours = [				//array of possible colours for falling objects
			"#f00",
			"#0f0",
			"#00f"
		],
		fo_spawn_interval,		//time between new falling objects spawning
		fo_per_level,					//number of falling objects per level, multiplied by level (eg. lvl2, 3perlevel: (2*3=6) objects for lvl2)
		fo_num_spawned;				//number of falling objects already spawned in the current level

//falling object prototype object
var falling_object = {
	x: 0,
	y: 0,
	width: 50,
	height: 50,
	colour: "#000",
	speed: 2,

	//sets initial position of falling object
	set_initial_pos: function() {
		//x set at random point in the canvas
		this.x = get_random_int(0, canvas.width - this.width);
		//placed just above canvas viewport, so will slide down from top rather than appearing suddenly at top
		this.y = 0 - this.height;
	},

	//sets initial colour of falling object
	set_initial_colour: function() {
		this.colour = fo_colours[get_random_int(0, fo_colours.length-1)];
	},

	//initialises falling object's position and colour
	init: function() {
		this.set_initial_pos();
		this.set_initial_colour();
	},

	//moves falling object downwards by its falling speed
	update: function() {
		this.y += this.speed;
	},

	//draws the object
	draw: function() {
		ctx.fillStyle = this.colour;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
};

//returns an instance of the falling_object prototype
function create_falling_object() {
	return (Object.create(falling_object));
}

function fo_reset() {
	falling_objects = [];
	fo_spawn_interval = 1;
	fo_per_level = 3;
	fo_num_spawned = 0;
}

function fo_update_all() {
	for (var i = 0; i < falling_objects.length; i++) {
		//updates position of falling object
		falling_objects[i].update();
		//local copy of the falling object
		var temp_fo = falling_objects[i];

		//if catcher catches the falling object
		//remove it from the array and increase score by the object's speed * 10
		if (collision_detected(temp_fo)) {
			falling_objects.splice(i, 1);
			score += temp_fo.speed * 10;
		}

		//if catcher misses the falling object (falling object hits the ground)
		//remove it from the array and decrease health by the object's speed * 5
		if (fo_missed(temp_fo)) {
			falling_objects.splice(i, 1);
			health -= temp_fo.speed * 5;
		}
	}
}

//returns true if the falling object fo is colliding with the top of the catcher
function collision_detected(fo) {
	//if the falling object is still above the catcher, return false
	if (fo.y + fo.height < catcher.y) {
		return false;
	}

	if ((fo.x >= catcher.x) && (fo.x + fo.width <= catcher.x + catcher.width)) {
		return true;
	} else {
		return false;
	}
}

//returns true if the catcher missed the falling object and it is colliding with the ground
function fo_missed(fo) {
	if (fo.y + fo.height >= canvas.height) {
		return true;
	} else {
		return false;
	}
}

//spawns a new falling object if needed
function new_falling_object() {
	//if number spawned is less than how many are required for this level
	if (fo_num_spawned < fo_per_level * level) {
		//create new falling object
		var new_fo = create_falling_object();
		new_fo.init();

		//add it to the array
		falling_objects.push(new_fo);

		//increment number of spawned falling objects
		fo_num_spawned++;
	}
}

function fo_draw_all() {
	for (var i = 0; i < falling_objects.length; i++) {
		falling_objects[i].draw();
	}
}

//returns random integer between min and max inclusively
//taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function get_random_int(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function reset() {
	health = 100;
	score = 0;
	level = 1;

	catcher.reset();

	fo_reset();

	time_then = new Date().getTime();
}

function update() {
	fo_update_all();
}

function mouse_motion(e) {
	var bounding_box = canvas.getBoundingClientRect();
	//catcher.x = (e.clientX - bounding_box.left) * (canvas.width / bounding_box.width);
	catcher.x = (e.clientX - bounding_box.left) * (canvas.width / bounding_box.width) - (catcher.width / 2);
	//prevent catcher moving too far left and going off the canvas
	if (catcher.x < 0) {
		catcher.x = 0;
	}
	//prevent catcher moving too far right and going off the canvas
	if (catcher.x + catcher.width > canvas.width) {
		catcher.x = canvas.width - catcher.width;
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
	time_now = new Date().getTime();
	update();
	//if it is time to add a new falling object
	if (time_now >= time_then + (fo_spawn_interval * 1000)) {
		//spawn new falling object if needed for this level
		new_falling_object();
		//reset the timer
		time_then = time_now;
	}
	draw();
}

function start_game() {
	reset();
	game_loop();
}