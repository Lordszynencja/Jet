class HullUpgrade {
	update() {
		if (this.hp<0) {
			this.hp = 0;
			if (!p.dead) {
				s.play("gameover", 1);
				p.dead = true;
				p.dead_timer = time;
			}
		} else if (this.hp>this.maxHP) this.hp = this.maxHP;
		this.shownHP = 0.8*this.shownHP+0.2*this.hp/this.maxHP;
	}
	
	draw() {}
	
	damage(dmg) {
		this.hp -= dmg*this.damageModifier;
	}
	
	levelChanged() {
		this.maxHP = this.hullStrengths[this.level];
		this.damageModifier = this.damageReductions[this.level];
	}
	
	prepare() {
		this.hp = this.maxHP;
		this.shownHP = 1;
	}
	
	constructor(hullStrengths, damageReductions, prices) {
		this.hullStrengths = hullStrengths;
		this.damageReductions = damageReductions;
		this.prices = prices;
		this.level = 0;
		this.levelChanged();
	}
}

classesList["HullUpgrade"] = HullUpgrade;
names["HullUpgrade"] = 'Hull strength';
