class EscapingEnemy {
	prepareHitbox() {
		this.defaultHitbox = [
		[[-0.025, 0.15], [-0.047, 0.15], [-0.098, 0.06], [-0.098, -0.06], [-0.047, -0.15], [-0.025, -0.15]],
		[[-0.021, 0.055], [-0.021, -0.055], [0.004, -0.055], [0.15, -0.014], [0.15, 0.01], [0.004, 0.055]]];
		this.rotatedHitbox = [];
		for (var i in this.defaultHitbox) this.rotatedHitbox[i] = rotateModel(this.defaultHitbox[i], this.angle);
		this.hitbox = [];
	}
	
	update() {
		this.x += this.vx*(0.8+Math.random()*0.4);
		this.y += this.vy*(0.8+Math.random()*0.4);
		if (this.x>4 || this.x<-4 || this.y>4 || this.y<-4) delete enemies[this.num];
		standardEnemyUpdate(this);
		if (collideEnemyWithPlayer(this)) {
			delete enemies[this.num];
			effects.push(new Explosion(this.x, this.y, this.size, effects.length));
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
		g.addEnemyTexture('EnemyShip0', moveModel(this.v, this.x, this.y));
		for (var i in this.jetEngines) this.jetEngines[i].draw();
		if (conf.debug) drawHitbox(this);
	}
	
	constructor(xy, movement, num, data) {
		this.hp = 10;
		this.points = 200;
		this.money = 20;
		this.size = 0.15;
		this.weapons = [];
		this.x = xy[0];
		this.y = xy[1];
		this.collissionDamage = 20;
		this.vx = Math.cos(movement[1])*movement[0];
		this.vy = Math.sin(movement[1])*movement[0];
		this.angle = angle(this.vx, this.vy+ui.menu.level.levelSpeed);
		this.v = rotateModel(makeCoords2(0.15,0.15), this.angle);
		this.num = num;
		this.prepareHitbox();
		this.jetEngines = [new JetEngine(this, [-0.09, 0], this.angle, 0.02, 1.8, 1, [2, -0.1, -0.1])];
	}
}
