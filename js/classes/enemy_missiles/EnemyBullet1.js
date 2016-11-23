class EnemyBullet1 {
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
				if (collide(this.hitbox, p.ship.hitbox[i])) {
					return true;
				}
			}
		}
		return false;
	}
	
	update() {
		this.x += this.vx;
		this.y += this.vy;
		this.hitbox = moveModel(this.rotatedHitbox,this.x,this.y);
		if (this.x>2 || this.x<-2 || this.y>2 || this.y<-2) {
			delete enemyMissiles[this.num];
			return;
		}
		if (this.collide()) {
			p.ship.dealDamage(this.damage);
			if (conf.particles) {
				var particlesNumber = 2 + Math.random()*4;
				for (var i=0;i<particlesNumber;i++) {
					effects.push(new Particle([this.x, this.y], this.angle+(Math.random()-0.5)*0.2, this.speed*(0.3+Math.random()*0.7),
						FPS*Math.random()*0.3, [Math.random()*0.2+0.8, Math.random()*0.2+0.5, 0.1, 0.5+Math.random()*0.5], 2, effects.length));
				}
				particlesNumber = 4 + Math.random()*7;
				for (var i=0;i<particlesNumber;i++) {
					effects.push(new Particle([this.x, this.y], this.angle+(Math.random()-0.5)*0.2, this.speed*(0.3+Math.random()*0.7),
						FPS*Math.random()*0.3, [Math.random()*0.2+0.8, Math.random()*0.2+0.5, 0.1, 0.5+Math.random()*0.5], 1, effects.length));
				}
			}
			delete enemyMissiles[this.num];
			return;
		}
	}
	
	draw() {
		g.addBulletTexture('Bullet0', moveModel(this.v, this.x, this.y));
	}
	
	constructor(x, y, angle, num) {
		this.speed = 0.05;
		this.size = 0.01;
		this.damage = 1;
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.vx = this.speed*Math.cos(angle);
		this.vy = this.speed*Math.sin(angle);
		this.v = rotateModel(makeCoords2(0.01, 0.01), angle);
		this.rotatedHitbox = rotateModel(makeCoords2(0.02,0.01), angle);
		this.hitbox = moveModel(this.rotatedHitbox,x,y);
		this.num = num;
		
	}
}
