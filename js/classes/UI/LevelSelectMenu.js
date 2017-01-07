class LevelSelectMenu {
	toLevel(level) {
		delete ui.menu;
		ui.newMenu(new Interface(level));
		s.changeMusic(level.music);
		ui.prepareGame();
	}
	
	onPress(name) {
		if (name=='enter') {
			if (this.position == 0) {
				delete ui.menu;
				var level = new Level0();
				s.changeMusic(level.music);
				ui.newMenu(new Help(level));
			} else if (this.position < levelsNumber) {
				if (stats.level >= this.position) this.toLevel(new classesList["Level"+this.position.toString()]());
			} else if (this.position == levelsNumber) {
				if (stats.shipLevel == 0 && stats.money>=100) {
					this.options[levelsNumber] = 'Upgrade Ship: 1000$';
					this.optionsV = prepareOptionsPositions(this.options, this.fontSize);
					stats.shipLevel = 1;
					stats.money -= 100;
					p.ship.upgradeWeapon(0);
					p.ship.upgradeWeapon(1);
					p.ship.addWeapon(PlayerWLaser1, 2);
					p.ship.addWeapon(PlayerWDefenseOrbs1, 3);
					p.ship.upgradeCooling();
				} else if (stats.shipLevel == 1 && stats.money>=1000) {
					this.options[levelsNumber] = 'Upgrade Ship: max level';
					this.optionsV = prepareOptionsPositions(this.options, this.fontSize);
					stats.shipLevel = 2;
					stats.money -= 1000;
					p.ship.upgradeWeapon(0);
					p.ship.upgradeWeapon(0);
					p.ship.upgradeWeapon(1);
					p.ship.upgradeWeapon(1);
					p.ship.upgradeWeapon(3);
					p.ship.upgradeCooling();
					p.ship.upgradeCooling();
					p.ship.upgradeCooling();
				}
			} else {
				delete ui.menu;
				ui.newMenu(new MainMenu());
			}
		} else if (this.position<this.options.length && name=='down') {
			this.position++;
		} else if (this.position>0 && name=='up') {
			this.position--;
		}
	}
	
	anyKey() {
	}
	
	update() {
	}
	
	draw() {
		g.addBackgroundTexture('ground', makeCoords2(1, 1));
		var colorActive = [1, 1, 1, 1];
		var colorNotActive = [0.5, 0.5, 0.5, 1];
		for (var i=0;i<levelsNumber;i++) {
			var xy = this.optionsV[i];
			g.drawText(xy[0], xy[1], this.options[i], this.fontSize, (stats.level<i ? colorNotActive : colorActive));
		}
		for (var i=levelsNumber;i<this.options.length;i++) {
			var xy = this.optionsV[i];
			g.drawText(xy[0], xy[1], this.options[i], this.fontSize, colorActive);
		}
		g.drawText(-0.95, -0.9, 'Money:'+stats.money.toString()+'$', 0.05, colorActive);
		g.addGUITexture('Select', findSelectSize(this.options[this.position], this.fontSize, this.optionsV[this.position]));
	}
	
	constructor() {
		this.fontSize = 0.055;
		this.position = 0;
		
		this.options = [];
		for (var i=0;i<levelsNumber;i++) this.options[i] = 'Level '+(i+1);
		this.options[levelsNumber] = 'Upgrade Ship: '+(stats.shipLevel == 0 ? '100$' : stats.shipLevel == 1 ? '1000$' : 'max level');
		this.options[levelsNumber+1] = 'Exit';
		
		this.optionsV = prepareOptionsPositions(this.options, this.fontSize);
	}
}