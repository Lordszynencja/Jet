class PlayerWDefenseOrbs1 {
	update(shoot) {
		this.cooldown--;
		if (shoot && this.cooldown<=0) {
			var n = 5*(this.level+1);
			for (var i=0;i<n;i++) {
				playerMissiles.push(new PlayerDefenseOrbs1(i*Math.PI*2/n, 1, p.ship.size*1.2, playerMissiles.length));
				stats.shotsFired++;
			}
			this.cooldown = this.cooldownTime;
			return this.heat;
		}
		return 0;
	}
	
	setData(data) {
		this.level = data.level;
	}
	
	getData() {
		var data = {
			level : this.level
		};
		return data;
	}
	
	draw() {
	}
	
	upgrade() {
		if (this.level<3) this.level++;
	}
	
	downgrade() {
		if (this.level>0) this.level--;
	}
	
	constructor(offx, offy, angle) {
		this.level = 0;
		this.cooldown = 0;
		this.cooldownTime = 500;
		this.heat = 10;
	}
}

classesList["PlayerWDefenseOrbs1"] = PlayerWDefenseOrbs1;
