class WingsUpgrade {
	update() {
		if (c.isPressed("right")) {
			this.v += this.agility;
			if (this.v>this.speed) this.v = this.speed;
		}
		if (c.isPressed("left")) {
			this.v -= this.agility;
			if (this.v<-this.speed) this.v = -this.speed;
		}
		if (!c.isPressed("right") && !c.isPressed("left")) {
			if (this.v>this.agility) this.v -= this.agility;
			else if (this.v<-this.agility) this.v += this.agility;
			else this.v = 0;
		}
		var x = p.x + this.v;
		var max = 1-p.ship.width;
		if (x<=-max) x = -max;
		else if (x>=max) x = max;
		p.x = x;
		p.ship.x = x;
	}
	
	draw() {}
	
	levelChanged() {
		this.agility = this.agilities[this.level];
		this.speed = this.speeds[this.level];
	}
	
	prepare() {
		this.v = 0;
	}
	
	constructor(agilities, speeds, prices) {
		this.agilities = agilities;
		this.speeds = speeds;
		this.prices = prices;
		this.level = 0;
		this.v = 0;
		this.levelChanged();
	}
}

classesList["WingsUpgrade"] = WingsUpgrade;
names["WingsUpgrade"] = 'Wings';
