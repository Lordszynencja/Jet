class PlayerWLaser1 {
	update(shoot) {
		this.cooldown--;
		if (shoot && this.cooldown<=0) {
			playerMissiles.push(new PlayerLaser1(p.x+this.x, p.y+this.y, playerMissiles.length));
			this.cooldown = this.cooldownTime;
			s.play("laser", 1);
			stats.shotsFired++;
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
	
	upgrade() {
		
	}
	
	downgrade() {
		
	}
	
	constructor(offx = 0, offy = 0, angle = Math.PI/2) {
		this.cooldown = 0;
		this.cooldownTime = 50;
		this.heat = 10;
		this.x = Math.cos(p.angle)*offx-Math.sin(p.angle)*offy;
		this.y = Math.sin(p.angle)*offx+Math.cos(p.angle)*offy;
	}
}

classesList["PlayerWLaser1"] = PlayerWLaser1;
