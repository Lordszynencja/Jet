class PlayerLaser1 {
	update() {
		if (this.time>=1) {
			delete playerMissiles[this.num];
			return;
		}
		for (var i in enemies) {
			if (Math.abs(this.x-enemies[i].x)<this.size+enemies[i].size && this.y<enemies[i].y+enemies[i].size+this.size) {
				enemies[i].dealDamage(this.damage);
			}
		}
		this.time++;
	}
	
	draw() {
		var x = p.x + Math.cos(Math.PI/2)*this.x-Math.sin(Math.PI/2)*this.y;
		var y = p.y + Math.sin(Math.PI/2)*this.x+Math.cos(Math.PI/2)*this.y;
		g.addLight([x,y],[100,40,0],2,[3,3]);
	}
	
	constructor(x,y,num) {
		this.time = 0;
		this.x = x;
		this.y = y;
		this.size = 0.03;
		this.damage = 10;
		this.num = num;
	}
}
