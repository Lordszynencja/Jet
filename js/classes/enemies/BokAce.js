class BokAce {
	prepareHitbox() {
		this.defaultHitbox = [
		[[-0.025, 0.15], [-0.047, 0.15], [-0.098, 0.06], [-0.098, -0.06], [-0.047, -0.15], [-0.025, -0.15]],
		[[-0.021, 0.055], [-0.021, -0.055], [0.004, -0.055], [0.15, -0.014], [0.15, 0.01], [0.004, 0.055]]];
		this.rotatedHitbox = [];
		for (var i in this.defaultHitbox) this.rotatedHitbox[i] = rotateModel(this.defaultHitbox[i], this.angle);
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
		if (this.y<-2) this.y = 2;
		standardEnemyUpdate(this);
		if (collideEnemyWithPlayer(this)) {
			this.hp -= p.ship.collissionDamage;
			p.ship.dealDamage(this.collissionDamage);
		}
		for (var i in this.jetEngines) this.jetEngines[i].update();
	}
	
	dealDamage(damage) {
		if (standardDealDamage(this, damage)) {
			delete enemies[enemy.num];
			stats.money += enemy.money;
			stats.score += enemy.points;
			stats.bossesDefeated++;
			effects.push(new Explosion(this.x, this.y, this.size*0.75, effects.length));
			p.finished = true;
			p.finish_timer = time;
			g.setInvertion([0, 0], 0);
		}
	}
	
	draw() {
		g.addEnemyTexture('EnemyShip0', moveModel(this.v, this.x, this.y));
		for (var i in this.jetEngines) this.jetEngines[i].draw();
		if (conf.debug) drawHitbox(this);
	}
	
	constructor(num) {
		this.hp = 100;
		this.points = 100;
		this.money = 100;
		this.size = 0.15;
		this.weapons = [new EnemyWMachinegun1(0.15, 0, this)];
		this.x = 0;
		this.y = 1.2;
		this.collissionDamage = 0.5;
		this.speed = 0;
		this.angle = Math.PI*1.5;
		this.vx = 0;
		this.vy = -0.03;
		this.v = rotateModel(makeCoords2(0.15, 0.15), this.angle);
		this.num = num;
		this.prepareHitbox();
		this.jetEngines = [new JetEngine(this, [-0.09, 0], this.angle, 0.02, 0.8, 1, [2, -0.1, -0.1])];
	}
}
