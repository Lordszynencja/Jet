class PlayerLaser1 {
	update() {
		if (this.time>=this.maxTime) {
			delete playerMissiles[this.num];
			return;
		}
		var x = p.x+this.x;
		var y = p.y+this.y;
		for (var i in enemies) {
			if (Math.abs(x-enemies[i].x)<this.size+enemies[i].size && y<enemies[i].y+enemies[i].size) {
				enemies[i].dealDamage(this.damage);
			}
		}
		this.time++;
	}
	
	draw() {
		var x = p.x + this.x;
		var y = p.y + this.y;
		var color = [1, 0.2, 0.1];
		g.addEffect1([x, y], 2, Math.PI*0.5, color);
		g.addLight([x, y], [1000, 20, 10], 2, [0, 2]);
	}
	
	constructor(x, y, num) {
		this.time = 0;
		this.maxTime = 3;
		this.x = x;
		this.y = y;
		this.size = 0.03;
		this.damage = 4;
		this.num = num;
	}
}
