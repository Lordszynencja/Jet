class PlayerBullet1 {
	prepareVertex(angle) {
		this.v = [];
		this.v[0] = [this.size*(Math.cos(angle)-Math.sin(angle)),this.size*(Math.sin(angle)+Math.cos(angle))];
		this.v[1] = [this.size*(-Math.cos(angle)-Math.sin(angle)),this.size*(Math.cos(angle)-Math.sin(angle))];
		this.v[2] = [this.size*(Math.sin(angle)+Math.cos(angle)),this.size*(Math.sin(angle)-Math.cos(angle))];
		this.v[3] = [this.size*(Math.sin(angle)-Math.cos(angle)),this.size*(-Math.cos(angle)-Math.sin(angle))];
	}
	
	inCollisionRange(enemy) {
		var x = this.x - enemy.x;
		var y = this.y - enemy.y;
		var maxDistance = this.size+enemy.size;
		return (x*x+y*y<maxDistance*maxDistance/4);
	}
	
	collide(enemy) {
		if (inCollisionRange(enemy)) {
			var i;
			for (i in enemy.hitbox) if (collide(this.hitbox,enemy.hitbox[i])) return true;
		}
		return false;
	}
	
	update() {
		this.x += this.vx;
		this.y += this.vy;
		if (this.x>2 || this.x<-2 || this.y>2 || this.y<-2) {
			delete playerMissiles[this.num];
			return;
		}
		for (i in enemies) {
			if (this.collide(enemies[i])) {
				enemies[i].hp -= this.damage;
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
		this.hitbox = makeCoords2(0.2,0.1);
		for (var i=0;i<4;i++) this.hitbox[i] = [this.hitbox[i][0]*Math.cos(angle)-this.hitbox[i][1]*Math.sin(angle),this.hitbox[i][0]*Math.sin(angle)+this.hitbox[i][1]*Math.cos(angle)];
		this.tex = makeCoords4(255/tex_s,0,256/tex_s,511/tex_s);
		this.num = num;
	}
}
