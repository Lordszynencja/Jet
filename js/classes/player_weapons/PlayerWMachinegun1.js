class PlayerWMachinegun1 {
	update(shoot) {
		this.cooldown--;
		if (shoot && this.cooldown<=0) {
			var x = p.x+Math.cos(this.angle)*this.x-Math.sin(this.angle)*this.y;
			var y = p.y+Math.sin(this.angle)*this.x+Math.cos(this.angle)*this.y;
			playerMissiles.push(new PlayerBullet1(x,y,this.angle,playerMissiles.length));
			this.cooldown = this.cooldownTime;
			s.play("shot", 0.1);
			this.d = true;
			this.lx = x;
			this. ly = y;
			stats.shotsFired++;
			return this.heat;
		}
		this.d = false;
		return 0;
	}
	
	draw() {
		if (this.d) g.addLight([this.lx, this.ly], [1,1,0], 1, [this.angle, Math.PI/6]);
	}
	
	constructor(offx = 0,offy = 0,angle = Math.PI/2) {
		this.d = false;
		this.cooldown = 0;
		this.cooldownTime = 3;
		this.heat = 2;
		this.x = offx;
		this.y = offy;
		this.angle = angle;
	}
}