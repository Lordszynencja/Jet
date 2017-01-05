class PlayerWOrbs2 {
	update(shoot) {
		this.cooldown--;
		if (shoot && this.cooldown<=0) {
			var x = p.x+this.x;
			var y = p.y+this.y;
			var speed = 0.5;
			var r1 = 0.2;
			var r2 = 0.3;
			for (var i=0;i<3;i++) {
				playerMissiles.push(new PlayerOrbs2(x, y, r1, r2, speed, playerMissiles.length));
				playerMissiles.push(new PlayerOrbs2(x, y, -r1, -r2, -speed, playerMissiles.length));
				speed *= 2;
			}
			this.cooldown = this.cooldownTime;
			stats.shotsFired += 6;
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
	
	constructor(offx = 0, offy = 0, angle = Math.PI/2) {
		this.cooldown = 0;
		this.cooldownTime = 25;
		this.heat = 25;
		this.x = Math.cos(p.angle)*offx-Math.sin(p.angle)*offy;
		this.y = Math.sin(p.angle)*offx+Math.cos(p.angle)*offy;
	}
}

classesList["PlayerWOrbs2"] = PlayerWOrbs2;
