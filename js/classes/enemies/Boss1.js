class Boss1 {
	prepareHitbox() {
		this.defaultHitbox = [
		[[-0.025, 0.15], [-0.047, 0.15], [-0.098, 0.06], [-0.098, -0.06], [-0.047, -0.15], [-0.025, -0.15]],
		[[-0.021, 0.055], [-0.021, -0.055], [0.004, -0.055], [0.15, -0.014], [0.15, 0.01], [0.004, 0.055]]];
		for (var i in this.defaultHitbox) {
			for (var j in this.defaultHitbox[i]) this.defaultHitbox[i][j][0] *= 3, this.defaultHitbox[i][j][1] *= 3;
		}
		this.rotatedHitbox = [];
		for (var i in this.defaultHitbox) this.rotatedHitbox[i] = rotateModel(this.defaultHitbox[i], this.angle);
		this.hitbox = [];
	}
	
	move() {
		if (this.time<FPS/2) this.vy -= 0.0007;
		else if (this.time>FPS && this.time<1.5*FPS) this.vy += 0.0007;
		else if (this.time == 1.5*FPS) this.vy = 0;
		if (this.time/FPS<1) this.vx -= 0.0003;
		if (this.x>0.7) this.vx -= 0.0003;
		else if (this.x<-0.7) this.vx += 0.0003;
		this.x += this.vx;
		this.y += this.vy;
	}
	
	distance(v, a) {
		var t = v/a;
		return t*v-(t*t-t)*a/2;
	}
	
	escapeMove() {
		if (this.x>0) {
			if (this.vx>0 || this.distance(this.vx, -0.0002)>-this.x) this.vx -= 0.0002;
			else this.vx += 0.0002;
		} else {
			if (this.vx<0 || this.distance(this.vx, 0.0002)<-this.x) this.vx += 0.0002;
			else this.vx -= 0.0002;
		}
		if (this.x>-0.0004 && this.x<0.0004) this.x = 0, this.vx = 0;
		this.x += this.vx;
	}
	
	update() {
		if (this.escaping) {
			this.escapeMove();
			for (var i in this.rotatedHitbox) this.hitbox[i] = moveModel(this.rotatedHitbox[i], this.x, this.y);
			if (this.x>-0.1 && this.x<0.1 && this.vx<0.001 && this.vx>-0.001) this.portal++;
			g.setInvertion([this.x, this.y], Math.sqrt(this.portal/FPS/16));
			if (Math.sqrt(this.portal/FPS/16)>0.5) {
				delete enemies[this.num];
				stats.money += this.money;
				stats.score += this.points;
				stats.bossesDefeated++;
				if (stats.level<2) stats.level = 2;
				p.finished = true;
				p.finish_timer = time;
				g.setInvertion([0, 0], 0);
			}
			for (var i in this.jetEngines) this.jetEngines[i].update();
		} else {
			this.move();
			for (var i in this.rotatedHitbox) this.hitbox[i] = moveModel(this.rotatedHitbox[i], this.x, this.y);
			if (this.time%(6*FPS)<3*FPS) {
				for (var i in this.weapons) this.weapons[i].update(true);
			}
			for (var i in this.jetEngines) this.jetEngines[i].update();
		}
		if (collideEnemyWithPlayer(this)) {
			this.hp -= p.ship.collissionDamage;
			p.ship.dealDamage(this.collissionDamage);
		}
		this.time++;
	}
	
	dealDamage(damage) {
		if (standardDealDamage(this, damage)) {
			this.escaping = true;
		}
	}
	
	draw() {
		g.addEnemyTexture('EnemyShip0', moveModel(this.v, this.x, this.y));
		for (var i in this.jetEngines) this.jetEngines[i].draw();
		if (conf.debug) drawHitbox(this);
		if (this.portal>0) g.drawText(-0.4, 0.7, "I will get you!", 0.06, [0, 0, 0, 1]);
	}
	
	constructor(num) {
		this.time = 0;
		this.hp = 500;
		this.points = 10000;
		this.money = 200;
		this.size = 0.45;
		this.x = 0;
		this.y = 1.5;
		this.collissionDamage = 0.5;
		this.vx = 0;
		this.vy = 0;
		this.angle = Math.PI*1.5;
		this.weapons = [new EnemyWMachinegun1(0.15, -0.05, this),
		new EnemyWMachinegun1(0.15, 0, this),
		new EnemyWMachinegun1(0.15, 0.05, this)];
		this.v = rotateModel(makeCoords2(0.45, 0.45), this.angle);
		this.num = num;
		this.prepareHitbox();
		this.jetEngines = [new JetEngine(this, [-0.27, 0], this.angle, 0.08, 0.5, 1, [2, -0.1, -0.1]),
		new JetEngine(this, [-0.27, 0.1], this.angle, 0.03, 0.5, 1, [2, -0.1, -0.1]),
		new JetEngine(this, [-0.27, -0.1], this.angle, 0.03, 0.5, 1, [2, -0.1, -0.1])];
		this.escaping = false;
		this.portal = 0;
	}
}
