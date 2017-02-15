class PlayerWOrbs2 {
	update(shoot) {
		this.cooldown--;
		if (shoot && this.cooldown<=0) {
			var x = p.x+this.x;
			var y = p.y+this.y;
			var speed = 0.5;
			var r1 = 0.2;
			var r2 = 0.3;
			for (var i=0;i<=this.level;i++) {
				playerMissiles.push(new PlayerOrbs2(x, y, r1, r2, speed, playerMissiles.length));
				playerMissiles.push(new PlayerOrbs2(x, y, -r1, -r2, -speed, playerMissiles.length));
				speed *= 2;
				stats.shotsFired += 2;
			}
			this.cooldown = this.cooldownTime;
			return this.heat;
		}
		return 0;
	}
	
	draw() {
	}
	
	getData() {
		var data = {
			x : this.x,
			y : this.y,
			level : this.level
		};
		return data;
	}
	
	setData(data) {
		this.x = data.x;
		this.y = data.y;
		this.level = data.level;
	}
	
	setSlot(id) {
		var offset = p.ship.weaponOffsets[id];
		this.x = Math.cos(p.angle)*offset[0]-Math.sin(p.angle)*offset[1];
		this.y = Math.sin(p.angle)*offset[0]+Math.cos(p.angle)*offset[1];
	}
	
	levelChanged() {}
	
	getInfo() {
		return ['Weapon upgrade level: '+this.level,
			'Metal balls flying around in strange shape'];
	}
	
	getTooltip() {
		return ['Price: '+this.price,
			'These hard metal balls fly at the most',
			'unpredictable direction, which makes them',
			'unavoidable'];
	}
	
	constructor(slot = 0) {
		this.level = 0;
		this.cooldown = 0;
		this.cooldownTime = 25;
		this.heat = 25;
		this.setSlot(slot);
		this.price = 150;
		this.prices = [250, 300];
	}
}

classesList["PlayerWOrbs2"] = PlayerWOrbs2;
names["PlayerWOrbs2"] = 'Crazy Balls';

