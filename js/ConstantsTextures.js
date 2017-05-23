const spawn_chance = 0.05;
const FPS = 50;
const bg_tex_s = 512;
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

const damageTypes = {
	'normal' : 0,
	'collission' : 1,
	'laser' : 2,
	'other' : 3
};

const BackgroundTextures = {
	'TreesBases' : [0, makeTexCoords(0, 511, 0, 511)],
	'ground' : [0, makeTexCoords(0, 511, 512, 1023)],
	'winter' : [0, makeTexCoords(512, 1023, 512, 1023)]
};

const EnemyTextures = {
	'EnemyShip0' : [0, makeTexCoords(0, 255, 0, 255)]
};

const BulletsTextures = {
	'Bullet0' : [0, makeTexCoords(0, 31, 0, 31)],
	'Orb0' : [0, makeTexCoords(0, 31, 32, 63)],
	'Orb1' : [0, makeTexCoords(0, 31, 64, 95)]
};

const PlayerShipTextures = {
	'Ship1' : [0, makeTexCoords(0, 255, 0, 255)],
	'EscapePod' : [0, makeTexCoords(256, 511, 0, 255)],
};

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
	'GameOver' : [0, makeTexCoords(0, 127, 0, 63)],
	'HeatBg' : [0, makeTexCoords(0, 63, 256, 319)],
	'HealthBg' : [0, makeTexCoords(64, 127, 256, 319)]
};

const LettersNumbers = {
	'A': [0, makeTexCoords(0, 31, 0, 63)],
	'B': [0, makeTexCoords(32, 63, 0, 63)],
	'C': [0, makeTexCoords(64, 95, 0, 63)],
	'D': [0, makeTexCoords(96, 127, 0, 63)],
	'E': [0, makeTexCoords(128, 159, 0, 63)],
	'F': [0, makeTexCoords(160, 191, 0, 63)],
	'G': [0, makeTexCoords(192, 223, 0, 63)],
	'H': [0, makeTexCoords(224, 255, 0, 63)],
	
	'I': [0, makeTexCoords(0, 31, 64, 127)],
	'J': [0, makeTexCoords(32, 63, 64, 127)],
	'K': [0, makeTexCoords(64, 95, 64, 127)],
	'L': [0, makeTexCoords(96, 127, 64, 127)],
	'M': [0, makeTexCoords(128, 159, 64, 127)],
	'N': [0, makeTexCoords(160, 191, 64, 127)],
	'O': [0, makeTexCoords(192, 223, 64, 127)],
	'P': [0, makeTexCoords(224, 255, 64, 127)],
	
	'Q': [0, makeTexCoords(0, 31, 128, 191)],
	'R': [0, makeTexCoords(32, 63, 128, 191)],
	'S': [0, makeTexCoords(64, 95, 128, 191)],
	'T': [0, makeTexCoords(96, 127, 128, 191)],
	'U': [0, makeTexCoords(128, 159, 128, 191)],
	'V': [0, makeTexCoords(160, 191, 128, 191)],
	'W': [0, makeTexCoords(192, 223, 128, 191)],
	'X': [0, makeTexCoords(224, 255, 128, 191)],
	
	'Y': [0, makeTexCoords(0, 31, 192, 255)],
	'Z': [0, makeTexCoords(32, 63, 192, 255)],
	' ': [0, makeTexCoords(64, 63, 192, 255)],
	'1': [0, makeTexCoords(96, 127, 192, 255)],
	'2': [0, makeTexCoords(128, 159, 192, 255)],
	'3': [0, makeTexCoords(160, 191, 192, 255)],
	'4': [0, makeTexCoords(192, 223, 192, 255)],
	'5': [0, makeTexCoords(224, 255, 192, 255)],
	
	'a': [0, makeTexCoords(0, 31, 256, 319)],
	'b': [0, makeTexCoords(32, 63, 256, 319)],
	'c': [0, makeTexCoords(64, 95, 256, 319)],
	'd': [0, makeTexCoords(96, 127, 256, 319)],
	'e': [0, makeTexCoords(128, 159, 256, 319)],
	'f': [0, makeTexCoords(160, 191, 256, 319)],
	'g': [0, makeTexCoords(192, 223, 256, 319)],
	'h': [0, makeTexCoords(224, 255, 256, 319)],
	
	'i': [0, makeTexCoords(0, 31, 320, 383)],
	'j': [0, makeTexCoords(32, 63, 320, 383)],
	'k': [0, makeTexCoords(64, 95, 320, 383)],
	'l': [0, makeTexCoords(96, 127, 320, 383)],
	'm': [0, makeTexCoords(128, 159, 320, 383)],
	'n': [0, makeTexCoords(160, 191, 320, 383)],
	'o': [0, makeTexCoords(192, 223, 320, 383)],
	'p': [0, makeTexCoords(224, 255, 320, 383)],
	
	'q': [0, makeTexCoords(0, 31, 384, 447)],
	'r': [0, makeTexCoords(32, 63, 384, 447)],
	's': [0, makeTexCoords(64, 95, 384, 447)],
	't': [0, makeTexCoords(96, 127, 384, 447)],
	'u': [0, makeTexCoords(128, 159, 384, 447)],
	'v': [0, makeTexCoords(160, 191, 384, 447)],
	'w': [0, makeTexCoords(192, 223, 384, 447)],
	'x': [0, makeTexCoords(224, 255, 384, 447)],
	
	'y': [0, makeTexCoords(0, 31, 448, 511)],
	'z': [0, makeTexCoords(32, 63, 448, 511)],
	'6': [0, makeTexCoords(64, 95, 448, 511)],
	'7': [0, makeTexCoords(96, 127, 448, 511)],
	'8': [0, makeTexCoords(128, 159, 448, 511)],
	'9': [0, makeTexCoords(160, 191, 448, 511)],
	'0': [0, makeTexCoords(192, 223, 448, 511)],
	'$': [0, makeTexCoords(224, 255, 448, 511)],
	
	':': [0, makeTexCoords(0, 31, 512, 575)],
	'-': [0, makeTexCoords(32, 63, 512, 575)],
	'\'': [0, makeTexCoords(64, 95, 512, 575)],
	',': [0, makeTexCoords(96, 127, 512, 575)],
	'.': [0, makeTexCoords(128, 159, 512, 575)],
	'"': [0, makeTexCoords(160, 192, 512, 575)]
};
