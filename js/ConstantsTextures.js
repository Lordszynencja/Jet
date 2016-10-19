const spawn_chance = 0.05;
const FPS = 50;
const tex_s = 2048;
const maxMissiles = 256;
const maxEnemies = 64;

const hpPosition = [0.9, -0.9];
const heatPosition = [0.75, -0.9];
const indLength = 0.06;
const indAngleMax = Math.PI*1.2;
const indAngleMin = Math.PI*-0.2;
const hpColor = [16, 0, 0];
const heatColor = [0, 0, 16];

const BackgroundTextures = {
	'TreesBases' : [0, makeTexCoords(0, 511, 0, 511)],
	'ground' : [0, makeTexCoords(0, 511, 1023, 511)],
	'winter' : [0, makeTexCoords(512, 1023, 1023, 512)]
}

const EnemyTextures = {
	'EnemyShip0' : [0, makeTexCoords(0, 255, 255, 0)]
}

const BulletsTextures = {
	'Bullet0' : [0, makeTexCoords(0, 31, 0, 31)],
	'Orb0' : [0, makeTexCoords(0, 31, 32, 63)],
	'Orb1' : [0, makeTexCoords(0, 31, 64, 95)]
}

const PlayerShipTextures = {
	'Ship1' : [0, makeTexCoords(0, 255, 255,0)]
}

const GUITextures = {
	'GameOver' : [0, makeTexCoords(0, 127, 0, 63)],
	'Start' : [0, makeTexCoords(0, 127, 64, 95)],
	'Continue' : [0, makeTexCoords(0, 127, 96, 127)],
	'Options' : [0, makeTexCoords(0, 127, 128, 159)],
	'Exit' : [0, makeTexCoords(0, 127, 160, 191)],
	'8bitMode' : [0, makeTexCoords(0, 127, 192, 223)],
	'Select' : [0, makeTexCoords(0, 127, 224, 255)],
	'HeatBg' : [0, makeTexCoords(0, 63, 256, 319)],
	
	'HealthBg' : [0, makeTexCoords(288, 319, 256, 287)]
}

const LettersNumbers = {
}