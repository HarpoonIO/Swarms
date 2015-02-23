/**************************************************
** GAME VARIABLES
**************************************************/
var canvas,			// Canvas DOM element
	ctx,			// Canvas rendering context
	keys,			// Keyboard input
	swarm;

/**************************************************
** GAME INITIALISATION
**************************************************/
function init() {
	// Declare the canvas and rendering context
	canvas = document.getElementById("gameCanvas");
	ctx = canvas.getContext("2d");


	// Maximise the canvas
	canvas.width = 800;
	canvas.height = 800;

	ctx.translate(400,400);

	swarm = new Swarm();
	swarm.init();
};

/**************************************************
** ANIMATION LOOP
**************************************************/
function animate() {
	update();
	draw();

	// Request a new animation frame
	window.requestAnimFrame(animate);
};


/**************************************************
** UPDATE
**************************************************/
function update() {
	swarm.update();
};


/**************************************************
** DRAW
**************************************************/
function draw() {
	// Wipe the canvas clean
	ctx.save();
	ctx.translate(-400,-400);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.restore();
	swarm.draw();

};