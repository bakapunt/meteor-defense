var level;

//increments the level
function level_up() {
	level++;
	fo_spawn_interval *= 0.9;
	increase_speed();
	reset_level();
}

//resets level-specific variables
function reset_level() {
	//reward player for completing a level
	health = 100;
	//set number of spawned falling objects to 0
	fo_num_spawned = 0;
	//clear falling objects array
	falling_objects = [];
}