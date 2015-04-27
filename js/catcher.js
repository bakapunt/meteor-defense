//catcher object
var catcher = {
	x: 0,				//x coordinate
	y: 0,				//y coordinate
	width: 150,	//width in pixels
	height: 50,	//height in pixels
	speed: 20,		//horizontal speed in pixels when using keyboard controls
	reset: function() {
		//places catcher in bottom center of canvas
		this.x = canvas.width / 2 - this.width / 2;
		this.y = canvas.height - this.height;
	},
	update: function() {
		//prevent catcher moving too far left and going off the canvas
		if (catcher.x < 0) {
			catcher.x = 0;
		}
		//prevent catcher moving too far right and going off the canvas
		if (catcher.x + catcher.width > canvas.width) {
			catcher.x = canvas.width - catcher.width;
		}
	},
	draw: function() {
		var fo_image = new Image();
		fo_image.src = "img/shield.png";
		ctx.drawImage(fo_image, this.x, this.y);
	}
};

//called when the mouse moves on the canvas, moves the catcher
function mouse_motion(e) {
	var bounding_box = canvas.getBoundingClientRect();
	//catcher.x = (e.clientX - bounding_box.left) * (canvas.width / bounding_box.width);
	catcher.x = (e.clientX - bounding_box.left) * (canvas.width / bounding_box.width) - (catcher.width / 2);
}

function key_pressed(e) {
	if (e.keyCode == 37) { 				//left
		catcher.x -= catcher.speed;
	} else if (e.keyCode == 39) {	//right
		catcher.x += catcher.speed;
	}
}