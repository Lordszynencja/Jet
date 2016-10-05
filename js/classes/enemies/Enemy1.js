class Enemy1 {
	prepareHitbox() {
		this.defaultHitbox = [
		[[-0.06328, 0.15000],[-0.08437, 0.15000],[-0.13593, 0.06093],[-0.13593,-0.06093],[-0.08437,-0.15000],[-0.06328,-0.15000]],
		[[-0.06328, 0.05859],[-0.06328,-0.05859],[-0.02812,-0.05859],[ 0.15000, 0.00000],[-0.02812, 0.05859]]];
		this.rotatedHitbox = [];
		for (var i in this.defaultHitbox) this.rotatedHitbox[i] = rotateModel(this.defaultHitbox[i],this.angle);
		this.hitbox = [];
	}
	
	update() {
		this.x += this.vx;
		this.y += this.vy;
		for (var i in this.rotatedHitbox) this.hitbox[i] = moveModel(this.rotatedHitbox[i],this.x,this.y);
		var i;
		for (i in this.weapons) this.weapons[i].update(true);
	}
	
	dealDamage(damage) {
		this.hp -= damage;
		if (this.hp<=0) {
			delete enemies[this.num];
			p.score += 100;
		}
	}
	
	draw() {
		for (var j=0;j<3;j++) {
			g.addTextureVertex(0,[this.x+this.v[j][0],this.y+this.v[j][1]],this.tex[j]);
		}
		for (var j=1;j<4;j++) {
			g.addTextureVertex(0,[this.x+this.v[j][0],this.y+this.v[j][1]],this.tex[j]);
		}
	}
	
	constructor(x,y,speed,angle,num) {
		this.hp = 20;
		this.size = 0.15;
		this.weapons = [new EnemyWMachinegun1(0.15,0,this)];
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.angle = angle;
		this.vx = Math.cos(angle)*speed;
		this.vy = Math.sin(angle)*speed;
		this.tex = makeCoords4(256/tex_s,511/tex_s,255/tex_s,0);
		this.v = rotateModel(makeCoords2(0.15,0.15),angle);
		this.num = num;
		this.prepareHitbox();
	}
}
