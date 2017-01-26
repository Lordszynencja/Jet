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
			level: this.level,
			x : this.x,
			y : this.y,
			angle : this.angle
		};
		return data;
	}
	
	setData(data) {
		this.level = data.level;
		this.x = data.x;
		this.y = data.y;
		this.angle = data.angle;
	}
	
	setSlot(id) {
		var offset = p.ship.weaponOffsets[id];
		this.angle = p.ship.weaponAngles[id];
		this.x = Math.cos(p.angle)*offset[0]-Math.sin(p.angle)*offset[1];
		this.y = Math.sin(p.angle)*offset[0]+Math.cos(p.angle)*offset[1];
	}
	
	levelChanged() {
		if (this.level == 0) this.cooldownTime = 100;
		else if (this.level == 1) this.cooldownTime = 50;
		else if (this.level == 2) this.cooldownTime = 25;
	}
	
	getInfo() {
		return ['Weapon upgrade level: '+this.level,
			'Energy balls flying around the ship'];
	}
	
	getTooltip() {
		return ['Price: '+this.price,
			'Energy that destroys, levitating around',
			'YOUR SHIP just for '+this.price+'$'];
	}
	
	constructor(slot = 0) {
		this.level = 0;
		this.cooldown = 0;
		this.cooldownTime = 50;
		this.heat = 20;
		this.setSlot(slot);
		this.price = 175;
		this.prices = [200, 350];
	}
}

classesList["PlayerWOrbs1"] = PlayerWOrbs1;
levelUnlocks.items[1].push(PlayerWOrbs1);
names["PlayerWOrbs1"] = 'Orbitron';
