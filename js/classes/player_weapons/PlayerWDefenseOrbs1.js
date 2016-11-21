class PlayerWDefenseOrbs1 {
	update(shoot) {
		this.cooldown--;
		if (shoot && this.cooldown<=0) {
			for (var i=0;i<this.orbNo;i++) {
				playerMissiles.push(new PlayerDefenseOrbs1(i*Math.PI*2/this.orbNo, 1, 0.2, playerMissiles.length));
			}
			this.cooldown = this.cooldownTime;
			stats.shotsFired += this.orbNo;
			return this.heat;
		}
		return 0;
	}
	
	draw() {
	}
	
	constructor(offx = 0,offy = 0,angle = Math.PI/2) {
		this.cooldown = 0;
		this.cooldownTime = 500;
		this.heat = 10;
		this.orbNo = 16;
		this.x = offx;
		this.y = offy;
		this.angle = angle;
	}
}