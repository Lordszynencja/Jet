class ShipUpgradesMenu {
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
				if (this.submenuPosition == 0) this.upgradeUpgrade(this.position);
				else if (this.submenuPosition == 1) this.downgradeUpgrade(this.position);
				else if (this.submenuPosition == 2) this.sellUpgrade(this.position);
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
	
	upgradeUpgrade(slot) {
		var upgrade = p.ship.upgrades[slot];
		if (upgrade.level<upgrade.prices.length && upgrade.prices[upgrade.level]<=stats.money) {
			stats.money -= upgrade.prices[upgrade.level];
			upgrade.level++;
			upgrade.levelChanged();
		}
	}
	
	downgradeUpgrade(slot) {
		var upgrade = p.ship.upgrades[slot];
		if (upgrade.level>0) {
			upgrade.level--;
			stats.money += upgrade.prices[upgrade.level];
			upgrade.levelChanged();
		}
	}
	
	sellUpgrade(slot) {
		var upgrade = p.ship.upgrades[slot];
		for (var i=0;i<upgrade.level;i++) stats.money += upgrade.prices[i];
		upgrade.level = 0;
		upgrade.levelChanged();
		this.submenu = false;
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
	}
	
	prepareSubmenuOptions() {
		this.submenuOptions = ['Upgrade', 'Downgrade', 'Sell all upgrades'];
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
		this.options = [];
		for (var i in p.ship.upgrades) this.options.push(names[p.ship.upgrades[i].constructor.name]);
		this.options.push('Exit');
		this.optionsV = prepareOptionsPositions(this.options, this.fontSize);
	}
}