class ShipChangeMenu {
	onPress(name) {
		if (name=='esc') {
			delete ui.menu;
			ui.newMenu(new Shop());
		} else if (name=='enter') {
			if (this.position<this.availableShips.length) {
				if (stats.money>=(new this.availableShips[this.position]()).price-p.getShipPrice()) p.changeShip(this.availableShips[this.position]);
			} else {
				delete ui.menu;
				ui.newMenu(new Shop());
			}
		} else if (name=='down' && this.position<this.options.length-1) {
			this.position++;
			this.changePreviewedShip();
		} else if (name=='up' && this.position>0) {
			this.position--;
			this.changePreviewedShip();
		}
	}
	
	changePreviewedShip() {
		if (this.position<this.availableShips.length) {
			var ship = this.availableShips[this.position];
			this.ship = new ship();
			this.ship.x = -0.5;
			this.ship.y = 0;
		}
	}
	
	anyKey() {
	}
	
	update() {
	}
	
	draw() {
		g.addBackgroundTexture('ground', makeCoords2(1, 1));
		if (this.position<this.availableShips.length) this.ship.draw();
		else p.ship.draw();
		for (var i in effects) effects[i].draw();
		for (var i=0;i<this.options.length;i++) {
			var xy = this.optionsV[i];
			g.drawText(xy[0], xy[1], this.options[i], this.fontSize, [1, 1, 1, 1]);
		}
		g.drawText(-0.95, -0.9, 'Money:'+stats.money.toString()+'$', 0.05, [1, 1, 1, 1]);
		g.addGUITexture('Select', findSelectSize(this.options[this.position], this.fontSize, this.optionsV[this.position]));
	}
	
	constructor() {
		this.fontSize = 0.05;
		this.options = [];
		this.availableShips = getShipsForCurrentLevel();
		for (var i in this.availableShips) this.options.push(names[this.availableShips[i].name]);
		this.options.push("Exit");
		this.optionsV = prepareOptionsPositions(this.options, this.fontSize);
		for (var i in this.optionsV) this.optionsV[i][0] += 0.5;
		this.ship = new Ship1();
		this.ship.x = -0.5;
		this.ship.y = 0;
		this.position = 0;
	}
}
