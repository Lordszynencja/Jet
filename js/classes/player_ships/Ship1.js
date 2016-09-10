class Ship1 {
	update() {
		var i;
		var canShoot = c.isPressed("space") && !this.overheat;
		for (i in this.weapons) {
			this.heat += this.weapons[i].update(canShoot);
		}
		this.heat-=this.cooling;
		if (this.heat>=100) this.heat = 100, this.overheat = true;
		if (this.overheat && this.heat<=75) this.overheat = false;
		if (this.heat<0) this.heat = 0;
	}
	
	prepareHitbox() {
		this.hitbox = [];
		for (var i in this.defaultHitbox)
		this.hitbox[0] = [];
		this.hitbox[0][0] = [];
	}
	
	draw() {
		var j;
		for (j=0;j<3;j++) {
			g.add_v(0,[p.x+this.v[j][0],p.y+this.v[j][1],0],this.tex[j]);
		}
		for (j=1;j<4;j++) {
			g.add_v(0,[p.x+this.v[j][0],p.y+this.v[j][1],0],this.tex[j]);
		}
	}
	
	constructor(angle) {
		this.tex = makeCoords4(0,255/tex_s,255/tex_s,0);
		this.v = makeCoords2(0.15,0.15);
		this.angle = angle;
		this.heat = 0;
		this.overheat = false;
		this.weapons = [new PlayerWMachinegun1(-0.05,-0.1,Math.PI/2),
			new PlayerWLaser1(0.15,0,Math.PI/2),
			new PlayerWMachinegun1(-0.05,0.1,Math.PI/2),
			new PlayerWOrbs1(0,0,Math.PI/2)];
		this.cooling = 1;
		this.defaultHitbox = [[[0.14648,0.04453],[-0.01992,0.06210],[-0.01992,-0.06210],[0.14648,-0.04453]],
		[[-0.01992,0.06210],[-0.03046,0.15000],[-0.05507,0.15000],[-0.09609,0.07382],[-0.09609,-0.07382],[-0.05507,-0.15000],[-0.03046,-0.15000],[-0.01992,-0.06210]]];
	}
}