class PlayerOrbs2 {
	prepareVertex() {
		this.v = [[-this.size,-this.size],[-this.size,this.size],[this.size,-this.size],[this.size,this.size]];
	}
	
	prepareHitbox() {
		this.defaultHitbox = [];
		this.defaultHitbox[0] = [-this.size,0];
		this.defaultHitbox[1] = [-this.size*0.7,-this.size*0.7];
		this.defaultHitbox[2] = [0,-this.size];
		this.defaultHitbox[3] = [this.size*0.7,-this.size*0.7];
		this.defaultHitbox[4] = [this.size,0];
		this.defaultHitbox[5] = [this.size*0.7,this.size*0.7];
		this.defaultHitbox[6] = [0,this.size];
		this.defaultHitbox[7] = [-this.size*0.7,this.size*0.7];
		this.rotatedHitbox = this.defaultHitbox;
		this.hitbox = [];
	}
	
	inCollisionRange(enemy) {
		var dx = this.x - enemy.x;
		var dy = this.y - enemy.y;
		var maxDistance = this.size+enemy.size;
		return (dx*dx+dy*dy<maxDistance*maxDistance);
	}
	
	collide(enemy) {
		var i;
		for (i=0;i<2;i++) {
			if (this.inCollisionRange(enemy)) {
				for (var j in enemy.hitbox) if (collide(this.hitbox,enemy.hitbox[j])) return true;
			}
			return false;
		}
	}
	
	update() {
		if (this.time>100) delete playerMissiles[this.num];
		var sin = Math.sin(Math.PI*this.time/100);
		var r = this.r1+this.r2*sin*sin;
		var cos = Math.cos(Math.PI*this.time/100);
		this.angle += (cos*cos-0.5)*Math.PI/10*this.angleSpeed;
		this.x = this.center[0]+Math.cos(this.angle)*r;
		this.y = this.center[1]+Math.sin(this.angle)*r;
		this.hitbox = moveModel(this.rotatedHitbox,this.x,this.y);
		for (var i in enemies) {
			if (this.collide(enemies[i])) {
				enemies[i].dealDamage(this.damage);
			}
		}
		this.time++;
	}
	
	draw() {
		var j;
		for (j=0;j<3;j++) {
			g.add_v(0,[this.x+this.v[j][0],this.y+this.v[j][1],0.001],this.tex[j]);
		}
		for (j=1;j<4;j++) {
			g.add_v(0,[this.x+this.v[j][0],this.y+this.v[j][1],0.001],this.tex[j]);
		}
		g.add_light([10,10,1],[this.x,this.y,0],1,[0,Math.PI]);
	}
	
	constructor(x,y,r1,r2,angleSpeed,num) {
		this.time = 0;
		this.size = 0.03;
		this.angle = 0;
		this.angleSpeed = angleSpeed;
		this.damage = 0.5;
		this.center = [x,y];
		this.r1 = r1;
		this.r2 = r2;
		this.x = r1;
		this.y = y;
		this.num = num;
		
		this.prepareVertex();
		this.prepareHitbox();
		this.tex = makeCoords4(63/tex_s,33/tex_s,257/tex_s,287/tex_s);
	}
}