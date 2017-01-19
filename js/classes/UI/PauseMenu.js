class PauseMenu {
	onPress(name) {
		if (name=='esc') {
			delete ui.menu;
			ui.newMenu(new Interface(this.level));
		} else if (name=='enter') {
			if (this.position == 0) {
				delete ui.menu;
				ui.newMenu(new Interface(this.level));
				s.setMusicVolume(1);
			} else {
				delete ui.menu;
				ui.newMenu(new LevelSelectMenu());
				g.setInvertion([0, 0], 0);
				s.changeMusic('menu');
			}
		} else if (this.position<this.options.length-1 && name=='down') {
			this.position++;
		} else if (this.position>0&& name=='up') {
			this.position--;
		}
	}
	
	anyKey() {
	}
	
	update() {
	}
	
	drawOptions() {
		for (var i in this.optionsV) {
			g.addGUITexture(this.options[i], this.optionsV[i]);
		}
		g.addGUITexture('Select', this.optionsV[this.position]);
	}
	
	draw() {
		g.addBackgroundTexture(this.level.texture, makeCoords2(1,1));
		for (var i in effects) effects[i].draw();
		for (var i in enemies) enemies[i].draw();
		for (var i in playerMissiles) playerMissiles[i].draw();
		for (var i in enemyMissiles) enemyMissiles[i].draw();
		p.draw();
		p.ship.drawIndicators();
		g.drawText(-0.96, -0.8, stats.score.toString(), 0.1, [0.1, 0.1, 0.1, 1]);
		this.drawOptions();
	}
	
	constructor(level) {
		this.position = 0;
		
		this.options = ['Continue','Exit'];
		this.optionsV = prepareOptionsVertexes(this.options.length);
		
		this.level = level;
	}
}