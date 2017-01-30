class DummyEnemy {
	prepareHitbox() {
		this.defaultHitbox = [
		[[-0.025, 0.15], [-0.047, 0.15], [-0.098, 0.06], [-0.098, -0.06], [-0.047, -0.15], [-0.025, -0.15]],
		[[-0.021, 0.055], [-0.021, -0.055], [0.004, -0.055], [0.15, -0.014], [0.15, 0.01], [0.004, 0.055]]];
		this.rotatedHitbox = [];
		for (var i in this.defaultHitbox) this.rotatedHitbox[i] = rotateModel(scaleModel(this.defaultHitbox[i], this.scale), this.angle);
		this.hitbox = [];
	}
	
	inCollisionRange() {
		var x = this.x - p.x;
		var y = this.y - p.y;
		var maxDistance = this.size+p.ship.size;
		return (x*x+y*y<maxDistance*maxDistance);
	}
	
	collide() {
		if (!p.dead && this.inCollisionRange()) {
			var i;
			for (i in p.ship.hitbox) {
				for (j in this.hitbox) {
					if (collide(this.hitbox[j], p.ship.hitbox[i])) {
						return true;
					}
				}
			}
		}
		return false;
	}
	
	update() {
		this.x += this.vx;
		this.y += this.vy;
		if (this.x>4 || this.x<-4 || this.y>4 || this.y<-4) delete enemies[this.num];
		for (var i in this.rotatedHitbox) this.hitbox[i] = moveModel(this.rotatedHitbox[i], this.x, this.y);
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
		g.addEnemyTexture('EnemyShip0', moveModel(this.v, this.x, this.y));
		for (var i in this.jetEngines) this.jetEngines[i].draw();
		if (conf.debug) drawHitbox(this);
	}
	
	constructor(xy, movement, num, data) {
		this.hp = data[0];
		this.scale = data[1];
		this.points = 0;
		this.money = 0;
		this.size = 0.18*this.scale;
		this.weapons = [];
		this.x = xy[0];
		this.y = xy[1];
		this.collissionDamage = 0.0;
		this.speed = movement[0];
		this.angle = movement[1];
		this.vx = Math.cos(this.angle)*this.speed;
		this.vy = Math.sin(this.angle)*this.speed;
		this.v = rotateModel(makeCoords2(0.15*this.scale, 0.15*this.scale), this.angle);
		this.num = num;
		this.prepareHitbox();
		var c = Math.cos(angle);
		var s = Math.sin(angle);
		this.jetEngines = [new JetEngine(this, [-0.09*this.scale, 0], this.angle, 0.02*this.scale, 0.8*this.scale, 1, [2, -0.1, -0.1])];
	}
}
