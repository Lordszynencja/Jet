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
	
	constructor(offx = 0, offy = 0, angle = Math.PI/2) {
		this.level = 0;
		this.shootingLight = -1;
		this.cooldown = 0;
		this.cooldownTime = 3;
		this.x = Math.cos(p.angle)*offx-Math.sin(p.angle)*offy;
		this.y = Math.sin(p.angle)*offx+Math.cos(p.angle)*offy;
		this.angle = angle;
		this.levelChanged();
	}
}

classesList["PlayerWMachinegun1"] = PlayerWMachinegun1;
