class PlayerOrbs1 {
	prepareVertex() {
		this.v = makeCoords1(this.size);
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
		var x = this.x - enemy.x;
		var y = this.y - enemy.y;
		var maxDistance = this.size+enemy.size;
		return (x*x+y*y<maxDistance*maxDistance);
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
		this.time++;
		var x = p.x+this.weapon.x*Math.cos(this.angle)-this.weapon.y*Math.sin(this.angle);
		var y = p.y+this.weapon.x*Math.sin(this.angle)+this.weapon.y*Math.cos(this.angle);
		
		for (var b=0;b<2;b++) {
			this.x = x + Math.sin(this.angle+Math.PI*(this.time/50+b+0.5))*this.range;
			this.y = y + Math.cos(this.angle+Math.PI*(this.time/50+b+0.5))*this.range;
			this.hitbox = moveModel(this.rotatedHitbox,this.x,this.y);
			for (var i in enemies) {
				if (this.collide(enemies[i])) {
					enemies[i].hp -= this.damage;
				}
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
			g.addBulletTexture('Orb0', moveModel(this.v, bx, by));
			//g.addLight([bx, by], [0.5, 0.5, 5.0], 1, [0, Math.PI]);
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
		this.num = num;
	}
}
