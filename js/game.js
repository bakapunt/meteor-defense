//global variables
//canvas element and context
var canvas = $('#game')[0];
var ctx = canvas.getContext('2d');

//setting width and height of canvas to fill page
var CANVAS_WIDTH = $('.container').width() - 10;
var CANVAS_HEIGHT = ($(window).height()) - 53;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

var catcher = {
	x: 0,
	y: 0,
	width: 100,
	height: 40,
	reset: function() {
		//places catcher in bottom center of canvas
		this.x = canvas.width / 2 - this.width / 2;
		this.y = canvas.height - this.height;

		//add listener that moves the catcher when the mouse moves
		canvas.addEventListener("mousemove", mouse_motion, false);
	},
	draw: function() {
		ctx.fillStyle = "#f00";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

function reset() {
	catcher.reset();
}

function update() {

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
}

//main game loop, updates and draws everything
function game_loop() {
	requestAnimationFrame(game_loop);
	update();
	draw();
}

function start_game() {
	reset();
	game_loop();
}