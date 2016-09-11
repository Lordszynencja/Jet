const spawn_chance = 0.05;
const tex_s=2048;
const maxMissiles = 256;
const maxEnemies = 32;
var light_max = 64;

const gameoverV = makeCoords2Z(0.4,0.2,-0.999);
const gameoverTex = makeCoords4(0,127/tex_s,63/tex_s,0);

function drawGameover() {
	for (var i=0;i<3;i++) {
		g.add_v(1,gameoverV[i],gameoverTex[i]);
	}
	for (var i=1;i<4;i++) {
		g.add_v(1,gameoverV[i],gameoverTex[i]);
	}
}

var g;//graphics
var s;//sound
var c;//controls
var p;//player
var ui;//UI
var time;

var enemyMissiles = [];
var playerMissiles = [];
var enemies = [];
var backgroundObjects = [];