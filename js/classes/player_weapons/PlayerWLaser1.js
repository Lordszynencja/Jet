class PlayerWLaser1 {
	update(shoot) {
		this.cooldown--;
		if (shoot && this.cooldown<=0) {
			playerMissiles.push(new PlayerLaser1(p.x+this.x, p.y+this.y, playerMissiles.length));
			this.cooldown = this.cooldownTime;
			s.play("laser", 1);
			stats.shotsFired++;
			return this.heat;
		}
		return 0;
	}
	
	draw() {
	}
	
	getData() {
		var data = {
			x : this.x,
			y : this.y
		};
		return data;
	}
	
	setData(data) {
		this.x = data.x;
		this.y = data.y;
	}
	
	setSlot(id) {
		var offset = p.ship.weaponOffsets[id];
		this.x = Math.cos(p.angle)*offset[0]-Math.sin(p.angle)*offset[1];
		this.y = Math.sin(p.angle)*offset[0]+Math.cos(p.angle)*offset[1];
	}
	
	upgrade() {
		
	}
	
	downgrade() {
		
	}
	
	constructor(slot = 0) {
		this.cooldown = 0;
		this.cooldownTime = 50;
		this.heat = 10;
		this.setSlot(slot);
		this.price = 200;
		this.prices = [];
	}
}

classesList["PlayerWLaser1"] = PlayerWLaser1;
levelUnlocks.items[1].push(PlayerWLaser1);
names["PlayerWLaser1"] = 'Lazertagger';
