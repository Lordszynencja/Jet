class Level1 {
	update() {
		standardLevelUpdate(this);
	}
	
	draw() {
	}
	
	constructor() {
		this.time = 0;
		this.nextEnemy = 0;
		this.levelLength = 700;
		this.number = 1;
		this.boss = Boss1;
		this.bossPresent = false;
		this.texture = 'ground';
		this.music = 'level1';
		this.enemies = [
		[0, Enemy1, [-0.5, 1.2], [0.01, Math.PI*1.5], []],
		[0, Enemy1, [0.5, 1.2], [0.01, Math.PI*1.5], []],
		[50, Enemy1, [-0.5, 1.2], [0.01, Math.PI*1.5], []],
		[50, Enemy1, [0, 1.2], [0.01, Math.PI*1.5], []],
		[50, Enemy1, [0.5, 1.2], [0.01, Math.PI*1.5], []],
		[100, Enemy1, [-0.5, 1.2], [0.01, Math.PI*1.5], []],
		[100, Enemy1, [0.5, 1.2], [0.01, Math.PI*1.5], []],
		[200, Enemy1, [-0.7, 1.2], [0.01, Math.PI*1.5], []],
		[220, Enemy1, [-0.5, 1.2], [0.01, Math.PI*1.5], []],
		[240, Enemy1, [-0.3, 1.2], [0.01, Math.PI*1.5], []],
		[260, Enemy1, [-0.1, 1.2], [0.01, Math.PI*1.5], []],
		[280, Enemy1, [0.1, 1.2], [0.01, Math.PI*1.5], []],
		[300, Enemy1, [0.3, 1.2], [0.01, Math.PI*1.5], []],
		[320, Enemy1, [0.5, 1.2], [0.01, Math.PI*1.5], []],
		[340, Enemy1, [0.7, 1.2], [0.01, Math.PI*1.5], []],
		[450, Enemy1, [-0.7, 1.2], [0.015, Math.PI*1.6], []],
		[450, Enemy1, [0, 1.2], [0.015, Math.PI*1.5], []],
		[450, Enemy1, [0.7, 1.2], [0.015, Math.PI*1.4], []]
		];
	}
}

classesList["Level1"] = Level1;
if (levelsNumber<2) levelsNumber = 2;
