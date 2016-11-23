class Level1 {
	update() {
		standardLevelUpdate(this);
	}
	
	constructor() {
		this.time = 0;
		this.nextEnemy = 0;
		this.levelLength = 500;
		this.number = 1;
		this.texture = 'ground';
		this.music = 'level1';
		this.enemies = [
		[0, Enemy1, [-0.5, 1.5], [0.01, Math.PI*3/2], []],
		[0, Enemy1, [0.5, 1.5], [0.01, Math.PI*3/2], []],
		[50, Enemy1, [-0.5, 1.5], [0.01, Math.PI*3/2], []],
		[50, Enemy1, [0, 1.5], [0.01, Math.PI*3/2], []],
		[50, Enemy1, [0.5, 1.5], [0.01, Math.PI*3/2], []],
		[100, Enemy1, [-0.5, 1.5], [0.01, Math.PI*3/2], []],
		[100, Enemy1, [0.5, 1.5], [0.01, Math.PI*3/2], []]
		];
	}
}