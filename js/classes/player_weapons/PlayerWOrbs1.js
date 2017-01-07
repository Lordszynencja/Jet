class PlayerWOrbs1 {
	update(shoot) {
		this.cooldown--;
		if (shoot && this.cooldown<=0) {
			playerMissiles.push(new PlayerOrbs1(this, playerMissiles.length));
			this.cooldown = this.cooldownTime;
			stats.shotsFired += 2;
			return this.heat;
		}
		return 0;
	}
	
	draw() {
	}
	
	getData() {
		var data = {
			x : this.x,
			y : this.y
		};
		return data;
	}
	
	setData(data) {
		this.x = data.x;
		this.y = data.y;
	}
	
	constructor(offx = 0,offy = 0,angle = Math.PI/2) {
		this.cooldown = 0;
		this.cooldownTime = 50;
		this.heat = 20;
		this.x = Math.cos(p.angle)*offx-Math.sin(p.angle)*offy;
		this.y = Math.sin(p.angle)*offx+Math.cos(p.angle)*offy;
	}
}

classesList["PlayerWOrbs1"] = PlayerWOrbs1;
