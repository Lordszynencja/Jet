class PlayerWOrbs2 {
	update(shoot) {
		this.cooldown--;
		if (shoot && this.cooldown<=0) {
			var x = p.x+Math.cos(this.angle)*this.x-Math.sin(this.angle)*this.y;
			var y = p.y+Math.sin(this.angle)*this.x+Math.cos(this.angle)*this.y;
			playerMissiles.push(new PlayerOrbs2(p.x, p.y, 0.2, 0.3, 1, playerMissiles.length));
			playerMissiles.push(new PlayerOrbs2(p.x, p.y, -0.2, -0.3, -1, playerMissiles.length));
			playerMissiles.push(new PlayerOrbs2(p.x, p.y, 0.2, 0.3, 0.5, playerMissiles.length));
			playerMissiles.push(new PlayerOrbs2(p.x, p.y, -0.2, -0.3, -0.5, playerMissiles.length));
			playerMissiles.push(new PlayerOrbs2(p.x, p.y, 0.2, 0.3, 2, playerMissiles.length));
			playerMissiles.push(new PlayerOrbs2(p.x, p.y, -0.2, -0.3, -2, playerMissiles.length));
			this.cooldown = this.cooldownTime;
			stats.shotsFired += 6;
			return this.heat;
		}
		return 0;
	}
	
	draw() {
	}
	
	constructor(offx = 0,offy = 0,angle = Math.PI/2) {
		this.cooldown = 0;
		this.cooldownTime = 25;
		this.heat = 25;
		this.x = offx;
		this.y = offy;
		this.angle = angle;
	}
}