class Ship1 {
	update() {
		standardPlayerShipUpdate(this);
	}
	
	dealDamage(damage) {
		this.upgrades.hull.damage(damage);
	}
	
	prepareHitbox() {
		this.defaultHitbox = [[[0.14648,0.04453],[-0.01992,0.06210],[-0.01992,-0.06210],[0.14648,-0.04453]],
		[[-0.01992,0.06210],[-0.03046,0.15000],[-0.05507,0.15000],[-0.09609,0.07382],[-0.09609,-0.07382],[-0.05507,-0.15000],[-0.03046,-0.15000],[-0.01992,-0.06210]]];
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
		this.price = 1200;
		this.texture = 'Ship1';
		this.upgrades = {
			'cooling': new CoolingUpgrade([1, 1.5, 2, 3, 4, 5, 6], [100, 100, 110, 120, 130, 140, 150], [0, 0, 10, 20, 30, 40, 50], [120, 180, 210, 220, 240, 270]),
			'engine': new EngineUpgrade([0.002, 0.003, 0.004], [0.02, 0.025, 0.03], [150, 200]),
			'wings': new WingsUpgrade([0.002, 0.004, 0.005], [0.02, 0.03, 0.035], [120, 190]),
			'hull': new HullUpgrade([100, 125, 175], [1, 0.95, 0.85], [230, 400])};
		this.size = 0.18;
		this.width = 0.15;
		this.height = 0.15;
		this.collissionDamage = 0.3;
		this.v = rotateModel(makeCoords2(0.15, 0.15), p.angle);
		this.maxHeat = 100;
		this.weapons = [];
		this.weaponsNo = 4;
		this.weaponOffsets = [[-0.03, 0.15], [0.15, 0.01], [0.15, -0.01], [-0.03, -0.15]];
		this.weaponAngles = [Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2];
		this.jetEngines = [new JetEngine(this, [-0.1, -0], p.angle, 0.03, 0.6, 0.5, [0.1, 0.7, 2.5])];
		this.prepareHitbox();
		this.resetWeapons();
		this.prepare();
	}
}

classesList["Ship1"] = Ship1;
names["Ship1"] = "Basic medium Ship";
