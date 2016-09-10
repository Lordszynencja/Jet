class PlayerOrbs1 {
	prepareVertex(angle) {
		this.v = [];
		this.v[0] = [this.size*(Math.cos(angle)-Math.sin(angle)),this.size*(Math.sin(angle)+Math.cos(angle))];
		this.v[1] = [this.size*(-Math.cos(angle)-Math.sin(angle)),this.size*(Math.cos(angle)-Math.sin(angle))];
		this.v[2] = [this.size*(Math.sin(angle)+Math.cos(angle)),this.size*(Math.sin(angle)-Math.cos(angle))];
		this.v[3] = [this.size*(Math.sin(angle)-Math.cos(angle)),this.size*(-Math.cos(angle)-Math.sin(angle))];
	}
	
	prepareHitbox() {
		this.hitbox = [];
		this.hitbox[0] = [-this.size,0];
		this.hitbox[1] = [-this.size*0.7,-this.size*0.7];
		this.hitbox[2] = [0,-this.size];
		this.hitbox[3] = [this.size*0.7,-this.size*0.7];
		this.hitbox[4] = [this.size,0];
		this.hitbox[5] = [this.size*0.7,this.size*0.7];
		this.hitbox[6] = [0,this.size];
		this.hitbox[7] = [-this.size*0.7,this.size*0.7];
	}
	
	inCollisionRange(bx,by,enemy) {
		var x = bx - enemy.x;
		var y = by - enemy.y;
		var maxDistance = this.size+enemy.size;
		return (x*x+y*y<maxDistance*maxDistance/4);
	}
	
	collide(enemy) {
		var x = p.x+this.weapon.x*Math.cos(this.angle)-this.weapon.y*Math.sin(this.angle);
		var y = p.y+this.weapon.x*Math.sin(this.angle)+this.weapon.y*Math.cos(this.angle);
		var i;
		for (i=0;i<2;i++) {
			var bx = x + Math.sin(this.angle+Math.PI*(this.time/50+i))*this.range;
			var by = y + Math.cos(this.angle+Math.PI*(this.time/50+i))*this.range;
			if (inCollisionRange(bx,by,enemy)) {
				var hitbox = [];
				var j;
				for (j=0;j<8;j++) hitbox[j] = [this.hitbox[j][0]+bx,this.hitbox[j][1]+by];
				for (j in enemy.hitbox) if (collide(hitbox,enemy.hitbox[j])) return true;
			}
			return false;
		}
	}
	
	update() {
		this.time++;
		this.x += this.vx;
		this.y += this.vy;
		for (i in enemies) {
			if (this.collide(enemies[i])) {
				enemies[i].hp -= this.damage;
			}
		}
		if (this.time>50) delete playerMissiles[this.num];
	}
	
	draw() {
		var x = p.x+this.weapon.x*Math.cos(this.angle)-this.weapon.y*Math.sin(this.angle);
		var y = p.y+this.weapon.x*Math.sin(this.angle)+this.weapon.y*Math.cos(this.angle);
		var i;
		for (i=0;i<2;i++) {
			var bx = x + Math.sin(this.angle+Math.PI*(this.time/50+i+0.5))*this.range;
			var by = y + Math.cos(this.angle+Math.PI*(this.time/50+i+0.5))*this.range;
			var j;
			for (j=0;j<3;j++) {
				g.add_v(0,[bx+this.v[j][0],by+this.v[j][1],0.001],this.tex[j]);
			}
			for (j=1;j<4;j++) {
				g.add_v(0,[bx+this.v[j][0],by+this.v[j][1],0.001],this.tex[j]);
			}
			g.add_light([0.5,0.5,5.0],[bx,by,0],1,[0,Math.PI]);
		}
	}
	
	constructor(weapon,num) {
		this.time = 0;
		this.size = 0.05;
		this.damage = 1.5;
		this.range = 0.3;
		this.weapon = weapon;
		this.angle = this.weapon.angle;
		this.prepareVertex(this.angle);
		this.prepareHitbox();
		this.tex = makeCoords4(353/tex_s,383/tex_s,287/tex_s,256/tex_s);
		this.num = num;
	}
}
