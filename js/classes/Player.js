class Player {
	update() {
		if (!this.dead && !this.finished) {
			this.invincibility--;
			if (c.isPressed("left")) {
				this.x -= 0.03;
				if (this.x<=-0.85) this.x = -0.85;
			}
			if (c.isPressed("right")) {
				this.x += 0.03;
				if (this.x>=0.85) this.x = 0.85;
			}
			if (c.isPressed("up")) {
				this.y += 0.03;
				if (this.y>=0.85) this.y = 0.85;
			}
			if (c.isPressed("down")) {
				this.y -= 0.03;
				if (this.y<=-0.85) this.y = -0.85;
			}
			this.ship.update();
		} else if (this.finished) {
			var v = (time-this.finish_timer)*0.001;
			this.y += v;
			this.ship.y += v;
		}
		if (this.ship.hp<0) {
			this.ship.hp = 0;
			if (!this.dead) {
				s.play("gameover", 1);
				this.dead = true;
				this.dead_timer = time;
			}
		}
		if (this.finished && time-this.finish_timer>250) {
			ui.newMenu(new LevelSelectMenu());
			s.changeMusic('menu');
			this.prepare();
			this.ship.prepare();
		} else if (this.dead && time-this.dead_timer>250) {
			stats.score = 0;
			ui.newMenu(new LevelSelectMenu());
			s.changeMusic('menu');
			this.prepare();
			this.ship.prepare();
		}
	}
	
	prepare() {
		this.x = 0.0;
		this.y = -0.75;
		this.invincibility = 0;
		this.angle = Math.PI/2;
		this.dead = false;
		this.finished = false;
	}
	
	draw() {
		if (this.finished) drawFinish();
		if (this.dead) drawGameover();
		else this.ship.draw();
	}
	
	setData(data) {
		this.ship = deserialize(data.ship);
		for (var i in data.cargo) this.cargo[i] = deserialize(data.cargo[i]);
	}
	
	getData() {
		var data = {
			ship : serialize(this.ship)
		};
		var cargo = [];
		for (var i in this.cargo) {
			cargo[i] = serialize(this.cargo[i]);
		}
		data.cargo = cargo;
		return data;
	}
	
	constructor() {
		this.prepare();
		this.cargo = [];
		if (ui != undefined && ui.menu != undefined && ui.menu.level != undefined) ui.menu.level.preparePlayer(this);
	}
}

classesList['Player'] = Player;