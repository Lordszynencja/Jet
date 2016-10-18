class Options {
	onPress(name) {
		if (name=='enter') {
			if (this.position == 0) {
				eightBitMode = !eightBitMode;
			} else if (this.position == 1) {
				useLightning = !useLightning;
			} else {
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
		this.options = ['8bitMode','Continue','Exit'];
		this.optionsV = prepareOptionsVertexes(this.options.length);
	}
}