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
	'ground' : [0, makeTexCoords(0, 511, 512, 1023)],
	'winter' : [0, makeTexCoords(512, 1023, 512, 1023)]
}

const EnemyTextures = {
	'EnemyShip0' : [0, makeTexCoords(0, 255, 0, 255)]
}

const BulletsTextures = {
	'Bullet0' : [0, makeTexCoords(0, 31, 0, 31)],
	'Orb0' : [0, makeTexCoords(0, 31, 32, 63)],
	'Orb1' : [0, makeTexCoords(0, 31, 64, 95)]
}

const PlayerShipTextures = {
	'Ship1' : [0, makeTexCoords(0, 255, 0, 255)]
}

const GUITextures = {
	'Select' : [0, makeTexCoords(0, 127, 224, 255)],
	'Start' : [0, makeTexCoords(0, 127, 64, 95)],
	'Continue' : [0, makeTexCoords(0, 127, 96, 127)],
	'Options' : [0, makeTexCoords(0, 127, 128, 159)],
	'Exit' : [0, makeTexCoords(0, 127, 160, 191)],
	
	//Levels
	'Level1' : [0, makeTexCoords(128, 255, 128, 159)],
	'Level2' : [0, makeTexCoords(128, 255, 160, 191)],
	
	// Options menu
	'8bitMode' : [0, makeTexCoords(0, 127, 192, 223)],
	'Light' : [0, makeTexCoords(128, 255, 64, 95)],
	'Sound' : [0, makeTexCoords(128, 255, 96, 127)],
	
	// Game GUI
	'LevelFinished' : [0, makeTexCoords(128, 255, 0, 63)],
	'GameOver' : [0, makeTexCoords(128, 255, 0, 63)],
	'HeatBg' : [0, makeTexCoords(0, 63, 256, 319)],
	'HealthBg' : [0, makeTexCoords(288, 319, 256, 287)],
	'ShootTip' : [0, makeTexCoords(256, 383, 0, 63)],
	'MoveTip' : [0, makeTexCoords(256, 383, 64, 127)],
	'IndicatorsTip' : [0, makeTexCoords(256, 383, 128, 195)]
}

const LettersNumbers = {
}