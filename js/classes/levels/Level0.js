class Level0 {
	update() {
		standardLevelUpdate(this);
	}
	
	constructor() {
		this.time = 0;
		this.nextEnemy = 0;
		this.levelLength = 500;
		this.number = 0;
		this.texture = 'TreesBases';
		this.enemies = [
		[50, Enemy1, [0, 0.5], [0.01, Math.PI*3/2], []],
		[100, Enemy1, [-0.5, 1.5], [0.01, Math.PI*3/2], []],
		[100, Enemy1, [0.5, 1.5], [0.01, Math.PI*3/2], []]
		];
	}
}