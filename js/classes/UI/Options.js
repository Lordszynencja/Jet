class Options {
	onPress(name) {
		if (name=='enter') {
			if (this.position == 0) {
				eightBitMode = !eightBitMode;
			} else {
				delete ui.menu;
				ui.newMenu(new MainMenu());
			}
		} else if (this.position <this.options.length && name=='down') {
			this.position = 1;
		} else if (this.position == 1 && name=='up') {
			this.position = 0;
		}
	}
	
	update() {
	}
	
	draw() {
		g.addBackgroundTexture('ground', makeCoords2(1,1));
		for (var i in this.optionsV) {
			g.addGUITexture(this.options[i],this.optionsV[i]);
		}
		g.addGUITexture('Select', this.optionsV[this.position]);
	}
	
	constructor() {
		this.position = 0;
		this.options = ['8bitMode','Exit'];
		this.optionsV = prepareOptionsVertexes(this.options.length);
	}
}