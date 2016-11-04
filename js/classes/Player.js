class Player {
	update() {
		if (!this.dead) {
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
		}
		if (this.hp<0) {
			this.hp = 0;
			if (!this.dead) {
				s.play("gameover",1);
				this.dead = true;
				this.dead_timer = time;
			}
		}
		if (this.dead && time-this.dead_timer>250) {
			ui.newMenu(new MainMenu());
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
		this.ship = new Ship1(Math.PI/2, this.x, this.y);
		this.ship.addWeapon(new PlayerWMachinegun1(0,0,Math.PI/2),0);
		//this.ship.addWeapon(new PlayerWMachinegun1(0,0,Math.PI/2),1);
		this.ship.addWeapon(new PlayerWLaser1(0,0,Math.PI/2),2);
		this.ship.addWeapon(new PlayerWDefenseOrbs1(0,0,Math.PI/2),3);
		this.ship.addWeapon(new PlayerWOrbs2(0,0,Math.PI/2),1);
	}
	
	draw() {
		if (!this.dead) this.ship.draw();
		else drawGameover();
	}
	
	constructor() {
		this.prepare();
	}
}