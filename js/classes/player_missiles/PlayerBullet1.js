class PlayerBullet1 {
	prepareVertex(angle) {
		this.v = rotateModel(makeCoords2(this.size, this.size), angle);
	}
	
	prepareHitbox() {
		this.defaultHitbox = makeCoords2(this.size, this.size);
		this.rotatedHitbox = rotateModel(this.defaultHitbox, this.angle);
		this.hitbox = [];
	}
	
	inCollisionRange(enemy) {
		var x = this.x - enemy.x;
		var y = this.y - enemy.y;
		var maxDistance = this.size+enemy.size;
		return (x*x+y*y<maxDistance*maxDistance);
	}
	
	collide(enemy) {
		if (this.inCollisionRange(enemy)) {
			var i;
			for (i in enemy.hitbox) if (collide(this.hitbox, enemy.hitbox[i])) {
				return true;
			}
		}
		return false;
	}
	
	update() {
		this.x += this.vx;
		this.y += this.vy;
		this.hitbox = moveModel(this.rotatedHitbox, this.x, this.y);
		
		if (this.x>2 || this.x<-2 || this.y>2 || this.y<-2) {
			delete playerMissiles[this.num];
			return;
		}
		for (var i in enemies) {
			if (this.collide(enemies[i])) {
				enemies[i].dealDamage(this.damage);
				delete playerMissiles[this.num];
				return;
			}
		}
	}
	
	draw() {
		g.addBulletTexture('Bullet0', moveModel(this.v, this.x, this.y));
	}
	
	constructor(x,y,angle,num) {
		this.size = 0.01;
		this.speed = 0.05;
		this.damage = 1;
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.vx = this.speed*Math.cos(angle);
		this.vy = this.speed*Math.sin(angle);
		this.prepareVertex(this.angle);
		this.prepareHitbox();
		this.num = num;
	}
}
