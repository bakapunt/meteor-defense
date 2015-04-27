function draw_health() {
	ctx.textAlign = 'left';
	ctx.fillText("ship health: " + Math.floor(health), 10, 24); 
}

function draw_score() {
	ctx.textAlign = 'right';
	ctx.fillText("score: " + Math.floor(score), canvas.width - 10, 24);
}

function draw_level() {
	ctx.textAlign = 'center';
	ctx.fillText("level " + level, canvas.width / 2, 24);
}

function draw_hud() {
	ctx.font = "16px 'Press Start 2P'";
	ctx.fillStyle = "#fff";
	draw_health();
	draw_score();
	draw_level();
}