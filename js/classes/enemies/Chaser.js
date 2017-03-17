class Chaser {
	prepareHitbox() {
		this.defaultHitbox = [
		[[-0.025, 0.15], [-0.047, 0.15], [-0.098, 0.06], [-0.098, -0.06], [-0.047, -0.15], [-0.025, -0.15]],
		[[-0.021, 0.055], [-0.021, -0.055], [0.004, -0.055], [0.15, -0.014], [0.15, 0.01], [0.004, 0.055]]];
		this.rotatedHitbox = [];
		for (var i in this.defaultHitbox) this.rotatedHitbox[i] = rotateModel(this.defaultHitbox[i], this.angle);
		this.hitbox = [];
	}
	
	calculateActualHitbox() {
		this.rotatedHitbox = [];
		for (var i in this.defaultHitbox) this.rotatedHitbox[i] = rotateModel(this.defaultHitbox[i], this.angle);
	}
	
	update() {
		if (p.x>0.6 && this.offx>0) this.offx = -this.offx;
		if (p.x<-0.6 && this.offx<0) this.offx = -this.offx;
		
		this.vx = speedToDestination(this.x, p.x+this.offx, this.vx, 0.0003);
		this.x += this.vx;
		this.vy = speedToDestination(this.y, p.y+this.offy, this.vy, 0.0003);
		this.y += this.vy;
		if (this.vx>this.maxXSpeed) this.vx = this.maxXSpeed;
		else if (this.vx<-this.maxXSpeed) this.vx = -this.maxXSpeed;
		if (this.vy>this.maxYSpeed) this.vy = this.maxYSpeed;
		else if (this.vy<-this.maxYSpeed) this.vy = -this.maxYSpeed;
		
		this.angle = angle(this.vx, ui.menu.level.levelSpeed+this.vy);
		
		for (var i in this.jetEngines) this.jetEngines[i].changeAngle(this.angle);
		
		if (this.x>4 || this.x<-4 || this.y>4 || this.y<-4) delete enemies[this.num];
		standardEnemyUpdate(this);
		if (collideEnemyWithPlayer(this)) {
			this.hp -= p.ship.collissionDamage;
			p.ship.dealDamage(this.collissionDamage);
		}
		for (var i in this.jetEngines) this.jetEngines[i].update();
	}
	
	dealDamage(damage) {
		if (standardDealDamage(this, damage)) {
			standardEnemyDestroy(this);
			effects.push(new Explosion(this.x, this.y, this.size*0.5, effects.length));
		}
	}
	
	draw() {
		g.addEnemyTexture('EnemyShip0', moveModel(rotateModel(this.v, this.angle), this.x, this.y));
		for (var i in this.jetEngines) this.jetEngines[i].draw();
		if (conf.debug) drawHitbox(this);
	}
	
	constructor(xy, movement, num, data) {
		this.hp = 20;
		this.points = 100;
		this.money = 10;
		this.size = 0.15;
		this.maxXSpeed = 0.02;
		this.maxYSpeed = 0.025;
		this.weapons = [new EnemyWTrackingMachinegun(0.15, 0, this)];
		this.x = xy[0];
		this.y = xy[1];
		this.collissionDamage = 0.3;
		this.angle = movement[1];
		this.offx = data[0];
		this.offy = data[1];
		this.vx = Math.cos(this.angle)*this.speed;
		this.vy = Math.sin(this.angle)*this.speed;
		this.v = makeCoords2(0.15, 0.15);
		this.num = num;
		this.prepareHitbox();
		this.jetEngines = [new JetEngine(this, [-0.09, 0], this.angle, 0.02, 0.8, 1, [2, -0.1, -0.1])];
	}
}
