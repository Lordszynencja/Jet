class CoolingUpgrade {
	update() {
		p.ship.heat -= this.values[this.level];
	}
	
	draw() {}
	
	upgrade() {
		if (this.level<this.prices.length) this.level++;
	}
	
	downgrade() {
		if (this.level>0) this.level--;
	}
	
	getUpgradePrice() {
		if (this.level<this.prices.length) return this.prices[this.level];
		return null;
	}
	
	getDowngradePrice() {
		if (this.level>0) return this.prices[this.level-1];
		return null;
	}
	
	constructor(values, prices) {
		this.values = values;
		this.prices = prices;
		if (values.length != prices.length+1) console.log("WARNING, wrong values/prices:"+values+"\n"+prices);
		this.level = 0;
	}
}

classesList["CoolingUpgrade"] = CoolingUpgrade;
