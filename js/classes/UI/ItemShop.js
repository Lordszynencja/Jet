class ItemShop {
	onPress(name) {
		if (name=='esc') {
			delete ui.menu;
			ui.newMenu(new Shop());
		} else if (name=='enter') {
			if (this.position<this.availableItems.length) {
				if (stats.money>this.item.price) {
					stats.money -= this.item.price;
					p.putInCargo(new this.availableItems[this.position]());
				}
			} else {
				delete ui.menu;
				ui.newMenu(new Shop());
			}
		} else if (name=='down' && this.position<this.options.length-1) {
			this.position++;
			this.changePreviewedItem();
		} else if (name=='up' && this.position>0) {
			this.position--;
			this.changePreviewedItem();
		}
	}
	
	changePreviewedItem() {
		if (this.position<this.availableItems.length) {
			var item = this.availableItems[this.position];
			this.item = new item();
			this.item.x = 0;
			this.item.y = 0;
			this.item.angle = Math.PI/2;
			playerMissiles = [];
		} else this.item = new PlayerWEmpty();
	}
	
	anyKey() {
	}
	
	update() {
		if (this.position<this.availableItems.length) {
			this.item.update(c.isPressed("space"));
			for (var i in playerMissiles) playerMissiles[i].update();
		}
	}
	
	drawTooltip() {
		if (this.position<this.availableItems.length) {
			var y = -0.1;
			var tooltip = this.item.getTooltip();
			if (tooltip != undefined) {
				for (var i=0;i<tooltip.length;i++) {
					g.drawText(-0.95, y, tooltip[i], 0.025, [1, 1, 1, 1]);
					y -= 0.05;
				}
			}
		}
	}
	
	draw() {
		g.addBackgroundTexture('ground', makeCoords2(1, 1));
		if (this.position<this.availableItems.length) {
			this.item.draw();
			for (var i in playerMissiles) playerMissiles[i].draw();
		}
		for (var i in effects) effects[i].draw();
		this.drawTooltip();
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
		this.availableItems = getItemsForCurrentLevel();
		for (var i in this.availableItems) this.options.push(names[this.availableItems[i].name]);
		this.options.push("Exit");
		this.optionsV = prepareOptionsPositions(this.options, this.fontSize);
		for (var i in this.optionsV) this.optionsV[i][0] += 0.5;
		this.ship = new Ship1();
		this.ship.x = -0.5;
		this.ship.y = 0;
		this.position = 0;
		this.changePreviewedItem();
	}
}
