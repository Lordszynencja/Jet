var time = 0;
var loaded = false;
var levelsNumber = 2;

var conf = {
	eightBitMode: false,
	useLightning: true,
	sound: true,
	particles: true,
	debug: false,
	overallVolume: 1,
	musicVolume: 1,
	effectsVolume: 1
};

var stats = {
	score: 0,
	money: 0,
	level: 0,
	shotsFired: 0,
	enemiesDefeated: 0,
	bossesDefeated: 0,
	shipLevel: -1
};

var classesList = {};
var levelUnlocks = {
	ships : [],
	items: []
};
for (var i=0;i<levelsNumber;i++) {
	levelUnlocks.ships[i] = [];
	levelUnlocks.items[i] = [];
}
var names = {};

function deserialize(data) {
	var object = new classesList[data.className]();
	object.setData(data.data);
	return object;
}

function serialize(object) {
	var data = {
		className : object.constructor.name,
		data : object.getData()
	};
	return data;
}

function savePlayer() {
	save("Player", serialize(p)); 
}

function loadPlayer() {
	var playerData = load("Player");
	if (playerData != null && playerData != undefined) {
		p = deserialize(playerData);
	}
}

function getShipsForCurrentLevel() {
	var shipsList = [];
	for (var level in levelUnlocks.ships) {
		if (level<=stats.level) {
			for (var s in levelUnlocks.ships[level]) shipsList.push(levelUnlocks.ships[level][s]);
		}
	}
	return shipsList;
}

function getItemsForCurrentLevel() {
	var itemsList = [];
	for (var level in levelUnlocks.items) {
		if (level<=stats.level) {
			for (var i in levelUnlocks.items[level]) itemsList.push(levelUnlocks.items[level][i]);
		}
	}
	return itemsList;
}

const gameoverV = makeCoords2(0.4, 0.2);

function drawGameover() {
	g.addGUITexture('GameOver', gameoverV);
}

function drawFinish() {
	g.addGUITexture('LevelFinished', gameoverV);
}

var con = document.getElementById('Tcan').getContext('2d');
var canvas = document.getElementById('canv');
var size = window.innerWidth;
if (size>window.innerHeight) size = window.innerHeight;
if (size<830) {
	canvas.width = size-30;
	canvas.height = size-30;
}
var gl = canvas.getContext('experimental-webgl', {preserveDrawingBuffer: true});
gl.viewport(0, 0, canvas.width, canvas.height);
gl.disable(gl.DEPTH_TEST);
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

const maxLights = (Math.floor(gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS)/20)>64 ? 64 : Math.floor(gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS)/20));

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
