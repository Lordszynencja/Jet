class Level2 {
	update() {
		standardLevelUpdate(this);
	}
	
	draw() {
	}
	
	constructor() {
		p.x = 0;
		p.y = -0.85;
		p.ship.x = p.x;
		p.ship.y = p.y;
		this.time = 0;
		this.nextEnemy = 0;
		this.levelLength = 800;
		this.number = 1;
		this.boss = Boss1;
		this.bossPresent = false;
		this.texture = 'winter';
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
		[450, Enemy1, [0.7, 1.2], [0.015, Math.PI*1.4], []],
		[550, Suicider, [1.6, 1.2], [0.04, Math.PI*1.25], []]
		];
	}
}

classesList["Level2"] = Level2;
if (levelsNumber<3) levelsNumber = 3;
