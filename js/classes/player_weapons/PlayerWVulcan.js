class PlayerWVulcan {
	update(shoot) {
		this.cooldown--;
		if (shoot && this.cooldown<=0) {
			var x = p.x+this.x;
			var y = p.y+this.y;
			playerMissiles.push(new PlayerBullet1(x, y, this.angle+Math.random()*0.2, playerMissiles.length));
			stats.shotsFired++;
			this.cooldown = this.cooldownTime;
			s.play("shot", 0.8);
			this.shootingLight = time;
			return this.heat;
		}
		return 0;
	}
	
	draw() {
		if (this.shootingLight == time) g.addLight([p.x+this.x, p.y+this.y], [1, 1, 0], 1, [this.angle, Math.PI/6]);
	}
	
	getData() {
		var data = {
			x : this.x,
			y : this.y,
			angle : this.angle,
			level : this.level
		};
		return data;
	}
	
	setData(data) {
		this.x = data.x;
		this.y = data.y;
		this.angle = data.angle;
		this.level = data.level;
		this.levelChanged();
	}
	
	setSlot(id) {
		var offset = p.ship.weaponOffsets[id];
		this.x = Math.cos(p.angle)*offset[0]-Math.sin(p.angle)*offset[1];
		this.y = Math.sin(p.angle)*offset[0]+Math.cos(p.angle)*offset[1];
		this.angle = p.ship.weaponAngles[id];
	}
	
	levelChanged() {
		this.cooldownTime = 3-this.level;
		this.heat = 1.4;
	}
	
	getInfo() {
		var info = ['Weapon upgrade level: '+this.level,
			'Probably the fastest weapon in galaxy'];
		return info;
	}
	
	getTooltip() {
		var tooltip = ['Price: '+this.price,
			'Deadly quality, lightning speed'];
			return tooltip;
	}
	
	constructor(slot = 0) {
		this.level = 0;
		this.cooldown = 0;
		this.shootingLight = -1;
		this.cooldownTime = 3;
		this.setSlot(slot);
		this.levelChanged();
		this.price = 200;
		this.prices = [250, 500];
	}
}

classesList["PlayerWVulcan"] = PlayerWVulcan;
names["PlayerWVulcan"] = 'Vulcan';
