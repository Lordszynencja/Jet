class EnemyWTrackingMachinegun {
	update(shoot) {
		this.cooldown--;
		if (shoot && this.cooldown<=0) {
			var x = this.enemy.x+Math.cos(this.enemy.angle)*this.x-Math.sin(this.enemy.angle)*this.y;
			var y = this.enemy.y+Math.sin(this.enemy.angle)*this.x+Math.cos(this.enemy.angle)*this.y;
			var ang = angle(p.x-x, p.y-y);
			enemyMissiles.push(new EnemyBullet1(x, y, ang, enemyMissiles.length));
			this.cooldown = this.cooldownTime;
			g.addLight([x, y], [1, 1, 0], 1, [ang, Math.PI/6]);
		}
	}
	
	draw() {
	}
	
	constructor(offx, offy, enemy) {
		this.x = offx;
		this.y = offy;
		this.enemy = enemy;
		this.cooldown = 0;
		this.cooldownTime = 3;
	}
}