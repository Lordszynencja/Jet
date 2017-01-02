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
		} else if (this.finished) this.y += (time-this.finish_timer)*0.001;
		if (this.hp<0) {
			this.hp = 0;
			if (!this.dead) {
				s.play("gameover", 1);
				this.dead = true;
				this.dead_timer = time;
			}
		}
		if (this.finished && time-this.finish_timer>250) {
			ui.newMenu(new LevelSelectMenu());
			s.changeMusic('menu');
		} else if (this.dead && time-this.dead_timer>250) {
			stats.score = 0;
			ui.newMenu(new LevelSelectMenu());
			s.changeMusic('menu');
		}
	}
	
	prepare() {
		this.x = 0.0;
		this.y = -0.75;
		this.hp = 100;
		this.invincibility = 0;
		this.score = 0;
		this.angle = Math.PI/2;
		this.dead = false;
		if (ui != undefined && ui.menu != undefined && ui.menu.level != undefined) ui.menu.level.preparePlayer(this);
	}
	
	draw() {
		if (this.finished) drawFinish();
		if (this.dead) drawGameover();
		else this.ship.draw();
	}
	
	constructor() {
		this.prepare();
	}
}