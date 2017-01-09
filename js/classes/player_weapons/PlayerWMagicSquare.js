class PlayerWMagicSquare {
	update(shoot) {
		this.cooldown--;
		if (shoot && this.cooldown<=0) {
			var x = p.ship.x+this.x;
			var y = p.ship.y+this.y;
			playerMissiles.push(new PlayerMagicSquareBullet(x, y, this.angle, this.level<2 ? 0 : (this.alternate ? 0.03 : -0.03), playerMissiles.length));
			this.alternate = !this.alternate;
			stats.shotsFired++;
			this.cooldown = this.cooldownTime;
			//s.play("plasmaShot", 1);
			this.shootingLight = time;
			return this.heat;
		}
		return 0;
	}
	
	draw() {
		if (this.shootingLight == time) g.addLight([p.x+this.x, p.y+this.y], [100, 100, 0], 1, [0, Math.PI]);
	}
	
	getData() {
		var data = {
			x : this.x,
			y : this.y,
			angle : this.angle,
			level : this.level
		};
		return data;
	}
	
	setData(data) {
		this.x = data.x;
		this.y = data.y;
		this.angle = data.angle;
		this.level = data.level;
		this.levelChanged();
	}
	
	upgrade() {
		if (this.level<3) {
			this.level++;
			this.levelChanged();
		}
	}
	
	downgrade() {
		if (this.level>0) {
			this.level--;
			this.levelChanged();
		}
	}
	
	levelChanged() {
		if (this.level == 0) {
			this.cooldownTime = 30;
			this.heat = 2;
		} else if (this.level == 1) {
			this.cooldownTime = 25;
			this.heat = 1.8;
		} else if (this.level == 2) {
			this.cooldownTime = 22;
			this.heat = 1.7;
		} else if (this.level == 3) {
			this.cooldownTime = 15;
			this.heat = 1.6;
		}
	}
	
	constructor(offx = 0, offy = 0, angle = Math.PI/2) {
		this.alternate = false;
		this.level = 0;
		this.shootingLight = -1;
		this.cooldown = 0;
		this.x = Math.cos(p.angle)*offx-Math.sin(p.angle)*offy;
		this.y = Math.sin(p.angle)*offx+Math.cos(p.angle)*offy;
		this.angle = angle;
		this.levelChanged();
	}
}

classesList["PlayerWMagicSquare"] = PlayerWMagicSquare;
