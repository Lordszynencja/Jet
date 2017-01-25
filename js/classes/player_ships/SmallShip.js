class SmallShip {
	update() {
		this.x = p.x;
		this.y = p.y;
		
		var canShoot = c.isPressed("space") && !this.overheat;
		for (var i in this.weapons) {
			this.heat += this.weapons[i].update(canShoot);
		}
		for (var i in this.upgrades) this.upgrades[i].update();
		if (this.heat>=this.maxHeat) this.heat = this.maxHeat, this.overheat = true;
		if (this.overheat && this.heat<=0) this.overheat = false;
		if (this.heat<0) this.heat = 0;
		for (var i in this.rotatedHitbox) this.hitbox[i] = moveModel(this.rotatedHitbox[i], this.x, this.y);
		for (var i in this.jetEngines) this.jetEngines[i].update();
	}
	
	dealDamage(damage) {
		this.hp -= damage;
	}
	
	prepareHitbox() {
		this.defaultHitbox = [[[0.14648,0.04453],[-0.01992,0.06210],[-0.01992,-0.06210],[0.14648,-0.04453]],
		[[-0.01992,0.06210],[-0.03046,0.15000],[-0.05507,0.15000],[-0.09609,0.07382],[-0.09609,-0.07382],[-0.05507,-0.15000],[-0.03046,-0.15000],[-0.01992,-0.06210]]];
		this.defaultHitbox[0] = scaleModel(this.defaultHitbox[0], 0.666666666);
		this.defaultHitbox[1] = scaleModel(this.defaultHitbox[1], 0.666666666);
		this.rotatedHitbox = [];
		for (var i in this.defaultHitbox) this.rotatedHitbox[i] = rotateModel(this.defaultHitbox[i], p.angle);
		this.hitbox = [];
	}
	
	addWeapon(weapon, weaponNo) {
		if (weaponNo>=0 && weaponNo<this.weaponsNo) this.weapons[weaponNo] = new weapon(weaponNo);
	}
	
	resetWeapons() {
		for (var i=0;i<this.weaponsNo;i++) {
			delete this.weapons[i];
			this.weapons[i] = new PlayerWEmpty();
		}
	}
	
	setData(data) {
		for (var i in data.weapons) {
			this.weapons[i] = deserialize(data.weapons[i]);
		}
		for (var i in data.upgradesLevels) {
			this.upgrades[i].level = data.upgradesLevels[i];
		}
	}
	
	getData() {
		var data = {};
		var weapons = [];
		for (var i in this.weapons) {
			weapons[i] = serialize(this.weapons[i]);
		}
		data.weapons = weapons;
		var upgradesLevels = [];
		for (var i in this.upgrades) {
			upgradesLevels[i] = this.upgrades[i].level;
		}
		data.upgradesLevels = upgradesLevels;
		return data;
	}
	
	draw() {
		g.addPlayerShipTexture('Ship1', moveModel(this.v, this.x, this.y));
		for (var i in this.weapons) this.weapons[i].draw();
		for (var i in this.upgrades) this.upgrades[i].draw();
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
		this.hp = this.maxHP;
		this.overheat = false;
	}
	
	constructor() {
		this.price = 800;
		this.upgrades = [
			new CoolingUpgrade([1, 1.5, 2, 3, 4], [50, 70, 115, 85])];
		this.size = 0.12;
		this.enginePower = 0.005;
		this.engineSpeed = 0.03;
		this.agility = 0.005;
		this.sideSpeed = 0.02;
		this.x = p.x;
		this.y = p.y;
		this.v = rotateModel(makeCoords2(0.1, 0.1), p.angle);
		this.maxHeat = 100;
		this.maxHP = 50;
		this.weapons = [];
		this.weaponsNo = 2;
		this.weaponOffsets = [[-0.02, 0.1], [-0.02, -0.1]];
		this.weaponAngles = [Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2];
		this.jetEngines = [new JetEngine(this, [-0.0666, -0], p.angle, 0.02, 1.5, 0.7, [0.5, 1.7, 1.5])];
		this.prepareHitbox();
		this.resetWeapons();
		this.prepare();
	}
}

classesList["SmallShip"] = SmallShip;
levelUnlocks.ships[0].push(SmallShip);
names["SmallShip"] = "Small Ship";
