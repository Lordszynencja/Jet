class ShipWeaponsMenu {
	onPress(name) {
		if (name=='esc') {
			if (this.submenu) {
				this.submenu = false;
			} else {
				delete ui.menu;
				ui.newMenu(new Shop());
			}
		} else if (name=='enter') {
			if (this.submenu) {
				if (this.submenuPosition == 0) this.upgradeWeapon(this.slot, this.isWeaponSlot);
				else if (this.submenuPosition == 1) this.downgradeWeapon(this.slot, this.isWeaponSlot);
				else if (this.submenuPosition == 2) this.sellWeapon(this.slot, this.isWeaponSlot);
				else if (this.submenuPosition == 3 && this.isWeaponSlot) this.moveWeapon(-1, this.slot);
				else this.moveWeapon(this.slot, this.submenuPosition-3);
			} else {
				if (this.position<this.options.length-1) {
					this.prepareSubmenuOptions();
					this.submenu = true;
					this.submenuPosition = 0;
				} else {
					delete ui.menu;
					ui.newMenu(new Shop());
				}
			}
		} else if (name=='down') {
			if (this.submenu) {
				if (this.submenuPosition<this.submenuOptions.length-1) this.submenuPosition++;
			} else if (this.position<this.options.length-1) this.position++;
		} else if (name=='up') {
			if (this.submenu) {
				if (this.submenuPosition>0) this.submenuPosition--;
			} else if (this.position>0) this.position--;
		}
	}
	
	upgradeWeapon(slot, fromShip) {
		if (fromShip) {
			var weapon = p.ship.weapons[slot];
			if (weapon.level<weapon.prices.length && weapon.prices[weapon.level]<=stats.money) {
				stats.money -= weapon.prices[weapon.level];
				weapon.level++;
				weapon.levelChanged();
				this.prepareSubmenuOptions();
			}
		} else {
			var weapon = p.cargo[slot];
			if (weapon.level<weapon.prices.length && weapon.prices[weapon.level]<=stats.money) {
				stats.money -= weapon.prices[weapon.level];
				weapon.level++;
				weapon.levelChanged();
				this.prepareSubmenuOptions();
			}
		}
	}
	
	downgradeWeapon(slot, fromShip) {
		if (fromShip) {
			var weapon = p.ship.weapons[slot];
			if (weapon.level>0) {
				weapon.level--;
				stats.money += weapon.prices[weapon.level];
				weapon.levelChanged();
				this.prepareSubmenuOptions();
			}
		} else {
			var weapon = p.cargo[slot];
			if (weapon.level>0) {
				weapon.level--;
				stats.money += weapon.prices[weapon.level];
				weapon.levelChanged();
				this.prepareSubmenuOptions();
			}
		}
	}
	
	sellWeapon(slot, fromShip) {
		if (fromShip) {
			var weapon = p.ship.weapons[slot];
			stats.money += weapon.price;
			for (var i=0;i<weapon.level;i++) stats.money += weapon.prices[i];
			p.ship.weapons[slot] = new PlayerWEmpty();
		} else {
			var weapon = p.takeFromCargo(slot);
			stats.money += weapon.price;
			for (var i=0;i<weapon.level;i++) stats.money += weapon.prices[i];
		}
		this.submenu = false;
		this.prepareOptions();
	}
	
	moveWeapon(cargoSlot, shipSlot) {
		if (cargoSlot == -1) {
			p.fromShipToCargo(shipSlot);
		} else {
			p.fromCargoToShip(cargoSlot, shipSlot);
		}
		this.submenu = false;
		this.prepareOptions();
	}
	
	anyKey() {
	}
	
	update() {
		p.x = -0.5;
		p.y = 0;
		p.ship.x = p.x;
		p.ship.y = p.y;
	}
	
	draw() {
		g.addBackgroundTexture('ground', makeCoords2(1, 1));
		p.draw();
		for (var i in effects) effects[i].draw();
		for (var i=0;i<this.options.length;i++) {
			var xy = this.optionsV[i];
			g.drawText(xy[0], xy[1], this.options[i], this.fontSize, [1, 1, 1, 1]);
		}
		g.addGUITexture('Select', findSelectSize(this.options[this.position], this.fontSize, this.optionsV[this.position]));
		if (this.submenu) {
			for (var i=0;i<this.submenuOptions.length;i++) {
				var xy = this.submenuOptionsV[i];
				g.drawText(xy[0], xy[1], this.submenuOptions[i], this.fontSize*0.8, [1, 1, 1, 1]);
			}
			g.addGUITexture('Select', findSelectSize(this.submenuOptions[this.submenuPosition], this.fontSize*0.8, this.submenuOptionsV[this.submenuPosition]));
		}
		g.drawText(-0.95, -0.9, 'Money:'+stats.money.toString()+'$', 0.05, [1, 1, 1, 1]);
		if (this.position<this.options.length-1) {
			var weapon = (this.position<p.ship.weaponsNo ? p.ship.weapons[this.position] : p.cargo[this.position-p.ship.weaponsNo]);
			var weaponInfo = weapon.getInfo();
			for (var i in weaponInfo) g.drawText(-0.95, -0.5-i*0.1, weaponInfo[i], 0.04, [1, 1, 1, 1]);
		}
	}
	
	prepareOptions() {
		this.options = [];
		for (var i in p.ship.weapons) this.options.push(names[p.ship.weapons[i].constructor.name]);
		for (var i in p.cargo) this.options.push(names[p.cargo[i].constructor.name]);
		this.options.push('Exit');
		this.optionsV = prepareOptionsPositions(this.options, this.fontSize);
		for (var i in this.optionsV) {
			if (i<p.ship.weaponsNo) this.optionsV[i][1] += 0.1;
		}
	}
	
	prepareSubmenuOptions() {
		this.submenuOptions = [];
		if (this.position<p.ship.weaponsNo) {
			this.slot = this.position;
			var weapon = p.ship.weapons[this.slot];
			var upgradePrice = (weapon.level<weapon.prices.length ? weapon.prices[weapon.level] : '-');
			var downgradePrice = (weapon.level>0 ? weapon.prices[weapon.level-1] : '-');
			var sellPrice = weapon.price;
			for (var i=0;i<weapon.level;i++) sellPrice += weapon.prices[i];
			this.submenuOptions = ['Upgrade '+upgradePrice, 'Downgrade '+downgradePrice, 'Sell '+sellPrice, 'Move to cargo'];
			this.isWeaponSlot = true;
		} else if (this.position<this.options.length-1) {
			this.slot = this.position-p.ship.weaponsNo;
			var weapon = p.cargo[this.slot];
			var upgradePrice = (weapon.level<weapon.prices.length ? weapon.prices[weapon.level] : '-');
			var downgradePrice = (weapon.level>0 ? weapon.prices[weapon.level-1] : '-');
			var sellPrice = weapon.price;
			for (var i=0;i<weapon.level;i++) sellPrice += weapon.prices[i];
			this.submenuOptions = ['Upgrade '+upgradePrice, 'Downgrade '+downgradePrice, 'Sell '+sellPrice];
			for (var i=0;i<p.ship.weaponsNo;i++) this.submenuOptions.push('Move to weapon slot '+(i+1));
			this.isWeaponSlot = false;
		}
		this.submenuOptionsV = prepareOptionsPositions(this.submenuOptions, this.fontSize*0.8);
		var offx = 0.6;
		var offy = this.optionsV[this.position][1]-0.015;
		for (var i in this.submenuOptionsV) {
			this.submenuOptionsV[i][0] += offx;
			this.submenuOptionsV[i][1] += offy;
		}
	}
	
	constructor() {
		this.position = 0;
		this.submenuPosition = -1;
		this.submenu = false;
		this.fontSize = 0.05;
		this.prepareOptions();
		this.isWeaponSlot = false;
		this.slot = -1;
	}
}