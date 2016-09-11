class PlayerBullet1 {
	prepareVertex(angle) {
		this.v = [];
		this.v[0] = [this.size*(Math.cos(angle)-Math.sin(angle)),this.size*(Math.sin(angle)+Math.cos(angle))];
		this.v[1] = [this.size*(-Math.cos(angle)-Math.sin(angle)),this.size*(Math.cos(angle)-Math.sin(angle))];
		this.v[2] = [this.size*(Math.sin(angle)+Math.cos(angle)),this.size*(Math.sin(angle)-Math.cos(angle))];
		this.v[3] = [this.size*(Math.sin(angle)-Math.cos(angle)),this.size*(-Math.cos(angle)-Math.sin(angle))];
	}
	
	prepareHitbox() {
		this.defaultHitbox = makeCoords2(0.02,0.01);
		this.rotatedHitbox = rotateModel(this.defaultHitbox,this.angle);
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
			for (i in enemy.hitbox) if (collide(this.hitbox,enemy.hitbox[i])) return true;
		}
		return false;
	}
	
	update() {
		this.x += this.vx;
		this.y += this.vy;
		this.hitbox = moveModel(this.rotatedHitbox,this.x,this.y);
		
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
		var j;
		for (j=0;j<3;j++) {
			g.add_v(0,[this.x+this.v[j][0],this.y+this.v[j][1],0.001],this.tex[j]);
		}
		for (j=1;j<4;j++) {
			g.add_v(0,[this.x+this.v[j][0],this.y+this.v[j][1],0.001],this.tex[j]);
		}
	}
	
	constructor(x,y,angle,num) {
		this.size = 0.02;
		this.speed = 0.02;
		this.damage = 1;
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.vx = this.speed*Math.cos(angle);
		this.vy = this.speed*Math.sin(angle);
		this.prepareVertex(this.angle);
		this.prepareHitbox();
		this.tex = makeCoords4(255/tex_s,0,256/tex_s,511/tex_s);
		this.num = num;
	}
}
