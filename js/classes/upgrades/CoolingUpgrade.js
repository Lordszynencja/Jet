class CoolingUpgrade {
	update() {
		p.ship.heat -= this.cooling;
	}
	
	draw() {}
	
	levelChanged() {
		this.cooling = this.values[this.level];
	}
	
	constructor(values, prices) {
		this.values = values;
		this.prices = prices;
		if (values.length != prices.length+1) console.log("WARNING, wrong values/prices:"+values+"\n"+prices);
		this.level = 0;
		this.levelChanged();
	}
}

classesList["CoolingUpgrade"] = CoolingUpgrade;
names["CoolingUpgrade"] = 'Cooling';
