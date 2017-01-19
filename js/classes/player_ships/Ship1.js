class Ship1 {
	update() {
		this.x = p.x;
		this.y = p.y;
		
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
		this.hp -= damage;
	}
	
	prepareHitbox() {
		this.defaultHitbox = [[[0.14648,0.04453],[-0.01992,0.06210],[-0.01992,-0.06210],[0.14648,-0.04453]],
		[[-0.01992,0.06210],[-0.03046,0.15000],[-0.05507,0.15000],[-0.09609,0.07382],[-0.09609,-0.07382],[-0.05507,-0.15000],[-0.03046,-0.15000],[-0.01992,-0.06210]]];
		this.rotatedHitbox = [];
		for (var i in this.defaultHitbox) this.rotatedHitbox[i] = rotateModel(this.defaultHitbox[i], p.angle);
		this.hitbox = [];
	}
	
	addWeapon(weapon, weaponNo) {
		if (weaponNo>=0 && weaponNo<this.weaponsNo) this.weapons[weaponNo] = new weapon(this.weaponOffsets[weaponNo][0], this.weaponOffsets[weaponNo][1], this.weaponAngles[weaponNo]);
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
	
	upgradeCooling() {
		if (this.coolingLevel<this.cooling.length-1) this.coolingLevel++;
	}
	
	downgradeCooling() {
		if (this.coolingLevel>0) this.coolingLevel--;
	}
	
	setData(data) {
		for (var i in data.weapons) {
			this.weapons[i] = deserialize(data.weapons[i]);
		}
		this.coolingLevel = data.coolingLevel;
	}
	
	getData() {
		var data = {
			coolingLevel : this.coolingLevel
		};
		var weapons = [];
		for (var i in this.weapons) {
			weapons[i] = serialize(this.weapons[i]);
		}
		data.weapons = weapons;
		return data;
	}
	
	draw() {
		g.addPlayerShipTexture('Ship1', moveModel(this.v, this.x, this.y));
		for (var i in this.weapons) this.weapons[i].draw();
		for (var i in this.jetEngines) this.jetEngines[i].draw();
	}
	
	drawIndicators() {
		var indAngleMax = Math.PI*1.2;
		var indAngleMin = Math.PI*-0.2;

		var hpAngle = this.hp/this.maxHP*indAngleMax + (1-this.hp/this.maxHP)*indAngleMin;
		g.addGUITexture('HealthBg', moveModel(makeCoords1(0.08), 0.9, -0.9))
		g.addEffect1([0.9, -0.9], 0.06, hpAngle, [16, 0, 0]);
		
		var heatAngle = this.heat/this.maxHeat*indAngleMax + (1-this.heat/this.maxHeat)*indAngleMin;
		g.addGUITexture('HeatBg', moveModel(makeCoords1(0.08), 0.75, -0.9))
		g.addEffect1([0.75, -0.9], 0.06, heatAngle, [0, 0, 16]);
	}
	
	prepare() {
		this.heat = 0;
		this.hp = 100;
		this.overheat = false;
	}
	
	constructor() {
		this.cooling = [1, 1.5, 2, 3, 4, 5, 6];
		this.size = 0.18;
		this.x = p.x;
		this.y = p.y;
		this.v = rotateModel(makeCoords2(0.15, 0.15), p.angle);
		this.maxHeat = 100;
		this.coolingLevel = 0;
		this.maxHP = 100;
		this.weapons = [];
		this.weaponsNo = 4;
		this.weaponOffsets = [[-0.03, -0.15], [-0.03, 0.15], [0.15, -0.01], [0.15, 0.01]];
		this.weaponAngles = [Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2];
		this.jetEngines = [new JetEngine(this, [-0.1, -0], p.angle, 0.03, 0.6, 0.5, [0.1, 0.7, 2.5])];
		this.prepareHitbox();
		this.resetWeapons();
		this.prepare();
	}
}

classesList["Ship1"] = Ship1;
