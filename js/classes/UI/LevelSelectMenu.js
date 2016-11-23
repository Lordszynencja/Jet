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
				this.toLevel(new Level0());
			} else if (this.position == 1) {
				if (stats.level >= 1) this.toLevel(new Level1());
			} else if (this.position == 2) {
				delete ui.menu;
				ui.newMenu(new MainMenu());
			}
		} else if (this.position<this.options.length-1 && name=='down') {
			this.position++;
		} else if (this.position>0 && name=='up') {
			this.position--;
		}
	}
	
	update() {
	}
	
	draw() {
		g.addBackgroundTexture('ground', makeCoords2(1,1));
		for (var i in this.optionsV) {
			g.addGUITexture(this.options[i], this.optionsV[i]);
		}
		g.addGUITexture('Select', this.optionsV[this.position]);
	}
	
	constructor() {
		this.position = 0;
		this.options = ['Continue', 'Continue', 'Exit'];
		this.optionsV = prepareOptionsVertexes(this.options.length);
	}
}