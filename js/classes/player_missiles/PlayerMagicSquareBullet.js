class PlayerMagicSquareBullet {
	
	prepareHitbox() {
		this.defaultHitbox = makeCoords2(this.size, this.size);
		this.rotatedHitbox = rotateModel(this.defaultHitbox, this.angle);
		this.hitbox = [];
	}
	
	inCollisionRange(enemy) {
		var x = this.x - enemy.x;
		var y = this.y - enemy.y;
		var maxDistance = this.size*1.42+enemy.size;
		return (x*x+y*y<maxDistance*maxDistance);
	}
	
	collide(enemy) {
		if (this.inCollisionRange(enemy)) {
			for (var i in enemy.hitbox) if (collide(this.hitbox, enemy.hitbox[i])) {
				return true;
			}
		}
		return false;
	}
	
	move() {
		this.straightX += this.vx;
		this.straightY += this.vy;
		var s = Math.sin(this.time/FPS*Math.PI);
		this.x = this.straightX+this.perp[0]*s*this.amplitude;
		this.y = this.straightY+this.perp[1]*s*this.amplitude;
	}
	
	update() {
		this.move();
		this.hitbox = moveModel(this.rotatedHitbox, this.x, this.y);
		
		if (this.x>2 || this.x<-2 || this.y>2 || this.y<-2) {
			delete playerMissiles[this.num];
			return;
		}
		for (var i in enemies) {
			if (this.collide(enemies[i])) {
				enemies[i].dealDamage(this.damage);
				if (conf.particles) {
					var particlesNumber = Math.random()*1-0.5;
					for (var i=0;i<particlesNumber;i++) {
						effects.push(new Particle([this.x, this.y], this.angle+(Math.random()-0.5)*0.2, this.speed*(0.1+Math.random()*0.9),
							FPS*Math.random()*0.4, [Math.random()*0.4+0.6, Math.random()*0.7+0.3, 0.1, 0.5+Math.random()*0.5], 2, effects.length));
					}
					var particlesNumber = Math.random()*5;
					for (var i=0;i<particlesNumber;i++) {
						effects.push(new Particle([this.x, this.y], this.angle+(Math.random()-0.5)*0.2, this.speed*(0.1+Math.random()*0.9),
							FPS*Math.random()*0.4, [Math.random()*0.2+0.8, Math.random()*0.2+0.5, 0.1, 0.5+Math.random()*0.5], 1, effects.length));
					}
				}
				if (--this.hits <= 0) {
					delete playerMissiles[this.num];
					return;
				}
			}
		}
		this.time++;
	}
	
	draw() {
		g.addEffect0([this.x, this.y], this.size, this.angle, [1, 0.7, 0], Math.sin(this.time/FPS)+1);
	}
	
	constructor(x, y, angle, amplitude, num) {
		this.size = 0.1;
		this.speed = 0.04;
		this.damage = 0.4;
		this.amplitude = amplitude;
		this.hits = 20;
		this.x = x;
		this.y = y;
		this.straightX = x;
		this.straightY = y;
		this.time = 0;
		this.angle = angle;
		this.vx = this.speed*Math.cos(angle);
		this.vy = this.speed*Math.sin(angle);
		this.perp = normalize([-this.vy, this.vx]);
		this.prepareHitbox();
		this.num = num;
	}
}
