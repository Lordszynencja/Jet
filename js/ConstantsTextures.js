const spawn_chance = 0.05;
const FPS = 50;
const tex_s = 2048;
const maxMissiles = 256;
const maxEnemies = 64;

const BackgroundTextures = {
	'TreesBases' : [0,makeCoords4(0/tex_s, 511/tex_s, 0/tex_s, 511/tex_s)],
	'ground' : [0,makeCoords4(0/tex_s,511/tex_s,1023/tex_s,512/tex_s)],
	'winter' : [0,makeCoords4(512/tex_s,1023/tex_s,1023/tex_s,512/tex_s)]
}

const EnemyTextures = {
	'EnemyShip1' : [0,makeCoords4(256/tex_s,511/tex_s,255/tex_s,0)]
}

const BulletsTextures = {
	'Bullet1' : [0,makeCoords4(0/tex_s,31/tex_s,287/tex_s,256/tex_s)],
	'Orb2' : [0,makeCoords4(32/tex_s,63/tex_s,287/tex_s,256/tex_s)],
	'Orb3' : [0,makeCoords4(64/tex_s,95/tex_s,287/tex_s,256/tex_s)]
}

const PlayerShipTextures = {
	'Ship1' : [0,makeCoords4(0,255/tex_s,255/tex_s,0)]
}

const GUITextures = {
	'Health' : [0,makeCoords4(320/tex_s,351/tex_s,287/tex_s,256/tex_s)],
	'HealthBg' : [0,makeCoords4(288/tex_s,319/tex_s,287/tex_s,256/tex_s)],
	'Heat' : [0,makeCoords4(256/tex_s,287/tex_s,287/tex_s,256/tex_s)],
	'GameOver' : [1,makeCoords4(0,127/tex_s,0,63/tex_s)],
	'Continue' : [1,makeCoords4(0,127/tex_s,64/tex_s,95/tex_s)],
	'Exit' : [1,makeCoords4(0,127/tex_s,96/tex_s,127/tex_s)],
	'Options' : [1,makeCoords4(0,127/tex_s,128/tex_s,159/tex_s)],
	'Start' : [1,makeCoords4(0,127/tex_s,160/tex_s,191/tex_s)],
	'8bitMode' : [1,makeCoords4(0,127/tex_s,192/tex_s,223/tex_s)],
	'Select' : [1,makeCoords4(128/tex_s,255/tex_s,0,31/tex_s)]
}

const LettersNumbers = {
}