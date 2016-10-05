class EnemyBullet1 {
	prepareVertex(angle) {
		this.v = [];
		this.v[0] = [this.size*(Math.cos(angle)-Math.sin(angle)),this.size*(Math.sin(angle)+Math.cos(angle))];
		this.v[1] = [this.size*(-Math.cos(angle)-Math.sin(angle)),this.size*(Math.cos(angle)-Math.sin(angle))];
		this.v[2] = [this.size*(Math.sin(angle)+Math.cos(angle)),this.size*(Math.sin(angle)-Math.cos(angle))];
		this.v[3] = [this.size*(Math.sin(angle)-Math.cos(angle)),this.size*(-Math.cos(angle)-Math.sin(angle))];
	}
	
	inCollisionRange() {
		var x = this.x - p.x;
		var y = this.y - p.y;
		var maxDistance = this.size+p.ship.size;
		this.testX = x;
		this.testY=y;
		this.testdist=maxDistance;
		return (x*x+y*y<maxDistance*maxDistance);
	}
	
	collide() {
		if (!p.dead && this.inCollisionRange()) {
			var i;
			for (i in p.ship.hitbox) {
				if (collide(this.hitbox,p.ship.hitbox[i])) {
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
			delete enemyMissiles[this.num];
			return;
		}
	}
	
	draw() {
		for (var j=0;j<3;j++) g.addTextureVertex(this.texNo, [this.x+this.v[j][0],this.y+this.v[j][1]], this.tex[j]);
		for (var j=1;j<4;j++) g.addTextureVertex(this.texNo, [this.x+this.v[j][0],this.y+this.v[j][1]], this.tex[j]);
	}
	
	constructor(x,y,angle,num) {
		this.speed = 0.05;
		this.size = 0.01;
		this.damage = 1;
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.vx = this.speed*Math.cos(angle);
		this.vy = this.speed*Math.sin(angle);
		this.prepareVertex(angle);
		this.rotatedHitbox = rotateModel(makeCoords2(0.02,0.01),angle);
		this.hitbox = moveModel(this.rotatedHitbox,x,y);
		this.texNo = textureC['Bullet1'][0];
		this.tex = textureC['Bullet1'][1];
		this.num = num;
		
	}
}
