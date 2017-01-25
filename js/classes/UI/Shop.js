class Shop {
	onPress(name) {
		if (name=='esc') {
			delete ui.menu;
			ui.newMenu(new LevelSelectMenu());
		} else if (name=='enter') {
			this['enter'+this.position]();
		} else if (name=='down' && this.position<this.options.length-1) {
			this.position++;
		} else if (name=='up' && this.position>0) {
			this.position--;
		}
	}
	
	enter0() {
		delete ui.menu;
		ui.newMenu(new ShipChangeMenu());
	}
	
	enter1() {
		delete ui.menu;
		ui.newMenu(new ShipUpgradesMenu());
	}
	
	enter2() {
		delete ui.menu;
		ui.newMenu(new ShipWeaponsMenu());
	}
	
	enter3() {
		delete ui.menu;
		ui.newMenu(new ItemShop());
	}
	
	enter4() {
		//test flight
	}
	
	enter5() {
		delete ui.menu;
		ui.newMenu(new LevelSelectMenu());
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
			g.drawText(xy[0], xy[1], this.options[i], this.fontSize, (i!=4 ? [1, 1, 1, 1] : [0.5, 0.5, 0.5, 1]));
		}
		g.drawText(-0.95, -0.9, 'Money:'+stats.money.toString()+'$', 0.05, [1, 1, 1, 1]);
		g.addGUITexture('Select', findSelectSize(this.options[this.position], this.fontSize, this.optionsV[this.position]));
	}
	
	constructor() {
		this.position = 0;
		this.fontSize = 0.055;
		
		this.options = ['Change Ship', 'Upgrade Ship', 'Manage Weapons', 'Weapons Shop', 'Test Flight', 'Exit'];
		this.optionsV = prepareOptionsPositions(this.options, this.fontSize);
		for (var i in this.optionsV) this.optionsV[i][0] += 0.5;
	}
}