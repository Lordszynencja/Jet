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
	
	setSlot(id) {
		var offset = p.ship.weaponOffsets[id];
		this.x = Math.cos(p.angle)*offset[0]-Math.sin(p.angle)*offset[1];
		this.y = Math.sin(p.angle)*offset[0]+Math.cos(p.angle)*offset[1];
	}
	
	levelChanged() {}
	
	getInfo() {
		var info = ['weapon upgrade level: '+this.level,
			'Shoots tons of small bullets very rapidly'];
		return info;
	}
	
	getTooltip() {
		var tooltip = ['price: '+this.price,
			'Simple, cheap and deadly, this weapon shoots',
			'stream of bullets at your enemies'];
			return tooltip;
	}
	
	constructor(slot = 0) {
		this.level = 0;
		this.cooldown = 0;
		this.cooldownTime = 50;
		this.heat = 20;
		this.setSlot(slot);
		this.price = 175;
		this.prices = [];
	}
}

classesList["PlayerWOrbs1"] = PlayerWOrbs1;
levelUnlocks.items[1].push(PlayerWOrbs1);
names["PlayerWOrbs1"] = 'Orbitron';
