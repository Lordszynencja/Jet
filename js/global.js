var time = 0;
var eightBitMode = false;
var option_lightning = true;

const gameoverV = makeCoords2(0.4,0.2);

function drawGameover() {
	g.addText('gameOver', gameoverV);
}

var con = document.getElementById('Tcan').getContext('2d');
var canvas = document.getElementById('canv');
var gl = canvas.getContext('experimental-webgl', {preserveDrawingBuffer: true});
gl.viewport(0, 0, canvas.width, canvas.height);
gl.disable(gl.DEPTH_TEST);
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

const maxLights = (Math.floor(gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS)/9) >= 32 ? 32 : Math.floor(gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS)/9));

var sh = [];//shaders
var g;//graphics
var s;//sound
var c;//controls
var p;//player
var ui;//UI
var game;//game

var enemyMissiles = [];
var playerMissiles = [];
var enemies = [];
var backgroundObjects = [];

var test;