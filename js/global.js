var time = 0;
var loaded = false;

var conf = {
	eightBitMode: false,
	useLightning: true,
	sound: true,
	particles: true,
	overallVolume: 1,
	musicVolume: 1,
	effectsVolume: 1
};

var stats = {
	money: 0,
	level: 0,
	shotsFired: 0,
	enemiesDefeated: 0
};

const gameoverV = makeCoords2(0.4,0.2);

function drawGameover() {
	g.addGUITexture('GameOver', gameoverV);
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
var effects = [];

var test;