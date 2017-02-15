class PlayerWMachinegun1 {
	update(shoot) {
		this.cooldown--;
		if (shoot && this.cooldown<=0) {
			for (var i in this.angles) {
				var pos = this.positions[i];
				var x = p.x+this.x+pos[0];
				var y = p.y+this.y+pos[1];
				playerMissiles.push(new PlayerBullet1(x, y, this.angle+this.angles[i], playerMissiles.length));
				stats.shotsFired++;
			}
			this.cooldown = this.cooldownTime;
			s.play("shot", 1);
			this.shootingLight = time;
			return this.heat;
		}
		return 0;
	}
	
	draw() {
		if (this.shootingLight == time) g.addLight([p.x+this.x, p.y+this.y], [1, 1, 0], 1, [this.angle, Math.PI/6]);
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
			this.angles = [0];
			this.positions = [[0, 0]];
			this.heat = 2;
		} else if (this.level == 1) {
			this.angles = [0, 0];
			this.positions = rotateModel([[0, 0.01], [0, -0.01]], this.angle);
			this.heat = 3.7;
		} else if (this.level == 2) {
			this.angles = [0, 0, 0];
			this.positions = rotateModel([[0, 0.015], [0.01, 0], [0, -0.015]], this.angle);
			this.heat = 5;
		} else if (this.level == 3) {
			this.angles = [Math.PI*0.1, 0, 0, -Math.PI*0.1];
			this.positions = rotateModel([[0, 0.01], [0, 0.01], [0, -0.01], [0, -0.01]], this.angle);
			this.heat = 6.1;
		}
	}
	
	getInfo() {
		var info = ['Weapon upgrade level: '+this.level,
			'Rapidly shoots tons of small bullets'];
		return info;
	}
	
	getTooltip() {
		var tooltip = ['Price: '+this.price,
			'Simple, cheap and deadly, this weapon shoots',
			'stream of bullets at your enemies'];
			return tooltip;
	}
	
	constructor(slot = 0) {
		this.level = 0;
		this.cooldown = 0;
		this.shootingLight = -1;
		this.cooldownTime = 3;
		this.setSlot(slot);
		this.levelChanged();
		this.price = 55;
		this.prices = [100, 140, 190];
	}
}

classesList["PlayerWMachinegun1"] = PlayerWMachinegun1;
names["PlayerWMachinegun1"] = 'Machine Gun';
