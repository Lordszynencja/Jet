class CoolingUpgrade {
	update() {
		this.heat -= this.cooling;
		if (this.heat>=this.maxHeat) this.overheat = true;
		if (this.overheat && this.heat<=this.cooldown) this.overheat = false;
		if (this.heat<0) this.heat = 0;
		this.shownHeat = this.shownHeat*0.8+0.2*this.heat/this.maxHeat;
		if (this.shownHeat>1) this.shownHeat = 1;
	}
	
	draw() {}
	
	levelChanged() {
		this.cooling = this.coolingValues[this.level];
		this.maxHeat = this.overheatValues[this.level];
		this.cooldown = this.cooldownValues[this.level];
	}
	
	prepare() {
		this.heat = 0;
		this.shownHeat = 0;
		this.overheat = false;
	}
	
	constructor(coolingValues, overheatValues, cooldownValues, prices) {
		this.coolingValues = coolingValues;
		this.overheatValues = overheatValues;
		this.cooldownValues = cooldownValues;
		this.prices = prices;
		this.level = 0;
		this.levelChanged();
	}
}

classesList["CoolingUpgrade"] = CoolingUpgrade;
names["CoolingUpgrade"] = 'Cooling';
