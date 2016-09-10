class PlayerWMachinegun1 {
	update(shoot) {
		this.cooldown--;
		if (shoot && this.cooldown<=0) {
			var x = p.x+Math.cos(this.angle)*this.x-Math.sin(this.angle)*this.y;
			var y = p.y+Math.sin(this.angle)*this.x+Math.cos(this.angle)*this.y;
			playerMissiles.push(new PlayerBullet1(x,y,this.angle,playerMissiles.length));
			this.cooldown = this.cooldownTime;
			g.add_light([1.0,1.0,0.0],[x,y,0],1,[-this.angle+Math.PI/2,Math.PI/6]);
			return 0.2;
		}
		return 0;
	}
	
	draw() {
	}
	
	constructor(offx,offy,angle) {
		this.x = offx;
		this.y = offy;
		this.cooldown = 0;
		this.cooldownTime = 3;
		this.angle = angle;
	}
}