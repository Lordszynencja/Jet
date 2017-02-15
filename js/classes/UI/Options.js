class Options {
	onPress(name) {
		if (name=='enter') {
			if (this.position == 0) {
				conf.eightBitMode = !conf.eightBitMode;
			} else if (this.position == 1) {
				conf.useLightning = !conf.useLightning;
			} else if (this.position == 2) {
				conf.sound = !conf.sound;
				if (!conf.sound) s.stopAll();
				s.changeMusic('menu', 0);
			} else if (this.position == 3) {
				versionHandler.resetProgress();
			} else {
				delete ui.menu;
				ui.newMenu(new MainMenu());
			}
		} else if (this.position<this.options.length-1 && name=='down') {
			this.position++;
		} else if (this.position>0 && name=='up') {
			this.position--;
		} else if (name=='esc') {
			delete ui.menu;
			ui.newMenu(new MainMenu());
		}
	}
	
	anyKey() {
	}
	
	update() {
	}
	
	draw() {
		g.addBackgroundTexture('ground', makeCoords2(1,1));
		for (var i in this.optionsV) {
			if (i!=3) {
				g.addGUITexture(this.options[i], this.optionsV[i]);
			} else {
				g.addGUITexture(this.options[i-1], this.optionsV[i]);
			}
		}
		g.addGUITexture('Select', this.optionsV[this.position]);
		g.addLight([0, this.optionsV[1][0][1]-0.1], [8, 8, 8], 1, [0, Math.PI]);
	}
	
	constructor() {
		this.position = 0;
		this.options = ['8bitMode', 'Light', 'Sound', 'Reset Progress', 'Exit'];
		this.optionsV = prepareOptionsVertexes(this.options.length);
	}
}