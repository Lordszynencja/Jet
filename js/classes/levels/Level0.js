class Level0 {
	update() {
		standardLevelUpdate(this);
	}
	
	draw() {
		if (this.time<200) drawInfo('ShootTip');
		if (this.time>200 && this.time<400) drawInfo('MoveTip', 0.5);
		if (this.time>400 && this.time<800) drawInfo('IndicatorsTip', 0.7, -0.7, 0.7);
	}
	
	constructor() {
		this.time = 0;
		this.nextEnemy = 0;
		this.levelLength = 2000;
		this.number = 0;
		this.texture = 'TreesBases';
		this.music = 'level1';
		this.enemies = [
		[100, Enemy1, [0, 1.5], [0.005, Math.PI*3/2], []],
		[300, Enemy1, [0.75, 1.5], [0.005, Math.PI*3/2], []],
		[500, Enemy1, [0, 1.5], [0.01, Math.PI*3/2], []],
		[550, Enemy1, [-0.5, 1.5], [0.01, Math.PI*3/2], []],
		[550, Enemy1, [0.5, 1.5], [0.01, Math.PI*3/2], []],
		[700, Enemy1, [-0.5, 1.5], [0.01, Math.PI*3/2], []],
		[750, Enemy1, [-0.5, 1.5], [0.01, Math.PI*3/2], []],
		[800, Enemy1, [-0.5, 1.5], [0.01, Math.PI*3/2], []],
		[850, Enemy1, [-0.5, 1.5], [0.01, Math.PI*3/2], []],
		[900, Enemy1, [-0.5, 1.5], [0.01, Math.PI*3/2], []],
		[950, Enemy1, [-0.5, 1.5], [0.01, Math.PI*3/2], []],
		[1000, Enemy1, [0.5, 1.5], [0.01, Math.PI*3/2], []],
		[1050, Enemy1, [0.5, 1.5], [0.01, Math.PI*3/2], []],
		[1100, Enemy1, [0.5, 1.5], [0.01, Math.PI*3/2], []],
		[1150, Enemy1, [0.5, 1.5], [0.01, Math.PI*3/2], []],
		[1200, Enemy1, [0.5, 1.5], [0.01, Math.PI*3/2], []],
		[1250, Enemy1, [0.5, 1.5], [0.01, Math.PI*3/2], []],
		[1300, Enemy1, [-0.5, 1.5], [0.01, Math.PI*3/2], []],
		[1350, Enemy1, [0.5, 1.5], [0.01, Math.PI*3/2], []],
		[1400, Enemy1, [-0.5, 1.5], [0.01, Math.PI*3/2], []],
		[1450, Enemy1, [0.5, 1.5], [0.01, Math.PI*3/2], []],
		[1500, Enemy1, [-0.5, 1.5], [0.01, Math.PI*3/2], []],
		[1550, Enemy1, [0.5, 1.5], [0.01, Math.PI*3/2], []],
		[1650, Enemy1, [0.5, 1.5], [0.01, Math.PI*3/2], []],
		[1700, Enemy1, [-0.33, 1.5], [0.01, Math.PI*3/2], []],
		[1700, Enemy1, [0.33, 1.5], [0.01, Math.PI*3/2], []],
		[1750, Enemy1, [-0.66, 1.5], [0.01, Math.PI*3/2], []],
		[1750, Enemy1, [0.66, 1.5], [0.01, Math.PI*3/2], []],
		];
	}
}