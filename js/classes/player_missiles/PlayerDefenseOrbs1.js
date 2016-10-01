class PlayerDefenseOrbs1 {
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
	
	inCollisionRange(bullet) {
		var dx = this.x - bullet.x;
		var dy = this.y - bullet.y;
		var maxDistance = this.size+bullet.size;
		return (dx*dx+dy*dy<maxDistance*maxDistance);
	}
	
	collide(bullet) {
		return (this.inCollisionRange(bullet) && collide(this.hitbox,bullet.hitbox));
	}
	
	update() {
		if (this.time>1000) delete playerMissiles[this.num];
		this.angle += Math.PI/50*this.angleSpeed;
		this.x = p.x+Math.cos(this.angle)*this.r;
		this.y = p.y+Math.sin(this.angle)*this.r;
		this.hitbox = moveModel(this.rotatedHitbox,this.x,this.y);
		
		for (var i in enemyMissiles) {
			if (this.collide(enemyMissiles[i])) {
				delete enemyMissiles[i];
				delete playerMissiles[this.num];
				return;
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
		g.add_light([10,10,25],[this.x,this.y,0],1,[0,Math.PI]);
	}
	
	constructor(ang,angleSpeed,r,num) {
		this.time = 0;
		this.size = 0.015;
		this.angle = ang;
		this.angleSpeed = angleSpeed;
		this.r = r;
		this.x = p.x+Math.cos(ang)*r;
		this.y = p.y+Math.sin(ang)*r;
		this.num = num;
		
		this.prepareVertex();
		this.prepareHitbox();
		this.texno = textureC['Orb3'][0];
		this.tex = textureC['Orb3'][1];
	}
}