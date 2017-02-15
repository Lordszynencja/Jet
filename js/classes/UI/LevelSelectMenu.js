class LevelSelectMenu {
	toLevel(level) {
		delete ui.menu;
		ui.newMenu(new Interface(level));
		s.changeMusic(level.music);
		ui.prepareGame();
	}
	
	onPress(name) {
		if (name=='esc') {
			delete ui.menu;
			ui.newMenu(new MainMenu());
		} else if (name=='enter') {
				//delete ui.menu;
				//var level = new Level0();
				//s.changeMusic(level.music);
				//ui.newMenu(new Help(level));
			if (this.position < this.levelsNo) {
				this.toLevel(new classesList[this.events[this.position]]());
			} else if (this.position == this.levelsNo) {
				delete ui.menu;
				ui.newMenu(new Shop());
			} else if (this.position == this.levelsNo+1) {
				delete ui.menu;
				ui.newMenu(new MainMenu());
			}
		} else if (this.position<this.options.length-1 && name=='down') {
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
		for (var i=0;i<this.levelsNo;i++) {
			var xy = this.optionsV[i];
			g.drawText(xy[0], xy[1], this.options[i], this.fontSize, colorActive);
		}
		for (var i=this.levelsNo;i<this.options.length;i++) {
			var xy = this.optionsV[i];
			g.drawText(xy[0], xy[1], this.options[i], this.fontSize, colorActive);
		}
		g.addGUITexture('Select', findSelectSize(this.options[this.position], this.fontSize, this.optionsV[this.position]));
		g.drawText(-0.99, 0.99, 'score: '+stats.score.toString(), 0.025, [0.9, 0.9, 0.1, 1]);
	}
	
	constructor() {
		this.fontSize = 0.055;
		this.position = 0;
		
		this.events = [];
		this.options = [];
		
		if (stats.level != null) {
			var levels = levelTree[stats.level];
			this.levelsNo = levels.length;
			for (var i=0;i<this.levelsNo;i++) {
				this.events[i] = levels[i];
			}
		} else {
			this.events[0] = 'XantarianEscape';
			this.levelsNo = 1;
		}
		this.events[this.levelsNo] = 'Shop';
		this.events[this.levelsNo+1] = 'Exit';
		
		for (var i in this.events) {
			this.options[i] = names[this.events[i]];
		}
		
		this.optionsV = prepareOptionsPositions(this.options, this.fontSize);
	}
}