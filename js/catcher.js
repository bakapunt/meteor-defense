//catcher object
var catcher = {
	x: 0,				//x coordinate
	y: 0,				//y coordinate
	width: 150,	//width in pixels
	height: 50,	//height in pixels
	reset: function() {
		//places catcher in bottom center of canvas
		this.x = canvas.width / 2 - this.width / 2;
		this.y = canvas.height - this.height;
	},
	draw: function() {
		ctx.fillStyle = "#000";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
};

//called when the mouse moves on the canvas, moves the catcher
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