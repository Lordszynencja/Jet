class Player {
	update() {
		if (!this.dead && !this.finished) {
			this.invincibility--;
			if (c.isPressed("left")) {
				this.vx -= this.ship.agility;
				if (this.vx<-this.ship.sideSpeed) this.vx = -this.ship.sideSpeed;
			}
			if (c.isPressed("right")) {
				this.vx += this.ship.agility;
				if (this.vx>this.ship.sideSpeed) this.vx = this.ship.sideSpeed;
			}
			if (!c.isPressed("left") && !c.isPressed("right")) {
				if (this.vx>this.ship.agility) this.vx -= this.ship.agility;
				else if (this.vx<-this.ship.agility) this.vx += this.ship.agility;
				else this.vx = 0;
			}
			if (c.isPressed("up")) {
				this.vy += this.ship.enginePower;
				if (this.vy>this.ship.engineSpeed) this.vy = this.ship.engineSpeed;
			}
			if (c.isPressed("down")) {
				this.vy -= this.ship.enginePower;
				if (this.vy<-this.ship.engineSpeed) this.vy = -this.ship.engineSpeed;
			}
			if (!c.isPressed("up") && !c.isPressed("down")) {
				if (this.vy>this.ship.enginePower) this.vy -= this.ship.enginePower;
				else if (this.vy<-this.ship.enginePower) this.vy += this.ship.enginePower;
				else this.vy = 0;
			}
			
			this.x += this.vx;
			if (this.x<=-0.85) this.x = -0.85;
			else if (this.x>=0.85) this.x = 0.85;
			this.y += this.vy;
			if (this.y<=-0.85) this.y = -0.85;
			else if (this.y>=0.85) this.y = 0.85;
			
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
		this.vx = 0;
		this.vy = 0;
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
	
	addWeapon(weapon, id) {
		if (id>=0 && id<this.ship.weaponsNo) this.ship.weapons[id] = new weapon(id);
	}
	
	takeWeapon(id) {
		if (id>=0 && id<this.ship.weaponsNo) {
			var weapon = this.ship.weapons[id];
			this.ship.weapons[id] = new PlayerWEmpty();
			if (weapon.constructor.name != 'PlayerWEmpty') return weapon;
		}
	}
	
	downgradeWeapon(id) {
		if (id>=0 && id<this.ship.weaponsNo) {
			this.ship.weapons[id].downgrade();
		}
	}
	
	upgradeWeapon(id) {
		if (id>=0 && id<this.ship.weaponsNo) {
			this.ship.weapons[id].upgrade();
		}
	}
	
	putInCargo(item) {
		if (item != null && item.constructor.name != 'PlayerWEmpty') {
			this.cargo.push(item);
		}
	}
	
	takeFromCargo(id) {
		if (id>=0 && id<this.cargo.length) {
			var item = this.cargo[id];
			this.cargo[id] = null;
			this.cargo = cleanArray(this.cargo);
			return item;
		}
	}
	
	fromShipToCargo(id) {
		if (id>=0 && id<this.ship.weaponsNo) this.putInCargo(this.takeWeapon(id));
	}
	
	fromCargoToShip(cargoId, slotId) {
		if (slotId>=0 && slotId<this.ship.weaponsNo) {
			this.fromShipToCargo(slotId);
			this.ship.weapons[slotId] = this.takeFromCargo(cargoId);
			this.ship.weapons[slotId].setSlot(slotId);
		}
	}
	
	putAllWeaponsToCargo() {
		for (var i in this.ship.weapons) {
			this.putInCargo(this.takeWeapon(i));
		}
	}
	
	changeShip(ship) {
		this.putAllWeaponsToCargo();
		stats.money += this.ship.getPrice();
		this.ship = new ship();
		stats.money -= this.ship.getPrice();
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
	}
}

classesList['Player'] = Player;