class Level0 {
	update() {
		standardLevelUpdate(this);
		/*while (this.nextEnemy<this.enemies.length && this.time >= this.enemies[this.nextEnemy][0]) {
			var enemyData = this.enemies[this.nextEnemy];
			var enemy = new enemyData[1](enemyData[2], enemyData[3], enemies.length, enemyData[4]);
			enemies.push(enemy);
			this.nextEnemy++;
		}
		if (this.time == this.levelLength && !p.dead) {
			if (conf.level<1) conf.level = 1;
			s.play("gameover", 1);
			p.dead = true;
			p.dead_timer = time;
		}
		this.time++;*/
	}
	
	constructor() {
		this.time = 0;
		this.nextEnemy = 0;
		this.levelLength = 500;
		this.number = 0;
		this.texture = 'TreesBases';
		this.enemies = [
		[50, Enemy1, [0, 1.5], [0.01, Math.PI*3/2], []],
		[100, Enemy1, [-0.5, 1.5], [0.01, Math.PI*3/2], []],
		[100, Enemy1, [0.5, 1.5], [0.01, Math.PI*3/2], []]
		];
	}
}