class EnemyBullet1 {
	prepare_vertex(angle) {
		this.v = [];
		this.v[0] = this.size*(Math.cos(angle)-Math.sin(angle));
		this.v[1] = this.size*(Math.sin(angle)+Math.cos(angle));
		this.v[2] = this.size*(-Math.cos(angle)-Math.sin(angle));
		this.v[3] = this.size*(Math.cos(angle)-Math.sin(angle));
		this.v[4] = this.size*(Math.sin(angle)+Math.cos(angle));
		this.v[5] = this.size*(Math.sin(angle)-Math.cos(angle));
		this.v[6] = this.size*(Math.sin(angle)-Math.cos(angle));
		this.v[7] = this.size*(-Math.cos(angle)-Math.sin(angle));
	}
	
	inCollisionRange() {
		var x = this.x - p.x;
		var y = this.y - p.y;
		var maxDistance = this.size+p.size;
		return (x*x+y*y<maxDistance*maxDistance/4);
	}
	
	collide() {
		return inCollisionRange();
	}
	
	update() {
		this.x += this.vx;
		this.y += this.vy;
		if (this.collide()) {
			p.hp -= this.damage;
			delete enemyMissiles[this.num];
		}
	}
	
	draw() {
		var j;
		for (j=0;j<3;j++) {
			g.add_v(0,[this.x+this.v[2*j],this.y+this.v[2*j+1],0.001],this.tex[j]);
		}
		for (j=0;j<3;j++) {
			g.add_v(0,[this.x+this.v[2*j+2],this.y+this.v[2*j+3],0.001],this.tex[j+1]);
		}
	}
	
	constructor(x,y,angle,num) {
		this.x = x;
		this.y = y;
		this.speed = 0.02;
		this.angle = angle;
		this.vx = 0.02*Math.sin(angle);
		this.vy = 0.02*Math.cos(angle);
		this.prepare_vertex(angle);
		this.size = 0.02;
		this.hitbox = 0;//makeCoords
		this.damage = 1;
		this.tex = 0;//makeCoords
		this.num = num;
		
	}
}
