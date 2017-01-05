class PlayerWMachinegun1 {
	update(shoot) {
		this.cooldown--;
		if (shoot && this.cooldown<=0) {
			var x = p.x+this.cos*this.x-this.sin*this.y;
			var y = p.y+this.sin*this.x+this.cos*this.y;
			playerMissiles.push(new PlayerBullet1(x, y, this.angle, playerMissiles.length));
			this.cooldown = this.cooldownTime;
			s.play("shot", 0.1);
			this.shootingLight = time;
			this.lx = x;
			this. ly = y;
			stats.shotsFired++;
			return this.heat;
		}
		return 0;
	}
	
	draw() {
		if (this.shootingLight == time) g.addLight([this.lx, this.ly], [1,1,0], 1, [this.angle, Math.PI/6]);
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
		this.sin = Math.sin(this.angle);
		this.cos = Math.cos(this.angle);
	}
	
	constructor(offx = 0, offy = 0, angle = Math.PI/2) {
		this.shootingLight = -1;
		this.cooldown = 0;
		this.cooldownTime = 3;
		this.heat = 2;
		this.x = offx;
		this.y = offy;
		this.angle = angle;
		this.prepareData();
	}
}

classesList["PlayerWMachinegun1"] = PlayerWMachinegun1;
