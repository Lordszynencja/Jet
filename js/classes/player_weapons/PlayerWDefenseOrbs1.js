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
	
	setSlot(id) {}
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
	
	constructor(slot) {
		this.level = 0;
		this.cooldown = 0;
		this.cooldownTime = 500;
		this.heat = 10;
		this.price = 130;
		this.prices = [90, 85, 80];
	}
}

classesList["PlayerWDefenseOrbs1"] = PlayerWDefenseOrbs1;
levelUnlocks.items[0].push(PlayerWDefenseOrbs1);
names["PlayerWDefenseOrbs1"] = 'Defense Orbs';
