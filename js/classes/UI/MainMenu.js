class MainMenu {
	onPress(name) {
		if (name=='enter') {
			if (this.position == 0) {
				delete ui.menu;
				ui.newMenu(new LevelSelectMenu());
			} else {
				delete ui.menu;
				ui.newMenu(new Options());
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
		g.addBackgroundTexture(this.bg, makeCoords2(1,1));
		for (var i in this.optionsV) {
			g.addGUITexture(this.options[i], this.optionsV[i]);
		}
		g.addGUITexture('Select', this.optionsV[this.position]);
	}
	
	constructor() {
		this.bg = 'ground';
		this.position = 0;
		this.options = ['Start', 'Options'];
		this.optionsV = prepareOptionsVertexes(this.options.length);
	}
}