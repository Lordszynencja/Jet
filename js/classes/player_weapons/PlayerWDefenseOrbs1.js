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
		return ['Weapon upgrade level: '+this.level,
			'Utility device that creates balls',
			'which defend you'];
	}
	
	getTooltip() {
		return ['Price: '+this.price,
			'This device creates metal balls that orbit',
			'around your ship, taking hits'];
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
names["PlayerWDefenseOrbs1"] = 'Defense Orbs';
