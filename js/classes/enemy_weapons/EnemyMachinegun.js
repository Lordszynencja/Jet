class EnemyMachinegun {
	update(shoot) {
		cooldown--;
		if (shoot && cooldown<=0) {
			var x = enemy.x+Math.cos(this.x)-Math.sin(this.y);
			var y = enemy.y+Math.sin(this.x)+Math.cos(this.y);
			enemyMissiles.push(new EnemyBullet1(x,y,enemyMissileSpeed[0],enemy.angle,enemyMissileSize[0],enemyMissileDamage[0],tex,num));
			this.cooldown = this.cooldownTime;
			g.add_light(weapon_lights[1],[x,y,0],1,[enemy.angle,Math.PI/6]);
		}
	}
	
	draw() {
	}
	
	constructor(offx,offy,enemy,weaponno) {
		this.x = offx;
		this.y = offy;
		this.enemy = enemy;
		this.cooldown = 0;
		this.cooldownTime = 3;
	}
}