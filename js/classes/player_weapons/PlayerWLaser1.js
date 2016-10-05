class PlayerWLaser1 {
	update(shoot) {
		this.cooldown--;
		if (shoot && this.cooldown<=0) {
			var x = p.x+Math.cos(this.angle)*this.x-Math.sin(this.angle)*this.y;
			var y = p.y+Math.sin(this.angle)*this.x+Math.cos(this.angle)*this.y;
			playerMissiles.push(new PlayerLaser1(this.x,this.y,playerMissiles.length));
			this.cooldown = this.cooldownTime;
			s.play("laser",0.05);
			return this.heat;
		}
		return 0;
	}
	
	draw() {
	}
	
	constructor(offx = 0,offy = 0,angle = Math.PI/2) {
		this.cooldown = 0;
		this.cooldownTime = 50;
		this.heat = 10;
		this.x = offx;
		this.y = offy;
		this.angle = angle;
	}
}