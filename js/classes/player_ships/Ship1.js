class Ship1 {
	update() {
		this.x = this.player.x;
		this.y = this.player.y;
		
		var canShoot = c.isPressed("space") && !this.overheat;
		for (var i in this.weapons) {
			this.heat += this.weapons[i].update(canShoot);
		}
		this.heat -= this.cooling[this.coolingLevel];
		if (this.heat>=100) this.heat = 100, this.overheat = true;
		if (this.overheat && this.heat<=0) this.overheat = false;
		if (this.heat<0) this.heat = 0;
		for (var i in this.rotatedHitbox) this.hitbox[i] = moveModel(this.rotatedHitbox[i], p.x, p.y);
		for (var i in this.jetEngines) this.jetEngines[i].update();
	}
	
	dealDamage(damage) {
		p.hp -= damage;
	}
	
	prepareHitbox() {
		this.defaultHitbox = [[[0.14648,0.04453],[-0.01992,0.06210],[-0.01992,-0.06210],[0.14648,-0.04453]],
		[[-0.01992,0.06210],[-0.03046,0.15000],[-0.05507,0.15000],[-0.09609,0.07382],[-0.09609,-0.07382],[-0.05507,-0.15000],[-0.03046,-0.15000],[-0.01992,-0.06210]]];
		this.rotatedHitbox = [];
		for (var i in this.defaultHitbox) this.rotatedHitbox[i] = rotateModel(this.defaultHitbox[i],this.angle);
		this.hitbox = [];
	}
	
	addWeapon(weapon, weaponNo) {
		if (weaponNo>=0 && weaponNo<this.weaponsNo) this.weapons[weaponNo] = weapon;
		this.weapons[weaponNo].x = this.weaponOffsets[weaponNo][0];
		this.weapons[weaponNo].y = this.weaponOffsets[weaponNo][1];
	}
	
	upgradeWeapon(wNo) {
		if (wNo>=0 && wNo<this.weaponsNo && this.weapons[wNo]) this.weapons[wNo].upgrade();
	}
	
	downgradeWeapon(wNo) {
		if (wNo>=0 && wNo<this.weaponsNo && this.weapons[wNo]) this.weapons[wNo].downgrade();
	}
	
	resetWeapons() {
		for (var i=0;i<this.weaponsNo;i++) {
			delete this.weapons[i];
			this.weapons[i] = new PlayerWEmpty();
		}
	}
	
	prepareCooling() {
		this.cooling = [1, 1.5, 2, 3, 4, 5, 6];
	}
	
	upgradeCooling() {
		if (this.coolingLevel<this.cooling.length-1) this.coolingLevel++;
	}
	
	downgradeCooling() {
		if (this.coolingLevel>0) this.coolingLevel--;
	}
	
	draw() {
		this.x = this.player.x;
		this.y = this.player.y;
		g.addPlayerShipTexture('Ship1',moveModel(this.v, p.x, p.y));
		for (var j in this.weapons) this.weapons[j].draw();
		for (var i in this.jetEngines) this.jetEngines[i].draw();
	}
	
	constructor(player, angle) {
		this.prepareCooling();
		this.player = player;
		this.size = 0.15;
		this.x = player.x;
		this.y = player.y;
		this.v = rotateModel(makeCoords2(0.15,0.15), angle);
		this.angle = angle;
		this.heat = 0;
		this.overheat = false;
		this.weapons = [];
		this.weaponsNo = 4;
		this.weaponOffsets = [[-0.03,-0.15],[-0.03,0.15],[0.15,-0.01],[0.15,0.01]];
		this.jetEngines = [new JetEngine(this, [-0.1, -0], angle, 0.03, 0.6, 0.5, [0.1, 0.7, 2.5])];
		this.coolingLevel = 0;
		this.prepareHitbox();
	}
}