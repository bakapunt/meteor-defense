var falling_objects = [], //array of falling objects
		fo_images = [				//array of possible colours for falling objects
			"img/meteor.png",
			"img/meteor2.png",
			"img/meteor3.png"
		],
		fo_spawn_interval,		//time between new falling objects spawning
		fo_per_level,					//number of falling objects per level, multiplied by level (eg. lvl2, 3perlevel: (2*3=6) objects for lvl2)
		fo_num_spawned,				//number of falling objects already spawned in the current level
		fo_speed_min,
		fo_speed_max;

//falling object prototype object
var falling_object = {
	x: 0,
	y: 0,
	width: 50,
	height: 100,
	image: undefined,
	speed: 2,

	//sets initial position of falling object
	set_initial_pos: function() {
		//x set at random point in the canvas
		this.x = get_random_int(0, canvas.width - this.width);
		//placed just above canvas viewport, so will slide down from top rather than appearing suddenly at top
		this.y = 0 - this.height;
	},

	//sets speed of falling object
	set_speed: function() {
		this.speed = get_random_num(fo_speed_min, fo_speed_max);
	},

	//sets falling object image
	set_image: function() {
		this.image = fo_images[get_random_int(0, fo_images.length-1)];
	},

	//initialises falling object's position and colour
	init: function() {
		this.set_initial_pos();
		this.set_image();
		this.set_speed();
	},

	//moves falling object downwards by its falling speed
	update: function() {
		this.y += this.speed;
	},

	//draws the object
	draw: function() {
		var fo_image = new Image();
		fo_image.src = this.image;
		ctx.drawImage(fo_image, this.x, this.y);
	}
};

//returns an instance of the falling_object prototype
function create_falling_object() {
	return (Object.create(falling_object));
}

function fo_reset() {
	falling_objects = [];
	fo_spawn_interval = 1.5;
	fo_per_level = 4;
	fo_num_spawned = 0;
	fo_speed_min = 2;
	fo_speed_max = 3;
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
			play_sound($('#sfxscorepoint')[0]);
		}

		//if catcher misses the falling object (falling object hits the ground)
		//remove it from the array and decrease health by the object's speed * 5
		if (fo_missed(temp_fo)) {
			falling_objects.splice(i, 1);
			health -= temp_fo.speed * 5;
			play_sound($('#sfxbang')[0]);
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
function spawn_falling_object() {
	//if number spawned is less than how many are required for this level
	if (fo_num_spawned < fo_per_level * level) {
		//create new falling object
		var new_fo = create_falling_object();
		new_fo.init();

		//add it to the array
		falling_objects.push(new_fo);

		//increment number of spawned falling objects
		fo_num_spawned++;
	} else {
		//otherwise, check if there are any objects still falling
		if (falling_objects.length === 0) {
			//if there are none, level up
			level_up();
		}
	}
}

function fo_draw_all() {
	for (var i = 0; i < falling_objects.length; i++) {
		falling_objects[i].draw();
	}
}

//increases the minimum and maximum falling speeds of the falling objects
function increase_speed() {
	fo_speed_min *= 1.1;
	fo_speed_max *= 1.4;
}