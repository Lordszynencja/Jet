class PlayerLaser1 {
	update() {
		if (this.time>=50) {
			delete playerMissiles[this.num];
			return;
		}
		this.time++;
		for (i in enemies) {
			if (Math.abs(this.x-enemies[i].x)<this.size+enemies[i].size && this.y<enemies[i].y+enemies[i].size+this.size) enemies[i].hp -= this.damage;
		}
	}
	
	draw() {
		g.add_light([100,40,0],[p.x,p.y,0],2,[1,1]);
		g.add_light([100,40,0],[p.x,p.y,1],2,[1,1]);
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
