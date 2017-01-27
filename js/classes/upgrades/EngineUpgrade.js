class EngineUpgrade {
	update() {
		if (c.isPressed("up")) {
			this.v += this.power;
			if (this.v>this.speed) this.v = this.speed;
		}
		if (c.isPressed("down")) {
			this.v -= this.power;
			if (this.v<-this.speed) this.v = -this.speed;
		}
		if (!c.isPressed("up") && !c.isPressed("down")) {
			if (this.v>this.power) this.v -= this.power;
			else if (this.v<-this.power) this.v += this.power;
			else this.v = 0;
		}
		var y = p.y + this.v;
		var max = 1-p.ship.height;
		if (y<=-max) y = -max;
		else if (y>=max) y = max;
		p.y = y;
		p.ship.y = y;
		for (var i in p.ship.jetEngines) p.ship.jetEngines[i].height = p.ship.jetEngines[i].defaultHeight*(1+this.v*10);
	}
	
	draw() {}
	
	levelChanged() {
		this.power = this.powers[this.level];
		this.speed = this.speeds[this.level];
	}
	
	prepare() {
		this.v = 0;
	}
	
	constructor(powers, speeds, prices) {
		this.powers = powers;
		this.speeds = speeds;
		this.prices = prices;
		this.level = 0;
		this.v = 0;
		this.levelChanged();
	}
}

classesList["EngineUpgrade"] = EngineUpgrade;
names["EngineUpgrade"] = 'Engine';
