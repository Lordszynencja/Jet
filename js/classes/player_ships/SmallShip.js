class SmallShip {
	update() {
		standardPlayerShipUpdate(this);
	}
	
	dealDamage(damage) {
		this.upgrades.hull.damage(damage);
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
	
	resetWeapons() {
		for (var i=0;i<this.weaponsNo;i++) {
			delete this.weapons[i];
			this.weapons[i] = new PlayerWEmpty();
		}
	}
	
	getData() {
		return standardsPlayerShipGetData(this);
	}
	
	setData(data) {
		standardsPlayerShipSetData(this, data);
	}
	
	draw() {
		standardPlayerShipDraw(this);
	}
	
	drawIndicators() {
		var indAngleMax = Math.PI*1.2;
		var indAngleMin = Math.PI*-0.2;
		var HP = this.upgrades.hull.shownHP;
		var heat = this.upgrades.cooling.shownHeat;
		
		var r = 0.1;
		var r1 = r*0.8;
		var y = -0.99+r;
		var x1 = 0.99-r;
		var x2 = 0.99-3*r;
		
		var hpAngle = HP*indAngleMax + (1-HP)*indAngleMin;
		g.addGUITexture('HealthBg', moveModel(makeCoords1(r), 0.99-r, y))
		g.addEffect1([x1, y], r1, hpAngle, [16, 0, 0]);
		
		var heatAngle = heat*indAngleMax + (1-heat)*indAngleMin;
		g.addGUITexture('HeatBg', moveModel(makeCoords1(r), 0.99-3*r, y))
		g.addEffect1([x2, y], r1, heatAngle, [0, 0, 16]);
	}
	
	prepare() {
		this.x = p.x;
		this.y = p.y;
		for (var i in this.upgrades) this.upgrades[i].prepare();
	}
	
	constructor() {
		this.price = 800;
		this.texture = 'Ship1';
		this.upgrades = {
			'cooling': new CoolingUpgrade([1, 1.5, 2, 3, 4], [100, 100, 110, 120, 130, 140, 150], [0, 0, 10, 20, 30, 40, 50], [90, 130, 180, 190]),
			'engine': new EngineUpgrade([0.005, 0.007, 0.009], [0.04, 0.05, 0.05], [100, 120]),
			'wings': new WingsUpgrade([0.003, 0.004, 0.005, 0.006], [0.03, 0.035, 0.04, 0.04], [80, 110, 150]),
			'hull': new HullUpgrade([50, 60, 75], [1, 0.95, 0.9], [100, 190])};
		this.size = 0.12;
		this.width = 0.1;
		this.height = 0.1;
		this.collissionDamage = 0.2;
		this.v = rotateModel(makeCoords2(0.1, 0.1), p.angle);
		this.maxHeat = 100;
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
