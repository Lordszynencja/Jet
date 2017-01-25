class PlayerWMagicSquare {
	update(shoot) {
		this.cooldown--;
		if (shoot && this.cooldown<=0) {
			var x = p.ship.x+this.x;
			var y = p.ship.y+this.y;
			playerMissiles.push(new PlayerMagicSquareBullet(x, y, this.angle, this.level<2 ? 0 : (this.alternate ? 0.07 : -0.07), playerMissiles.length));
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
	
	setSlot(id) {
		var offset = p.ship.weaponOffsets[id];
		this.x = Math.cos(p.angle)*offset[0]-Math.sin(p.angle)*offset[1];
		this.y = Math.sin(p.angle)*offset[0]+Math.cos(p.angle)*offset[1];
		this.angle = p.ship.weaponAngles[id];
	}
	
	levelChanged() {
		if (this.level == 0) {
			this.cooldownTime = 30;
			this.heat = 9;
		} else if (this.level == 1) {
			this.cooldownTime = 25;
			this.heat = 8.1;
		} else if (this.level == 2) {
			this.cooldownTime = 22;
			this.heat = 7.5;
		} else if (this.level == 3) {
			this.cooldownTime = 15;
			this.heat = 6.9;
		}
	}
	
	constructor(slot = 0) {
		this.level = 0;
		this.cooldown = 0;
		this.alternate = false;
		this.shootingLight = -1;
		this.setSlot(slot);
		this.levelChanged();
		this.price = 300;
		this.prices = [340, 400, 600];
	}
}

classesList["PlayerWMagicSquare"] = PlayerWMagicSquare;
levelUnlocks.items[1].push(PlayerWMagicSquare);
names["PlayerWMagicSquare"] = 'Plasmic Gun';
