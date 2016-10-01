const spawn_chance = 0.05;
const FPS = 50;
const tex_s=2048;
const maxMissiles = 256;
const maxEnemies = 32;

var time = 0;
var eightBitMode = false;

const gameoverV = makeCoords2(0.4,0.2);
const gameoverTex = makeCoords4(0,127/tex_s,63/tex_s,0);

function drawGameover() {
	for (var i=0;i<3;i++) {
		g.addTextureVertex(1,gameoverV[i],gameoverTex[i]);
	}
	for (var i=1;i<4;i++) {
		g.addTextureVertex(1,gameoverV[i],gameoverTex[i]);
	}
}

var canvas = document.getElementById('canv');
var gl = canvas.getContext('experimental-webgl', {preserveDrawingBuffer: true});
gl.viewport(0, 0, canvas.width, canvas.height);
gl.disable(gl.DEPTH_TEST);
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
var con = document.getElementById('Tcan').getContext('2d');
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

var textureC = {
	//Texture 0
	'Ship1' : [0,makeCoords4(0,255/tex_s,255/tex_s,0)],
	'enemyShip1' : [0,makeCoords4(256/tex_s,511/tex_s,255/tex_s,0)],
	'Bullet1' : [0,makeCoords4(0/tex_s,31/tex_s,287/tex_s,256/tex_s)],
	'Orb2' : [0,makeCoords4(32/tex_s,63/tex_s,287/tex_s,256/tex_s)],
	'Orb3' : [0,makeCoords4(64/tex_s,95/tex_s,287/tex_s,256/tex_s)],
	
	//Texture 1
	'GameOver' : [1,makeCoords4(0,127/tex_s,0,63/tex_s)],
	'Select' : [1,makeCoords4(128/tex_s,255/tex_s,0,31/tex_s)],
	'Continue' : [1,makeCoords4(0,127/tex_s,64/tex_s,95/tex_s)],
	'Exit' : [1,makeCoords4(0,127/tex_s,96/tex_s,127/tex_s)],
	'Options' : [1,makeCoords4(0,127/tex_s,128/tex_s,159/tex_s)],
	'Start' : [1,makeCoords4(0,127/tex_s,160/tex_s,191/tex_s)],
	'8bitMode' : [1,makeCoords4(0,127/tex_s,192/tex_s,223/tex_s)]
	
}

var test;