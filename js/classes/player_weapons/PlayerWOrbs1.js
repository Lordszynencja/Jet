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
			offx : this.x,
			offy : this.y,
			angle : this.angle
		};
		return data;
	}
	
	setData(data) {
		this.x = data.offx;
		this.y = data.offy;
		this.angle = data.angle;
		this.prepareData();
	}
	
	prepareData() {
		this.sin = Math.sin(this.angle)
		this.cos = Math.cos(this.angle);
	}
	
	constructor(offx = 0,offy = 0,angle = Math.PI/2) {
		this.cooldown = 0;
		this.cooldownTime = 50;
		this.heat = 20;
		this.x = offx;
		this.y = offy;
		this.angle = angle;
	}
}

classesList["PlayerWOrbs1"] = PlayerWOrbs1;
